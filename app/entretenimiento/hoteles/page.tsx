"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {Menu,X,Phone,Mail,Facebook,Instagram,Twitter,Youtube,MapPin,Star,Wifi,Sparkles,} from "lucide-react";
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
  const [activeHotel, setActiveHotel] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Para evitar problemas de hidratación
  const sectionRefs = useRef([]);

  useEffect(() => {
    setIsMounted(true); // Marcar que el componente está montado
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determinar qué hotel está en el centro de la pantalla
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const sectionTop = ref.offsetTop;
          const sectionBottom = sectionTop + ref.offsetHeight;

          if (scrollPosition > sectionTop && scrollPosition < sectionBottom) {
            setActiveHotel(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar inicialmente para establecer el estado

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHotel = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const openHotelModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeHotelModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => setSelectedHotel(null), 300);
  };

  const hoteles = [
    {
      id: 1,
      nombre: "Hotel Los Tajibos",
      categoria: "Lujo",
      estrellas: 5,
      imagen: "/hotel-tajibos.jpg",
      descripcion:
        "Un oasis de lujo en el corazón de Santa Cruz. Con amplias habitaciones, piscinas espectaculares y servicio de primera clase. Disfrute de nuestra exclusiva zona spa y restaurantes gourmet.",
      servicios: [
        "Piscina",
        "Spa",
        "WiFi",
        "Restaurante",
        "Gimnasio",
        "Bar",
        "Servicio de habitaciones",
        "Piscina para niños",
      ],
      ubicacion: "https://maps.app.goo.gl/AYdYE6QkvxvsWe4dA",
      precio: "$$$$",
      rating: 4.8,
      color: "from-emerald-900 to-emerald-700",
      style: "glass",
    },
    {
      id: 2,
      nombre: "Cortez Camino Real",
      categoria: "Negocios",
      estrellas: 4,
      imagen: "/hotel-cortez.jpg",
      descripcion:
        "Perfecto para viajeros de negocios y eventos. Ubicado en el centro financiero con acceso a las principales áreas comerciales. Salas de conferencias equipadas con tecnología de última generación.",
      servicios: [
        "Centro de negocios",
        "WiFi",
        "Restaurante",
        "Estacionamiento",
        "Servicio a la habitación",
        "Lavandería",
        "Transporte",
      ],
      ubicacion: "https://maps.app.goo.gl/JG6AybcQYjYEx85T6",
      precio: "$$$",
      rating: 4.5,
      color: "from-blue-900 to-blue-700",
      style: "geometric",
    },
    {
      id: 3,
      nombre: "Hotel Yotau",
      categoria: "Familiar",
      estrellas: 4,
      imagen: "/hotel-yotau.jpg",
      descripcion:
        "Ambiente cálido y familiar con áreas de recreación para niños y espacios verdes. Ideal para vacaciones en familia. Contamos con actividades diarias para todas las edades.",
      servicios: [
        "Parque infantil",
        "Piscina familiar",
        "WiFi",
        "Restaurante",
        "Actividades recreativas",
      ],
      ubicacion: "https://maps.app.goo.gl/WyzdsWFt2E4MwZdx7",
      precio: "$$",
      rating: 4.3,
      color: "from-amber-900 to-amber-700",
      style: "nature",
    },
    {
      id: 4,
      nombre: "Casa Blanca",
      categoria: "Boutique",
      estrellas: 4,
      imagen: "/hotel-casablanca.jpg",
      descripcion:
        "Encantador hotel boutique con diseño contemporáneo y atención personalizada. Cada habitación tiene un diseño único inspirado en la cultura local. Arte y decoración exclusiva en cada rincón.",
      servicios: [
        "Terraza",
        "WiFi",
        "Bar",
        "Servicio personalizado",
        "Desayuno",
      ],
      ubicacion: "https://maps.app.goo.gl/mhZc4YDTrEPg9n6f7",
      precio: "$$$",
      rating: 4.7,
      color: "from-stone-900 to-stone-700",
      style: "minimal",
    },
    {
      id: 5,
      nombre: "Hotel Buganvilla",
      categoria: "Ecológico",
      estrellas: 3,
      imagen: "/hotel-buganvilla.jpg",
      descripcion:
        "Conectado con la naturaleza. Un espacio tranquilo con jardines tropicales y prácticas sostenibles. Construido con materiales locales y respetando el ecosistema.",
      servicios: [
        "Jardines",
        "WiFi",
        "Piscina",
        "Restaurante",
        "Spa natural",
        "Campo de futbol"
      ],
      ubicacion: "https://maps.app.goo.gl/isSPR1kY8jVFp5H1A",
      precio: "$$",
      rating: 4.4,
      color: "from-lime-900 to-lime-700",
      style: "organic",
    },
    {
      id: 6,
      nombre: "Eco Las Riveira",
      categoria: "Ecológico",
      estrellas: 4,
      imagen: "/hotel-eco.jpg",
      descripcion:
        "Combinación perfecta de lujo y sostenibilidad. Arquitectura bioclimática rodeada de vegetación exuberante. Energía solar y sistemas de recolección de agua pluvial.",
      servicios: [
        "Piscina",
        "WiFi",
        "Restaurante",
        "Observatorio de aves",
      ],
      ubicacion: "https://maps.app.goo.gl/FdUKC82ALiEb2d3Q6",
      precio: "$$$",
      rating: 4.6,
      color: "from-teal-900 to-teal-700",
      style: "water",
    },
    {
      id: 7,
      nombre: "Hotel Radisson",
      categoria: "Lujo",
      estrellas: 5,
      imagen: "/hotel-radisson.jpg",
      descripcion:
        "Elegancia internacional con estándares de servicio de primera. Ideal para eventos corporativos y bodas. Salones para eventos con capacidad hasta 500 personas.",
      servicios: [
        "Sala de eventos",
        "Piscina",
        "WiFi",
        "Restaurante gourmet",
        "Centro de negocios",
        "Valet parking",
        "Concierge",
      ],
      ubicacion: "https://maps.app.goo.gl/3z1iNdvBtmM8WNxQA",
      precio: "$$$$",
      rating: 4.9,
      color: "from-indigo-900 to-indigo-700",
      style: "luxury",
    },
    {
      id: 8,
      nombre: "Terramia Resort",
      categoria: "Vacacional",
      estrellas: 4,
      imagen: "/hotel-terramia.jpg",
      descripcion:
        "Resort todo incluido con actividades recreativas para todas las edades. Su lema: 'Tu paraíso personal'. Desde deportes acuáticos hasta espectáculos nocturnos.",
      servicios: [
        "Todo incluido",
        "Piscinas",
        "WiFi",
        "Actividades recreativas",
        "Spa",
        "Deportes acuáticos",
      ],
      ubicacion: "https://maps.app.goo.gl/rxV6bNjRhMKdGfrF8",
      precio: "$$$$",
      rating: 4.7,
      color: "from-rose-900 to-rose-700",
      style: "resort",
    },
    {
      id: 9,
      nombre: "Hotel Sun",
      categoria: "Playa",
      estrellas: 3,
      imagen: "/hotel-sun.jpg",
      descripcion:
        "A pocos pasos de la playa. Ambiente descontracturado con acceso directo a las mejores playas de la región. Hamacas frente al mar y cócteles tropicales.",
      servicios: [
        "Acceso a playa",
        "Piscina",
        "WiFi",
        "Restaurante",
        "Alquiler de sombrillas",

      ],
      ubicacion: "https://maps.app.goo.gl/PYjRxQN839a7i8oX9",
      precio: "$$",
      rating: 4.2,
      color: "from-orange-900 to-orange-700",
      style: "beach",
    },
  ];

  if (!isMounted) {
    // Renderizar un esqueleto básico mientras se monta el componente
    return (
      <main className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-12 bg-green-600 rounded-full w-48 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg p-6">
                <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6 mb-6"></div>
                <div className="flex justify-between">
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                  <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

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

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-r from-green-600 to-blue-600">
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-4 gap-8 opacity-20 transform rotate-12 -translate-y-24">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="h-48 bg-white rounded-xl shadow-xl"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Descubre los Mejores Hoteles de Santa Cruz
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experiencias únicas, servicio excepcional y comodidades de primera
              categoría
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => scrollToHotel(0)}
                className="flex items-center bg-white text-green-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explorar Hoteles <span className="ml-2 animate-bounce">↓</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL NAVIGATION */}
      <div className="sticky top-16 bg-white shadow-md z-40">
        <div className="container mx-auto px-4 py-3">
          {/* Vista DESKTOP: botones horizontales */}
          <div className="hidden sm:flex space-x-4 overflow-x-auto">
            {hoteles.map((hotel, index) => (
              <button
                key={hotel.id}
                onClick={() => scrollToHotel(index)}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeHotel === index
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {hotel.nombre}
              </button>
            ))}
          </div>

          {/* Vista MÓVIL: menú desplegable */}
          <div className="sm:hidden">
            <select
              onChange={(e) => scrollToHotel(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={activeHotel}
            >
              <option disabled>Selecciona un hotel</option>
              {hoteles.map((hotel, index) => (
                <option key={hotel.id} value={index}>
                  {hotel.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* HOTEL SECTIONS */}
      <div className="py-8">
        {hoteles.map((hotel, index) => (
          <section
            key={hotel.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`py-20 relative overflow-hidden ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            {/* Background effect based on style */}
            {hotel.style === "glass" && (
              <div className="absolute inset-0 z-0">
                <div className="grid grid-cols-6 gap-6 opacity-10 transform rotate-12">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl"
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {hotel.style === "geometric" && (
              <div className="absolute inset-0 z-0">
                <div className="grid grid-cols-8 gap-4 opacity-5 transform -rotate-45 scale-150">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {hotel.style === "nature" && (
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-200/10 to-green-200/10"></div>
            )}

            {hotel.style === "water" && (
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10"></div>
            )}

            <div className="container mx-auto px-4 relative z-10">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                {/* Imagen */}
                <div className="w-full lg:w-1/2">
                  <div
                    className="relative h-96 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                    onClick={() => openHotelModal(hotel)}
                  >
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">{hotel.nombre}</h3>
                        <p className="text-sm">
                          Haz clic para ver más detalles
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-bold">
                      <Star size={16} className="mr-1" /> {hotel.rating}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[...Array(hotel.estrellas)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {hotel.categoria}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {hotel.nombre}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-bold text-gray-800">
                      {hotel.precio}
                    </span>
                    <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                  </div>

                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {hotel.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {hotel.servicios.slice(0, 4).map((servicio, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          {servicio === "WiFi" && (
                            <Wifi size={16} className="text-green-600" />
                          )}
                          {servicio === "Piscina" && (
                            <Sparkles size={16} className="text-green-600" />
                          )}
                          {servicio === "Restaurante" && (
                            <Sparkles size={16} className="text-green-600" />
                          )}
                          {servicio === "Spa" && (
                            <span className="text-green-600 font-bold">S</span>
                          )}
                        </div>
                        <span>{servicio}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => openHotelModal(hotel)}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                      Ver detalles completos <span className="ml-2">→</span>
                    </button>
                    <a
                      href={hotel.ubicacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-full font-bold hover:bg-green-50 transition-colors"
                    >
                      <MapPin className="mr-2" size={18} /> Ubicación
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* MODAL DE HOTEL */}
      {isModalOpen && selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed w-full h-64 md:h-80" />

              <button
                onClick={closeHotelModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="absolute bottom-4 left-4">
                <h2 className="text-white text-2xl md:text-3xl font-bold">
                  {selectedHotel.nombre}
                </h2>
                <div className="flex mt-1">
                  {[...Array(selectedHotel.estrellas)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    {selectedHotel.categoria}
                  </span>
                </div>
                <div className="flex items-center">
                  <Star
                    size={20}
                    className="text-yellow-400 fill-yellow-400 mr-1"
                  />
                  <span className="font-bold">
                    {selectedHotel.rating} / 5.0
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800">
                    {selectedHotel.precio}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedHotel.descripcion}</p>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Servicios y Comodidades
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedHotel.servicios.map((servicio, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                        {servicio === "WiFi" && (
                          <Wifi size={16} className="text-blue-600" />
                        )}
                        {servicio === "Piscina" && (
                          <Sparkles size={16} className="text-blue-600" />
                        )}
                        {servicio === "Restaurante" && (
                          <Sparkles size={16} className="text-blue-600" />
                        )}
                        {servicio === "Centro de negocios" && (
                          <span className="text-blue-600 font-bold">B</span>
                        )}
                        {servicio === "Spa" && (
                          <span className="text-blue-600 font-bold">S</span>
                        )}
                        {servicio === "Parque infantil" && (
                          <span className="text-blue-600">👶</span>
                        )}
                      </div>
                      <span>{servicio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore?category=hoteleria">
                  <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Conoce Nuestro Hoteles Metropolitano
                  </button>
                </Link>
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
    </main>
  );
}
