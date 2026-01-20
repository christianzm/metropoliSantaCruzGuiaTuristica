"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {MapPin,Star,Search,Menu,X,ArrowLeft,ArrowRight,} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDataCache } from "@/lib/cache";
import { useFeaturedPlaces } from "@/hooks/use-featured-places";
import { useLanguage } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import type { PlaceWithDetails } from "@/lib/supabase";
import { Sun, Cloudy, Plane, BookImage, Car, NotebookPen } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const heroImages = [
  {
    src: "https://dsavplsjsnonyvaqhdsq.supabase.co/storage/v1/object/public/turismo/TURISMO_NATURALEZA/Laguna%20Guapilo%20PH%20Carlojvlog%20EDIT-0.jpg",
    alt: "Plaza 24 de Septiembre",
    title: "Plaza Principal",
    description: "Corazón histórico de Santa Cruz",
  },
  {
    src: "/images/catedral_scz.jpg",
    alt: "Catedral Metropolitana",
    title: "Catedral Metropolitana",
    description: "Arquitectura colonial en el centro",
  },
  {
    src: "https://dsavplsjsnonyvaqhdsq.supabase.co/storage/v1/object/public/turismo/TURISMO_NATURALEZA/COLPA%20CARANDA-1.jpg",
    alt: "Biocentro Güembé",
    title: "Biocentro Güembé",
    description: "Naturaleza y aventura",
  },
];

// Category colors mapping
const categoryColors: { [key: string]: string } = {
  "Turismo arquitectónico": "#8B4513",
  "Turismo de naturaleza": "#228B22",
  "Turismo de entretenimiento": "#FF4500",
  "Turismo de negocios": "#1E3A8A",
  "Turismo gastronómico": "#DC143C",
  Hotelería: "#DAA520",
};

const categoryIcons: { [key: string]: string } = {
  "Turismo arquitectónico": "🏛️",
  "Turismo de naturaleza": "🌿",
  "Turismo de entretenimiento": "🎪",
  "Turismo de negocios": "💼",
  "Turismo gastronómico": "🍽️",
  Hotelería: "🏨",
};
// --- INICIO: WIDGET DE CLIMA (Sin cambios) ---
// --- Coordenadas de municipios ---
const municipalityCoords: Record<string, { lat: number; lon: number }> = {
  "Santa Cruz": { lat: -17.784, lon: -63.182 },
  "La Guardia": { lat: -17.9833, lon: -63.3167 },
  Porongo: { lat: -17.8333, lon: -63.3333 },
  Cotoca: { lat: -17.8167, lon: -63.0167 },
  Warnes: { lat: -17.5167, lon: -63.1667 },
  "El Torno": { lat: -17.9667, lon: -63.3833 },
  "Colpa Bélgica": { lat: -17.5, lon: -63.1667 },
  Montero: { lat: -17.3333, lon: -63.25 },
  Pailón: { lat: -17.65, lon: -62.7333 },
  Portachuelo: { lat: -17.35, lon: -63.3833 },
  Okinawa: { lat: -17.4167, lon: -63.2 },
  "Buena Vista": { lat: -17.45, lon: -63.6667 },
};

// --- Lista de municipios ---
const weatherMunicipalities = Object.keys(municipalityCoords);
// --- API: Open Meteo ---
async function climagblvFetchWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en la respuesta de la API");
  const data = await res.json();
  if (!data.current_weather || !data.daily)
    throw new Error("No se encontraron datos del clima");
  return data;
}

