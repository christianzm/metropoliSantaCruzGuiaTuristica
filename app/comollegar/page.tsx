// --- INICIO: IMPORTACIONES Y CONFIGURACIONES ---
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, ChevronDown, Plane, Bus, Car, Menu, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Importaciones dinámicas de Leaflet para evitar problemas con SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// --- DATOS DE PUNTOS DE LLEGADA ---
const points = [
  {
    name: "Aeropuerto Internacional Viru Viru (VVI)",
    position: [-17.64472, -63.13528],
    image: "https://www.avionrevue.com/wp-content/uploads/2024/08/ViruViru.jpg",
    description:
      "El principal aeropuerto internacional de Bolivia. Recibe vuelos de toda América y Europa. Aquí encontrarás todos los servicios necesarios a tu llegada.",
  },
  {
    name: "Terminal Bimodal - Santa Cruz",
    position: [-17.788889, -63.161111],
    image: "https://abi.bo/images/2024/Octubre/22/BIMODAL_1.jpg",
    description:
      "Conecta Santa Cruz con todo el país y destinos internacionales por tierra. Es el punto neurálgico del transporte en autobús y tren.",
  },
  {
    name: "Aeropuerto El Trompillo (SRZ)",
    position: [-17.8009399, -63.1759294],
    image: "https://sce.bo/wp-content/uploads/2024/06/trompillo-1024x576.jpg",
    description:
      "Ubicado dentro de la ciudad, este aeropuerto opera principalmente vuelos nacionales, regionales y de aviación general.",
  },
];

