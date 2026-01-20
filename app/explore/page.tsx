"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {Search,Filter,Navigation,Star,Clock,X,MapPin,RefreshCw,ArrowUpDown,} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useDataCache } from "@/lib/cache";
import { usePlacesFilter } from "@/hooks/use-places-filter";
import { useGeolocation } from "@/hooks/use-geolocation";
import { recordPlaceView, recordPlaceClick } from "@/lib/database";
import { useLanguage } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import type { PlaceWithDetails } from "@/lib/supabase";
import { DivIcon } from "leaflet";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);
//const DivIcon = dynamic(() => import("leaflet").then((mod) => mod.DivIcon), { ssr: false })

// Custom marker component with icons
const CustomMarker = dynamic(() => import("./custom-marker"), { ssr: false });

// Category colors mapping
const categoryColors: { [key: string]: string } = {
  "Turismo arquitectónico": "#8B4513",
  "Turismo de naturaleza": "#228B22",
  "Turismo de entretenimiento": "#FF4500",
  "Turismo de negocios": "#1E3A8A",
  "Turismo gastronómico": "#DC143C",
  Hotelería: "#DAA520",
};

// Category icons mapping
const categoryIcons: { [key: string]: string } = {
  "Turismo arquitectónico": "🏛️",
  "Turismo de naturaleza": "🌿",
  "Turismo de entretenimiento": "🎪",
  "Turismo de negocios": "💼",
  "Turismo gastronómico": "🍽️",
  Hotelería: "🏨",
  "user-location": "🧍🏻‍♂️",
};

