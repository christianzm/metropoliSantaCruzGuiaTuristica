"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  ArrowRight,
  Download,
  Expand,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  const [activeEvent, setActiveEvent] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeMonth, setActiveMonth] = useState("Todos");
  const modalRef = useRef(null);
  const t = {
    links: "Enlaces",
    home: "Inicio",
    explore: "Explorar",
    featured: "Destacados",
    categories: "Categorías",
  };
  // Datos de los eventos turísticos
  const eventos = [
    {
      id: 1,
      title: "Carnaval de Santa Cruz",
      date: "Febrero",
      month: "Febrero",
      description:
        "El Carnaval cruceño es una de las fiestas más importantes y coloridas de Bolivia, llena de comparsas, carrozas y música tradicional.",
      image: "/carnaval.jpg",
      location: "Centro de Santa Cruz",
      ubicacion: "https://maps.app.goo.gl/rmRbpXQFJ3WrV7Dv6",
    },
    {
      id: 2,
      title: "Aniversario de Santa Cruz",
      date: "24 de Septiembre",
      month: "Septiembre",
      description:
        "Celebración del aniversario de la fundación de Santa Cruz de la Sierra con desfiles cívicos, ferias y eventos culturales.",
      image: "/aniversario.jpg",
      location: "Plaza 24 de Septiembre",
      ubicacion: "https://maps.app.goo.gl/se2yB4sYsEWrR5iw7",
    },
    {
      id: 3,
      title: "Día de la Primavera",
      date: "21 de Septiembre",
      month: "Septiembre",
      description:
        "Festejo de la llegada de la primavera con flores, música y actividades al aire libre en toda la ciudad.",
      image: "/primavera.jpg",
      location: "Parques y plazas",
      ubicacion: "https://maps.app.goo.gl/vHKz8DZ53d9GPrNn6",
    },
    {
      id: 4,
      title: "Feria de ExpoCruz",
      date: "Todo Septiembre",
      month: "Septiembre",
      description:
        "La feria más grande del oriente boliviano, con exposiciones comerciales, ganaderas, industriales y culturales.",
      image: "/expocruz.jpg",
      location: "Fexpocruz",
      ubicacion: "https://maps.app.goo.gl/VVWAMQTUG12Ywugu8",
    },
    {
      id: 5,
      title: "Día de la Tradición",
      date: "1 de Septiembre",
      month: "Septiembre",
      description:
        "Día dedicado a las tradiciones cruceñas, con música, danzas típicas, gastronomía y artesanías.",
      image: "/tradicion.jpg",
      location: "Centro Histórico",
      ubicacion: "https://maps.app.goo.gl/JiAUsLPavoDMaG8A7",
    },
    {
      id: 6,
      title: "San Juan en Porongo",
      date: "24 de Junio",
      month: "Junio",
      description:
        "Celebración en el municipio de Porongo con fogatas, juegos tradicionales y gastronomía típica.",
      image: "/san-juan.jpg",
      location: "Municipio de Porongo",
      ubicacion: "https://maps.app.goo.gl/wSCbBiue6L7tyCxG9",
    },
    {
      id: 7,
      title: "Romería de Cotoca",
      date: "7 de Diciembre",
      month: "Diciembre",
      description:
        "Peregrinación a la Virgen de Cotoca, patrona del oriente boliviano, con miles de devotos.",
      image: "/cotoca.jpg",
      location: "Santuario de Cotoca",
      ubicacion: "https://maps.app.goo.gl/JpoPW1o9XBzZW3HcA",
    },
    {
      id: 8,
      title: "Feria de las Alasitas",
      date: "Septiembre",
      month: "Septiembre",
      description:
        "Feria donde se venden miniaturas para la buena suerte, tradición andina adaptada en Santa Cruz.",
      image: "/alasitas.jpg",
      location: "Cambódromo de Santa Cruz",
      ubicacion: "https://maps.app.goo.gl/3ti2YktKiuzCYbX27",
    },
  ];

  // Filtros por mes
  const meses = ["Todos", "Febrero", "Junio", "Septiembre", "Diciembre"];

  // Eventos filtrados
  const filteredEventos =
    activeMonth === "Todos"
      ? eventos
      : eventos.filter((evento) => evento.month === activeMonth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cambiar evento activo cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % eventos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [eventos.length]);

  // Manejar el cambio de evento
  const handleEventChange = (index) => {
    setActiveEvent(index);
  };

  // Manejar clic fuera del modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 font-sans min-h-screen">
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

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-700/10 z-0"></div>
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
              Cultura Viva de{" "}
              <span className="text-yellow-500">Santa Cruz</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Descubre los eventos más vibrantes que pintan de color nuestra
              región
            </p>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full inline-flex items-center gap-2 transition duration-300"
              >
                <span>Explorar Tradiciones</span>
                <ArrowRight size={18} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carrusel 3D de Eventos */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Eventos Emblemáticos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conoce las celebraciones que definen el espíritu festivo cruceño
            </p>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-4"></div>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Carrusel 3D */}
            <div className="relative h-[500px] perspective-1000 overflow-hidden rounded-3xl shadow-2xl">
              {eventos.map((evento, index) => {
                const position = index - activeEvent;
                const absPosition = Math.abs(position);

                return (
                  <motion.div
                    key={evento.id}
                    className={`absolute w-full h-full rounded-3xl overflow-hidden cursor-pointer ${
                      position === 0 ? "z-10" : "z-0"
                    }`}
                    initial={false}
                    animate={{
                      x: position * 300,
                      scale: 1 - absPosition * 0.2,
                      opacity: 1 - absPosition * 0.5,
                      rotateY: position * 30,
                      filter: `blur(${absPosition * 4}px)`,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{
                      backgroundImage: `url(${evento.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => setSelectedImage(evento)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                      <div className="flex gap-3 mb-3">
                        <div className="flex items-center gap-1 bg-green-700 px-3 py-1 rounded-full">
                          <Calendar size={16} />
                          <span>{evento.date}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-green-700 px-3 py-1 rounded-full">
                          <MapPin size={16} />
                          <span>{evento.location}</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-2">
                        {evento.title}
                      </h3>
                      <p className="text-lg opacity-90">{evento.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Controles del carrusel */}
            <div className="flex justify-center mt-8 gap-3">
              {eventos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleEventChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeEvent ? "bg-green-600 w-8" : "bg-gray-300"
                  }`}
                  aria-label={`Ir al evento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal para imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-green-700">
                    <Calendar size={18} />
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-700">
                    <MapPin size={18} />
                    {selectedImage.ubicacion ? (
                      <a
                        href={selectedImage.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {selectedImage.location}
                      </a>
                    ) : (
                      <span>{selectedImage.location}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-lg">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendario de Eventos - Nuevo Diseño */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Calendario Festivo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planifica tu visita según las fechas de nuestras celebraciones
            </p>
          </motion.div>

          {/* Filtros por mes */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {meses.map((mes) => (
              <button
                key={mes}
                onClick={() => setActiveMonth(mes)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeMonth === mes
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {mes}
              </button>
            ))}
          </div>

          {/* Grid de eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEventos.map((evento) => (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-green-100"
              >
                <div
                  className="h-60 overflow-hidden relative cursor-pointer"
                  onClick={() => setSelectedImage(evento)}
                >
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-110"
                    style={{ backgroundImage: `url(${evento.image})` }}
                  ></div>
                  <div className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full">
                    <Expand size={20} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <Calendar size={18} />
                      <span className="font-semibold">{evento.date}</span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {evento.month}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {evento.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{evento.description}</p>
                  <div className="flex items-center gap-2 text-green-700">
                    <MapPin size={16} />
                    {evento.ubicacion ? (
                      <a
                        href={evento.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {evento.location}
                      </a>
                    ) : (
                      <span>{evento.location}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guía Turística */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-green-800 p-8 flex items-center">
                <div className="text-center w-full">
                  <img
                    src="/folleto/imagen1.png"
                    alt="Guía Turística"
                    className="rounded-xl w-32 h-32 mx-auto object-cover border-2 border-dashed border-gray-200 bg-white"
                  />
                  <h3 className="text-white text-2xl font-bold mt-4">
                    Guía Turística 2024
                  </h3>
                  <p className="text-green-200 mt-2">
                    Todo lo que necesitas saber
                  </p>
                </div>
              </div>
              <div className="md:w-3/5 p-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                  Descubre Santa Cruz como un local
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Nuestra guía turística incluye mapas detallados, calendario
                  completo de eventos, recomendaciones gastronómicas y los
                  secretos mejor guardados de la ciudad.
                </p>
                <ul className="grid grid-cols-2 gap-4 mb-8">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Mapas interactivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Calendario festivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Gastronomía local</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Transporte y rutas</span>
                  </li>
                </ul>
                <div className="flex gap-4">
                  <a
                    href="/folleto/GUIA1.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full inline-flex items-center gap-3 transition duration-300"
                    >
                      <Download size={20} />
                      <span>Descargar Guía Completa</span>
                    </motion.div>
                  </a>
                  <Link href="/explore" className="inline-block">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full inline-flex items-center gap-3 transition duration-300"
                    >
                      <MapPin size={20} />
                      <span>Ver Mapa</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
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
