// src/app/infopractica.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import {
  FaPlane,
  FaBus,
  FaCar,
  FaMoneyBillWave,
  FaShieldAlt,
  FaHospital,
  FaWifi,
  FaClock,
  FaCalendarAlt,
  FaRoad,
  FaPaw,
} from "react-icons/fa";

const InfoPractica = () => {
  // Estados para el menú móvil y scroll
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Datos para las tarjetas de información
  const infoCards = [
    {
      id: 1,
      icon: <FaPlane className="text-3xl text-blue-500" />,
      title: "En Avión",
      content:
        "El Aeropuerto Internacional Viru Viru (VVI) es el principal aeropuerto de la región. Recibe vuelos nacionales e internacionales directos desde ciudades como Miami, Madrid y varias capitales sudamericanas. Desde el aeropuerto, puedes tomar un taxi oficial (aproximadamente 100 Bs al centro) o servicios de transporte privado.",
      image: "/images/avion2.jpg",
    },
    {
      id: 2,
      icon: <FaBus className="text-3xl text-green-500" />,
      title: "En Autobús",
      content:
        "La Terminal Bimodal es el principal centro de transporte terrestre. Conecta Santa Cruz con todas las ciudades importantes de Bolivia y destinos internacionales como Brasil y Argentina. Varias empresas ofrecen servicios con diferentes niveles de comodidad (económico, semi-cama, cama).",
      image: "/images/autobus1.jpg",
    },
    {
      id: 3,
      icon: <FaCar className="text-3xl text-red-500" />,
      title: "En Coche",
      content:
        "Las carreteras principales están bien mantenidas. Si alquilas un coche, ten en cuenta que el tráfico en el centro puede ser intenso durante horas pico. Se recomienda usar aplicaciones como Google Maps o Waze para navegación. Los precios de alquiler comienzan desde $30 USD por día.",
      image: "/images/coche1.jpg",
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="text-3xl text-yellow-500" />,
      title: "Moneda y Pagos",
      content:
        "La moneda oficial es el Boliviano (Bs). Puedes cambiar dólares y euros en casas de cambio autorizadas. La mayoría de establecimientos aceptan tarjetas de crédito, pero es recomendable llevar efectivo para mercados locales y transporte. Los cajeros automáticos están ampliamente disponibles.",
      image: "/images/money.jpg",
    },
    {
      id: 5,
      icon: <FaShieldAlt className="text-3xl text-purple-500" />,
      title: "Seguridad",
      content:
        "Santa Cruz es generalmente segura, pero como en cualquier ciudad turística, se recomienda tomar precauciones básicas. Evita mostrar objetos de valor, no camines solo por zonas desconocidas de noche y mantén tus pertenencias seguras en áreas concurridas. Guarda una copia de tu pasaporte.",
      image: "/images/seguridad.jpg",
    },
    {
      id: 6,
      icon: <FaHospital className="text-3xl text-pink-500" />,
      title: "Salud",
      content:
        "Se recomienda vacuna contra la fiebre amarilla si planeas visitar áreas rurales. El agua del grifo no es potable - bebe siempre agua embotellada. Hay excelentes clínicas privadas como el Hospital Japonés. Contrata un seguro de viaje que cubra atención médica.",
      image: "/images/salud.jpg",
    },
  ];

  const additionalInfo = [
    {
      id: 7,
      icon: <FaWifi className="text-3xl text-blue-400" />,
      title: "Conexión a Internet",
      content:
        "La conexión Wi-Fi está disponible en la mayoría de hoteles, cafés y centros comerciales. Puedes comprar una tarjeta SIM local con datos móviles por aproximadamente 11 Bs (1,44 USD) en compañías como Tigo, Entel o Viva. La cobertura 4G es buena en la ciudad.",
    },
    {
      id: 8,
      icon: <FaClock className="text-3xl text-orange-500" />,
      title: "Horarios",
      content:
        "Los comercios abren entre 9:00-12:00 y 15:00-22:00. La hora de almuerzo es entre 12:00-14:00 y la cena a partir de las 20:00. Los bancos abren de 8:30 a 16:00. La vida nocturna es activa hasta tarde, especialmente los fines de semana.",
    },
    {
      id: 9,
      icon: <FaCalendarAlt className="text-3xl text-green-400" />,
      title: "Festividades Principales",
      content:
        "• Carnaval (febrero/marzo) - La fiesta más grande del año\n• Feria Exposición (septiembre) - Evento comercial y cultural\n• Fiesta de la Virgen de Cotoca (diciembre) - Peregrinación religiosa\n• Aniversario de Santa Cruz (24 de septiembre)",
    },
    {
      id: 10,
      icon: <FaRoad className="text-3xl text-gray-600" />,
      title: "Conducir en Santa Cruz",
      content:
        "Se requiere licencia de conducir internacional. El tráfico es caótico en el centro - usa taxis o aplicaciones como Uber o Yango para moverte dentro de la ciudad. Las carreteras a pueblos cercanos son generalmente buenas. Estacionamiento: los centros comerciales ofrecen estacionamiento gratuito.",
    },
    {
      id: 11,
      icon: <FaPaw className="text-3xl text-brown-500" />,
      title: "Mascotas",
      content:
        "Para ingresar con mascotas se necesita certificado de salud y vacuna antirrábica vigente. Algunos hoteles aceptan mascotas con cargo adicional. Evita pasear perros en horas de mucho calor y lleva siempre agua para ellos.",
    },
  ];

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
      {/* NAVBAR FIN */}

      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <Image
            src="..\images\imag4.webp"
            alt="Santa Cruz de la Sierra"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-90"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Información Práctica
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg">
            Todo lo que necesitas saber para disfrutar de Santa Cruz de la
            Sierra, Bolivia
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Bienvenido a Santa Cruz de la Sierra
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            La ciudad más grande de Bolivia te espera con su clima tropical,
            rica cultura y naturaleza exuberante. Conocida como la "tierra del
            verano eterno", Santa Cruz combina modernidad con tradición en una
            experiencia única.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md text-left">
            <p className="font-semibold text-yellow-800">💡 Consejo Cruceño:</p>
            <p>
              No olvides probar el "sonso" (masaco de yuca ) y el delicioso jugo
              de tamarindo mientras exploras la ciudad.
            </p>
          </div>
        </div>

        {/* Clima y Mejor Época para Visitar */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 max-w-4xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <Image
                src="..\images\clima.jpg"
                alt="Clima de Santa Cruz"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                  />
                </svg>
                Clima y Mejor Época para Visitar
              </h3>
              <p className="text-gray-600 mb-4">
                Santa Cruz disfruta de un clima tropical con dos estaciones
                principales:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700">
                    Invierno (Mayo - Octubre)
                  </h4>
                  <p>Temperaturas: 18°C - 28°C</p>
                  <p>Menos lluvias, días soleados</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-700">
                    Verano (Noviembre - Abril)
                  </h4>
                  <p>Temperaturas: 22°C - 35°C</p>
                  <p>Lluvias tropicales, alta humedad</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                <span className="font-semibold">
                  La mejor época para visitar:
                </span>{" "}
                Mayo a septiembre, cuando el clima es más fresco y seco, ideal
                para explorar la ciudad y los parques naturales.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de información principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {infoCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-90"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  {card.icon}
                  <h3 className="text-xl font-bold text-gray-800 ml-3">
                    {card.title}
                  </h3>
                </div>
                <p className="text-gray-600">{card.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Más Información Útil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalInfo.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 transition-colors duration-300 rounded-r"
              >
                <div className="flex items-center mb-2">
                  {item.icon}
                  <h3 className="text-xl font-bold text-gray-800 ml-3">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Consejos finales */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¡Disfruta de Santa Cruz!
          </h3>
          <p className="text-lg mb-6">
            Con su mezcla única de cultura, naturaleza y modernidad, Santa Cruz
            te ofrece una experiencia inolvidable. No olvides visitar el
            Biocentro Güembé, el Jardín Botánico, la Catedral Metropolitana.
          </p>
          <div className="inline-block bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
            ¡Bienvenido a la tierra de la eterna primavera!
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 Santa Cruz de la Sierra - Bolivia</p>
          <p className="mt-2">Información turística actualizada</p>
        </div>
      </footer>
    </main>
  );
};

export default InfoPractica;
