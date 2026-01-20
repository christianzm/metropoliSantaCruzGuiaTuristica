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
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

const t = {
  links: "Enlaces",
  home: "Inicio",
  explore: "Explorar",
  featured: "Destacados",
  categories: "Categorías",
};
const lugares = [
  {
    id: 1,
    nombre: "Hard Rock Cafe",
    descripcion:
      "El emblemático Hard Rock Cafe de Santa Cruz ofrece una experiencia única con su ambiente rockero, comida americana y recuerdos de leyendas de la música. Ideal para disfrutar de conciertos en vivo y eventos especiales.",
    categoria: "Restaurante & Bar",
    horario: "Lunes a Miercoles y Domingo: 12:00 - 00:00  Jueves a sabado : 12:00 - 01:00",
    ubicacion: "https://maps.app.goo.gl/9EcEG8Q3RJcJBY8E9",
    imagen:
      "https://media.istockphoto.com/id/2166773378/es/foto/autumn-on-lake-gosau-in-salzkammergut-austria.jpg?b=1&s=612x612&w=0&k=20&c=5CjOhXBC0qPkxRzeCD_JWlBcdSCHt2_cqyxJ-Y_0zk4=",
    color: "#e63946",
  },
  {
    id: 2,
    nombre: "Casa Grande",
    descripcion:
      "Uno de los centros de entretenimiento más grandes de Santa Cruz, con múltiples salas de cine, restaurantes, boutiques y zona de juegos. El lugar perfecto para pasar todo el día con amigos.",
    categoria: "Centro Comercial",
    horario: "Viernes a Domingo: 11:00 - 23:00",
    ubicacion: "https://maps.app.goo.gl/c54mjGhmL6kyKeum9",
    imagen:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000",
    color: "#1d3557",
  },
  {
    id: 3,
    nombre: "Chaplin Show",
    descripcion:
      "El teatro más innovador de Santa Cruz con espectáculos de comedia, monólogos y shows musicales. Un espacio cultural donde artistas locales e internacionales muestran su talento.",
    categoria: "Teatro & Espectáculos",
    horario: "Viernes y Sábado: 20:00 - 23:00",
    ubicacion: "https://maps.app.goo.gl/5mCU4dAr59nweX1s9",
    imagen:
      "https://images.unsplash.com/photo-1543429776-2782fc586c6a?q=80&w=1000",
    color: "#e9c46a",
  },
  {
    id: 4,
    nombre: "La Pascana",
    descripcion:
      "Un espacio cultural y gastronómico en el corazón de Santa Cruz. Con sus patios coloniales, restaurantes y eventos culturales, es el lugar ideal para disfrutar de la noche cruceña.",
    categoria: "Complejo Cultural",
    horario: "Lunes a Domingo: 10:00 - 01:00",
    ubicacion: "https://maps.app.goo.gl/tFsv8NufEvWbqSXb7",
    imagen:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
    color: "#2a9d8f",
  },
  {
    id: 5,
    nombre: "Arena 26",
    descripcion:
      "La discoteca más grande y moderna de Santa Cruz con tecnología de punta en sonido e iluminación. Atrae a los mejores DJs nacionales e internacionales para noches inolvidables.",
    categoria: "Discoteca",
    horario: "Vierne a Sábado: 20:00 - 04:00",
    ubicacion: "https://maps.app.goo.gl/k8zqQh4ypoCQX4848",
    imagen:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000",
    color: "#9b5de5",
  },
  {
    id: 6,
    nombre: "Show de Mier",
    descripcion:
      "El show de comedia más famoso de Santa Cruz, conocido por su humor irreverente y crítico. Una experiencia única que satiriza la realidad boliviana con mucho talento local.",
    categoria: "Show de Comedia",
    horario: "Sábados: 21:00 - 23:30",
    ubicacion: "https://maps.app.goo.gl/4X5Kv5XjkybXJTXJA",
    imagen:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000",
    color: "#f15bb5",
  },
];

