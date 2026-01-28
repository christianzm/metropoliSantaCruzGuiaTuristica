"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Leaf,
  Maximize,
  XCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";

const FaunaPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const carouselRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const t = {
    links: "Enlaces",
    home: "Inicio",
    explore: "Explorar",
    featured: "Destacados",
    categories: "Categorías",
  };

  // Datos de las secciones con IMÁGENES REALES AGREGADAS
  const sectionsData: Record<string, any> = {
    zoologico: {
      title: "Zoológico Municipal de Santa Cruz",
      description:
        "Fundado en 1979, el Zoológico Municipal de Santa Cruz alberga más de 500 animales de 150 especies diferentes, muchas de ellas nativas de la región. El zoológico se enfoca en la conservación de especies en peligro de extinción y en la educación ambiental.",
      image:
        "https://www.fundacionaquae.org/wp-content/uploads/2018/10/proteger-a-los-animales-1024x654.jpg",
      location: "Av. Noel Kempff Mercado, Santa Cruz de la Sierra",
      highlights:
        "jaguar, oso hormiguero gigante, paraba azul, monos capuchinos",
    },
    botanico: {
      title: "Jardín Botánico Municipal",
      description:
        "Este oasis verde en medio de la ciudad cuenta con 186 hectáreas dedicadas a la conservación de la flora regional y nacional. El jardín botánico alberga más de 4,000 especies de plantas, incluyendo una impresionante colección de orquídeas y cactus.",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000",
      location: "Kilómetro 8 1/2 carretera a Cotoca, Santa Cruz de la Sierra",
      highlights: "orquídeas, cactus, aves, mariposas, pequeños mamíferos",
    },
    lomas: {
      title: "Parque Regional Lomas de Arena",
      description:
        "A solo 17 km de Santa Cruz, este parque regional de 14,000 hectáreas combina dunas de arena, lagunas y bosques húmedos, creando un ecosistema único que alberga más de 300 especies de aves, reptiles y mamíferos.",
      image: "https://images.unsplash.com/photo-1504280509247-0310476f94f8?q=80&w=1000",
      location: "A 17 km al sur de Santa Cruz de la Sierra",
      highlights: "flamencos, garzas, monos capuchinos, zorros, reptiles",
    },
    arenal: {
      title: "Parque Arenal",
      description:
        "Este parque urbano es un pulmón verde en el corazón de la ciudad, con lagunas artificiales y senderos naturales donde se pueden observar diversas especies de aves acuáticas y pequeños mamíferos.",
      image: "https://live.staticflickr.com/3953/15537482869_0066b5791c_b.jpg",
      location: "Av Beni entre caballero y murillo, Santa Cruz de la Sierra",
      highlights: "aves acuáticas, patos, tortugas, iguanas, mariposas",
    },
    guembe: {
      title: "Parque Ecológico Güembé",
      description:
        "Un complejo ecoturístico que combina reserva natural con instalaciones recreativas. Alberga mariposario, aviario, senderos ecológicos y un centro de rescate de animales silvestres.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/32/30/1e/biocentro-guembe.jpg?w=1200&h=-1&s=1",
      location: "Camino a Porongo, Santa Cruz de la Sierra",
      highlights: "mariposario, aviario, monos, reptiles, piscinas naturales",
    },
    colpa: {
      title: "Colpa Caranda",
      description:
        "Un refugio natural donde cientos de guacamayos y loros se reúnen diariamente al amanecer para alimentarse de arcilla rica en minerales, creando un espectáculo natural único.",
      image: "https://images.unsplash.com/photo-1552071379-041b32707fed?q=80&w=1000",
      location: "Carretera Belgica, Santa Cruz de la Sierra",
      highlights: "guacamayos, loros, periquitos, tucanes",
    },
    curichi: {
      title: "Curichi La Madre",
      description:
        "El Curichi La Madre es un área protegida y reserva ecológica urbana que alberga una rica biodiversidad de flora y fauna. Es uno de los pocos humedales que aún se conservan dentro de la mancha urbana de Santa Cruz de la Sierra. Es ideal para caminatas ecológicas, avistamiento de aves y educación ambiental.",
      image: "https://images.unsplash.com/photo-1440342359726-e2bb38329507?q=80&w=1000",
      location:
        "Entre 4to Calle pejerrey y Av. El palmar Santa Cruz de la Sierra",
      highlights:
        "senderos ecológicos, avistamiento de aves, humedal urbano, mariposas, biodiversidad nativa",
    },
    laguna: {
      title: "Laguna Guapilo - Parque Urbano",
      description:
        "La Laguna Guapilo es un parque urbano con un pequeño cuerpo de agua rodeado de áreas verdes, ideal para el esparcimiento familiar, caminatas y observación de fauna urbana. Es un espacio de recreación y descanso para vecinos y visitantes, en medio de la ciudad.",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000",
      location: "Av. Guapilo, Santa Cruz de la Sierra",
      highlights:
        "laguna artificial, caminatas, zonas verdes, aves urbanas, juegos infantiles",
    },
    parqueecologico: {
      title: "Parque Ecológico Yvaga Guazú",
      description:
        "El Parque Ecológico Yvaga Guazú es un centro de interpretación ambiental y conservación, que ofrece recorridos educativos entre jardines botánicos, viveros, lagunas y espacios temáticos que promueven la conciencia ecológica. Es un lugar ideal para toda la familia y grupos escolares.",
      image: "https://images.unsplash.com/photo-1596706173007-e85d8520743b?q=80&w=1000",
      location: "1/2 Km 12, Santa Cruz de la Sierra",
      highlights:
        "jardín botánico, vivero, senderos naturales, actividades educativas, lagunas, aves y mariposas",
    },
  };

  // Carousel data
  const carouselItems = [
    {
      title: "Parque Amboro",
      description:
        "Parque nacional de biodiversidad única donde se encuentran la Amazonía, los Andes y el Chaco. Ideal para el ecoturismo y la observación de fauna.",
      image: "https://images.unsplash.com/photo-1518182170546-0766aa6f1f50?q=80&w=1000",
    },
    {
      title: "La Rinconada",
      description:
        "Parque ecológico familiar cerca de Santa Cruz, conocido por sus jardines, la flor de loto gigante Victoria Amazónica y sus piscinas.",
      image: "https://images.unsplash.com/photo-1598555749603-9d10c0e21e05?q=80&w=1000",
    },
    {
      title: "Rio Selva",
      description:
        "Resort familiar con cabañas, piscinas y actividades recreativas ubicado en Warnes, ideal para escapadas de fin de semana.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000",
    },
  ];

  // Observador para animaciones de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Efecto para el scroll del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Efecto para el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Manejar el cambio de slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Navegar entre slides
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  // Abrir sección ampliada
  const openExpandedView = (sectionId: string) => {
    setExpandedSection(sectionId);
    document.body.style.overflow = "hidden";
  };

  // Cerrar sección ampliada
  const closeExpandedView = () => {
    setExpandedSection(null);
    document.body.style.overflow = "auto";
  };

  // Helper para generar link de mapas
  const getMapLink = (query: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query + " Santa Cruz")}`;
  };

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 select-none hover:opacity-80 transition"
          >
            <img
              src="/logo upds verde.png"
              alt="Logo UPDS"
              className="w-10 h-10 object-contain"
            />
            <img
              src="/Logotipo 3 verde.png"
              alt="Turismo Metropolitano Logo"
              className="w-10 h-10 object-contain"
            />
            <span className={`font-bold text-2xl ${isScrolled ? "text-green-700" : "text-white shadow-sm"}`}>
              Turismo Metropolitano
            </span>
          </Link>

          <div className="hidden md:flex justify-center">
            <div className={`flex gap-8 items-center ${isScrolled ? "text-gray-700" : "text-white"}`}>
              <Link
                href="/"
                className="hover:text-green-400 transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className="hover:text-green-400 transition-colors font-medium"
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className="hover:text-green-400 transition-colors font-medium"
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className="hover:text-green-400 transition-colors font-medium"
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-white/20"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-green-700" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-green-700" : "text-white"}`} />
              )}
            </button>
          </div>

          <div className="hidden md:block" />
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 absolute top-full left-0 w-full shadow-lg">
            <div className="flex flex-col items-start gap-4 pt-4">
              <Link
                href="/"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="#explorar"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className="hover:text-green-700 transition font-medium"
              >
                Santa Cruz
              </Link>

              <Link
                href="/entretenimiento"
                className="hover:text-green-700 transition font-medium"
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* PORTADA HERO - ERROR CORREGIDO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=1920" 
            alt="Portada Fauna" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-md">
            Fauna de Santa Cruz
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-200 drop-shadow-sm">
            Descubre la increíble biodiversidad de Santa Cruz de la Sierra
          </p>
          <div className="animate-fade-in animation-delay-400">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              onClick={() =>
                document
                  .getElementById("zoologico")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explorar
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN ZOOLÓGICO */}
      <section
        id="zoologico"
        className="py-16 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Zoológico Municipal de Santa Cruz
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un espacio dedicado a la conservación y educación sobre la fauna
              local
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("zoologico")}
            >
              {sectionsData.zoologico.image ? (
                <img
                  src={sectionsData.zoologico.image}
                  alt="Zoológico Municipal"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Sobre el Zoológico
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.zoologico.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Entre las especies más destacadas se encuentran el{" "}
                  {sectionsData.zoologico.highlights}.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.zoologico.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.zoologico.location}
                  </a>
                </div>
                <div className="relative w-full max-w-xl">
                  {/* BOTONES alineados a la izquierda */}
                  <div className="flex flex-wrap gap-3 items-start">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all"
                      onClick={() => setMostrarInfo(!mostrarInfo)}
                    >
                      {mostrarInfo ? "Ocultar Información" : "Ver Horarios"}
                    </button>

                    <button
                      className="border border-green-600 text-green-600 hover:bg-green-100 font-bold py-2 px-6 rounded-full transition-all"
                      onClick={() => openExpandedView("zoologico")}
                    >
                      Ver Ampliado
                    </button>
                  </div>

                  {/* CONTENIDO DESPLEGABLE ABSOLUTO */}
                  {mostrarInfo && (
                    <div className="mt-4 bg-green-50 border border-green-200 p-6 rounded-2xl shadow-md w-full animate-fade-in">
                      <h3 className="text-xl font-semibold text-green-800 mb-3">
                        Horarios de Atención
                      </h3>
                      <p className="mb-1">
                        <strong>Días de atención:</strong> Martes a Domingo
                      </p>
                      <p className="mb-3">
                        <strong>Horario:</strong> 9:00 AM - 5:00 PM
                      </p>

                      <h3 className="text-xl font-semibold text-green-800 mb-3">
                        Tarifas de Entrada
                      </h3>
                      <p className="mb-1">
                        <strong>Adultos:</strong> 15 Bs.
                      </p>
                      <p className="mb-0">
                        <strong>Niños:</strong> 5 Bs.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN JARDÍN BOTÁNICO */}
      <section id="botanico" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-2">
              <div
                className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
                onClick={() => openExpandedView("botanico")}
              >
                {sectionsData.botanico.image ? (
                  <img
                    src={sectionsData.botanico.image}
                    alt="Jardín Botánico"
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/80 p-3 rounded-full text-green-700">
                    <Maximize size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Jardín Botánico Municipal
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.botanico.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Además de su riqueza botánica, el jardín es hábitat de
                  numerosas especies de {sectionsData.botanico.highlights},
                  convirtiéndolo en un importante refugio de biodiversidad
                  urbana.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.botanico.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.botanico.location}
                  </a>
                </div>

                <div className="flex gap-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() =>
                      window.open(
                        getMapLink(sectionsData.botanico.title),
                        "_blank"
                      )
                    }
                  >
                    Conocer Rutas
                  </button>

                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("botanico")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECCIÓN CURICHI LA MADRE */}
      <section
        id="curichi"
        className="py-16 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("curichi")}
            >
              {sectionsData.curichi.image ? (
                <img
                  src={sectionsData.curichi.image}
                  alt="Curichi La Madre"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Curichi La Madre
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.curichi.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Entre las especies más destacadas se encuentran el{" "}
                  {sectionsData.curichi.highlights}.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.curichi.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.curichi.location}
                  </a>
                </div>

                <div className="relative w-full max-w-xl">
                  {/* BOTONES */}
                  <div className="flex flex-wrap gap-3 items-start">
                    <button
                      className="border border-green-600 text-green-600 hover:bg-green-100 font-bold py-2 px-6 rounded-full transition-all"
                      onClick={() => openExpandedView("curichi")}
                    >
                      Ver Ampliado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECCIÓN LAGUNA GUAPILO */}
      <section id="laguna" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Laguna Guapilo Parque Urbano
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un refugio natural en medio de la ciudad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Información - IZQUIERDA */}
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Refugio urbano de fauna
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.laguna.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Es un lugar ideal para la observación de{" "}
                  {sectionsData.laguna.highlights} en su hábitat natural dentro
                  del contexto urbano.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.laguna.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.laguna.location}
                  </a>
                </div>

                <div className="flex gap-3">
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("laguna")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>

            {/* Imagen - DERECHA */}
            <div
              className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("laguna")}
            >
              {sectionsData.laguna.image ? (
                <img
                  src={sectionsData.laguna.image}
                  alt="Laguna Guapilo"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PARQUE ECOLÓGICO YVAGA GUAZÚ */}
      <section
        id="parqueecologico"
        className="py-16 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Parque Ecológico Yvaga Guazú
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un espacio natural para la educación, la conservación y la
              conexión con la biodiversidad cruceña
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("parqueecologico")}
            >
              {sectionsData.parqueecologico.image ? (
                <img
                  src={sectionsData.parqueecologico.image}
                  alt="Parque Ecológico Yvaga Guazú"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Sobre el Parque
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.parqueecologico.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Entre las especies más destacadas se encuentran el{" "}
                  {sectionsData.parqueecologico.highlights}.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.parqueecologico.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.parqueecologico.location}
                  </a>
                </div>

                <div className="relative w-full max-w-xl">
                  {/* BOTONES */}
                  <div className="flex flex-wrap gap-3 items-start">
                    <button
                      className="border border-green-600 text-green-600 hover:bg-green-100 font-bold py-2 px-6 rounded-full transition-all"
                      onClick={() => openExpandedView("parqueecologico")}
                    >
                      Ver Ampliado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN LOMAS DE ARENA */}
      <section
        id="lomas"
        className="py-16 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Parque Regional Lomas de Arena
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un paisaje único donde el desierto se encuentra con la selva
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* INFORMACIÓN A LA IZQUIERDA */}
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Un oasis de biodiversidad
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.lomas.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Es especialmente conocido por ser el hogar de{" "}
                  {sectionsData.lomas.highlights}.
                </p>

                {/* Enlace a Google Maps con ícono */}
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.lomas.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.lomas.location}
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Observación de aves
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Senderismo
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Paseos en bote
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Fotografía
                  </span>
                </div>

                <div className="mt-6">
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("lomas")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>

            {/* IMAGEN A LA DERECHA */}
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group lg:order-last h-96"
              onClick={() => openExpandedView("lomas")}
            >
              {sectionsData.lomas.image ? (
                <img
                  src={sectionsData.lomas.image}
                  alt="Lomas de Arena"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PARQUE ARENAL */}
      <section id="arenal" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Parque Arenal
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un pulmón verde en el corazón de la ciudad
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("arenal")}
            >
              {sectionsData.arenal.image ? (
                <img
                  src={sectionsData.arenal.image}
                  alt="Parque Arenal"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Refugio urbano de fauna
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.arenal.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Es un lugar ideal para la observación de{" "}
                  {sectionsData.arenal.highlights} en su hábitat natural dentro
                  del contexto urbano.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.arenal.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.arenal.location}
                  </a>
                </div>

                <div className="flex gap-3">
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("arenal")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CARRUSEL AUTOMÁTICO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Reservas Naturales de Santa Cruz
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Descubre las áreas protegidas que conservan la biodiversidad
              cruceña
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px]">
            <div
              ref={carouselRef}
              className="h-full w-full relative transition-opacity duration-1000"
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Solo renderizar img si item.image NO está vacía ni undefined */}
                  {item.image && item.image.trim() !== "" ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
                    <p className="text-xl max-w-2xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles del carrusel */}
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={32} />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentSlide ? "bg-green-500" : "bg-white/50"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PARQUE GÜEMBÉ */}
      <section
        id="guembe"
        className="py-16 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Parque Ecológico Güembé
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Naturaleza, recreación y conservación en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Experiencia inmersiva en la naturaleza
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.guembe.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Es un destino ideal para familias que desean combinar la
                  educación ambiental con actividades recreativas.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.guembe.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.guembe.location}
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Mariposario
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Aviario
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Senderos ecológicos
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Piscinas naturales
                  </span>
                </div>
                <div className="mt-6">
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("guembe")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("guembe")}
            >
              {sectionsData.guembe.image ? (
                <img
                  src={sectionsData.guembe.image}
                  alt="Parque Güembé"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN COLPACARANDÁ */}
      <section id="colpa" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              ColpaCarandá
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              El espectáculo natural de los guacamayos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
              onClick={() => openExpandedView("colpa")}
            >
              {sectionsData.colpa.image ? (
                <img
                  src={sectionsData.colpa.image}
                  alt="Colpa Carandá"
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 p-3 rounded-full text-green-700">
                  <Maximize size={24} />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Un ritual natural único
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.colpa.description}
                </p>
                <p className="text-gray-700 mb-4">
                  Esta experiencia se puede disfrutar especialmente al amanecer,
                  cuando las aves se reúnen en un despliegue de color y sonido
                  que atrae a visitantes de todo el mundo.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-green-600" />
                  <a
                    href={getMapLink(sectionsData.colpa.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors"
                  >
                    {sectionsData.colpa.location}
                  </a>
                </div>

                <div className="flex gap-3">
                  <button
                    className="border border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("colpa")}
                  >
                    Ver Ampliado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARJETAS FINALES */}
      <section
        ref={sectionRef}
        className="py-16 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Explora Más de Santa Cruz
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Descubre todo lo que esta maravillosa región tiene para ofrecer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <Link href="/infopractica">
              <div
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transition-all transform hover:-translate-y-3 hover:shadow-2xl ${
                  isVisible
                    ? "animate-fade-in animation-delay-100"
                    : "opacity-0"
                }`}
              >
                <div className="bg-green-700 p-6 h-48 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1000"
                    alt="Información Práctica"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    Información Práctica
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Todo lo que necesitas saber para planificar tu visita:
                    horarios, precios, transporte y consejos útiles.
                  </p>
                  <div className="flex justify-end">
                    <span className="text-green-600 font-bold flex items-center gap-2">
                      Ver más <ChevronRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tarjeta 2 */}
            <Link href="/explore">
              <div
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transition-all transform hover:-translate-y-3 hover:shadow-2xl ${
                  isVisible
                    ? "animate-fade-in animation-delay-300"
                    : "opacity-0"
                }`}
              >
                <div className="bg-green-700 p-6 h-48 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000"
                    alt="Explorar Destinos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    Explorar Destinos
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Descubre todos los lugares increíbles que puedes visitar en
                    Santa Cruz y sus alrededores.
                  </p>
                  <div className="flex justify-end">
                    <span className="text-green-600 font-bold flex items-center gap-2">
                      Explorar <ChevronRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Tarjeta 3 */}
            <Link href="/infosantacruz/evento">
              <div
                className={`bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transition-all transform hover:-translate-y-3 hover:shadow-2xl ${
                  isVisible
                    ? "animate-fade-in animation-delay-500"
                    : "opacity-0"
                }`}
              >
                <div className="bg-green-800 p-6 h-48 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000"
                    alt="Eventos y Actividades"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-3">
                    Eventos y Actividades
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Mantente al día con los próximos eventos, festivales y
                    actividades especiales en Santa Cruz.
                  </p>
                  <div className="flex justify-end">
                    <span className="text-green-600 font-bold flex items-center gap-2">
                      Ver eventos <ChevronRight size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal para sección ampliada */}
      {expandedSection && sectionsData[expandedSection] && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeExpandedView}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white text-green-700 rounded-full p-2 hover:bg-green-100 transition"
              onClick={closeExpandedView}
            >
              <XCircle size={28} />
            </button>

            <div className="md:w-1/2 h-[50vh] md:h-auto overflow-hidden">
              <img
                src={sectionsData[expandedSection].image}
                alt={sectionsData[expandedSection].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-6 bg-white overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
              <h3 className="text-3xl font-bold text-green-800 mb-4">
                {sectionsData[expandedSection].title}
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                  <MapPin size={18} className="text-green-700" />
                  <span className="text-green-700">
                    {sectionsData[expandedSection].location}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <h4 className="text-xl font-bold text-green-700 mb-3">
                  Descripción
                </h4>
                <p className="text-gray-700">
                  {sectionsData[expandedSection].description}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-5 mb-6">
                <h4 className="text-xl font-bold text-green-700 mb-3">
                  Especies Destacadas
                </h4>
                <p className="text-gray-700">
                  {sectionsData[expandedSection].highlights}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition flex items-center gap-2"
                  onClick={closeExpandedView}
                >
                  <X size={18} /> Cerrar Vista
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo + Título + Descripción */}
            <div>
              <div className="flex items-center gap-3 mb-4 whitespace-nowrap">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src="/Logotipo 3 blanco.png"
                    alt="Turismo Metropolitano Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold m-0">Turismo Metropolitano</h3>
              </div>
              <p className="text-green-200 leading-relaxed">
                Descubre la magia de Santa Cruz de la Sierra a través de sus
                sabores, tradiciones y lugares emblemáticos.
              </p>
            </div>

            {/* Enlaces */}
            <div>
              <h3 className="font-bold mb-6 text-lg">{t.links}</h3>
              <ul className="space-y-3 text-green-200">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition-colors"
                  >
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
                    href="/#featured"
                    className="hover:text-white transition-colors"
                  >
                    {t.featured}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#categories"
                    className="hover:text-white transition-colors"
                  >
                    {t.categories}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-green-200">
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2" /> Av. omar chavez ortiz,
                  Santa Cruz, Bolivia
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" /> Telf. (591-3) 3636000 –
                  3636001{" "}
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" />{" "}
                  info@turismometropolitano.com
                </li>
              </ul>
            </div>

            {/* Redes Sociales */}
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-6 text-center text-green-400 text-sm">
            <p>
              © {new Date().getFullYear()} Turismo Metropolitano. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default FaunaPage;