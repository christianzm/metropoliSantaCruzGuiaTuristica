"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {Landmark,Palette, MapPin,Star,CloudSun,Menu,X,Maximize,XCircle,Trees,Store,Church,TreeDeciduous,} from "lucide-react";
import {Phone,Mail,Facebook,Instagram,Twitter,Youtube,} from "lucide-react";
import Image from "next/image";



export default function InfoSantaCruzPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    // Este código SOLO se ejecuta en el cliente, después del renderizado inicial.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const t = {
    links: "Enlaces",
    home: "Inicio",
    explore: "Explorar",
    featured: "Destacados",
    categories: "Categorías",
  };
  // Contenido para cada sección
  const sectionContent = {
    catedral: {
      title: "Catedral Metropolitana",
      icon: <Landmark className="w-7 h-7 text-green-500" />,
      description:
        "Esta majestuosa obra inició en 1839 por el arquitecto francés Felipe Bertrés y se concluyó en 1915 gracias a León Mousnier. Declarada Basílica Menor por el Papa Juan Pablo II en 1988, la Catedral de Santa Cruz se erige como ícono de fe y cultura. Restaurada en su totalidad entre 1968 y 1983, su fachada de ladrillo cocido resalta los detalles arquitectónicos únicos. Dentro, el Museo Catedralicio Mons. Carlos Gericke alberga valiosas piezas de arte sacro. Desde sus torres, el mirador ofrece una vista inolvidable de la ciudad.",
      image: "/images/catedral_scz.jpg",
      location: "Plaza 24 de Septiembre",
      mapLink: "https://maps.app.goo.gl/ZKQRUVWtKGzr8FoY8",
      recommendation: "Recomendado para tardes despejadas",
    },
    plaza: {
      title: "PLAZA 24 DE SEPTIEMBRE",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      description:
        "Corazón de la ciudad desde 1590, donde Santa Cruz encontró su nueva raíz. Antiguamente llamada Plaza Real, su transformación se consolidó con la estatua de Ignacio Warnes en 1922 y una remodelación integral en 2004. Rodeada de arquitectura colonial, palmeras reales, cafés, y con presencia constante de músicos, artesanos y visitantes, es un lugar ideal para sentir la esencia histórica y vibrante de Santa Cruz.",
      image: "/images/vistaaerea.png",
      location: "Centro Histórico",
      mapLink: "https://maps.app.goo.gl/ywXpHcEGgxXrW7Es6",
      recommendation: "Perfecto para paseos matutinos",
    },
    manzana: {
      title: "MANZANA UNO",
      icon: <Palette className="w-7 h-7 text-pink-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://manzanauno.org.bo/wp-content/uploads/2016/07/historia-2-Copiar.jpg",
      location: "Calle Independencia esq. Ayacucho",
      mapLink: "https://maps.app.goo.gl/4VE4g7Kk746eWrqZ7",
      recommendation: "Visita ideal en horario vespertino",
    },
    club: {
      title: "CLUB 24 DE SEPTIEMBRE",
      icon: <Store className="w-7 h-7 text-yellow-500" />,
      description:
        "Ubicado en la Plaza 24 de Septiembre, este club histórico es un símbolo de tradición y encuentro social en Santa Cruz.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location:
        "Calle Libertad esquina Ayacucho Plaza 24 de Septiembre esquina Suroeste",
      mapLink: "https://maps.app.goo.gl/mJ7TpeacBjr934ta6",
      recommendation: "Un Oasis de Tranquilidad y Tradición al Caer la Tarde",
    },

    recova: {
      title: "PASEO DE LA RECOVA",
      icon: <TreeDeciduous className="w-7 h-7 text-marron-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location: "Av. libertad entre calle Florida y calle junin",
      mapLink: "https://maps.app.goo.gl/fov9q9b39AeVVL89A",
      recommendation: "Un Paseo Mágico por el Corazón Artesanal de Santa Cruz",
    },

    culturacasa: {
      title: "CASA DE LA CULTURA",
      icon: <Store className="w-7 h-7 text-Maroon-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location: "Libertad 65, Santa Cruz de la Sierra",
      mapLink: "https://maps.app.goo.gl/pztEBxMntuvtn29T6",
      recommendation: "Una Velada Inspiradora en el Alma Cultural de la Ciudad",
    },

    cristoredentor: {
      title: "EL CRISTO REDENTOR",
      icon: <Church className="w-7 h-7 text-yellow-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location: "Calle Independencia esq. Ayacucho",
      mapLink: "https://maps.app.goo.gl/4VE4g7Kk746eWrqZ7",
      recommendation: "Visita ideal en horario vespertino",
    },

    altarpapal: {
      title: "ALTAR PAPAL",
      icon: <Church className="w-7 h-7 text-yellow-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location: "Av. Cristobal de mendoza y Av. Monseñor rivero",
      mapLink: "https://maps.app.goo.gl/ZjsHZhkRTy9cj3ad6",
      recommendation:
        "Un Atardecer de Paz y Reflexión en un Ícono de la Fe Cruceña",
    },
    cambodromo: {
      title: "EL CAMBÓDROMO",
      icon: <Trees className="w-7 h-7 text-green-500" />,
      description:
        "Ubicado en la primera manzana fundacional de Santa Cruz, este centro cultural acoge exposiciones contemporáneas de artistas nacionales e internacionales. Fusionando estilos como realismo, surrealismo, arte abstracto y minimalismo, Manzana Uno ofrece una experiencia inmersiva e inclusiva para todo público. Ideal para una tarde de inspiración, cultura y reflexión en pleno centro histórico.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/23/Club24SantaCruz.jpg", // ✅ Aquí la imagen real
      location: "Av. mutualista 4to anillo",
      mapLink: "https://maps.app.goo.gl/xUvU3ficoY78Axj66",
      recommendation: "El Escenario Urbano para un Atardecer Lleno de Energía",
    },
  };

  // Función para abrir el modal con la imagen ampliada
  const openImageModal = (sectionId: string) => {
    setSelectedImage(sectionContent[sectionId].image);
    setSelectedContent(sectionContent[sectionId]);
  };

  // Función para cerrar el modal
  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedContent(null);
  };

  // Evitar que el scroll se mueva cuando el modal está abierto
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);
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

      <section className="w-full">
        <div className="relative w-full h-[500px] overflow-hidden">
          {/* Imagen de fondo */}
          <img
            src="/images/vistaaerea.png"
            alt="Santa Cruz de la Sierra"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          {/* Contenido centrado sobre la imagen */}
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center text-white px-4 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
              Santa Cruz Emblemática
            </h1>
            <p className="text-lg md:text-xl max-w-3xl drop-shadow-md">
              Sumérgete en el alma de Santa Cruz de la Sierra a través de sus
              joyas arquitectónicas, espacios culturales y naturaleza vibrante.
              Una experiencia visual, cultural e histórica te espera.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a
                href="#catedral"
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition shadow-md"
              >
                Explorar Lugares
              </a>
              <a
                href="#interes"
                className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition shadow-md"
              >
                Te Puede Interesar
              </a>
            </div>
          </div>
        </div>

        {/* SECCIÓN: CATEDRAL */}
        <div
          id="catedral"
          className="flex flex-col-reverse md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-xl border border-green-100 mb-12"
        >
          <div className="md:w-1/2 text-right">
            <h2 className="text-4xl font-bold text-green-800 mb-4 flex items-center justify-end gap-3">
              {sectionContent.catedral.icon} {sectionContent.catedral.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.catedral.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.catedral.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />{" "}
                  {sectionContent.catedral.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />{" "}
                {sectionContent.catedral.recommendation}
              </div>
            </div>
          </div>
          <div
            className="md:w-1/2 relative group cursor-pointer"
            onClick={() => openImageModal("catedral")}
          >
            <img
              src={sectionContent.catedral.image}
              alt={sectionContent.catedral.title}
              className="rounded-2xl shadow-xl border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: PLAZA 24 DE SEPTIEMBRE */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-8 shadow-xl mb-12">
          <div
            className="relative group cursor-pointer"
            onClick={() => openImageModal("plaza")}
          >
            <img
              src={sectionContent.plaza.image}
              alt={sectionContent.plaza.title}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-4 border-b-4 border-green-300 inline-block pb-1 flex items-center gap-2">
              {sectionContent.plaza.icon} {sectionContent.plaza.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.plaza.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.plaza.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" /> {sectionContent.plaza.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />{" "}
                {sectionContent.plaza.recommendation}
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: EL CRISTO REDENTOR */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-8 shadow-xl mb-12">
          <div
            className="relative group cursor-pointer"
            onClick={() => openImageModal("cristoredentor")}
          >
            <img
              src={sectionContent.cristoredentor.image}
              alt={sectionContent.cristoredentor.title}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-4 border-b-4 border-green-300 inline-block pb-1 flex items-center gap-2">
              {sectionContent.cristoredentor.icon}{" "}
              {sectionContent.cristoredentor.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.cristoredentor.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.cristoredentor.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />{" "}
                  {sectionContent.cristoredentor.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />{" "}
                {sectionContent.cristoredentor.recommendation}
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: MANZANA UNO */}
        <div
          id="manzana"
          className="flex flex-col-reverse md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-xl border border-green-100 mb-12"
        >
          {/* Texto a la izquierda */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-green-800 mb-4 uppercase tracking-wider flex items-center gap-3">
              {sectionContent.manzana.icon} {sectionContent.manzana.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.manzana.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.manzana.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  {sectionContent.manzana.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />
                {sectionContent.manzana.recommendation}
              </div>
            </div>
          </div>

          {/* Imagen a la derecha */}
          <div
            className="md:w-1/2 relative group cursor-pointer"
            onClick={() => openImageModal("manzana")}
          >
            <img
              src={sectionContent.manzana.image}
              alt={sectionContent.manzana.title}
              className="rounded-2xl shadow-xl border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>
        {/* SECCIÓN: CLUB 24 DE SEPTIEMBRE */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-8 shadow-xl mb-12">
          {/* Imagen con efecto ampliable */}
          <div
            className="relative group cursor-pointer"
            onClick={() => openImageModal("club")}
          >
            <img
              src={sectionContent.club.image}
              alt={sectionContent.club.title}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>

          {/* Información textual */}
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-4 border-b-4 border-green-300 inline-block pb-1 flex items-center gap-2">
              {sectionContent.club.icon} {sectionContent.club.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.club.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.club.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" /> {sectionContent.club.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />
                {sectionContent.club.recommendation}
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: PASEO DE LA RECOVA */}
        <div
          id="recova"
          className="flex flex-col-reverse md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-xl border border-green-100 mb-12"
        >
          {/* Texto a la izquierda */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-green-800 mb-4 uppercase tracking-wider flex items-center gap-3">
              {sectionContent.recova.icon} {sectionContent.recova.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.recova.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.recova.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  {sectionContent.recova.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />
                {sectionContent.recova.recommendation}
              </div>
            </div>
          </div>

          {/* Imagen a la derecha */}
          <div
            className="md:w-1/2 relative group cursor-pointer"
            onClick={() => openImageModal("recova")}
          >
            <img
              src={sectionContent.recova.image}
              alt={sectionContent.recova.title}
              className="rounded-2xl shadow-xl border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: ALTAR PAPAL */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-8 shadow-xl mb-12">
          <div
            className="relative group cursor-pointer"
            onClick={() => openImageModal("altarpapal")}
          >
            <img
              src={sectionContent.altarpapal.image}
              alt={sectionContent.altarpapal.title}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-4 border-b-4 border-green-300 inline-block pb-1 flex items-center gap-2">
              {sectionContent.altarpapal.icon} {sectionContent.altarpapal.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.altarpapal.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.altarpapal.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />{" "}
                  {sectionContent.altarpapal.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />{" "}
                {sectionContent.altarpapal.recommendation}
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: CASA DE LA CULTURA */}
        <div
          id="culturacasa"
          className="flex flex-col-reverse md:flex-row items-center gap-10 bg-white rounded-3xl p-8 shadow-xl border border-green-100 mb-12"
        >
          {/* Texto a la izquierda */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-bold text-green-800 mb-4 uppercase tracking-wider flex items-center gap-3">
              {sectionContent.culturacasa.icon}{" "}
              {sectionContent.culturacasa.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.culturacasa.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.culturacasa.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />
                  {sectionContent.culturacasa.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />
                {sectionContent.culturacasa.recommendation}
              </div>
            </div>
          </div>

          {/* Imagen a la derecha */}
          <div
            className="md:w-1/2 relative group cursor-pointer"
            onClick={() => openImageModal("culturacasa")}
          >
            <img
              src={sectionContent.culturacasa.image}
              alt={sectionContent.culturacasa.title}
              className="rounded-2xl shadow-xl border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN: EL CAMBÓDROMO */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-white via-green-50 to-white rounded-3xl p-8 shadow-xl mb-12">
          <div
            className="relative group cursor-pointer"
            onClick={() => openImageModal("cambodromo")}
          >
            <img
              src={sectionContent.cambodromo.image}
              alt={sectionContent.cambodromo.title}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover w-full h-[400px]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
              <div className="bg-white/80 text-green-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize size={24} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-4 border-b-4 border-green-300 inline-block pb-1 flex items-center gap-2">
              {sectionContent.cambodromo.icon} {sectionContent.cambodromo.title}
            </h2>
            <p className="text-lg text-gray-700 leading-8">
              {sectionContent.cambodromo.description}
            </p>
            <div className="mt-4 flex justify-between items-center text-sm text-green-700 font-semibold">
              <div className="flex items-center gap-2">
                <a
                  href={sectionContent.cambodromo.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-700 hover:underline"
                >
                  <MapPin className="w-4 h-4" />{" "}
                  {sectionContent.cambodromo.location}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-blue-400" />{" "}
                {sectionContent.cambodromo.recommendation}
              </div>
            </div>
          </div>
        </div>
        {/* Modal para imagen ampliada */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <div
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white text-green-700 rounded-full p-2 hover:bg-green-100 transition"
                onClick={closeImageModal}
              >
                <XCircle size={28} />
              </button>

              <div className="md:w-1/2 h-[50vh] md:h-auto overflow-hidden">
                <img
                  src={selectedImage}
                  alt={selectedContent.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 bg-white overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                <h3 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-3">
                  {selectedContent.icon} {selectedContent.title}
                </h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <MapPin size={18} className="text-green-700" />
                    <a
                      href={selectedContent.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:underline"
                    >
                      {selectedContent.location}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                    <CloudSun size={18} className="text-blue-500" />
                    <span className="text-blue-700">
                      {selectedContent.recommendation}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedContent.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition flex items-center gap-2"
                    onClick={closeImageModal}
                  >
                    <X size={18} /> Cerrar Vista
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* SECCIÓN: TE PUEDE INTERESAR */}
        <section
          id="interes"
          className="w-full max-w-7xl mx-auto px-4 pt-16 pb-20 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-12">
            💡 Te Puede Interesar
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col h-full">
              <img
                src="/images/gastronomia.png"
                alt="Parque Urbano"
                className="rounded-xl mb-4 h-52 w-full object-cover"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  🍽️ Gastronomía Cruceña
                </h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  Descubre una rica tradición culinaria con platos como
                  majadito, locro, sonso, masaco, cuñapé, y muchas otras
                  delicias típicas que deleitan el paladar y cuentan la historia
                  de Santa Cruz.
                </p>
                <div className="text-sm text-green-600 flex items-center gap-1 justify-center mb-4">
                  <CloudSun className="w-4 h-4 text-blue-400" /> Ideal para
                  picnics
                </div>
                <Link
                  href="/infosantacruz/gastronomia"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full transition"
                >
                  Ver más sobre gastronomía
                </Link>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col h-full">
              <img
                src="/images/fauna.png"
                alt="Parque ecologico"
                className="rounded-xl mb-4 h-52 w-full object-cover"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  🌳 Fauna
                </h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  Lugar emblemático para conocer: El Parque Regional Lomas de
                  Arena, hogar de tucanes multicolores, monos curiosos y una
                  gran diversidad de aves y reptiles. Un paraíso natural donde
                  podrás admirar la fauna típica de la región en su hábitat.
                </p>
                <div className="text-sm text-green-600 flex items-center gap-1 justify-center mb-4">
                  <CloudSun className="w-4 h-4 text-blue-400" /> Visítala en
                  familia
                </div>
                <Link
                  href="/infosantacruz/fauna"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full transition"
                >
                  Ver más sobre fauna
                </Link>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col h-full">
              <img
                src="/images/evento.png"
                alt="Eventos en Santa Cruz"
                className="rounded-xl mb-4 h-52 w-full object-cover"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  📅 Eventos Cruceños
                </h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  Santa Cruz de la Sierra vive durante todo el año con eventos
                  vibrantes: desde ferias culturales y conciertos al aire libre,
                  hasta festivales tradicionales como el Carnaval cruceño o la
                  Expocruz.
                </p>
                <Link
                  href="/infosantacruz/evento"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full transition"
                >
                  Ver más sobre eventos
                </Link>
              </div>
            </div>

            {/* Tarjeta 4 - Turismo de Negocios */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 flex flex-col h-full">
              <img
                src="/images/negocio.png"
                alt="Turismo de Negocios Santa Cruz"
                className="rounded-xl mb-4 h-52 w-full object-cover"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  💼 Turismo de Negocios
                </h3>
                <p className="text-gray-700 text-sm mb-4 flex-grow">
                  Santa Cruz de la Sierra, un destino estratégico para eventos
                  empresariales, congresos y viajes de negocios con
                  infraestructura moderna y cultura acogedora.
                </p>
                <Link
                  href="/infosantacruz/negocios"
                  className="block text-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-full transition"
                >
                  Ver más sobre los negocios
                </Link>
              </div>
            </div>
          </div>
        </section>
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
    </main>
  );
}
