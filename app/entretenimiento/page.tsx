"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu,X,Phone,Mail,Facebook,Instagram,Twitter,Youtube,MapPin,ChevronLeft,ChevronRight,Maximize,Star,Clock,ShoppingBag,} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const t = {
  links: "Enlaces",
  home: "Inicio",
  explore: "Explorar",
  featured: "Destacados",
  categories: "Categorías",
};

// Datos de centros comerciales
const comerciales = [
  {
    id: 1,
    nombre: "Ventura Mall",
    descripcion:
      "El centro comercial más grande de Santa Cruz, con una variedad de tiendas, restaurantes y entretenimiento. Disfruta de su arquitectura moderna y espacios abiertos.",
    imagenes: ["/ventura1.jpg", "/ventura2.jpg", "/ventura3.jpg"],
    ubicacion: "Av. San Martin esquina, Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/hRzJhfAjmhTs4sKb9",
    horarios: "Lunes a Domingo: 10:00 am - 22:00 pm",
    caracteristicas: [
      "Cine",
      "Patio de comidas",
      "Área de juegos",
      "Tiendas de moda",
      "Electrónica",
      "Supermercado",
      "Cafeterías",
      "Zona de entretenimiento",
      "Parqueo amplio",
      "Oficinas de atención al cliente",
      "Servicios de cambio de divisas",
      "Cajeros automáticos",
    ],
    rating: 4.8,
  },
  {
    id: 2,
    nombre: "Las Brisas",
    descripcion:
      "Un centro comercial con un diseño moderno y una amplia oferta de tiendas y servicios. Conocido por su ambiente relajado y espacios verdes.",
    imagenes: ["/brisas1.jpg", "/brisas2.jpg"],
    ubicacion: "Av. Cuarto Anillo, Santa Cruz de la Sierra, Bolivia",
    enlaceUbicacion: "https://maps.app.goo.gl/H7vGsd8wgRRxxvP16",
    horarios: "Lunes a Domingo: 10:00 am - 22:00 pm",
    caracteristicas: [
      "Restaurantes gourmet",
      "Tiendas exclusivas",
      "Espacios de coworking",
      "Jardines",
      "Cines",
      "Zona de juegos para niños",
      "Cafeterías",
      "Servicios de spa",
      "Boutiques de moda",
      "Tiendas de tecnología",
      "Servicios de belleza",
      "Oficinas de atención al cliente",
      "Cajeros automáticos",
      "Parqueo seguro",
    ],
    rating: 4.6,
  },
  {
    id: 3,
    nombre: "Mega Center",
    descripcion:
      "Conocido por su ambiente familiar y diversidad de tiendas y restaurantes. Un lugar ideal para pasar el día con toda la familia.",
    imagenes: ["/mega1.jpg", "/mega2.jpg"],
    ubicacion: "Av. El Trompillo y, Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/fKLVr4joKpj6MDTV6",
    horarios: "Lunes a Domingo: 09:00 am - 22:00 pm",
    caracteristicas: [
      "Cine",
      "Patio de comidas",
      "Zona infantil",
      "Gym",
      "Tiendas de tecnología",
      "Tiendas de moda",
      "Cafeterias",
    ],
    rating: 4.7,
  },
  {
    id: 4,
    nombre: "Patio Design",
    descripcion:
      "Un espacio dedicado al diseño y la decoración, con tiendas exclusivas de mobiliario y accesorios para el hogar.",
    imagenes: ["/patio1.jpg", "/patio2.jpg"],
    ubicacion: "Av. Noel Kempff Mercado y Av. Busch Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/7cxnA6vcrM9Q3c4d7",
    horarios: "Lunes a Domingo: 09:00 am - 22:00 pm",
    caracteristicas: [
      "Muebles exclusivos",
      "Arte decorativo",
      "Diseño interior",
      "Talleres creativos",
      "Restaurantes",
      "Cafeterías",
      "Tiendas de moda",
    ],
    rating: 4.5,
  },
  {
    id: 5,
    nombre: "Mega Center Avenida Brasil",
    descripcion:
      "Ubicado en una de las avenidas más importantes, ofrece una gran variedad de opciones comerciales y gastronómicas.",
    imagenes: ["/mega-brasil1.jpg", "/mega-brasil2.jpg"],
    ubicacion: "CECILIO CHÁVEZ 2195, Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/h9En5dz7Pfy81Epn9",
    horarios: "Lunes a Domingo: 08:00 am - 23:00 pm",
    caracteristicas: [
      "Tiendas de moda",
      "Electrónica",
      "Restaurantes temáticos",
      "Área de eventos",
      "Cine",
      "Zona de juegos",
      "Cafeterías",
      "Parqueo amplio",
      "Oficinas de atención al cliente",
      "Cajeros automáticos",
      "Zona de descanso",
    ],
    rating: 4.4,
  },
  {
    id: 6,
    nombre: "Casco Viejo",
    descripcion:
      "Un centro comercial con estilo colonial y una oferta gastronómica única. Ideal para disfrutar de la arquitectura tradicional cruceña.",
    imagenes: ["/casco1.jpg", "/casco2.jpg"],
    ubicacion: "Calle 21 de Mayo, Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/mx7EmaoujBMtwdGJ7",
    horarios: "Lunes a Sabado: 08:00 am - 20:00 pm",
    caracteristicas: [
      "Tiendas artesanales",
      "Patio central",
      "Galerías de juegos de consolas",
      "tiendas de ropa",
      "tienda de accesorios",
      "tiendas de tecnología",
    ],
    rating: 4.3,
  },
  {
    id: 7,
    nombre: "Shopping Bolívar",
    descripcion:
      "Ubicado en el corazón de la ciudad, con tiendas de moda y restaurantes. Un punto de encuentro para los cruceños.",
    imagenes: ["/bolivar1.jpg", "/bolivar2.jpg"],
    ubicacion: "CalleBolivar y, Santa Cruz de la Sierra",
    enlaceUbicacion: "https://maps.app.goo.gl/SfEM2mzchugd3JrEA",
    horarios:
      "Lunes a Sábado: 09:00 am- 19:00 pm, Domingo: 08:00 am - 14:00 pm",
    caracteristicas: [
      "Servicios financieros",
      "cambio de divisas",
      "tienda de accesorios",
      "tienda de tecnología",
      "reparación de celulares",
      "tienda de telefonos",
    ],
    rating: 4.6,
  },
];