// --- Componente principal ---
export function WeatherWidget() {
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    weatherMunicipalities[0]
  );
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const { lat, lon } = municipalityCoords[selectedMunicipality];
        const data = await climagblvFetchWeather(lat, lon);

        const forecast = data.daily.time.map((date: string, index: number) => ({
          day: new Date(date).toLocaleDateString("es-ES", { weekday: "short" }),
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
          icon: <Sun className="w-6 h-6 text-yellow-300" />,
        }));

        setWeatherData({
          current: data.current_weather.temperature,
          main: {
            temp_max: data.daily.temperature_2m_max[0],
            temp_min: data.daily.temperature_2m_min[0],
          },
          forecast,
        });
      } catch (error) {
        console.error(error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedMunicipality]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl p-4 text-white max-w-2xl w-full mx-auto"
      style={{
        background:
          "url('https://dsavplsjsnonyvaqhdsq.supabase.co/storage/v1/object/public/turismo/TURISMO_NATURALEZA/Laguna%20Guapilo%20PH%20Carlojvlog%20EDIT-0.jpg') no-repeat center center/cover",
      }}
    >
      <div className="absolute inset-0 bg-sky-800/60 backdrop-blur-sm"></div>

      <div className="relative z-10 text-sm">
        <h3 className="text-lg font-bold mb-2">El tiempo en Santa Cruz</h3>

        <select
          value={selectedMunicipality}
          onChange={(e) => setSelectedMunicipality(e.target.value)}
          className="w-full p-1.5 rounded-lg bg-white/20 text-white border-none focus:ring-2 focus:ring-yellow-400 outline-none mb-3 appearance-none text-center text-sm"
          style={{
            background:
              'url(\'data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>\') no-repeat 95% 50%',
            backgroundSize: "18px",
          }}
        >
          {weatherMunicipalities.map((mun) => (
            <option key={mun} value={mun} className="text-black">
              {mun}
            </option>
          ))}
        </select>

        <p className="mb-3 text-center">
          Hoy en: <span className="font-bold">{selectedMunicipality}</span>
        </p>

        {loading ? (
          <div className="text-center py-6 animate-pulse">
            Cargando clima...
          </div>
        ) : !weatherData ? (
          <div className="text-center py-6 text-red-300">
            No se pudo cargar el clima.
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="text-xs opacity-80">Temperatura actual</p>
              <p className="text-5xl font-bold">
                {Math.round(weatherData.current)}°
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center mb-4">
              <div className="text-center">
                <p className="text-xs opacity-90">Máx.</p>
                <p className="text-3xl font-bold">
                  {Math.round(weatherData.main.temp_max)}°
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs opacity-90">Mín.</p>
                <p className="text-3xl font-bold">
                  {Math.round(weatherData.main.temp_min)}°
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              {weatherData.forecast.map((day: any, index: number) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-md p-1 flex flex-col items-center space-y-0.5"
                >
                  <span className="font-semibold uppercase">{day.day}</span>
                  {day.icon}
                  <span className="font-semibold">{Math.round(day.max)}°</span>
                  <span className="opacity-70">{Math.round(day.min)}°</span>
                </div>
              ))}
            </div>
          </>
        )}

        <a
          href="#"
          className="mt-4 inline-block text-xs hover:underline opacity-80 hover:opacity-100 transition-opacity text-center w-full"
        >
          Más información sobre el clima
        </a>
      </div>
    </div>
  );
}
// --- FIN: WIDGET DE CLIMA ---

