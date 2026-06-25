// --- INICIO: IMPORTACIONES Y CONFIGURACIONES ---
"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
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

// --- COMPONENTE: FAQ Item ---
interface FaqItemProps {
  question: string;
  children: React.ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, children }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
      >
        <span>{t(question)}</span>
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
  const { t } = useLanguage();

  // --- DATOS DE PUNTOS DE LLEGADA ---
  const points = [
    {
      name: t("comollegar.points.vvi.name"),
      position: [-17.64472, -63.13528],
      image: "https://www.avionrevue.com/wp-content/uploads/2024/08/ViruViru.jpg",
      description: t("comollegar.points.vvi.description"),
    },
    {
      name: t("comollegar.points.bimodal.name"),
      position: [-17.788889, -63.161111],
      image: "https://abi.bo/images/2024/Octubre/22/BIMODAL_1.jpg",
      description: t("comollegar.points.bimodal.description"),
    },
    {
      name: t("comollegar.points.trompillo.name"),
      position: [-17.8009399, -63.1759294],
      image: "https://sce.bo/wp-content/uploads/2024/06/trompillo-1024x576.jpg",
      description: t("comollegar.points.trompillo.description"),
    },
  ];

  const navLinks = [
    { href: "/", label: "nav.home" },
    { href: "/explore", label: "nav.explore" },
    { href: "/infosantacruz", label: "nav.santacruz" },
    { href: "/entretenimiento", label: "nav.enjoy" },
  ];

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
              {t("global.appName")}
            </span>
          </Link>

          {/* Enlaces centrados (desktop) */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-green-400 ${
                    isScrolled ? "text-gray-700 hover:text-green-600" : "text-black"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-green-700 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.label)}
                </Link>
              ))}
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
            {t("comollegar.hero.title")}
          </h1>

          <p className="text-white text-lg md:text-xl font-medium drop-shadow">
            {t("comollegar.hero.subtitle")}
          </p>
        </div>
      </div>
      {/* CONTENIDO POSTERIOR */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* MEDIOS DE TRANSPORTE */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("comollegar.transport.title")}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("comollegar.transport.description")}
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Avión */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Plane className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{t("comollegar.transport.plane.title")}</h3>
              <p className="text-gray-600 mt-2">
                {t("comollegar.transport.plane.description")}
              </p>
            </div>
            {/* Autobús */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Bus className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{t("comollegar.transport.bus.title")}</h3>
              <p className="text-gray-600 mt-2">
                {t("comollegar.transport.bus.description")}
              </p>
            </div>
            {/* Coche */}
            <div className="bg-gradient-to-b from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Car className="mx-auto h-14 w-14 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">{t("comollegar.transport.car.title")}</h3>
              <p className="text-gray-600 mt-2">
                {t("comollegar.transport.car.description")}
              </p>
            </div>
          </div>
        </div>

        {/* MAPA INTERACTIVO */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-200">
          <div className="flex items-center mb-4">
            <MapPin className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">
              {t("comollegar.map.title")}
            </h2>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {t("comollegar.map.description")}
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
                          {t("comollegar.map.getDirections")}
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
              {t("comollegar.faq.title")}
            </h2>
            <p className="text-gray-600 mt-2 text-lg">
              {t("comollegar.faq.subtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <FaqItem question="comollegar.faq.visa.question">
                <p>
                  {t("comollegar.faq.visa.answer.p1")}
                  <br />
                  {t("comollegar.faq.visa.answer.p2")}
                  <br />
                  {t("comollegar.faq.visa.answer.p3")}
                  <br />
                  <a
                    href="https://cancilleria.gob.bo/mre/servicios/"
                    target="_blank"
                    rel="noopener"
                    className="text-blue-600 underline"
                  >
                    {t("comollegar.faq.visa.answer.link")}
                  </a>
                </p>
              </FaqItem>

              <FaqItem question="comollegar.faq.carRental.question">
                <p>
                  {t("comollegar.faq.carRental.answer.p1")}
                </p>
                <ul className="list-disc ml-5">
                  <li>{t("comollegar.faq.carRental.answer.li1")}</li>
                  <li>
                    {t("comollegar.faq.carRental.answer.li2")}
                  </li>
                  <li>{t("comollegar.faq.carRental.answer.li3")}</li>
                </ul>
                <a
                  href="https://abarrons.com/"
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 underline"
                >
                  {t("comollegar.faq.carRental.answer.link")}
                </a>
              </FaqItem>

              <FaqItem question="comollegar.faq.emergency.question">
                <ul className="list-none text-sm mt-2 space-y-1">
                  <li>
                    <strong>{t("comollegar.faq.emergency.answer.police")}:</strong>{" "}
                    <a href="tel:110" className="text-blue-600 hover:underline">
                      110
                    </a>
                  </li>
                  <li>
                    <strong>{t("comollegar.faq.emergency.answer.firefighters")}:</strong>{" "}
                    <a href="tel:119" className="text-blue-600 hover:underline">
                      119
                    </a>
                  </li>
                  <li>
                    <strong>{t("comollegar.faq.emergency.answer.ambulance")}:</strong>{" "}
                    <a href="tel:160" className="text-blue-600 hover:underline">
                      160
                    </a>{" "}
                    -{" "}
                    <a href="tel:165" className="text-blue-600 hover:underline">
                      165
                    </a>
                  </li>
                  <li>
                    <strong>{t("comollegar.faq.emergency.answer.touristPolice")}:</strong>{" "}
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
              <FaqItem question="comollegar.faq.currency.question">
                <p>
                  {t("comollegar.faq.currency.answer")}
                </p>
              </FaqItem>

              <FaqItem question="comollegar.faq.publicTransport.question">
                <p>
                  {t("comollegar.faq.publicTransport.answer")}
                </p>
              </FaqItem>

              <FaqItem question="comollegar.faq.mobile.question">
                <p>
                  {t("comollegar.faq.mobile.answer")}
                </p>
                <ul className="list-disc ml-5">
                  <li>
                    <a
                      href="https://www.tigo.com.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      {t("comollegar.faq.mobile.tigo")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.entel.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      {t("comollegar.faq.mobile.entel")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.viva.com.bo/"
                      target="_blank"
                      rel="noopener"
                      className="text-blue-600 underline"
                    >
                      {t("comollegar.faq.mobile.viva")}
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
          <p>{t("footer.copyright")}</p>
          <p className="mt-2">{t("footer.tagline")}</p>
        </div>
      </footer>
    </main>
  );
};

export default ComoLlegar;