export default function EventoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currentCommercial, setCurrentCommercial] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Animación al hacer scroll
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const element = document.getElementById("comercial-grid");
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + scrollPosition;
        if (scrollPosition + windowHeight > elementPosition + 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Configurar carrusel automático
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(intervalRef.current);
    };
  }, []);

  const scrollToCommercial = (index) => {
    setCurrentCommercial(index);
    const element = document.getElementById(`comercial-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const openImageModal = (comercialIndex, imageIndex) => {
    setExpandedImage({ comercialIndex, imageIndex });
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setExpandedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* NAVBAR INICIO */}
      <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
          {/* Logo y nombre */}
          <Link
            href="/"
            className="flex items-center gap-3 select-none hover:opacity-80 transition"
          >
            <div className="relative w-10 h-10">
              <Image
                src="/logo upds verde.png"
                alt="Logo UPDS"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-10 h-10">
              <Image
                src="/logotipo 3 verde.png"
                alt="Turismo Metropolitano Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-green-700 text-xl md:text-2xl">
              Turismo Metropolitano
            </span>
          </Link>

          {/* Enlaces centrados (desktop) */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 items-center">
              <Link
                href="/"
                className={`transition-colors hover:text-green-600 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                } font-medium`}
              >
                Inicio
              </Link>
              <Link
                href="/explore"
                className={`transition-colors hover:text-green-600 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                } font-medium`}
              >
                Explorar
              </Link>
              <Link
                href="/infosantacruz"
                className={`transition-colors hover:text-green-600 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                } font-medium`}
              >
                Santa Cruz
              </Link>
              <Link
                href="/entretenimiento"
                className={`transition-colors hover:text-green-600 ${
                  isScrolled
                    ? "text-gray-700 hover:text-green-600"
                    : "text-black"
                } font-medium`}
              >
                Rincones para Disfrutar
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
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
          <div className="md:hidden bg-white px-4 pb-4 animate-fadeIn">
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

      {/* PORTADA HERO */}
      <section className="relative h-screen overflow-hidden">
        {/* Carrusel */}
        <div className="absolute inset-0">
          {/* Imagen 1 */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeTab === 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          </div>

          {/* Imagen 2 */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeTab === 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>
            <div className="w-full h-full bg-gray-400 animate-pulse" />
          </div>

          {/* Imagen 3 */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeTab === 2 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"></div>
            <div className="w-full h-full bg-gray-500 animate-pulse" />
          </div>
        </div>

        {/* Contenido superpuesto */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fadeIn">
            <span className="text-green-400">Centros</span> Comerciales
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mb-8 animate-fadeIn animate-delay-300">
            Descubre los centros comerciales más emblemáticos de Santa Cruz,
            donde podrás disfrutar de compras, gastronomía y entretenimiento.
          </p>
          <button
            onClick={() => scrollToCommercial(0)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 animate-fadeIn animate-delay-600 flex items-center gap-2"
          >
            <ShoppingBag size={20} /> Explorar Centros
          </button>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeTab === index
                  ? "bg-green-500 scale-125"
                  : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECCIÓN DE COMERCIALES */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-green-600">Destinos</span> Comerciales
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora los centros comerciales más importantes de Santa Cruz,
              cada uno con su propia personalidad y oferta única.
            </p>
          </div>

          {/* Navegación rápida */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fadeIn animate-delay-200">
            {comerciales.map((comercial, index) => (
              <button
                key={comercial.id}
                onClick={() => scrollToCommercial(index)}
                className={`px-4 py-2 rounded-full transition-all ${
                  currentCommercial === index
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-green-200"
                }`}
              >
                {comercial.nombre}
              </button>
            ))}
          </div>

          {/* Listado de comerciales */}
          <div
            id="comercial-grid"
            className={`space-y-24 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {comerciales.map((comercial, index) => (
              <div
                key={comercial.id}
                id={`comercial-${index}`}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col`}
              >
                {/* Imágenes */}
                <div className="md:w-1/2 relative">
                  <div className="grid grid-cols-2 gap-1 h-full">
                    {comercial.imagenes.map((img, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative aspect-square cursor-pointer group"
                        onClick={() => openImageModal(index, imgIndex)}
                      >
                        <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                          <Maximize
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            size={32}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información */}
                <div className="md:w-1/2 p-6 md:p-10">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-green-700 font-bold text-xl">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                        {comercial.nombre}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < Math.floor(comercial.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-gray-500 ml-1">
                          {comercial.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{comercial.descripcion}</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <ShoppingBag size={18} /> Características:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {comercial.caracteristicas.map((caracteristica, idx) => (
                        <span
                          key={idx}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {caracteristica}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Clock size={18} /> Horarios:
                      </h4>
                      <p className="text-gray-700">{comercial.horarios}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-green-600 mr-2" />
                    <a
                      href={comercial.enlaceUbicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {comercial.ubicacion}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Sección de Categorías - Destacando Entretenimiento */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Elementos decorativos animados */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-10 right-[10%] w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Imagen de entretenimiento */}
            <div className="relative">
              <img
                src="/img/entretenimiento.jpg"
                alt="Turismo de Entretenimiento"
                className="rounded-3xl shadow-2xl w-full object-cover"
              />
              {/* Etiqueta destacada */}
              <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                NUEVO
              </span>
            </div>

            {/* Texto de descripción */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                Vive la emoción del{" "}
                <span className="text-green-600">Entretenimiento</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Disfruta de las mejores actividades recreativas, Centro
                comerciales, patios de comida, cines y espacios culturales para
                toda la familia o en pareja. ¡Descubre la diversión en Santa
                Cruz!
              </p>

              {/* Botón que redirige al mapa filtrado */}
              <Link
                href="/explore?category=turismo-de-entretenimiento"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
              >
                Explorar ahora
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
                <section className="py-5 bg-white">
  <div className="container mx-auto px-1">
    <h3 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-12">
      💡 Explora tu Escapada Urbana
    </h3>

    <div className="grid gap-6 md:grid-cols-3 justify-center max-w-6xl mx-auto">
      {/* Tarjeta Base Reutilizable */}
      {[
        {
          title: "Explora, Vive y Descansa en la Naturaleza Urbana",
          desc: "Tu guía para hoteles, recreación y relax.",
          image: "/imagenes/hoteles.jpg",
          link: "/entretenimiento/hoteles",
        },
        {
          title: "Explora Zonas para Respirar y Moverte",
          desc: "Villas, parques y estadios esperándote.",
          image: "/imagenes/recreacion.jpg",
          link: "/entretenimiento/recreacion",
        },
        {
          title: "Explora el Ritmo de la Ciudad",
          desc: "Vive la música, el arte y el entretenimiento de Santa Cruz.",
          image: "/imagenes/otros.jpg",
          link: "/entretenimiento/otros",
        },
      ].map((card, index) => (
        <div
          key={index}
          className="bg-green-50 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 w-full max-w-sm mx-auto flex flex-col"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-44 object-cover"
          />
          <div className="p-5 flex flex-col justify-between h-full flex-1">
            <div>
              <h4 className="text-lg font-bold text-green-800 mb-2">
                {card.title}
              </h4>
              <p className="text-gray-700 text-sm mb-4">{card.desc}</p>
            </div>
            <Link href={card.link}>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition-all mt-auto">
                Ver más
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
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

      {/* MODAL PARA IMAGEN AMPLIADA */}
      {expandedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fadeIn"
          onClick={closeImageModal}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-100 transition"
            onClick={closeImageModal}
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-6xl w-full h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-gray-300 animate-pulse" />
          </div>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              const prevIndex =
                (expandedImage.imageIndex -
                  1 +
                  comerciales[expandedImage.comercialIndex].imagenes.length) %
                comerciales[expandedImage.comercialIndex].imagenes.length;
              setExpandedImage({ ...expandedImage, imageIndex: prevIndex });
            }}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              const nextIndex =
                (expandedImage.imageIndex + 1) %
                comerciales[expandedImage.comercialIndex].imagenes.length;
              setExpandedImage({ ...expandedImage, imageIndex: nextIndex });
            }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fadeIn.animate-delay-300 {
          animation-delay: 0.3s;
        }

        .animate-fadeIn.animate-delay-600 {
          animation-delay: 0.6s;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </main>
  );
}
