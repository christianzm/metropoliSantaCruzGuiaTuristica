"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  MapPin,
  Star,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  XCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";

export default function EventoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  type Lugar = typeof lugares[0];
  const [selectedPlace, setSelectedPlace] = useState<Lugar | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
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
      nombre: "Las Cabañas del Río Piraí",
      tipo: "Restaurante",
      descripcion:
        "Ubicado a orillas del río Piraí, este restaurante ofrece una experiencia única con platos tradicionales cruceños en un ambiente natural y acogedor.",
      imagenes: ["/rio-pirai-1.jpg", "/rio-pirai-2.jpg"],
      calificacion: 4.8,
      horario: "Lunes a Domingo: 08:00 - 19:00",
      direccion: "Av. Roca Y Coronado 4to anillo",
      ubicacion: "https://maps.app.goo.gl/j8oq4gWSQcGGwRPK7",
    },
    {
      id: 2,
      nombre: "Mercado 7 Calles",
      tipo: "Mercado",
      descripcion:
        "El mercado más emblemático de Santa Cruz, con más de 100 años de historia. Ofrece una gran variedad de productos locales, artesanías y comida tradicional.",
      imagenes: [
        "/mercado-7-calles-1.jpg",
        "/mercado-7-calles-2.jpg",
        "/mercado-7-calles-3.jpg",
      ],
      calificacion: 4.5,
      horario: "Lunes a Sábado: 08:00 - 19:00",
      direccion: "Isabel La Catolica, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/4koF6gH5bzbpe2HVA",
    },
    {
      id: 3,
      nombre: "La Casa del Camba",
      tipo: "Restaurante",
      descripcion:
        "Famoso por su deliciosa carne asada y ambiente tradicional. Un lugar ideal para degustar la auténtica gastronomía cruceña.",
      imagenes: ["/casa-camba-1.jpg"],
      calificacion: 4.7,
      horario: "Lunes a Domingo: 11:00 - 23:00",
      direccion: "Av. Cristobal de Mendoza 1365, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/roTzGuoUcj7AYdCJ8",
    },
    {
      id: 4,
      nombre: "El Aljibe",
      tipo: "Restaurante",
      descripcion:
        "Restaurante de alta cocina con fusión de sabores locales e internacionales. Destaca por su ambiente elegante y atención personalizada.",
      imagenes: ["/aljibe-1.jpg", "/aljibe-2.jpg"],
      calificacion: 4.9,
      horario: "Lunes a Domingo: 11:00 - 22:00",
      direccion: "Calle Potosi, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/W34n9KXJ9f55L4zX9",
    },
    {
      id: 5,
      nombre: "La Pascana",
      tipo: "Restaurante",
      descripcion:
        "Especializado en comida típica cruceña como el majao, locro y sonso. Ambiente familiar y acogedor con decoración tradicional.",
      imagenes: ["/pascana-1.jpg", "/pascana-2.jpg"],
      calificacion: 4.6,
      horario: "Todos los días: 11:00 - 00:00",
      direccion: "Calle Rene Moreno, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/64Lbv9tfuzGEhUKY6",
    },
    {
      id: 6,
      nombre: "Mercado El Bosque",
      tipo: "Mercado",
      descripcion:
        "Conocido por sus frutas tropicales y productos frescos. Un lugar colorido donde se puede experimentar la vida cotidiana cruceña.",
      imagenes: ["/mercado-bosque-1.jpg"],
      calificacion: 4.3,
      horario: "Lunes a Domingo: 07:00 - 17:00",
      direccion: "5 anillo doble via la guardia, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/rU3cu91r67R75S5FA",
    },
    {
      id: 7,
      nombre: "Mercado Nuevo",
      tipo: "Mercado",
      descripcion:
        "El mercado más moderno de la ciudad con una amplia variedad de productos, desde alimentos hasta artesanías y ropa.",
      imagenes: ["/mercado-nuevo-1.jpg", "/mercado-nuevo-2.jpg"],
      calificacion: 4.4,
      horario: "Lunes a Domingo: 7:00 - 20:00",
      direccion: "calle sucre y cochabamba, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/rtDzDNeygraBTDge8",
    },
    {
      id: 8,
      nombre: "Orquideario",
      tipo: "Restaurante",
      descripcion:
        "Ubicado en un hermoso jardín de orquídeas, ofrece una experiencia gastronómica única con platos internacionales y ambiente romántico.",
      imagenes: [
        "/orquideario-1.jpg",
        "/orquideario-2.jpg",
        "/orquideario-3.jpg",
      ],
      calificacion: 4.9,
      horario: "Martes a Domingo: 09:00 - 21:00",
      direccion: "Republiquetas 489, Santa Cruz de la Sierra",
      ubicacion: "https://maps.app.goo.gl/ykpC6ouHG4RQN5546",
    },
  ];

  const openPlaceDetails = (place: typeof lugares[0]) => {
    setSelectedPlace(place);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closePlaceDetails = () => {
    setSelectedPlace(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (!selectedPlace) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % selectedPlace.imagenes.length
    );
  };

  const prevImage = () => {
    if (!selectedPlace) return;
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedPlace.imagenes.length) %
        selectedPlace.imagenes.length
    );
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
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
      {/* NAVBAR FIN */}

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0">
          <div className="bg-[url('/santa-cruz-hero.jpg')] bg-cover bg-center w-full h-full animate-pan"></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fadeIn">
            Descubre Santa Cruz
          </h1>
          <h2 className="text-2xl md:text-3xl text-green-300 mb-8 font-light animate-fadeIn delay-300">
            Sabores y Tradiciones de la Ciudad Metropolitana
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => {
                const lugaresSection = document.getElementById("lugares");
                if (lugaresSection) {
                  lugaresSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
              Explorar Lugares <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6 z-20 animate-bounce-slow">
          <ChevronDown size={30} className="text-white" />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Gastronomía y Cultura Cruceña
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Santa Cruz de la Sierra te invita a explorar su rica cultura
              gastronómica a través de sus emblemáticos restaurantes y vibrantes
              mercados. Descubre sabores auténticos, ingredientes frescos y
              tradiciones que han perdurado por generaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Utensils size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Sabores Auténticos
              </h3>
              <p className="text-gray-700">
                Degusta platos tradicionales como el locro, el majadito y el
                sonso, preparados con recetas ancestrales y los mejores
                ingredientes locales.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingBasket size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Mercados Vibrantes
              </h3>
              <p className="text-gray-700">
                Explora mercados llenos de color donde encontrarás frutas
                tropicales, artesanías y el espíritu hospitalario del pueblo
                cruceño.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake size={30} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Experiencias Únicas
              </h3>
              <p className="text-gray-700">
                Vive momentos inolvidables en entornos naturales y espacios
                culturales que combinan tradición con modernidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LUGARES SECTION */}
      <section id="lugares" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Lugares Destacados
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubre los restaurantes y mercados más emblemáticos de Santa
              Cruz de la Sierra, cada uno con su propia historia y encanto
              único.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lugares.map((lugar) => (
              <div
                key={lugar.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openPlaceDetails(lugar)}
              >
                <div className="relative">
                  <div
                    className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48"
                    style={{
                      backgroundImage: `url(${lugar.imagenes[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star size={16} className="mr-1" /> {lugar.calificacion}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {lugar.nombre}
                    </h3>
                    <p className="text-green-300 text-sm">{lugar.tipo}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {lugar.descripcion}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <a
                        href={lugar.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline hover:text-green-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {lugar.direccion?.split(",")[0] || lugar.direccion}
                      </a>
                    </div>
                    <button
                      className="text-green-600 hover:text-green-800 font-medium flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPlaceDetails(lugar);
                      }}
                    >
                      Ver más <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS SECTION */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-cyan-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Lo Que Dicen Nuestros Visitantes
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">Carlos Fernández</h4>
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Las Cabañas del Río Piraí es un lugar mágico. La comida es
                excepcional y el ambiente junto al río es inigualable. ¡Volveré
                pronto!"
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">María Rodríguez</h4>
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "El Mercado 7 Calles es una experiencia única. Los colores, los
                sabores y la calidez de su gente te transportan a la esencia de
                Santa Cruz."
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">Juan Pérez</h4>
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "El Orquideario es un paraíso escondido. La combinación de
                naturaleza exótica y gastronomía de primer nivel lo convierten
                en una visita obligada."
              </p>
            </div>
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
                  <Facebook size={20} className={undefined} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Instagram size={20} className={undefined} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Twitter size={20} className={undefined} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Youtube size={20} className={undefined} />
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

      {/* MODAL DETALLES LUGAR */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="relative">
              <div
                className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-80"
                style={{
                  backgroundImage: selectedPlace
                    ? `url(${selectedPlace.imagenes[currentImageIndex]})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button
                  onClick={closePlaceDetails}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <X size={24} className="text-gray-800" />
                </button>

                {selectedPlace.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                    >
                      <ChevronLeft size={24} className="text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                    >
                      <ChevronRight size={24} className="text-gray-800" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => openImageModal(currentImageIndex)}
                  className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition"
                >
                  <Maximize2 size={20} className="text-gray-800" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 flex gap-2">
                {selectedPlace.imagenes.map((_, index: number) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex
                        ? "bg-green-600"
                        : "bg-white/60"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-auto">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-green-800">
                    {selectedPlace.nombre}
                  </h2>
                  <p className="text-green-600">{selectedPlace.tipo}</p>
                </div>
                <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                  <Star size={20} className="text-yellow-500 mr-1" />
                  <span className="font-bold text-green-800">
                    {selectedPlace.calificacion}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedPlace.descripcion}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-green-800 mb-2 flex items-center">
                    <MapPin size={18} className="mr-2" /> Dirección
                  </h3>
                  <a
                    href={selectedPlace.ubicacion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:underline hover:text-green-800"
                  >
                    {selectedPlace.direccion}
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-green-800 mb-2 flex items-center">
                    <Clock size={18} className="mr-2" /> Horario
                  </h3>
                  <p className="text-gray-700">{selectedPlace.horario}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-green-800 mb-3">
                  Galería de Imágenes
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedPlace.imagenes.map((img, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-200 border-2 border-dashed rounded-lg aspect-video cursor-pointer hover:opacity-80 transition"
                      style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      onClick={() => {
                        setCurrentImageIndex(index);
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closePlaceDetails}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL IMAGEN AMPLIADA */}
      {showImageModal && selectedPlace && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <XCircle size={32} />
          </button>

          <div className="relative max-w-6xl w-full max-h-[90vh]">
            <div
              className="bg-gray-200 border-2 border-dashed w-full h-[80vh]"
              style={{
                backgroundImage: `url(${selectedPlace?.imagenes[currentImageIndex]})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {selectedPlace?.imagenes.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

// Componentes de iconos adicionales SOLO los que no existen en lucide-react
interface IconProps {
  size?: number;
  className?: string;
}

const ChevronDown = ({ size = 24, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Utensils = ({ size = 24, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

const ShoppingBasket = ({ size = 24, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m5 11 4-7" />
    <path d="m19 11-4-7" />
    <path d="M2 11h20" />
    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
    <path d="m9 11 1 9" />
    <path d="M4.5 15.5h15" />
    <path d="m15 11-1 9" />
  </svg>
);

const HeartHandshake = ({ size = 24, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    <path d="m18 15-2-2" />
    <path d="m15 18-2-2" />
  </svg>
);

const Clock = ({ size = 24, className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
