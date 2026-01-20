"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Menu,
  X,
  Maximize,
  XCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
const t = {
  links: "Enlaces",
  home: "Inicio",
  explore: "Explorar",
  featured: "Destacados",
  categories: "Categorías",
};
const GastronomiaCruceña = () => {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null);

  //funcion del menu
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

  // Evitar scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedPlato) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPlato]);

  const categorias = [
    { id: "todos", nombre: "Todos los Platos" },
    { id: "platos", nombre: "Platos Principales" },
    { id: "horneados", nombre: "Horneados y Masitas" },
    { id: "bebidas", nombre: "Bebidas Tradicionales" },
    { id: "desayunos", nombre: "Desayunos Cruceños" },
    { id: "parrillas", nombre: "Carnes y Parrillas" },
  ];

  const platosTipicos = [
    // Platos principales
    {
      id: 1,
      nombre: "Majadito",
      descripcion:
        "Arroz cocido con charque desmenuzado, huevo frito y plátano frito. Existe en versiones batido y tostado.",
      categoria: "platos",
      imagen:
        "https://images.aws.nestle.recipes/original/fa25010f0dfebe5a2d24a840773bf394_recetas-nestle---scz-2022-majadito-web.jpg",
      destacado: true,
    },
    {
      id: 2,
      nombre: "Locro criollo",
      descripcion:
        "Sopa espesa de arroz con gallina, yuca y verduras. Un reconfortante plato tradicional.",
      categoria: "platos",
      imagen:
        "https://buenvivirdigital.com/user-files/blog/1633317264locro-de-gallina-bolivia.jpg",
      destacado: true,
    },
    {
      id: 3,
      nombre: "Sopa de maní",
      descripcion:
        "Crema espesa de maní con fideos, papas, carne y verduras. Un plato reconfortante.",
      categoria: "platos",
      imagen: "",
    },
    {
      id: 4,
      nombre: "Masaco de yuca",
      descripcion:
        "Puré de yuca con charque o queso, acompañado de plátano frito.",
      categoria: "desayunos",
      imagen: "",
    },
    {
      id: 5,
      nombre: "Masaco de plátano",
      descripcion:
        "Versión del masaco hecha con plátano verde, típico de Santa Cruz.",
      categoria: "desayunos",
      imagen: "",
    },
    {
      id: 7,
      nombre: "Cuñapé",
      descripcion:
        "Panecillo pequeño de almidón de yuca y queso. Infaltable en el cafecito de la tarde.",
      categoria: "horneados",
      imagen: "",
      destacado: true,
    },
    {
      id: 8,
      nombre: "Sonso",
      descripcion:
        "Masa de yuca mezclada con queso, asada en palitos. Versión cruceña de la chipa.",
      categoria: "horneados",
      imagen: "",
      destacado: true,
    },
    {
      id: 9,
      nombre: "Tamal",
      descripcion:
        "Platillo de choclo con queso preparado en hojas de maíz, horneado o hervido.",
      categoria: "horneados",
      imagen: "",
    },
    {
      id: 11,
      nombre: "Arepa",
      descripcion: "Torta de maíz o arroz, horneada y servida con queso.",
      categoria: "desayunos",
      imagen: "",
    },
    {
      id: 13,
      nombre: "Empanada de arroz",
      descripcion:
        "Horneado de harina de arroz y yuca con queso en su interior, servido en hoja de plátano.",
      categoria: "horneados",
      imagen: "",
    },
    {
      id: 15,
      nombre: "Refresco de tamarindo",
      descripcion:
        "Bebida refrescante hecha con pulpa de tamarindo, azúcar y especias. Ideal para combatir el calor.",
      categoria: "bebidas",
      imagen: "",
      destacado: true,
    },
    {
      id: 16,
      nombre: "Mocochinchi",
      descripcion:
        "Bebida refrescante de durazno deshidratado, canela y azúcar. Aliado contra el calor cruceño.",
      categoria: "bebidas",
      imagen: "",
      destacado: true,
    },
    {
      id: 17,
      nombre: "Somó",
      descripcion:
        "Bebida refrescante de harina, canela, clavo de olor y azúcar. Acompaña almuerzos y cenas.",
      categoria: "bebidas",
      imagen: "",
    },
    {
      id: 18,
      nombre: "Chicha de maní",
      descripcion:
        "Bebida espesa y nutritiva a base de maní molido. Tradición precolombina que perdura.",
      categoria: "bebidas",
      imagen: "",
    },
    {
      id: 19,
      nombre: "Picolé",
      descripcion:
        "Helado de paleta en diversos sabores, ideal para refrescarse en el clima cálido cruceño.",
      categoria: "bebidas",
      imagen: "",
    },
    {
      id: 20,
      nombre: "Salteña",
      descripcion:
        "Empanada jugosa rellena de jigote de carne, pollo, huevo y papa. Aperitivo cruceño por excelencia.",
      categoria: "desayunos",
      imagen: "",
      destacado: true,
    },
    {
      id: 14,
      nombre: "Pacumutos",
      descripcion:
        "Bollos de harina de maíz rellenos de queso, cocidos al vapor.",
      categoria: "platos",
      imagen: "",
    },
    {
      id: 21,
      nombre: "Asadito Vallegrandino",
      descripcion:
        "Plato de chuleta de cerdo, cuero de cerdo, chorizo, papa, mote y queso. Tradición de Vallegrande.",
      categoria: "parrillas",
      imagen: "",
      destacado: true,
    },
    {
      id: 22,
      nombre: "Pescado a la parrilla",
      descripcion:
        "Pescado de río (sábalo, pacú) asado a la parrilla, con yuca, arroz y ensalada.",
      categoria: "parrillas",
      imagen: "",
      destacado: true,
    },
    {
      id: 23,
      nombre: "Churrasco Cruceño",
      descripcion:
        "Corte de carne asado a la parrilla con guarniciones tradicionales.",
      categoria: "parrillas",
      imagen: "",
    },
    {
      id: 25,
      nombre: "Chicharrón",
      descripcion:
        "Carne de cerdo frita en su propia grasa, crujiente por fuera y jugosa por dentro.",
      categoria: "parrillas",
      imagen: "",
    },
    {
      id: 26,
      nombre: "Kjaras",
      descripcion:
        "Plato de cerdo con cuero, chuleta y chorizo acompañado de papa, mote y queso. Tradición quechua.",
      categoria: "parrillas",
      imagen: "",
    },
  ];

  const platosFiltrados =
    activeCategory === "todos"
      ? platosTipicos
      : platosTipicos.filter((plato) => plato.categoria === activeCategory);

  type Plato = {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    imagen: string;
    destacado?: boolean;
  };

  const openPlatoModal = (plato: Plato) => {
    setSelectedPlato(plato);
  };

  const closePlatoModal = () => {
    setSelectedPlato(null);
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
      {/* NAVBAR FIN  menu*/}

      <div className="bg-white text-gray-800">
        {/* Encabezado con imagen de fondo a ancho completo */}
        <div className="relative w-full h-96 overflow-hidden mb-12">
          <img
            src="..\images\gastronomia.png"
            alt="Gastronomía Cruceña"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r to-amber-200/70 z-10 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-5xl md:text-7xl font-bold italic text-white mb-4">
                Sabores de Santa Cruz
              </h1>
              <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
                Descubre la riqueza culinaria cruceña, una fusión de tradiciones
                indígenas, españolas y modernas
              </p>
              <div className="text-white py-2 px-6 rounded-full font-bold">
                Una explosión de sabores únicos
              </div>
            </div>
          </div>
        </div>

        {/* Categorías con diseño mejorado */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => {
              const isActive = activeCategory === categoria.id;
              return (
                <button
                  key={categoria.id}
                  onClick={() => setActiveCategory(categoria.id)}
                  className={`px-5 py-3 rounded-full transition-all duration-300 flex items-center font-semibold
                      ${
                        isActive
                          ? "bg-red-600 text-white shadow-lg transform scale-105"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                >
                  {categoria.id === "platos" && "🍛 "}
                  {categoria.id === "horneados" && "🥐 "}
                  {categoria.id === "bebidas" && "🧃 "}
                  {categoria.id === "desayunos" && "☕ "}
                  {categoria.id === "parrillas" && "🍖 "}
                  {categoria.nombre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contador de platos */}
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <div className="inline-block bg-white px-6 py-3 rounded-full shadow-md">
            <span className="font-bold text-red-600">
              {platosFiltrados.length}
            </span>
            <span className="text-gray-600"> platos encontrados en </span>
            <span className="font-bold text-amber-600">
              {activeCategory === "todos"
                ? "todas las categorías"
                : categorias.find((c) => c.id === activeCategory)?.nombre}
            </span>
          </div>
        </div>

        {/* Galería de platos con diseño mejorado */}
        <div className="max-w-6xl mx-auto">
          {platosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No encontramos platos en esta categoría
              </h3>
              <p className="text-gray-600">
                Prueba seleccionando otra categoría o ver todos los platos
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platosFiltrados.map((plato) => (
                <div
                  key={plato.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => openPlatoModal(plato)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={plato.imagen}
                      alt={plato.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
                      {plato.categoria === "platos" && "Plato fuerte"}
                      {plato.categoria === "horneados" && "Horneado"}
                      {plato.categoria === "bebidas" && "Bebida"}
                      {plato.categoria === "desayunos" && "Desayuno"}
                      {plato.categoria === "parrillas" && "Parrilla"}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
                      <h2 className="text-xl font-bold text-white">
                        {plato.nombre}
                      </h2>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/40 p-2 rounded-full text-white">
                      <Maximize size={18} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-green-800 mb-2">
                        {plato.nombre}
                      </h2>
                      {plato.destacado && (
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Destacado
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{plato.descripcion}</p>
                    <div className="border-t border-green-100 pt-3 flex justify-end">
                      <button
                        className="text-red-600 hover:text-red-800 font-medium flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPlatoModal(plato);
                        }}
                      >
                        Ver detalles
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal para plato ampliado */}
        {selectedPlato && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closePlatoModal}
          >
            <div
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white text-red-600 rounded-full p-2 hover:bg-red-100 transition"
                onClick={closePlatoModal}
              >
                <XCircle size={28} />
              </button>

              <div className="md:w-1/2 h-[50vh] md:h-auto overflow-hidden bg-gray-100">
                <img
                  src={selectedPlato.imagen}
                  alt={selectedPlato.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-6 bg-white overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                <h3 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-3">
                  {selectedPlato.nombre}
                  {selectedPlato.destacado && (
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Destacado
                    </span>
                  )}
                </h3>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <span className="font-bold text-green-700">Categoría:</span>
                    <span className="text-green-700">
                      {selectedPlato.categoria === "platos" &&
                        "Plato Principal"}
                      {selectedPlato.categoria === "horneados" &&
                        "Horneado/Masita"}
                      {selectedPlato.categoria === "bebidas" &&
                        "Bebida Tradicional"}
                      {selectedPlato.categoria === "desayunos" &&
                        "Desayuno Cruceño"}
                      {selectedPlato.categoria === "parrillas" &&
                        "Carne/Parrilla"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full">
                    <span className="font-bold text-amber-700">
                      Popularidad:
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-amber-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <h4 className="text-xl font-bold text-green-700 mb-3">
                    Descripción
                  </h4>
                  <p className="text-gray-700">{selectedPlato.descripcion}</p>
                </div>

                <div className="bg-red-50 rounded-xl p-5">
                  <h4 className="text-xl font-bold text-green-700 mb-3">
                    ¿Dónde probarlo?
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Puedes disfrutar este plato en los mercados tradicionales de
                    Santa Cruz, restaurantes especializados en comida cruceña y
                    durante festivales gastronómicos.
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="border border-red-600 text-red-600 hover:bg-red-100 font-medium py-2 px-4 rounded-full transition flex items-center gap-2"
                      onClick={closePlatoModal}
                    >
                      Cerrar
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Sección Ruta Gastronómica Full Width */}
        <section className="w-full bg-gradient-to-b from-red-50 to-green-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-12">
              Ruta Gastronómica Cruceña
            </h2>

            <div className="flex flex-col md:flex-row gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Columna izquierda: Lista de lugares */}
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-semibold text-red-700 mb-6">
                  ¿Dónde disfrutar estos sabores?
                </h3>
                <ul className="space-y-5 text-lg text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-9 h-9 flex items-center justify-center mr-4">
                      1
                    </div>
                    <span>
                      <strong>Mercados tradicionales:</strong> El corazón de la
                      comida cruceña.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-9 h-9 flex items-center justify-center mr-4">
                      2
                    </div>
                    <span>
                      <strong>Salteñerías:</strong> Para empezar el día con
                      energía.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-9 h-9 flex items-center justify-center mr-4">
                      3
                    </div>
                    <span>
                      <strong>Churrasquerías:</strong> El paraíso de las carnes.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-9 h-9 flex items-center justify-center mr-4">
                      4
                    </div>
                    <span>
                      <strong>Puestos callejeros:</strong> Auténticos sabores
                      locales.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 font-bold rounded-full w-9 h-9 flex items-center justify-center mr-4">
                      5
                    </div>
                    <span>
                      <strong>Festivales gastronómicos:</strong> Celebración de
                      sabores.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Columna derecha: CTA */}
              <div className="md:w-1/2 p-8 bg-gradient-to-br from-green-100 to-red-100 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  ¡Vive la experiencia!
                </h3>
                <p className="text-gray-700 text-lg mb-6 max-w-md">
                  Santa Cruz te espera con sus sabores auténticos, llenos de
                  historia, cultura y tradición culinaria.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/explore?category=turismo-gastronomico">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
                      Turismo Gastronómico
                    </button>
                  </Link>
                  <Link href="/infosantacruz/gastronomia/restaurante">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition">
                      Restaurantes y Mercados
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sección de información */}
        <div className="max-w-6xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-green-600 to-red-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="md:flex">
              <div className="md:w-2/5 p-8 flex items-center justify-center bg-green-700">
                <div className="text-white text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    La Esencia Cruceña
                  </h2>
                  <div className="text-6xl mb-4">🍛</div>
                  <p className="text-green-100">
                    Sabores que cuentan la historia de Santa Cruz
                  </p>
                </div>
              </div>
              <div className="md:w-3/5 bg-white p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  Ingredientes Tradicionales
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Yuca - Base de cuñapé, sonso y masaco
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Maíz - Fundamental en tamales y humintas
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Plátano - Acompañante esencial
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Queso - Elemento clave en horneados
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Carne de res y cerdo - Base de parrilladas
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">
                      Maní - Para sopas y chichas
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-green-800 mt-8 mb-4">
                  Sabores Únicos
                </h3>
                <p className="text-gray-700 mb-4">
                  La gastronomía cruceña es una fusión de tradiciones indígenas,
                  influencias españolas y toques modernos. Cada plato cuenta una
                  historia de la región, desde las humildes masitas horneadas
                  hasta los elaborados platos de carne.
                </p>
                <p className="text-gray-700">
                  Lo que hace única a la comida cruceña es el uso creativo de
                  ingredientes locales combinados con técnicas ancestrales que
                  han pasado de generación en generación.
                </p>
              </div>
            </div>
          </div>
        </div>

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
                  <h3 className="text-xl font-bold m-0">
                    Turismo Metropolitano
                  </h3>
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
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
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
      </div>
    </main>
  );
};

export default GastronomiaCruceña;
