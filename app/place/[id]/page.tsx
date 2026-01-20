"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  MapPin,
  Globe,
  Camera,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  getPlaceById,
  recordPlaceView,
  recordPlaceClick,
  submitPlaceRating,
} from "@/lib/database";
import { useLanguage } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import type { PlaceWithDetails } from "@/lib/supabase";
import "leaflet/dist/leaflet.css";

// Dynamically import map components
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

// Category colors mapping
const categoryColors: { [key: string]: string } = {
  "Turismo arquitectónico": "#8B4513",
  "Turismo de naturaleza": "#228B22",
  "Turismo de entretenimiento": "#FF4500",
  "Turismo de negocios": "#1E3A8A",
  "Turismo gastronómico": "#DC143C",
  Hotelería: "#DAA520",
};

export default function PlaceDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const placeId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [place, setPlace] = useState<PlaceWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // Generate session ID for analytics
  const sessionId = useRef(
    typeof window !== "undefined"
      ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : ""
  );

  useEffect(() => {
    async function loadPlace() {
      if (!placeId) return;

      try {
        setLoading(true);
        const placeData = await getPlaceById(placeId);
        setPlace(placeData);

        // Record place view
        if (placeData) {
          await recordPlaceView(placeData.id, sessionId.current);
        }
      } catch (error) {
        console.error("Error loading place:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPlace();
  }, [placeId]);

  // Handle rating submission
  const handleRating = async (rating: number) => {
    if (!place || hasRated) return;

    setUserRating(rating);
    const success = await submitPlaceRating(
      place.id,
      rating,
      sessionId.current
    );
    if (success) {
      setHasRated(true);
      // Record click for rating
      await recordPlaceClick(place.id, "rating", sessionId.current);
    }
  };

  // Handle social media clicks
  const handleSocialClick = async (platform: string, url: string) => {
    if (!place) return;
    await recordPlaceClick(place.id, `social_${platform}`, sessionId.current);
    window.open(url, "_blank");
  };

  // Handle contact clicks
  const handleContactClick = async (type: string) => {
    if (!place) return;
    await recordPlaceClick(place.id, `contact_${type}`, sessionId.current);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">{t.errorLoadingPlace}</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t.placeNotFound}
          </h1>
          <Link href="/explore">
            <Button>{t.backToMap}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryCategory = place.categories?.[0];
  const categoryColor = primaryCategory
    ? categoryColors[primaryCategory.name] || "#6B7280"
    : "#6B7280";
  const socialMedia = place.social_media?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/explore">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.backToMap}
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo upds verde.png"
                  alt="Otro Logotipo"
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
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden md:block">
                <LanguageSelector variant="desktop" isScrolled={true} />
              </div>
              {socialMedia?.website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSocialClick("website", socialMedia.website!)
                  }
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {t.website}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={
              place.images?.[selectedImage]?.url ||
              place.images?.find((img) => img.is_main)?.url ||
              "/placeholder.svg?height=400&width=800" ||
              "/placeholder.svg"
            }
            alt={place.commercial_name}
            fill
            className="object-cover w-full h-full transition-all duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            style={{
              background: "#f3f4f6",
              objectPosition: "center center",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />

        {/* Category Badge */}
        {primaryCategory && (
          <div className="absolute top-4 left-4">
            <Badge
              className="text-white text-sm px-3 py-1"
              style={{ backgroundColor: categoryColor }}
            >
              {primaryCategory.name}
            </Badge>
          </div>
        )}

        {/* Gallery Navigation */}
        {place.images && place.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {place.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === selectedImage ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Photo Count */}
        {place.images && place.images.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
            <Camera className="w-4 h-4 mr-1" />
            {place.images.length} {t.photos}
          </div>
        )}
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {place.commercial_name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">
                    {place.rating_avg?.toFixed(1) || t.na}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{place.municipality}</span>
                </div>
              </div>

              {/* User Rating */}
              {!hasRated && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{t.ratePlace}</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRating(rating)}
                        className="text-2xl text-gray-300 hover:text-yellow-500 transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            userRating >= rating
                              ? "text-yellow-500 fill-current"
                              : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasRated && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 text-sm">{t.thanksForRating}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">{t.description}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {place.description}
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            {place.categories && place.categories.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">{t.categories}</h2>
                  <div className="flex flex-wrap gap-2">
                    {place.categories.map((category) => (
                      <Badge
                        key={category.id}
                        style={{
                          backgroundColor:
                            categoryColors[category.name] || "#6B7280",
                        }}
                        className="text-white"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tourism Types */}
            {place.tourism_types && place.tourism_types.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">
                    Tipos de Turismo
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {place.tourism_types.map((type) => (
                      <Badge key={type.id} variant="outline">
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">{t.location}</h2>
                <div className="h-64 rounded-lg overflow-hidden">
                  <MapContainer
                    center={[place.latitude, place.longitude]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[place.latitude, place.longitude]}>
                      <Popup>{place.commercial_name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{place.location}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Información</h2>
                <div className="space-y-3">
                  {place.schedules && (
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">{t.schedules}</p>
                        <p className="text-sm text-gray-600">
                          {place.schedules}
                        </p>
                      </div>
                    </div>
                  )}

                  {/*{place.price && (
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">{t.price}</p>
                        <p className="text-sm text-gray-600">{place.price}</p>
                      </div>
                    </div>
                  )}*/}

                  {place.access && (
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">{t.access}</p>
                        <p className="text-sm text-gray-600">{place.access}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">{t.location}</p>
                      <p className="text-sm text-gray-600">{place.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {socialMedia && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {t.socialMedia}
                  </h2>
                  <div className="space-y-3">
                    {socialMedia.website && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleSocialClick("website", socialMedia.website!)
                        }
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {t.website}
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Button>
                    )}

                    {socialMedia.facebook && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleSocialClick("facebook", socialMedia.facebook!)
                        }
                      >
                        <div className="w-4 h-4 mr-2 bg-blue-600 rounded" />
                        Facebook
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Button>
                    )}

                    {socialMedia.instagram && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleSocialClick("instagram", socialMedia.instagram!)
                        }
                      >
                        <div className="w-4 h-4 mr-2 bg-pink-600 rounded" />
                        Instagram
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Button>
                    )}

                    {socialMedia.tiktok && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() =>
                          handleSocialClick("tiktok", socialMedia.tiktok!)
                        }
                      >
                        <div className="w-4 h-4 mr-2 bg-black rounded" />
                        TikTok
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              

              {place.map_url && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleContactClick("external_map");
                    window.open(place.map_url!, "_blank");
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.openInGoogleMaps}
                </Button>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {place.images && place.images.length > 1 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{t.gallery}</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {place.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden ${
                          selectedImage === index ? "ring-2 ring-green-500" : ""
                        }`}
                      >
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={
                            image.alt_text ||
                            `${place.commercial_name} ${index + 1}`
                          }
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