// --- COMPONENTE: FAQ Item ---
interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={24}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen mt-4" : "max-h-0"
        }`}
      >
        <div className="prose prose-blue max-w-none text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ComoLlegar = () => {
  // Estados para el menú móvil y scroll
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* HERO / PORTADA */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        {/* Imagen de fondo */}
        <img
          src="../images/imag1.jpg"
          alt="Mapa y viaje a Santa Cruz"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay oscuro para mejorar contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Texto centrado sobre la imagen */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4">
          <h1
            className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg mb-4"
            style={{ fontFamily: "'Satisfy', cursive" }}
          >
            Cómo Llegar a Santa Cruz de la Sierra
          </h1>

          <p className="text-white text-lg md:text-xl font-medium drop-shadow">
            Diferentes maneras de viajar
          </p>
        </div>
      </div>
      {/* CONTENIDO POSTERIOR */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* MEDIOS DE TRANSPORTE */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ponete cómodo y elegí cómo llegar a Santa Cruz
          </h2>
          <p className="text-gray-700 mb-6">
            ¿Querés saber cómo moverte desde el aeropuerto o la terminal? ¿Te
            interesa conocer las opciones para alquilar un coche? Para que
            vengas totalmente preparado, aquí detallamos tus opciones y
            contestamos a las dudas más comunes para que tu llegada a Santa Cruz
            sea perfecta.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Avión */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Plane className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">En Avión</h3>
              <p className="text-gray-600 mt-2">
                El Aeropuerto Internacional Viru Viru (VVI) es tu puerta de
                entrada, con conexiones nacionales e internacionales.
              </p>
            </div>
            {/* Autobús */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Bus className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">
                En Autobús
              </h3>
              <p className="text-gray-600 mt-2">
                La Terminal Bimodal conecta con todo el país y países vecinos,
                ofreciendo una alternativa económica.
              </p>
            </div>
            {/* Coche */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Car className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">En Coche</h3>
              <p className="text-gray-600 mt-2">
                Accede por las principales carreteras del país. Usa Waze o
                Google Maps para una navegación sin problemas.
              </p>
            </div>
          </div>
        </div>

        {/* MAPA INTERACTIVO */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-200">
          <div className="flex items-center mb-4">
            <MapPin className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              Conocé nuestros puntos de llegada en Santa Cruz
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Explorá este mapa interactivo con los principales accesos a Santa
            Cruz de la Sierra. Hacé clic en los marcadores para ver imágenes,
            descripciones y cómo llegar fácilmente. Así tu llegada a la ciudad
            será de lo más tranquila.
          </p>

          <div className="overflow-hidden rounded-2xl border border-gray-300 shadow-md">
            <MapContainer
              center={[-17.76, -63.18]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: "500px", width: "100%" }}
              className="rounded-xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {points.map((point, index) => (
                <Marker key={index} position={point.position as [number, number]}>
                  <Popup>
                    <div className="w-64 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={point.image}
                        alt={`Imagen de ${point.name}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3 bg-white">
                        <h3 className="font-semibold text-base text-gray-800 mb-1">
                          {point.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {point.description}
                        </p>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${point.position[0]},${point.position[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-blue-600 !text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Cómo llegar
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* PREGUNTAS FRECUENTES - FUERA DEL CONTENEDOR */}
        <section className="w-full bg-white py-16 px-4 md:px-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full shadow-md animate-bounce-slow">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m8-2a10 10 0 11-20 0 10 10 0 0120 0z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-800">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              Todo lo que Necesitás Saber Antes de Viajar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <FaqItem question="¿Necesitaré visado o pasaporte?">
                <p>
                  El pasaporte es indispensable (mínimo 6 meses de validez).
                  <br />
                  Ciudadanos del Mercosur pueden ingresar con documento de
                  identidad.
                  <br />
                  Ciudadanos de la UE y EE.UU. no requieren visa por 90 días.
                  <br />
                  <a
                    href="https://cancilleria.gob.bo/mre/servicios/"
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 underline"
                  >
                    Ver requisitos oficiales
                  </a>
                </p>
              </FaqItem>

              <FaqItem question="¿Dónde puedo alquilar un coche y qué necesito?">
                <p>
                  En el Aeropuerto Viru Viru encontrarás agencias como Hertz y
                  Europcar:
                </p>
                <ul className="list-disc ml-5">
                  <li>Mayor de 25 años (desde 21 con cargo extra)</li>
                  <li>
                    Pasaporte y licencia vigente (idealmente internacional)
                  </li>
                  <li>Tarjeta de crédito a nombre del conductor</li>
                </ul>
                <a
                  href="https://abarrons.com/"
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 underline"
                >
                  Ver agencias y precios
                </a>
              </FaqItem>

              <FaqItem question="¿Qué hacer si tengo una emergencia?">
                <ul className="list-none text-sm mt-2 space-y-1">
                  <li>
                    <strong>Policía:</strong>{" "}
                    <a href="tel:110" className="text-blue-600 hover:underline">
                      110
                    </a>
                  </li>
                  <li>
                    <strong>Bomberos:</strong>{" "}
                    <a href="tel:119" className="text-blue-600 hover:underline">
                      119
                    </a>
                  </li>
                  <li>
                    <strong>Ambulancias:</strong>{" "}
                    <a href="tel:160" className="text-blue-600 hover:underline">
                      160
                    </a>{" "}
                    -{" "}
                    <a href="tel:165" className="text-blue-600 hover:underline">
                      165
                    </a>
                  </li>
                  <li>
                    <strong>Policía Turística SCZ:</strong>{" "}
                    <a
                      href="tel:+59133225016"
                      className="text-blue-600 hover:underline"
                    >
                      (+591) 3-322-5016
                    </a>
                  </li>
                </ul>
              </FaqItem>
            </div>

            <div className="space-y-6">
              <FaqItem question="¿Puedo cambiar moneda a Bolivianos (BOB)?">
                <p>
                  Sí. En el aeropuerto hay casas de cambio y cajeros. Aunque el
                  tipo es mejor en la ciudad, es útil cambiar algo al llegar.
                </p>
              </FaqItem>

              <FaqItem question="¿Voy a usar transporte público al centro?">
                <p>
                  Lo más seguro: taxis autorizados. También puedes tomar trufis
                  o microbuses fuera del aeropuerto: más baratos pero menos
                  directos.
                </p>
              </FaqItem>

              <FaqItem question="¿Podré usar mi celular en Bolivia?">
                <p>
                  Puedes activar roaming o comprar una SIM local (Tigo, Entel,
                  Viva). Necesitarás tu pasaporte.
                </p>
                <ul className="list-disc ml-5">
                  <li>
                    <a
                      href="https://www.tigo.com.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      Tigo Bolivia
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.entel.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      Entel Bolivia
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.viva.com.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      Viva Bolivia
                    </a>
                  </li>
                </ul>
              </FaqItem>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Santa Cruz de la Sierra - Bolivia</p>
          <p className="mt-2">Información turística actualizada</p>
        </div>
      </footer>
    </main>
  );
};

export default ComoLlegar;
