// src/app/infopractica.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
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
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "nav.home" },
    { href: "/explore", label: "nav.explore" },
    { href: "/infosantacruz", label: "nav.santacruz" },
    { href: "/entretenimiento", label: "nav.enjoy" },
  ];

  // Datos para las tarjetas de información
  const infoCards = [
    {
      id: 1,
      icon: <FaPlane className="text-3xl text-blue-500" />,
      title: t("infopractica.cards.plane.title"),
      content: t("infopractica.cards.plane.content"),
      image: "/images/avion2.jpg",
    },
    {
      id: 2,
      icon: <FaBus className="text-3xl text-green-500" />,
      title: t("infopractica.cards.bus.title"),
      content: t("infopractica.cards.bus.content"),
      image: "/images/autobus1.jpg",
    },
    {
      id: 3,
      icon: <FaCar className="text-3xl text-red-500" />,
      title: t("infopractica.cards.car.title"),
      content: t("infopractica.cards.car.content"),
      image: "/images/coche1.jpg",
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="text-3xl text-yellow-500" />,
      title: t("infopractica.cards.currency.title"),
      content: t("infopractica.cards.currency.content"),
      image: "/images/money.jpg",
    },
    {
      id: 5,
      icon: <FaShieldAlt className="text-3xl text-purple-500" />,
      title: t("infopractica.cards.safety.title"),
      content: t("infopractica.cards.safety.content"),
      image: "/images/seguridad.jpg",
    },
    {
      id: 6,
      icon: <FaHospital className="text-3xl text-pink-500" />,
      title: t("infopractica.cards.health.title"),
      content: t("infopractica.cards.health.content"),
      image: "/images/salud.jpg",
    },
  ];

  const additionalInfo = [
    {
      id: 7,
      icon: <FaWifi className="text-3xl text-blue-400" />,
      title: t("infopractica.additional.internet.title"),
      content: t("infopractica.additional.internet.content"),
    },
    {
      id: 8,
      icon: <FaClock className="text-3xl text-orange-500" />,
      title: t("infopractica.additional.hours.title"),
      content: t("infopractica.additional.hours.content"),
    },
    {
      id: 9,
      icon: <FaCalendarAlt className="text-3xl text-green-400" />,
      title: t("infopractica.additional.festivities.title"),
      content: t("infopractica.additional.festivities.content"),
    },
    {
      id: 10,
      icon: <FaRoad className="text-3xl text-gray-600" />,
      title: t("infopractica.additional.driving.title"),
      content: t("infopractica.additional.driving.content"),
    },
    {
      id: 11,
      icon: <FaPaw className="text-3xl text-brown-500" />,
      title: t("infopractica.additional.pets.title"),
      content: t("infopractica.additional.pets.content"),
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
            {t("infopractica.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl drop-shadow-lg">
            {t("infopractica.hero.subtitle")}
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t("infopractica.intro.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t("infopractica.intro.description")}
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md text-left">
            <p className="font-semibold text-yellow-800">{t("infopractica.intro.tip.title")}</p>
            <p>
              {t("infopractica.intro.tip.content")}
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
                {t("infopractica.weather.title")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("infopractica.weather.description")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700">
                    {t("infopractica.weather.winter.title")}
                  </h4>
                  <p>{t("infopractica.weather.winter.temp")}</p>
                  <p>{t("infopractica.weather.winter.conditions")}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-700">
                    {t("infopractica.weather.summer.title")}
                  </h4>
                  <p>{t("infopractica.weather.summer.temp")}</p>
                  <p>{t("infopractica.weather.summer.conditions")}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                <span className="font-semibold">{t("infopractica.weather.best_time.title")}</span>{" "}
                {t("infopractica.weather.best_time.content")}
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
            {t("infopractica.additional.title")}
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
            {t("infopractica.final.title")}
          </h3>
          <p className="text-lg mb-6">
            {t("infopractica.final.content")}
          </p>
          <div className="inline-block bg-yellow-400 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
            {t("infopractica.final.welcome")}
          </div>
        </div>
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

export default InfoPractica;