// --- INICIO: NUEVO COMPONENTE DE BOTONES DE ACCIÓN ---
function ActionButtons() {
  const actions = [
    {
      label: "COMO LLEGAR",
      icon: (
        <Plane className="w-9 h-9 text-gray-700 group-hover:animate-bounce transition-colors" />
      ),
      href: "/comollegar",
    },
    {
      label: "FOLLETOS",
      icon: (
        <BookImage className="w-9 h-9 text-gray-700 group-hover:animate-bounce transition-colors" />
      ),
      href: "/folleto",
    },
    {
      label: "COMO MOVERSE",
      icon: (
        <Car className="w-9 h-9 text-gray-700 group-hover:animate-bounce transition-colors" />
      ),
      href: "/comomoverse",
    },
    {
      label: "INFORMACION PRACTICA",
      icon: (
        <NotebookPen className="w-9 h-9 text-gray-700 group-hover:animate-bounce transition-colors" />
      ), 
      href: "/infopractica",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:gap-8">
      {actions.map((action, index) => (
        <a
          key={index}
          href={action.href}
          className="flex flex-col items-center justify-center text-center group"
        >
          <div
            className="
              bg-amber-100/80
              rounded-2xl
              p-5
              mb-3
              transition
              duration-300
              group-hover:bg-amber-400
              group-hover:shadow-[0_0_20px_5px_rgba(251,191,36,0.5)]
              group-hover:scale-110
              flex
              items-center
              justify-center
            "
          >
            <span className="transition-colors duration-300">
              {action.icon}
            </span>
          </div>
          <p className="font-bold text-gray-800 text-sm md:text-base group-hover:text-amber-700 transition-colors duration-300">
            {action.label}
          </p>
        </a>
      ))}
    </div>
  );
}

// --- FIN: NUEVO COMPONENTE DE BOTONES DE ACCIÓN ---
export default function HomePage() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHero, setCurrentHero] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  // Use cache hook
  const { data: cacheData, loading, loadData } = useDataCache();

  // Get featured places using the new hook
  const featuredPlaces = useFeaturedPlaces(cacheData?.places || []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load data on mount
  useEffect(() => {
    if (!cacheData) {
      loadData();
    }
  }, [cacheData, loadData]);

  // Get main image for a place
  const getMainImage = (place: PlaceWithDetails) => {
    const mainImage = place.images?.find((img) => img.is_main);
    return mainImage?.url || "/placeholder.svg?height=300&width=400";
  };

  // Get primary category for a place
  const getPrimaryCategory = (place: PlaceWithDetails) => {
    return place.categories?.[0]?.name || "Sin categoría";
  };

  if (loading && !cacheData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">{t.loadingPlaces}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Transparent initially, solid on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src={isScrolled ? "/logo upds verde.png" : "/logo upds.png"}
                  alt="Turismo Metropolitano Logo"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src={
                    isScrolled
                      ? "/Logotipo 3 verde.png"
                      : "/Logotipo 3 blanco.png"
                  }
                  alt="Turismo Metropolitano Logo"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                />
              </div>
              <span
                className={`text-xl font-bold transition-colors ${
                  isScrolled ? "text-green-700" : "text-white"
                }`}
              >
                {t.title}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                {t.home}
              </Link>
              <Link
                href="/explore"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                {t.explore}
              </Link>
              <Link
                href="#featured"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                {t.featured}
              </Link>
              <Link
                href="#categories"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                {t.categories}
              </Link>
              <Link
                href="/infosantacruz"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-white"
                }`}
              >
                Rincones para Disfrutar
              </Link>
            </nav>

            {/* Desktop Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector variant="desktop" isScrolled={isScrolled} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
              <nav className="flex flex-col py-4">
                <Link
                  href="/"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  {t.home}
                </Link>
                <Link
                  href="/explore"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  {t.explore}
                </Link>
                <Link
                  href="#featured"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  {t.featured}
                </Link>
                <Link
                  href="#categories"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  {t.categories}
                </Link>
                <Link
                  href="/infosantacruz"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  Santa Cruz
                </Link>

                <Link
                  href="/entretenimiento"
                  className="py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  Rincones para Disfrutar
                </Link>
              </nav>

              {/* Mobile Language Selector */}
              <LanguageSelector variant="mobile" />
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Full screen */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentHero
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl w-full">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-in-left leading-tight">
                {t.santaCruz}
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 opacity-90 animate-slide-in-right animation-delay-300 font-light">
                {t.heroText}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center animate-fade-in animation-delay-900 max-w-md sm:max-w-none mx-auto">
              <Link href="/explore" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl transform hover:scale-105 transition-all duration-200 w-full shadow-2xl"
                >
                  <Search className="w-5 md:w-6 h-5 md:h-6 mr-3" />
                  {t.exploreNow}
                </Button>
              </Link>
              <Link href="#featured" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white hover:text-gray-900 px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl transform hover:scale-105 transition-all duration-200 w-full backdrop-blur-sm shadow-2xl"
                >
                  {t.topPlaces}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === currentHero
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentHero(
              (prev) => (prev - 1 + heroImages.length) % heroImages.length
            )
          }
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={() =>
            setCurrentHero((prev) => (prev + 1) % heroImages.length)
          }
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Tourism Guide Section - Complete */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
            {/* Left Side - Green Instructions */}
            <div className="bg-green-600 text-white p-8 md:p-12 flex flex-col justify-center">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {t.instructions}
                  <br />
                  {t.readGuide}
                </h2>

                {/* Wavy line decoration */}
                <div className="flex justify-center mb-6">
                  <svg
                    width="200"
                    height="20"
                    viewBox="0 0 200 20"
                    className="text-yellow-400"
                  >
                    <path
                      d="M0 10 Q50 0 100 10 T200 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {t.touristGuide}
                </h3>
                <p className="text-xl md:text-2xl mb-2">{t.santaCruz}</p>
                <p className="text-xl md:text-2xl text-yellow-400 font-bold mb-8">
                  {t.metropolitan}
                </p>

                {/* Tourism Guide Books Image */}
                <div className="flex justify-center">
                  <Link href="/folleto">
                    <div className="relative w-64 h-48 cursor-pointer">
                      <Image
                        src="/images/tourism-guide-books.jpg"
                        alt="Guías Turísticas Santa Cruz"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - White Information */}
            <div className="bg-white p-8 md:p-12">
              {/* Municipalities Section */}
              <div className="mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {t.knowMunicipalities}
                </h3>
                <div className="w-16 h-1 bg-green-600 mb-4"></div>
                <p className="text-gray-600 mb-6">{t.distanceFrom}</p>

                <div className="grid grid-cols-1 gap-3 mb-6">
                  {[
                    { number: 1, name: "La Guardia", distance: "17 Km" },
                    { number: 2, name: "Porongo", distance: "19 Km" },
                    { number: 3, name: "Cotoca", distance: "20 Km" },
                    { number: 4, name: "Warnes", distance: "27 Km" },
                    { number: 5, name: "El Torno", distance: "36 Km" },
                    { number: 6, name: "Colpa Bélgica", distance: "39 Km" },
                    { number: 7, name: "Montero", distance: "52 Km" },
                    { number: 8, name: "Pailón", distance: "53 Km" },
                    { number: 9, name: "Portachuelo", distance: "72 Km" },
                    { number: 10, name: "Okinawa", distance: "85 Km" },
                    { number: 11, name: "Buena Vista", distance: "105 Km" },
                  ].map((municipality) => (
                    <div
                      key={municipality.number}
                      className="flex items-center text-sm"
                    >
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs mr-3">
                        {municipality.number}
                      </div>
                      <span className="flex-1 text-gray-700">
                        {municipality.name}
                      </span>
                      <span className="font-bold text-green-600">
                        {municipality.distance}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mapa interactivo con ícono y texto */}
                <div
                  className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-8 cursor-pointer relative overflow-hidden group"
                  onClick={() => setShowMapModal(true)}
                >
                  {/* Imagen de fondo con opacidad al pasar el mouse */}
                  <Image
                    src="/mapa.jpg"
                    alt="Mapa de los municipios"
                    fill
                    className="object-cover  group-hover:opacity-60 transition-opacity duration-300"
                  />

                  {/* Contenido centrado: ícono + texto */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                    <MapPin className="w-8 h-8 mb-2 text-black font-bold drop-shadow-[0_0_3px_white] [text-shadow:2px_2px_0_white,0_2px_0_white,-2px_0_0_white,0_-2px_0_white]" />
                    <p className="text-sm font-extrabold text-black drop-shadow-[0_0_3px_white] [text-shadow:2px_2px_0_white,0_2px_0_white,-2px_0_0_white,0_-2px_0_white]">
                      {t.municipalitiesMap}
                    </p>
                  </div>
                </div>

                {/* Modal para mostrar la imagen ampliada */}
                {showMapModal && (
                  <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                    onClick={() => setShowMapModal(false)}
                  >
                    <div
                      className="relative max-w-3xl w-full p-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200"
                        onClick={() => setShowMapModal(false)}
                        aria-label="Cerrar"
                      >
                        <X className="w-6 h-6 text-gray-700" />
                      </button>
                      <Image
                        src="/mapa.jpg"
                        alt="Mapa de municipios ampliado"
                        width={900}
                        height={600}
                        className="w-full h-auto rounded-lg shadow-lg object-contain"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Section LUEGO CORREGIR*/}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {t.categoryColors}
                </h3>
                <div className="w-16 h-1 bg-green-600 mb-6"></div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {cacheData?.categories?.map((category) => {
                    const slug = category.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s+/g, "-");

                    return (
                      <Link
                        key={category.id}
                        href={`/explore?category=${slug}`}
                        className="text-center block"
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg mb-2 mx-auto shadow-lg transition-transform hover:scale-110"
                          style={{
                            backgroundColor:
                              categoryColors[category.name] || "#6B7280",
                          }}
                        >
                          {categoryIcons[category.name] || "📍"}
                        </div>
                        <p className="text-xs text-gray-600 leading-tight">
                          {category.name}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Action Icons Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {t.clickIcons}
                </h3>
                <div className="w-16 h-1 bg-green-600 mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location Icon */}
                  <Link
                    href="/explore"
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 group-hover:text-green-700 transition-colors">
                      {t.clickLocation}
                    </p>
                  </Link>

                  {/* Social Media Icons */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">🌐</span>
                      </div>
                      <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">@</span>
                      </div>
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{t.clickSocial}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white pt-4 px-4 text-center">
        <TypeAnimation
          sequence={["Planifica tu viaje", 1500]}
          wrapper="p"
          className="text-3xl md:text-4xl font-bold font-serif text-emerald-700 mb-1"
          speed={1}
          repeat={0}
          style={{ display: "block" }}
        />
        <TypeAnimation
          sequence={["Toda la información útil que necesitas", 1500]}
          wrapper="p"
          className="text-lg md:text-xl font-medium text-gray-800 mb-1"
          speed={1}
          repeat={0}
          style={{ display: "block" }}
        />
      </div>

      {/* Weather Widget and Action Buttons Section - Complete */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* El widget del clima ocupa la primera columna */}
            <WeatherWidget />

            {/* El nuevo componente de botones ocupa la segunda columna */}
            <ActionButtons />
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section id="featured" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.featured}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.discoverPlaces} {cacheData?.places?.length || 0} lugares
              increíbles de Santa Cruz de la Sierra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPlaces.map((place) => (
              <Link key={place.id} href={`/place/${place.id}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <div className="relative h-56">
                    <Image
                      src={getMainImage(place) || "/placeholder.svg"}
                      alt={place.commercial_name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1">
                      {getPrimaryCategory(place)}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-green-600 transition-colors">
                      {place.commercial_name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {place.rating_avg?.toFixed(1) || t.na}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {place.municipality}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {featuredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay lugares destacados disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.categories}
            </h2>
            <p className="text-xl text-gray-600">
              Explora Santa Cruz por categorías de turismo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {cacheData?.categories?.map((category) => {
              // Genera el slug igual que en explores
              const slug = category.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-");

              return (
                <Link
                  key={category.id}
                  href={`/explore?category=${slug}`}
                  className="text-center group cursor-pointer block"
                >
                  <div
                    className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl"
                    style={{
                      backgroundColor:
                        categoryColors[category.name] || "#6B7280",
                    }}
                  >
                    {categoryIcons[category.name] || "📍"}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>

          {(!cacheData?.categories || cacheData.categories.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No hay categorías disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.readyToExplore}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t.discoverPlaces} {cacheData?.places?.length || 0} lugares
            increíbles en {cacheData?.municipalities?.length || 0} municipios
          </p>
          <Link href="/explore">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <MapPin className="w-6 h-6 mr-3" />
              {t.exploreOnMap}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Logotipo 3 blanco.png"
                    alt="Turismo Metropolitano Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">{t.title}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">{t.completeGuide}</p>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">{t.links}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    {t.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explore"
                    className="hover:text-white transition-colors"
                  >
                    {t.explore}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#featured"
                    className="hover:text-white transition-colors"
                  >
                    {t.featured}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#categories"
                    className="hover:text-white transition-colors"
                  >
                    {t.categories}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">{t.municipalities}</h3>
              <ul className="space-y-3 text-gray-400">
                {cacheData?.municipalities?.slice(0, 4).map((municipality) => (
                  <li key={municipality.name}>
                    {municipality.name} ({municipality.count})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">{t.statistics}</h3>
              <div className="space-y-3 text-gray-400">
                <p>
                  {cacheData?.places?.length || 0} {t.touristicPlaces}
                </p>
                <p>
                  {cacheData?.categories?.length || 0}{" "}
                  {t.categories.toLowerCase()}
                </p>
                <p>
                  {cacheData?.municipalities?.length || 0}{" "}
                  {t.municipalities.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Turismo Metropolitano. {t.allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
