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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const t = {
    links: "Enlaces",
    home: "Inicio",
    explore: "Explorar",
    featured: "Destacados",
    categories: "Categorías",
  };

  // Datos de las secciones
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
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000", // Imagen añadida
      location: "Kilómetro 8 1/2 carretera a Cotoca, Santa Cruz de la Sierra",
      highlights: "orquídeas, cactus, aves, mariposas, pequeños mamíferos",
    },
    lomas: {
      title: "Parque Regional Lomas de Arena",
      description:
        "A solo 17 km de Santa Cruz, este parque regional de 14,000 hectáreas combina dunas de arena, lagunas y bosques húmedos, creando un ecosistema único que alberga más de 300 especies de aves, reptiles y mamíferos.",
      image: "https://images.unsplash.com/photo-1504280509247-0310476f94f8?q=80&w=1000", // Imagen añadida
      location: "A 17 km al sur de Santa Cruz de la Sierra",
      highlights: "flamencos, garzas, monos capuchinos, zorros, reptiles",
    },
    arenal: {
      title: "Parque Arenal",
      description:
        "Este parque urbano es un pulmón verde en el corazón de la ciudad, con lagunas artificiales y senderos naturales donde se pueden observar diversas especies de aves acuáticas y pequeños mamíferos.",
      image: "https://live.staticflickr.com/3953/15537482869_0066b5791c_b.jpg", // Imagen referencial
      location: "Av Beni entre caballero y murillo, Santa Cruz de la Sierra",
      highlights: "aves acuáticas, patos, tortugas, iguanas, mariposas",
    },
    guembe: {
      title: "Parque Ecológico Güembé",
      description:
        "Un complejo ecoturístico que combina reserva natural con instalaciones recreativas. Alberga mariposario, aviario, senderos ecológicos y un centro de rescate de animales silvestres.",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/32/30/1e/biocentro-guembe.jpg?w=1200&h=-1&s=1", // Imagen referencial
      location: "Camino a Porongo, Santa Cruz de la Sierra",
      highlights: "mariposario, aviario, monos, reptiles, piscinas naturales",
    },
    colpa: {
      title: "Colpa Caranda",
      description:
        "Un refugio natural donde cientos de guacamayos y loros se reúnen diariamente al amanecer para alimentarse de arcilla rica en minerales, creando un espectáculo natural único.",
      image: "https://images.unsplash.com/photo-1552071379-041b32707fed?q=80&w=1000", // Imagen añadida
      location: "Carretera Belgica, Santa Cruz de la Sierra",
      highlights: "guacamayos, loros, periquitos, tucanes",
    },
    curichi: {
      title: "Curichi La Madre",
      description:
        "El Curichi La Madre es un área protegida y reserva ecológica urbana que alberga una rica biodiversidad de flora y fauna. Es uno de los pocos humedales que aún se conservan dentro de la mancha urbana de Santa Cruz de la Sierra.",
      image: "https://images.unsplash.com/photo-1440342359726-e2bb38329507?q=80&w=1000", // Imagen añadida
      location:
        "Entre 4to Calle pejerrey y Av. El palmar Santa Cruz de la Sierra",
      highlights:
        "senderos ecológicos, avistamiento de aves, humedal urbano, mariposas",
    },
    laguna: {
      title: "Laguna Guapilo - Parque Urbano",
      description:
        "La Laguna Guapilo es un parque urbano con un pequeño cuerpo de agua rodeado de áreas verdes, ideal para el esparcimiento familiar, caminatas y observación de fauna urbana.",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000", // Imagen añadida
      location: "Av. Guapilo, Santa Cruz de la Sierra",
      highlights:
        "laguna artificial, caminatas, zonas verdes, aves urbanas, juegos infantiles",
    },
    parqueecologico: {
      title: "Parque Ecológico Yvaga Guazú",
      description:
        "El Parque Ecológico Yvaga Guazú es un centro de interpretación ambiental y conservación, que ofrece recorridos educativos entre jardines botánicos, viveros, lagunas y espacios temáticos.",
      image: "https://images.unsplash.com/photo-1596706173007-e85d8520743b?q=80&w=1000", // Imagen añadida
      location: "1/2 Km 12, Santa Cruz de la Sierra",
      highlights:
        "jardín botánico, vivero, senderos naturales, actividades educativas",
    },
  };

  // Carousel data
  const carouselItems = [
    {
      title: "Parque Amboró",
      description:
        "Parque nacional de biodiversidad única donde se encuentran la Amazonía, los Andes y el Chaco.",
      image: "https://images.unsplash.com/photo-1518182170546-0766aa6f1f50?q=80&w=1000",
    },
    {
      title: "La Rinconada",
      description:
        "Parque ecológico familiar conocido por sus jardines y la flor de loto gigante Victoria Amazónica.",
      image: "https://images.unsplash.com/photo-1598555749603-9d10c0e21e05?q=80&w=1000",
    },
    {
      title: "Rio Selva",
      description:
        "Resort familiar con cabañas y piscinas, ideal para escapadas de fin de semana.",
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const openExpandedView = (sectionId: string) => {
    setExpandedSection(sectionId);
    document.body.style.overflow = "hidden";
  };

  const closeExpandedView = () => {
    setExpandedSection(null);
    document.body.style.overflow = "auto";
  };

  // Helper para generar link de mapas
  const getMapLink = (location: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
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
            {/* Si tienes las imágenes en public, esto funciona. Si no, usa texto o placeholders */}
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              TM
            </div>
            <span className={`font-bold text-2xl ${isScrolled ? "text-green-700" : "text-white shadow-sm"}`}>
              Turismo Metropolitano
            </span>
          </Link>

          <div className="hidden md:flex justify-center">
            <div className={`flex gap-8 items-center ${isScrolled ? "text-gray-700" : "text-white"}`}>
              <Link href="/" className="hover:text-green-400 transition-colors font-medium">Inicio</Link>
              <Link href="/explore" className="hover:text-green-400 transition-colors font-medium">Explorar</Link>
              <Link href="/infosantacruz" className="hover:text-green-400 transition-colors font-medium">Santa Cruz</Link>
              <Link href="/entretenimiento" className="hover:text-green-400 transition-colors font-medium">Rincones</Link>
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

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl px-4 pb-4 flex flex-col gap-4 pt-4 border-t">
              <Link href="/" className="hover:text-green-700 font-medium" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/explore" className="hover:text-green-700 font-medium" onClick={() => setIsMenuOpen(false)}>Explorar</Link>
              <Link href="/infosantacruz" className="hover:text-green-700 font-medium" onClick={() => setIsMenuOpen(false)}>Santa Cruz</Link>
              <Link href="/entretenimiento" className="hover:text-green-700 font-medium" onClick={() => setIsMenuOpen(false)}>Rincones</Link>
          </div>
        )}
      </nav>

      {/* PORTADA HERO - SOLUCIÓN AL ERROR DE BUILD */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo real en lugar de bg-[url] vacío */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2000" 
            alt="Fauna Santa Cruz" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
            Fauna de Santa Cruz
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-200 drop-shadow-md">
            Descubre la increíble biodiversidad de Santa Cruz de la Sierra
          </p>
          <div className="animate-fade-in animation-delay-400">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
              onClick={() =>
                document.getElementById("zoologico")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Comenzar Recorrido
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN ZOOLÓGICO */}
      <section id="zoologico" className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Zoológico Municipal de Santa Cruz
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              Un espacio dedicado a la conservación y educación sobre la fauna local
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
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">Sin Imagen</div>
              )}
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
                <p className="text-gray-700 mb-4 font-medium">
                  Especies destacadas: {sectionsData.zoologico.highlights}.
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="text-green-600 flex-shrink-0" />
                  <a
                    href={getMapLink(sectionsData.zoologico.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors text-sm"
                  >
                    {sectionsData.zoologico.location}
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-all shadow-md"
                    onClick={() => setMostrarInfo(!mostrarInfo)}
                  >
                    {mostrarInfo ? "Ocultar Info" : "Horarios y Precios"}
                  </button>

                  <button
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                    onClick={() => openExpandedView("zoologico")}
                  >
                    Ver Detalles
                  </button>
                </div>

                {mostrarInfo && (
                  <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-xl animate-fade-in text-sm">
                    <h3 className="font-bold text-green-800 mb-2">Horarios</h3>
                    <p className="mb-2">Martes a Domingo: 9:00 AM - 5:00 PM</p>
                    <h3 className="font-bold text-green-800 mb-2">Entradas</h3>
                    <p>Adultos: 15 Bs. | Niños: 5 Bs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN JARDÍN BOTÁNICO */}
      <section id="botanico" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  {sectionsData.botanico.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {sectionsData.botanico.description}
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="text-green-600 flex-shrink-0" />
                  <a
                    href={getMapLink(sectionsData.botanico.location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 underline hover:text-green-700 transition-colors text-sm"
                  >
                    {sectionsData.botanico.location}
                  </a>
                </div>

                <button
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full transition-all"
                  onClick={() => openExpandedView("botanico")}
                >
                  Ver Detalles
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:-translate-y-2 cursor-pointer relative group h-96"
                 onClick={() => openExpandedView("botanico")}>
               {sectionsData.botanico.image && <img src={sectionsData.botanico.image} className="w-full h-full object-cover" alt="Botanico" />}
            </div>
          </div>
        </div>
      </section>

      {/* Resto de secciones usando un patrón similar... */}
      {/* Para ahorrar espacio en el componente, puedes mapear un array de secciones, 
          pero mantendré la estructura manual para que coincida con tu diseño original */}

      {/* SECCIÓN LOMAS DE ARENA */}
      <section id="lomas" className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-green-800">{sectionsData.lomas.title}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-2xl h-96 cursor-pointer" onClick={() => openExpandedView("lomas")}>
               <img src={sectionsData.lomas.image} className="w-full h-full object-cover" alt="Lomas" />
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
               <p className="text-gray-700 mb-4">{sectionsData.lomas.description}</p>
               <a href={getMapLink(sectionsData.lomas.location)} target="_blank" className="text-green-600 hover:underline flex items-center gap-2 mb-4">
                 <MapPin size={18}/> Ver ubicación
               </a>
               <button className="bg-green-600 text-white px-6 py-2 rounded-full font-bold" onClick={() => openExpandedView("lomas")}>Ver más</button>
            </div>
          </div>
        </div>
      </section>

      {/* CARRUSEL AUTOMÁTICO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Reservas Naturales
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[500px]">
            <div ref={carouselRef} className="h-full w-full relative">
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                    <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-lg opacity-90">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Controles */}
            <button onClick={goToPrevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 p-2 rounded-full text-white hover:bg-black/50">
              <ChevronLeft size={32} />
            </button>
            <button onClick={goToNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 p-2 rounded-full text-white hover:bg-black/50">
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-900 text-white py-12 mt-10">
        <div className="container mx-auto px-4 text-center">
             <h3 className="text-2xl font-bold mb-4">Turismo Metropolitano</h3>
             <p className="mb-6 opacity-80">Descubriendo la naturaleza de Santa Cruz</p>
             <div className="flex justify-center gap-6 mb-8">
                <Facebook className="cursor-pointer hover:text-green-300" />
                <Instagram className="cursor-pointer hover:text-green-300" />
                <Twitter className="cursor-pointer hover:text-green-300" />
             </div>
             <p className="text-sm opacity-50">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal Expandido */}
      {expandedSection && sectionsData[expandedSection] && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={closeExpandedView}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-20 bg-white/90 text-red-600 rounded-full p-2 hover:bg-red-50"
              onClick={closeExpandedView}
            >
              <XCircle size={28} />
            </button>

            <div className="md:w-1/2 h-64 md:h-auto">
              <img
                src={sectionsData[expandedSection].image}
                alt={sectionsData[expandedSection].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:w-1/2 p-8 overflow-y-auto">
              <h3 className="text-3xl font-bold text-green-800 mb-4">
                {sectionsData[expandedSection].title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {sectionsData[expandedSection].description}
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-green-800 mb-2">Lo más destacado:</h4>
                <p className="text-sm">{sectionsData[expandedSection].highlights}</p>
              </div>

              <a 
                href={getMapLink(sectionsData[expandedSection].location)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
              >
                <MapPin size={18} /> Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FaunaPage;