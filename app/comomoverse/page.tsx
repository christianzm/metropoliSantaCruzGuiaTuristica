"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import Image from "next/image";

const ComoMoverse = () => {
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

      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex flex-col items-center justify-center text-white">
          <h1
            className="text-4xl md:text-5xl mb-6 text-center italic text-white-700 drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 500 }}
          >
            Cómo Moverse en Santa Cruz de la Sierra
          </h1>
          <p className="text-xl max-w-2xl text-center px-4">
            Tu guía completa para explorar la vibrante ciudad y sus alrededores
          </p>
        </div>
        <Image
          src="..\images\imag3.jpg"
          alt="Santa Cruz de la Sierra"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      {/* Introducción */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Organizate pa’ moverte tranquilo por Santa Cruz
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Santa Cruz de la Sierra, la ciudad más grande de Bolivia, te espera
            con los brazos abiertos Con su clima cálido y la hospitalidad de su
            gente, moverte por la ciudad y sus alrededores para explorar sus
            atractivos turísticos es sencillo
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center">
              <div className="text-4xl mb-2">✈️</div>
              <p className="font-medium">Avión</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
              <div className="text-4xl mb-2">🚌</div>
              <p className="font-medium">Autobús</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center">
              <div className="text-4xl mb-2">🚗</div>
              <p className="font-medium">Coche</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg flex flex-col items-center">
              <div className="text-4xl mb-2">🚕</div>
              <p className="font-medium">Transporte Urbano</p>
            </div>
          </div>
        </div>

        {/* Distancias y Tiempos */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-8 mb-12 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Distancias desde Santa Cruz
          </h2>
          <p className="text-lg mb-8 text-center max-w-3xl mx-auto">
            Santa Cruz es el punto de partida perfecto para que te mandés a
            explorar otros municipios de la zona. Aquí las distancias y tiempos
            aproximados:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* La Guardia */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">La Guardia</h3>
              <p className="text-2xl font-bold">23 km</p>
              <p className="mt-2">Coche: ≈ 36 min</p>
              <p>Autobús: ≈ 55 min</p>
            </div>

            {/* Porongo */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Porongo</h3>
              <p className="text-2xl font-bold">35 km</p>
              <p className="mt-2">Coche: ≈ 39 min</p>
              <p>Autobús: ≈ 60 min</p>
            </div>

            {/* Cotoca */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Cotoca</h3>
              <p className="text-2xl font-bold">28 km</p>
              <p className="mt-2">Coche: ≈ 37 min</p>
              <p>Autobús: ≈ 45 min</p>
            </div>

            {/* Warnes */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Warnes</h3>
              <p className="text-2xl font-bold">32 km</p>
              <p className="mt-2">Coche: ≈ 28 min</p>
              <p>Autobús: ≈ 35 min</p>
            </div>

            {/* El Torno */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">El Torno</h3>
              <p className="text-2xl font-bold">36 km</p>
              <p className="mt-2">Coche: ≈ 35 min</p>
              <p>Autobús: ≈ 45 min*</p>
            </div>

            {/* Colpa Bélgica */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Colpa Bélgica</h3>
              <p className="text-2xl font-bold">39 km</p>
              <p className="mt-2">Coche: ≈ 32 min</p>
              <p>Autobús: ≈ 42 min*</p>
            </div>

            {/* Montero */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Montero</h3>
              <p className="text-2xl font-bold">54 km</p>
              <p className="mt-2">Coche: ≈ 48 min</p>
              <p>Autobús: ≈ 60 min*</p>
            </div>

            {/* Pailón */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Pailón</h3>
              <p className="text-2xl font-bold">53 km</p>
              <p className="mt-2">Coche: ≈ 49 min</p>
              <p>Autobús: ≈ 60 min*</p>
            </div>

            {/* Portachuelo */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Portachuelo</h3>
              <p className="text-2xl font-bold">71 km</p>
              <p className="mt-2">Coche: ≈ 1 h 4 min</p>
              <p>Autobús: ≈ 1 h 20 min*</p>
            </div>

            {/* Okinawa */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Okinawa</h3>
              <p className="text-2xl font-bold">82 km</p>
              <p className="mt-2">Coche: ≈ 1 h 18 min</p>
              <p>Autobús: ≈ 1 h 35 min*</p>
            </div>

            {/* Buena Vista */}
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Buena Vista</h3>
              <p className="text-2xl font-bold">105 km</p>
              <p className="mt-2">Coche: ≈ 1 h 30 min</p>
              <p>Autobús: ≈ 2 h 15 min*</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-semibold">
              Consejo: Usar apps como Google Maps o Waze te ayuda a calcular
              rutas, tiempos de espera y conexiones en tiempo real.
            </p>
          </div>
        </div>

        {/* Sección de Transportes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Avión */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-60">
              <Image
                src="..\images\avion.jpg"
                alt="Aeropuerto Viru Viru"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">En Avión</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                El{" "}
                <span className="font-bold">
                  Aeropuerto Internacional Viru Viru (VVI)
                </span>{" "}
                es el principal aeropuerto de la región, recibiendo vuelos
                nacionales e internacionales.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">✈️</div>
                  <div>
                    <h3 className="font-bold">Aerolíneas principales</h3>
                    <p>Boliviana de Aviación (BoA), EcoJet, LATAM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">📍</div>
                  <div>
                    <h3 className="font-bold">Desde el aeropuerto al centro</h3>
                    <p>Taxi: Bs. 80-100 (aprox. $12-15 USD)</p>
                    <p>Transfer privado: Bs. 100-150</p>
                    <p>Alquiler de coches: Desde Bs. 200/día</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">⏱️</div>
                  <div>
                    <h3 className="font-bold">Tiempo al centro</h3>
                    <p>20-30 minutos dependiendo del tráfico</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Autobús */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-60">
              <Image
                src="..\images\autobus.jpg"
                alt="Terminal de buses"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">En Autobús</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                La <span className="font-bold">Terminal Bimodal</span> es el
                principal centro de transporte terrestre, conectando Santa Cruz
                con todo Bolivia y países vecinos.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">🚌</div>
                  <div>
                    <h3 className="font-bold">Empresas recomendadas</h3>
                    <p>
                      trans Guarayo, 15 de abril, perla del oriente, Cooperativa
                      de Transporte Warnes R.L.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">💰</div>
                  <div>
                    <h3 className="font-bold">Precios aproximados</h3>
                    <p>
                      Santa Cruz → San Ignacio: Bs. 70-100 ($10.13-14.47 USD)
                    </p>
                    <p>Santa Cruz → Cotoca: Bs. 7-8</p>
                    <p>Santa Cruz → Warnes: Bs. 8-9</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">🛏️</div>
                  <div>
                    <h3 className="font-bold">Tipos de servicio</h3>
                    <p>Semi-cama: Asientos reclinables</p>
                    <p>Cama: Asientos completamente reclinables</p>
                    <p>Salón cama: Mayor espacio y comodidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coche */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-60">
              <Image
                src="..\images\coche.jpg"
                alt="Carretera en Bolivia"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">En Coche</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Conducir en Santa Cruz ofrece libertad para explorar a tu ritmo.
                Las carreteras principales están en buenas condiciones.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">🚗</div>
                  <div>
                    <h3 className="font-bold">Empresas de alquiler</h3>
                    <p>
                      Localiza, Europcar, Hertz Car Rental, Barron Rent a Car
                    </p>
                    <p className="text-sm mt-1">
                      (Disponibles en aeropuerto y centro)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">🛣️</div>
                  <div>
                    <h3 className="font-bold">Rutas principales</h3>
                    <p>
                      Ruta 3: Conecta Santa Cruz con Warnes y Montero (norte)
                    </p>
                    <p>Ruta 10: Conduce hacia Cotoca y Pailón (este)</p>
                    <p>
                      Ruta 7 (sur): Pasa por La Guardia rumbo a Samaipata y los
                      Valles Cruceños
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">⚠️</div>
                  <div>
                    <h3 className="font-bold">Consejos de conducción</h3>
                    <p>Revisa condiciones de carreteras en época de lluvias</p>
                    <p>Ten cuidado con animales en carreteras rurales</p>
                    <p>Evita conducir de noche en zonas desconocidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transporte Urbano */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-60">
              <Image
                src="..\images\transporte.jpg"
                alt="Transporte urbano en Santa Cruz"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">
                  Transporte Urbano
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Moverse dentro de Santa Cruz es económico con diversas opciones.
                El tráfico puede ser intenso en horas pico.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">🚕</div>
                  <div>
                    <h3 className="font-bold">Taxis y Apps</h3>
                    <p>Taxis oficiales: Tarifa inicial Bs. 6 + Bs. 5/km</p>
                    <p>Uber, Yango y Indrive: Disponibles en toda la ciudad</p>
                    <p>Radio Taxis: Servicio las 24 horas</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">🚌</div>
                  <div>
                    <h3 className="font-bold">Microbuses</h3>
                    <p>Precio fijo: Bs. 2.30 por viaje</p>
                    <p>Red extensa que cubre toda la ciudad</p>
                    <p>Pueden estar muy llenos en horas pico</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">🚲</div>
                  <div>
                    <h3 className="font-bold">Otras opciones</h3>
                    <p>Bicicletas: Ciclovías en el centro</p>
                    <p>Trufis: Minibuses compartidos con rutas fijas</p>
                    <p>Moto-taxis: Para distancias cortas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consejos Finales */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Consejos para Viajeros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Seguridad</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Evita mostrar objetos de valor en transporte público</li>
                <li>Usa taxis oficiales o aplicaciones de transporte</li>
                <li>No viajes de noche en transporte terrestre</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Presupuesto</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reserva con anticipación para mejores precios</li>
                <li>Los microbuses son la opción más económica</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-3">Planificación</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Considera el tráfico en tus tiempos de viaje</li>
                <li>En época de lluvias, verifica estado de carreteras</li>
                <li>Usa apps como Google Maps o Crucero para rutas</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold">
              ¡Disfruta de la cálida hospitalidad cruceña y su rica cultura!
            </p>
          </div>
        </div>
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

export default ComoMoverse;