export default function LugaresTuristicos() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRefs = useRef([]);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Configurar Intersection Observer para animaciones
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar cada sección
    sectionRefs.current.forEach((section) => {
      if (section) observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const openLightbox = (place) => {
    setSelectedPlace(place);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPlace(null);
    document.body.style.overflow = "auto";
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    document
      .getElementById(`lugar-${index}`)
      .scrollIntoView({ behavior: "smooth" });
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

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="absolute inset-0 bg-[url('https://www.dzoom.org.es/wp-content/uploads/2017/07/seebensee-2384369-810x540.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-500">
              Diversión Juvenil en Santa Cruz
            </h1>

            <p className="text-xl text-white font-semibold max-w-3xl mx-auto">
              Descubre los mejores lugares para disfrutar la noche y el
              entretenimiento en la ciudad más vibrante de Bolivia
            </p>
          </div>

          {/* Miniaturas de lugares */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {lugares.map((lugar, index) => (
                  <button
                    key={lugar.id}
                    onClick={() => handleDotClick(index)}
                    className={`p-2 rounded-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      activeIndex === index
                        ? "bg-gradient-to-r from-emerald-600 to-green-500 shadow-lg shadow-emerald-500/20 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative w-10 h-10 mb-1 rounded-xl overflow-hidden">
                        <Image
                          src={lugar.imagen}
                          alt={lugar.nombre}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl"
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {lugar.nombre.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE LUGARES TURÍSTICOS */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {lugares.map((lugar, index) => (
          <section
            key={lugar.id}
            id={`lugar-${index}`}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="py-5 md:py-8 opacity-0 transform translate-y-10 transition-all duration-700"
            style={{ backgroundColor: index % 2 === 0 ? "#f9fafb" : "white" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Contenido - Alterna entre izquierda y derecha */}
              <div
                className={`order-1 ${
                  index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl opacity-10 blur-xl"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        backgroundColor: `${lugar.color}20`,
                        color: lugar.color,
                      }}
                    >
                      {lugar.categoria}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                      {lugar.nombre}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {lugar.descripcion}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center text-gray-700 mb-2">
                        <span className="font-medium">Horario:</span>
                        <span className="ml-2">{lugar.horario}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => openLightbox(lugar)}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-500 rounded-lg font-medium text-white hover:from-emerald-500 hover:to-green-400 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 flex items-center"
                      >
                        Ver más fotos{" "}
                        <ChevronRight className="ml-2" size={18} />
                      </button>

                      <a
                        href={lugar.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-white rounded-lg font-medium hover:bg-gray-100 transition-all border border-gray-300 flex items-center"
                      >
                        <MapPin className="mr-2" size={18} /> Ver ubicación
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Imagen con efecto 3D - Alterna entre izquierda y derecha */}
              <div
                className={`order-2 ${
                  index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                } relative`}
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-all duration-500"></div>
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer transform transition duration-700 group-hover:-translate-y-2 group-hover:shadow-emerald-500/20"
                    onClick={() => openLightbox(lugar)}
                  >
                    <div className="relative w-full h-80 md:h-96">
                      <Image
                        src={lugar.imagen}
                        alt={lugar.nombre}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl"
                      />
                    </div>

                    {/* Efecto 3D */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="text-white text-xl font-bold">
                        Ver más fotos →
                      </span>
                    </div>
                  </div>

                  {/* Elemento decorativo */}
                  <div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-xl z-0"
                    style={{ backgroundColor: lugar.color }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* LIGHTBOX PARA DETALLES */}
      {selectedPlace && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                  style={{
                    backgroundColor: `${selectedPlace.color}20`,
                    color: selectedPlace.color,
                  }}
                >
                  {selectedPlace.categoria}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2 text-gray-800">
                  {selectedPlace.nombre}
                </h2>
                <p className="text-gray-600 mb-6">
                  {selectedPlace.descripcion}
                </p>

                <div className="mb-6">
                  <div className="flex items-center text-gray-700 mb-2">
                    <span className="font-medium">Horario:</span>
                    <span className="ml-2">{selectedPlace.horario}</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-80 mb-6">
                <Image
                  src={selectedPlace.imagen}
                  alt={selectedPlace.nombre}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>

              <div className="flex justify-center">
                <a
                  href={selectedPlace.ubicacion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-lg font-medium hover:from-emerald-500 hover:to-green-400 transition-all flex items-center"
                >
                  <MapPin className="mr-2" size={18} /> Ver en Google Maps{" "}
                  <ArrowUpRight className="ml-2" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
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
      {/* FOOTER */}
      <footer className="bg-green-900   text-white py-12">
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

      {/* Puntos de navegación */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
        {lugares.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index
                ? "bg-gradient-to-r from-emerald-600 to-green-500 w-4 h-4"
                : "bg-gray-300"
            }`}
            aria-label={`Ir a ${lugares[index].nombre}`}
          />
        ))}
      </div>

      {/* Animación de scroll */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce hidden md:block">
        <div className="w-10 h-16 rounded-3xl border-2 border-emerald-500 flex justify-center p-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-scroll"></div>
        </div>
      </div>

      {/* Estilos globales */}
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
          animation: fadeInUp 0.7s ease-out forwards;
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </main>
  );
}