// Function to create custom marker icon
const createCustomMarkerIcon = (
  category: string,
  color: string,
  isSelected: boolean = false,
  label?: string // Nuevo parámetro opcional
) => {
  if (typeof window === "undefined") return null;
  const L = require("leaflet");
  const isUserLocation = category === "user-location";
  const icon = categoryIcons[category] || "📍";
  const size = isUserLocation ? 60 : isSelected ? 50 : 40;
  const fontSize = isUserLocation ? "32px" : isSelected ? "20px" : "16px";

  return new L.DivIcon({
    html: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
    ">
      ${
        label
          ? `<div style="
                margin-bottom:4px;
                font-size:11px;
                color:#fff;
                font-weight:bold;
                background:rgba(0,0,0,0.7);
                padding:2px 8px;
                border-radius:8px;
                box-shadow:0 1px 4px rgba(0,0,0,0.18);
                border: 1.5px solid #000;
                text-shadow: 0 1px 2px #000, 0 0 2px #000;
              ">${label}</div>`
          : ""
      }
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: ${fontSize};
        cursor: pointer;
        transition: all 0.2s ease;
        ${isSelected ? "transform: scale(1.1); z-index: 1000;" : ""}
      ">
        ${icon}
      </div>
    </div>
  `,
    className: "custom-marker-icon",
    iconSize: [size, size + (label ? 20 : 0)],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

export default function ExplorePage() {
  const { t } = useLanguage();
  const [selectedPlace, setSelectedPlace] = useState<PlaceWithDetails | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<any>(null);
  const searchParams = useSearchParams();

  // Use custom hooks
  const {
    data: cacheData,
    loading: cacheLoading,
    error: cacheError,
    loadData,
    refreshData,
  } = useDataCache();
  const {
    location,
    permission,
    error: locationError,
    loading: locationLoading,
    requestLocation,
  } = useGeolocation();

  // Initialize places filter with cached data
  const {
    filteredPlaces,
    filters,
    sortOptions,
    updateSearchTerm,
    updateCategory,
    updateMunicipality,
    updateRadius,
    updateUserLocation,
    updateSort,
    clearFilters,
    totalCount,
    filteredCount,
  } = usePlacesFilter(cacheData?.places || []);

  // Generate session ID for analytics
  const sessionId = useRef(
    typeof window !== "undefined"
      ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : ""
  );

  // Load data on mount
  useEffect(() => {
    if (!cacheData) {
      loadData();
    }
  }, [cacheData, loadData]);

  // Update location in filter when geolocation changes
  useEffect(() => {
    updateUserLocation(location, permission);
  }, [location, permission, updateUserLocation]);

  // Get main image for a place
  const getMainImage = (place: PlaceWithDetails) => {
    const mainImage = place.images?.find((img) => img.is_main);
    return mainImage?.url || "/placeholder.svg?height=200&width=300";
  };

  // Get primary category for a place
  const getPrimaryCategory = (place: PlaceWithDetails) => {
    return place.categories?.[0] || null;
  };

  const handlePlaceSelect = async (place: PlaceWithDetails) => {
    setSelectedPlace(place);
    await recordPlaceView(place.id, sessionId.current);
  };

  // Función mejorada para cerrar el selectedPlace
  const handleCloseSelectedPlace = () => {
    setSelectedPlace(null);
    // También cerrar cualquier popup abierto en el mapa
    if (mapRef.current) {
      mapRef.current.closePopup();
    }
  };

  // Efecto para limpiar el selectedPlace cuando se cambia el filtro
  useEffect(() => {
    setSelectedPlace(null);
  }, [
    filters.searchTerm,
    filters.selectedCategory,
    filters.selectedMunicipality,
  ]);

  // Handle place click and record click
  const handlePlaceClick = async (
    place: PlaceWithDetails,
    clickType: string
  ) => {
    await recordPlaceClick(place.id, clickType, sessionId.current);
  };

  // Selecciona la categoría desde el query string al cargar la página
  useEffect(() => {
    if (!cacheData?.categories) return;
    if (!searchParams) return;
    const categorySlug = searchParams.get("category");
    if (!categorySlug) return;

    // Busca la categoría cuyo slug coincida
    const category = cacheData.categories.find(
      (cat) =>
        cat.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-") === categorySlug
    );
    if (category) {
      updateCategory(category.id);
    }
  }, [cacheData?.categories]);

  // Loading state
  if (cacheLoading && !cacheData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">{t.loadingPlaces}</p>
          <p className="text-sm text-gray-500 mt-2">{t.optimizingData}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (cacheError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t.errorLoadingData}
          </h1>
          <p className="text-gray-600 mb-4">{cacheError}</p>
          <Button onClick={loadData}>{t.retry}</Button>
        </div>
      </div>
    );
  }

  if (!location || location.lat == null || location.lng == null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>{t.loadingMap}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo upds verde.png"
                alt="Logotipo"
                width={120}
                height={40}
                className="object-contain h-auto w-auto max-h-10"
                priority
              />
              <Image
                src="/Logotipo 3 verde.png"
                alt="Logotipo"
                width={120}
                height={40}
                className="object-contain h-auto w-auto max-h-10"
                priority
              />
              <span className="text-xl font-bold text-green-700">
                {t.title}
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
              </Button>

              <Button
                onClick={refreshData}
                size="sm"
                variant="outline"
                disabled={cacheLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    cacheLoading ? "animate-spin" : ""
                  }`}
                />
              </Button>

              <div className="hidden md:block">
                <LanguageSelector variant="desktop" isScrolled={true} />
              </div>

              {permission === "denied" && (
                <Button
                  onClick={requestLocation}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {t.allowLocation}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar with filters and results */}
        <div
          className={`w-full md:w-96 bg-white border-r overflow-y-auto ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{t.explore}</h1>
              {showFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="md:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.searchPlaceholder}
                value={filters.searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.category}
              </label>
              <Select
                value={filters.selectedCategory}
                onValueChange={updateCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2 bg-gray-400" />
                      {t.allCategories}
                    </div>
                  </SelectItem>
                  {cacheData?.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">
                          {categoryIcons[category.name] || "📍"}
                        </span>
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{
                            backgroundColor:
                              categoryColors[category.name] || "#6B7280",
                          }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Municipality Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.municipality}
              </label>
              <Select
                value={filters.selectedMunicipality}
                onValueChange={updateMunicipality}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.allMunicipalities} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">{t.allMunicipalities}</SelectItem>
                  {cacheData?.municipalities.map((municipality) => (
                    <SelectItem
                      key={municipality.name}
                      value={municipality.name}
                    >
                      {municipality.name} ({municipality.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Radius Filter */}
            {permission === "granted" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.searchRadius}: {filters.radiusFilter[0]} {t.km}
                </label>
                <Slider
                  value={filters.radiusFilter}
                  onValueChange={updateRadius}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            )}

            {/* Sort Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.sortBy}
              </label>
              <div className="flex gap-2">
                <Button
                  variant={
                    sortOptions.field === "rating" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => updateSort("rating")}
                  className="flex-1"
                >
                  <Star className="w-4 h-4 mr-1" />
                  {t.rating}
                  {sortOptions.field === "rating" && (
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  )}
                </Button>
                <Button
                  variant={sortOptions.field === "name" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSort("name")}
                  className="flex-1"
                >
                  {t.name}
                  {sortOptions.field === "name" && (
                    <ArrowUpDown className="w-3 h-3 ml-1" />
                  )}
                </Button>
                {permission === "granted" && (
                  <Button
                    variant={
                      sortOptions.field === "distance" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateSort("distance")}
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    {t.distance}
                    {sortOptions.field === "distance" && (
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {filteredCount} {t.of} {totalCount} lugares
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                {t.clearFilters}
              </Button>
            </div>
          </div>

          {/* Results List */}
          <div className="p-4 space-y-4">
            {filteredPlaces.map((place) => {
              const primaryCategory = getPrimaryCategory(place);
              const categoryIcon = primaryCategory
                ? categoryIcons[primaryCategory.name]
                : "📍";

              return (
                <Link
                  key={place.id}
                  href={`/place/${place.id}`}
                  onClick={() => handlePlaceClick(place, "detail_view")}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPlace?.id === place.id
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                    onClick={() => handlePlaceSelect(place)}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-3">
                        <div className="relative">
                          <img
                            src={getMainImage(place) || "/placeholder.svg"}
                            alt={place.commercial_name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                            <span className="text-lg">{categoryIcon}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {place.commercial_name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {place.description}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                {place.rating_avg?.toFixed(1) || t.na}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {place.municipality}
                              </div>
                              {permission === "granted" &&
                                place.distance !== undefined && (
                                  <div className="flex items-center">
                                    <Navigation className="w-3 h-3 mr-1" />
                                    {place.distance.toFixed(1)} {t.km}
                                  </div>
                                )}
                            </div>

                            {primaryCategory && (
                              <Badge
                                style={{
                                  backgroundColor:
                                    categoryColors[primaryCategory.name] ||
                                    "#6B7280",
                                }}
                                className="text-white text-xs flex items-center gap-1"
                              >
                                <span>{categoryIcon}</span>
                                {primaryCategory.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}

            {filteredPlaces.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t.noResults}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-2"
                >
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div
          className={`flex-1 relative ${
            showFilters ? "hidden md:block" : "block"
          }`}
        >
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* User location marker */}
            {permission === "granted" && (
              <>
                <Marker
                  position={[location.lat, location.lng]}
                  icon={createCustomMarkerIcon(
                    "user-location",
                    "#196f3d",
                    false,
                    t.yourLocation
                  )}
                  interactive={false}
                />
                <Circle
                  center={[location.lat, location.lng]}
                  radius={filters.radiusFilter[0] * 1000}
                  pathOptions={{
                    color: "blue",
                    fillColor: "blue",
                    fillOpacity: 0.1,
                  }}
                />
              </>
            )}

            {/* Place markers - CORREGIDO */}
            {filteredPlaces
              .filter(
                (place) => place.latitude != null && place.longitude != null
              ) // ✅ AQUI ESTÁ LA CORRECCIÓN
              .map((place) => {
                const primaryCategory = getPrimaryCategory(place);
                const categoryColor = primaryCategory
                  ? categoryColors[primaryCategory.name] || "#6B7280"
                  : "#6B7280";
                const categoryName = primaryCategory?.name || "default";
                const isSelected = selectedPlace?.id === place.id;

                return (
                  <Marker
                    key={place.id}
                    position={[place.latitude, place.longitude]}
                    icon={createCustomMarkerIcon(
                      categoryName,
                      categoryColor,
                      isSelected
                    )}
                    eventHandlers={{
                      click: () => {
                        handlePlaceSelect(place);
                      },
                      popupclose: () => {
                        if (selectedPlace?.id === place.id) {
                          setSelectedPlace(null);
                        }
                      },
                    }}
                  >
                    <Popup
                      closeOnEscapeKey={true}
                      closeOnClick={false}
                      autoClose={true}
                      autoPan={true}
                      className="custom-popup"
                    >
                      <div className="w-64">
                        <div className="relative mb-2">
                          <img
                            src={getMainImage(place) || "/placeholder.svg"}
                            alt={place.commercial_name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                            <span className="text-xl">
                              {categoryIcons[categoryName] || "📍"}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {place.commercial_name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {place.description}
                        </p>
                        <div className="flex items-center justify-between text-sm mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {place.rating_avg?.toFixed(1) || t.na}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-500 mr-1" />
                            {place.schedules || "Ver horarios"}
                          </div>
                        </div>
                        <Link
                          href={`/place/${place.id}`}
                          onClick={() =>
                            handlePlaceClick(place, "popup_detail")
                          }
                        >
                          <Button
                            size="sm"
                            className="w-full text-white flex items-center gap-2"
                            style={{ backgroundColor: categoryColor }}
                          >
                            <span>{categoryIcons[categoryName] || "📍"}</span>
                            {t.viewDetails}
                          </Button>
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>

          {/* Cache Status Indicator */}
          {cacheLoading && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin text-green-600" />
              <span className="text-sm text-gray-600">{t.optimizingData}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
