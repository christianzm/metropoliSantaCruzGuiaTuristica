"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const t = {
  links: "Enlaces",
  home: "Inicio",
  explore: "Explorar",
  featured: "Destacados",
  categories: "Categorías",
};

export default function EventoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const heroRef = useRef(null);

  const galleryImages = [
    {
      id: 1,
      title: "Vista del Estadio",
      description:
        "El Estadio Ramón Tahuichi Aguilera es el corazón del fútbol boliviano y sede de importantes eventos deportivos.",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "campo del estadio Tahuichi Aguilera",
      description:
        "Complejo deportivo que alberga múltiples disciplinas y es centro de formación de jóvenes talentos.",
      image:
        "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "villa olimpica",
      description:
        "Instalaciones de primer nivel para entrenamiento y competiciones menores.",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2065&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "campo de entrenamiento",
      description:
        "Con capacidad para más de 38,000 espectadores, ofrece una experiencia única en cada partido.",
      image:
        "https://images.unsplash.com/photo-1560272564-c83ee6d4f1e7?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Pista Atlética",
      description:
        "Moderno circuito para competencias de atletismo y eventos deportivos.",
      image:
        "https://images.unsplash.com/photo-1550348579-9598858bd9ad?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "moto -cross",
      description:
        "Moderno circuito para competencias de atletismo y eventos deportivos.",
      image:
        "https://images.unsplash.com/photo-1550348579-9598858bd9ad?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  const features = [
    { title: "Capacidad", value: "38,000 espectadores", icon: "👥" },
    { title: "Inauguración", value: "1938", icon: "🎉" },
    { title: "Superficie", value: "Césped natural", icon: "⚽" },
    {
      title: "Ubicación",
      value: "Soliz de Olguin, Santa Cruz de la Sierra",
      icon: "📍",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Efecto parallax para el hero
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.transform = `translateY(${
          scrollPosition * 0.4
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Animación inicial
    const timer = setTimeout(() => {
      document.querySelector(".hero-title")?.classList.add("animate-fadeInUp");
      document
        .querySelector(".hero-subtitle")
        ?.classList.add("animate-fadeInUp");
      document.querySelector(".hero-button")?.classList.add("animate-fadeInUp");
    }, 300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const openImageModal = (index) => {
    setGalleryIndex(index);
    setActiveImage(galleryImages[index]);
  };

  const closeImageModal = () => {
    setActiveImage(null);
  };

  const navigateGallery = (direction) => {
    const newIndex =
      direction === "prev"
        ? (galleryIndex - 1 + galleryImages.length) % galleryImages.length
        : (galleryIndex + 1) % galleryImages.length;

    setGalleryIndex(newIndex);
    setActiveImage(galleryImages[newIndex]);
  };

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* NAVBAR INICIO */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 select-none hover:opacity-80 transition"
          >
            <img
              src="/logo upds verde.png"
              alt="Logo UPDS"
              className="w-10 h-10"
            />
            <img
              src="/Logotipo 3 verde.png"
              alt="Turismo Metropolitano Logo"
              className="w-10 h-10"
            />
            <span className="font-bold text-green-700 text-2xl">
              Turismo Metropolitano
            </span>
          </Link>

          {/* Enlaces centrados (desktop) */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className={`transition-colors hover:text-green-400 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                }`}
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-green-700" />
              ) : (
                <Menu className="w-6 h-6 text-green-700" />
              )}
            </button>
          </div>

          {/* Espacio vacío solo en desktop */}
          <div className="hidden md:block" />
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4">
            <div className="flex flex-col items-start gap-4">
              <Link
                href="/"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className="hover:text-green-700 transition font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* NAVBAR FIN */}

      {/* HERO SECTION - Estadio Tahuichi */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-black/80 z-10"></div>

        {/* Fondo con efecto 3D/parallax */}
        <div
          ref={heroRef}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598880940080-ff9a29891b85?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transform transition-transform duration-1000"
          style={{ transform: "translateY(0px)" }}
        ></div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-4 opacity-0 transform translate-y-10 transition-all duration-700">
            Estadio <span className="text-green-400">Tahuichi</span> Ramón
            Aguilera Costas
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-white mb-8 opacity-0 transform translate-y-10 transition-all duration-700 delay-150">
            El corazón del deporte cruceño y cuna de grandes talentos
          </p>
          <button
            onClick={() =>
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="hero-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 opacity-0 transform translate-y-10 transition-all duration-700 delay-300"
          >
            Descubrir Más
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-white w-8 h-8" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about-section"
        className="py-20 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <h2 className="text-4xl font-bold text-green-800 mb-6">
                  Un Icono del Deporte Boliviano
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  El Estadio Ramón "Tahuichi" Aguilera es el principal escenario
                  deportivo de Santa Cruz de la Sierra. Inaugurado en 1938 y
                  renovado completamente en 1997, este estadio ha sido testigo
                  de momentos históricos del fútbol boliviano y ha formado a
                  generaciones de talentosos jugadores.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Con una capacidad para 38,000 espectadores, el estadio forma
                  parte del complejo de la Villa Olímpica, que incluye pistas de
                  atletismo, canchas auxiliares, gimnasios y espacios para
                  múltiples disciplinas deportivas.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-green-100 rounded-xl p-4 flex-1 min-w-[150px] text-center transform hover:-translate-y-2 transition-transform duration-300"
                    >
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h3 className="font-bold text-green-800">
                        {feature.title}
                      </h3>
                      <p className="text-green-700">{feature.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-1/2 relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-4 border-green-400 rounded-2xl transform rotate-3 z-0"></div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1598880940080-ff9a29891b85?q=80&w=2070&auto=format&fit=crop"
                    alt="Estadio Tahuichi"
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1598880940080-ff9a29891b85?q=80&w=2070&auto=format&fit=crop"
                    alt="Vista del estadio"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1598880940080-ff9a29891b85?q=80&w=2070&auto=format&fit=crop"
                    alt="Canchas auxiliares"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Galería del Estadio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora las instalaciones que hacen del Tahuichi un ícono del
              deporte nacional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-3xl shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                onClick={() => openImageModal(index)}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold">{image.title}</h3>
                  <p className="text-green-300 mt-2">Haz clic para ampliar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLA OLÍMPICA SECTION */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Villa Olímpica del Estadio Tahuichi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un complejo deportivo integral que alberga múltiples disciplinas y
              es centro de formación de jóvenes talentos
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 relative">
              {/* Marco decorativo */}

              {/* Imagen principal */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2070&auto=format&fit=crop"
                  alt="Villa Olímpica del Estadio Tahuichi"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Imágenes secundarias */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop"
                    alt="Entrenamiento de atletismo"
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070&auto=format&fit=crop"
                    alt="Gimnasio de la Villa Olímpica"
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
                    alt="Clases de natación"
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-3xl font-bold text-green-800 mb-6">
                  Centro de Formación Deportiva
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  La Villa Olímpica es un complejo deportivo anexo al estadio
                  principal que cuenta con:
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <span className="text-green-800 text-xl">🏃</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Pista de atletismo</h4>
                      <p className="text-gray-700">
                        Circuito profesional para entrenamiento y competencias
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <span className="text-green-800 text-xl">🏊</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Piscina olímpica</h4>
                      <p className="text-gray-700">
                        Instalaciones para natación competitiva y recreativa
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <span className="text-green-800 text-xl">⚽</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Canchas múltiples</h4>
                      <p className="text-gray-700">
                        Espacios para fútbol, básquet, vóley y tenis
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <h4 className="font-bold text-green-800 text-xl mb-3">
                    Horarios de atención
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Lunes a Viernes</p>
                      <p>6:00 AM - 10:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium">Sábados y Domingos</p>
                      <p>7:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/LYv4gnxUZgbFhsfH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full w-full transition text-center block"
                  >
                    Ver ubicación
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-20 bg-gradient-to-b from-white to-green-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-green-800 mb-6">
                Cómo Llegar
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                El Estadio Tahuichi se encuentra en el corazón de Santa Cruz de
                la Sierra, en la intersección de la Calle Soliz de Olguin, Santa
                Cruz de la Sierra.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="text-green-600 w-6 h-6 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Dirección</h3>
                    <p className="text-gray-700">
                      Calle Soliz de Olguin, Santa Cruz de la Sierra.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-800">🚕</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Transporte</h3>
                    <p className="text-gray-700">
                      Taxi, micros de las líneas 14, 15, 55 y 56
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-green-800">🅿️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Estacionamiento</h3>
                    <p className="text-gray-700">
                      Zonas de estacionamiento disponibles alrededor del estadio
                    </p>
                  </div>
                </div>
              </div>

              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full flex items-center">
                <MapPin className="mr-2" /> Ver en Google Maps
              </button>
            </div>

            <div className="md:w-1/2 relative">
              <div className="bg-white p-6 rounded-3xl shadow-2xl">
                <div className="aspect-video rounded-xl w-full h-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13538.128681693817!2d-63.18452443333226!3d-17.791279472223984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e81593003907%3A0xe9c1f97926a8e489!2sEstadio%20%22Tahuichi%22%20Ram%C3%B3n%20Aguilera%20Costas!5e0!3m2!1ses!2sbo!4v1752873543638!5m2!1ses!2sbo"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Ubicación"
                  ></iframe>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-4 rounded-full shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="text-center">
                  <div className="text-xl font-bold">8 min</div>
                  <div className="text-sm">desde el centro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE MODAL */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/80 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateGallery("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/80 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigateGallery("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 z-10 hover:bg-black/80 transition"
            >
              <ArrowRight className="w-6 h-6" />
            </button>

            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                width={800}
                height={500}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-gray-600">{activeImage.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Imagen {galleryIndex + 1} de {galleryImages.length}
                </div>
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
                  <MapPin size={16} className="mr-2" /> Av. Omar Chávez Ortiz,
                  Santa Cruz, Bolivia
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" /> Telf. (591-3) 3636000 –
                  3636001
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

      {/* Estilos de animación */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .gallery-item {
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .gallery-item:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </main>
  );
}
