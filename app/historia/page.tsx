"use client";

import { useState, useEffect } from "react";
import { 
  MapPin, 
  Menu, 
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Navigation,
  ZoomIn,
  Church,
  Map,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { useDataCache } from "@/lib/cache";

const lugaresHistoricos = [
  {
    id: "catedral",
    name: "Catedral de Santa Cruz",
    searchQuery: "Catedral Metropolitana de San Lorenzo, Santa Cruz de la Sierra, Bolivia",
    mapUrl: "https://maps.app.goo.gl/J6k2GVePFf2Z7UvM8", // <-- Reemplaza con tu enlace real
    shortDesc: "Corazón religioso e histórico de la ciudad capital.",
    church: {
      title: "Basílica Menor de San Lorenzo",
      text: "Símbolo principal de la ciudad, famosa por sus bóvedas de madera tallada, su arquitectura de ladrillo visto y el museo de arte sacro que alberga en su interior.",
      img: "/images/catedral_scz.jpg",
      mapUrl: "https://maps.app.goo.gl/J6k2GVePFf2Z7UvM8" // <-- Reemplaza con tu enlace real
    },
    plaza: {
      title: "Plaza 24 de Septiembre",
      text: "El núcleo social y cultural de Santa Cruz, rodeado de edificios coloniales y republicanos, palmeras y el tradicional ambiente cruceño.",
      img: "/plazaaaaz24.webp",
      mapUrl: "https://maps.app.goo.gl/VQMMn4R8Jm6UcHsYA" // <-- Reemplaza con tu enlace real
    }
  },
  {
    id: "porongo",
    name: "Porongo",
    searchQuery: "Porongo, Santa Cruz, Bolivia",
    mapUrl: "", 
    shortDesc: "Pueblo tradicional a pocos kilómetros de la ciudad, guardián de las costumbres.",
    church: {
      title: "Iglesia de San Juan Bautista",
      text: "Construida en 1716, es una de las últimas iglesias de estilo jesuítico-chiquitano en las cercanías de la capital. Famosa por su campanario de madera.",
      img: "/porongooo.jpg",
      mapUrl: "https://maps.app.goo.gl/R62FFcTzzXz8Fx2Z6" 
    },
    plaza: {
      title: "Plaza Principal de Porongo",
      text: "Un lugar pintoresco y tranquilo, centro de las vibrantes celebraciones de la fiesta de San Juan.",
      img: "/plazaporongo.jpg",
      mapUrl: "https://maps.app.goo.gl/BcRKvHSk8vYkfbAn8" 
    }
  },
  {
    id: "san_xavier",
    name: "San Javier",
    searchQuery: "San Javier, Santa Cruz, Bolivia",
    mapUrl: "",
    shortDesc: "La primera misión jesuítica de Chiquitos, fundada en 1691.",
    church: {
      title: "Iglesia de San Francisco Xavier",
      text: "Monumento Nacional y Patrimonio de la Humanidad. Destaca por sus columnas de madera tallada y su escuela de música barroca.",
      img: "/sanxavier.webp",
      mapUrl: "https://maps.app.goo.gl/qq1vUc2ECe1uYDrf9"
    },
    plaza: {
      title: "Plaza Misional",
      text: "Amplia y rodeada de galerías con techos de teja y horcones de madera, conservando el trazado original jesuítico.",
      img: "/plazadesanjavier.webp",
      mapUrl: "https://maps.app.goo.gl/k8DbyiMKVrJRBCxJA"
    }
  },
  {
    id: "concepcion",
    name: "Concepción",
    searchQuery: "Concepcion, Santa Cruz, Bolivia",
    mapUrl: "",
    shortDesc: "Joya de la arquitectura barroca mestiza.",
    church: {
      title: "Catedral de la Inmaculada Concepción",
      text: "Conocida como la joya de las misiones, su restauración tomó décadas. Alberga el archivo musical barroco más importante de América.",
      img: "/concepcion.jpg",
      mapUrl: "https://maps.app.goo.gl/pY4KyN8scwbw2N8U9"
    },
    plaza: {
      title: "Plaza Principal de Concepción",
      text: "Un espacio sereno rodeado de vegetación exuberante y casas con amplios corredores de madera.",
      img: "/plazaconcepcion.jpg",
      mapUrl: "https://maps.app.goo.gl/aNh6aC2auhdc6ofSA"
    }
  },
  {
    id: "san_ignacio",
    name: "San Ignacio de Velasco",
    searchQuery: "San Ignacio de Velasco, Bolivia",
    mapUrl: "",
    shortDesc: "La misión más grande y capital comercial de la Chiquitania.",
    church: {
      title: "Catedral de San Ignacio",
      text: "Aunque la original fue destruida, la actual reconstrucción mantiene el majestuoso estilo y conserva los altares originales barrocos.",
      img: "/sanignacio.webp",
      mapUrl: "https://maps.app.goo.gl/38PXYgb8AScgYsjH6"
    },
    plaza: {
      title: "Plaza Principal de San Ignacio",
      text: "El corazón comercial y cultural de Velasco, donde se mezcla la modernidad con la rica herencia indígena y jesuítica.",
      img: "/plazadesanignacio.webp",
      mapUrl: "https://maps.app.goo.gl/S9dfa5kEwwbpzrvt9"
    }
  },
  {
    id: "san_miguel",
    name: "San Miguel de Velasco",
    searchQuery: "San Miguel de Velasco, Bolivia",
    mapUrl: "",
    shortDesc: "Conocida por tener el altar tallado más impresionante.",
    church: {
      title: "Iglesia de San Miguel Arcángel",
      text: "Posee una fachada única con hermosos motivos dorados y el altar mayor más imponente y detallado de todas las misiones.",
      img: "/sanmiguel.webp",
      mapUrl: "https://maps.app.goo.gl/1c9VR6BxxhtU9cC69"
    },
    plaza: {
      title: "Plaza Misional de San Miguel",
      text: "Un remanso de paz con tallados locales, donde los artesanos a menudo exhiben sus trabajos en madera.",
      img: "/plazasanmiguel.webp",
      mapUrl: "https://maps.app.goo.gl/bvNhmYEeRZCQHevk7"
    }
  },
  {
    id: "san_rafael",
    name: "San Rafael de Velasco",
    searchQuery: "San Rafael de Velasco, Bolivia",
    mapUrl: "",
    shortDesc: "Un tesoro oculto con valiosos lienzos originales.",
    church: {
      title: "Iglesia de San Rafael Arcángel",
      text: "Destaca por su techo de mica y madera, además de conservar valiosas pinturas y muebles originales del siglo XVIII.",
      img: "/sanrafael1.jpg",
      mapUrl: "https://maps.app.goo.gl/XeDJbJK7dCG4KhdR7"
    },
    plaza: {
      title: "Plaza de San Rafael",
      text: "Pequeña, tranquila y auténtica. Un lugar perfecto para sentir la paz de la época misional.",
      img: "/plazasanrafael.png",
      mapUrl: "https://maps.app.goo.gl/C28zbn89ZF2W2n786"
    }
  },
  {
    id: "san_jose",
    name: "San José de Chiquitos",
    searchQuery: "San Jose de Chiquitos, Bolivia",
    mapUrl: "",
    shortDesc: "El único conjunto misional construido en piedra.",
    church: {
      title: "Conjunto Misional de San José",
      text: "A diferencia del resto, fue construida en piedra volcánica. Es un conjunto enorme que incluye la iglesia, el campanario y capillas.",
      img: "/sanjose.jpg",
      mapUrl: "https://maps.app.goo.gl/et8r4yShss71bavh9"
    },
    plaza: {
      title: "Plaza Principal de San José",
      text: "Cuna de la fundación original de Santa Cruz de la Sierra (Santa Cruz la Vieja está muy cerca). Amplia y calurosa.",
      img: "/plazadesanjose.jpg",
      mapUrl: "https://maps.app.goo.gl/RDoxW6BULcCbHvyr6"
      
    }
  }
];

export default function HistoriaPage() {
  const { t } = useLanguage();
  const { data: cacheData, loadData } = useDataCache();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [activePlace, setActivePlace] = useState(lugaresHistoricos[0]);
  
  // Estado para la tarjeta flotante, ahora incluye mapUrl
  const [activeMapLocation, setActiveMapLocation] = useState({
    title: lugaresHistoricos[0].name,
    description: lugaresHistoricos[0].shortDesc,
    searchQuery: lugaresHistoricos[0].searchQuery,
    mapUrl: lugaresHistoricos[0].mapUrl
  });

  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!cacheData) {
      loadData();
    }
  }, [cacheData, loadData]);

  // Función para abrir Google Maps (Usa el enlace específico si existe, si no, busca por nombre)
  const getDirectionsUrl = () => {
    if (activeMapLocation.mapUrl && activeMapLocation.mapUrl.trim() !== "") {
      return activeMapLocation.mapUrl;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMapLocation.searchQuery)}`;
  };

  const handleMainPlaceClick = (lugar: any) => {
    setActivePlace(lugar);
    setActiveMapLocation({
      title: lugar.name,
      description: lugar.shortDesc,
      searchQuery: lugar.searchQuery,
      mapUrl: lugar.mapUrl
    });
  };

  const handleSubPlaceClick = (lugar: any, type: 'church' | 'plaza') => {
    setActivePlace(lugar); 
    
    if (type === 'church') {
      setActiveMapLocation({
        title: lugar.church.title,
        description: lugar.church.text,
        searchQuery: `${lugar.church.title}, ${lugar.name}, Santa Cruz, Bolivia`,
        mapUrl: lugar.church.mapUrl
      });
    } else {
      setActiveMapLocation({
        title: lugar.plaza.title,
        description: lugar.plaza.text,
        searchQuery: `${lugar.plaza.title}, ${lugar.name}, Santa Cruz, Bolivia`,
        mapUrl: lugar.plaza.mapUrl
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-3 select-none hover:opacity-80 transition">
              <img src="/logo upds verde.png" alt="Logo UPDS" className="w-10 h-10" />
              <img src="/Logotipo 3 verde.png" alt="Turismo Metropolitano Logo" className="w-10 h-10" />
              <span className="font-bold text-green-700 text-xl md:text-2xl hidden sm:block">
                Turismo Metropolitano
              </span>
            </Link>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="flex gap-8 items-center">
              <Link href="/" className={`transition-colors hover:text-green-400 ${isScrolled ? "text-gray-700 hover:text-green-600" : "text-black"}`}>Inicio</Link>
              <Link href="/explore" className={`transition-colors hover:text-green-400 ${isScrolled ? "text-gray-700 hover:text-green-600" : "text-black"}`}>Explorar</Link>
              <Link href="/infosantacruz" className={`transition-colors hover:text-green-400 ${isScrolled ? "text-gray-700 hover:text-green-600" : "text-black"}`}>Santa Cruz</Link>
              <Link href="/entretenimiento" className={`transition-colors hover:text-green-400 ${isScrolled ? "text-gray-700 hover:text-green-600" : "text-black"}`}>Rincones para Disfrutar</Link>
            </div>
          </div>
          <div className="flex justify-end md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7 text-green-700" /> : <Menu className="w-7 h-7 text-green-700" />}
            </button>
          </div>
          <div className="hidden md:block"></div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col items-start gap-4 pt-4">
              <Link href="/" className="hover:text-green-700 transition font-medium w-full" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
              <Link href="/explore" className="hover:text-green-700 transition font-medium w-full" onClick={() => setIsMenuOpen(false)}>Explorar</Link>
              <Link href="/infosantacruz" className="hover:text-green-700 transition font-medium w-full" onClick={() => setIsMenuOpen(false)}>Santa Cruz</Link>
              <Link href="/entretenimiento" className="hover:text-green-700 transition font-medium w-full" onClick={() => setIsMenuOpen(false)}>Rincones para Disfrutar</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Contenido Principal */}
      <main className="flex-grow">
        
        {/* PORTADA */}
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/catedral_scz.jpg" 
              alt="Portada Ruta de Fe e Historia"
              fill
              className="object-cover scale-105 animate-slow-zoom"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#F8FAFC] z-10" />
          </div>

          <div className="container mx-auto px-4 relative z-20 flex flex-col items-center justify-center text-center mt-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 font-serif tracking-tight drop-shadow-xl">
              Ruta de Fe e Historia
            </h1>
            <p className="text-lg md:text-2xl text-white/95 max-w-3xl leading-relaxed font-light drop-shadow-md">
              Un viaje en el tiempo a través de las majestuosas Misiones Jesuíticas, iglesias coloniales y plazas que guardan el alma de Santa Cruz.
            </p>
          </div>
        </section>

        {/* GUÍA TURÍSTICA DIVIDIDA */}
        <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-20 relative z-30">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: LISTA DE LUGARES */}
            <div className="w-full lg:w-7/12 xl:w-2/3 flex flex-col gap-8">
              
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 text-green-800">
                <div className="bg-green-100 p-3 rounded-full">
                  <Info className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Explora la ruta interactiva</h2>
                  <p className="text-sm text-gray-600">Haz clic en <strong>"Ver en el mapa"</strong> en la iglesia o la plaza para ubicarla a tu derecha. Toca las fotos para ampliarlas.</p>
                </div>
              </div>

              {lugaresHistoricos.map((lugar) => (
                <article 
                  key={lugar.id} 
                  className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 shadow-sm border-2 ${
                    activePlace.id === lugar.id 
                      ? "border-green-500 shadow-xl shadow-green-100 ring-4 ring-green-50" 
                      : "border-gray-100 hover:border-green-200 hover:shadow-md"
                  }`}
                >
                  <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-white to-gray-50">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 font-serif mb-2">
                        {lugar.name}
                      </h3>
                      <p className="text-gray-500 font-medium">{lugar.shortDesc}</p>
                    </div>
                    <button 
                      onClick={() => handleMainPlaceClick(lugar)}
                      className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-colors ${
                        activeMapLocation.title === lugar.name 
                          ? "bg-green-600 text-white" 
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                    >
                      <MapPin className="w-5 h-5" />
                      Destino General
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    
                    {/* Sección Iglesia */}
                    <div className="p-6 md:p-8 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-yellow-100 p-2.5 rounded-lg">
                          <Church className="w-6 h-6 text-yellow-700" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 leading-tight">{lugar.church.title}</h4>
                      </div>
                      
                      <div 
                        className="relative w-full h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-inner mb-5"
                        onClick={() => setExpandedImage(lugar.church.img)}
                      >
                        <Image 
                          src={lugar.church.img} 
                          alt={lugar.church.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{lugar.church.text}</p>
                      
                      <button 
                        onClick={() => handleSubPlaceClick(lugar, 'church')}
                        className={`inline-flex justify-center items-center w-full px-4 py-3 font-semibold rounded-xl border transition-all group ${
                          activeMapLocation.title === lugar.church.title 
                            ? "bg-yellow-400 text-yellow-900 border-yellow-500 shadow-md"
                            : "bg-gray-50 hover:bg-yellow-50 text-gray-700 hover:text-yellow-800 border-gray-200 hover:border-yellow-300"
                        }`}
                      >
                        Ver Iglesia en el mapa <MapPin className={`w-4 h-4 ml-2 ${activeMapLocation.title !== lugar.church.title && "group-hover:scale-110 transition-transform"}`} />
                      </button>
                    </div>

                    {/* Sección Plaza */}
                    <div className="p-6 md:p-8 flex flex-col h-full bg-slate-50/50">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-sky-100 p-2.5 rounded-lg">
                          <Map className="w-6 h-6 text-sky-700" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-800 leading-tight">{lugar.plaza.title}</h4>
                      </div>
                      
                      <div 
                        className="relative w-full h-56 rounded-2xl overflow-hidden cursor-pointer group shadow-inner mb-5"
                        onClick={() => setExpandedImage(lugar.plaza.img)}
                      >
                        <Image 
                          src={lugar.plaza.img} 
                          alt={lugar.plaza.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{lugar.plaza.text}</p>
                      
                      <button 
                        onClick={() => handleSubPlaceClick(lugar, 'plaza')}
                        className={`inline-flex justify-center items-center w-full px-4 py-3 font-semibold rounded-xl border transition-all group ${
                          activeMapLocation.title === lugar.plaza.title 
                            ? "bg-sky-500 text-white border-sky-600 shadow-md"
                            : "bg-white hover:bg-sky-50 text-gray-700 hover:text-sky-800 border-gray-200 hover:border-sky-300 shadow-sm"
                        }`}
                      >
                        Ver Plaza en el mapa <MapPin className={`w-4 h-4 ml-2 ${activeMapLocation.title !== lugar.plaza.title && "group-hover:scale-110 transition-transform"}`} />
                      </button>
                    </div>

                  </div>
                </article>
              ))}
            </div>

            {/* COLUMNA DERECHA: MAPA INTERACTIVO */}
            <div className="w-full lg:w-5/12 xl:w-1/3 lg:sticky lg:top-24 h-[65vh] lg:h-[calc(100vh-8rem)] min-h-[600px] flex flex-col rounded-3xl shadow-xl overflow-hidden border border-gray-200 bg-white z-20">
              
              <div className="flex-grow relative bg-gray-100 w-full h-full">
                {/* Iframe del Mapa: Corregido el enlace de embed */}
                <iframe 
                  key={activeMapLocation.searchQuery}
                  className="absolute inset-0 w-full h-full border-0"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapLocation.searchQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  title={`Mapa de ${activeMapLocation.title}`}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                
                {/* TARJETA FLOTANTE */}
                <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-500 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                      Selección Actual
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {activeMapLocation.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-5 line-clamp-3">
                    {activeMapLocation.description}
                  </p>
                  
                  <a 
                    href={getDirectionsUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Navigation className="w-5 h-5" />
                    Cómo llegar
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER Y MODALES SIGUEN IGUAL... */}
      <footer className="bg-green-900 text-white py-12 mt-auto">
        {/* ...Contenido del footer... */}
      </footer>

      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-[85vh] animate-fade-in-up">
            <button 
              className="absolute -top-14 right-0 text-white hover:text-yellow-400 flex items-center gap-2 transition-colors font-bold bg-white/10 px-4 py-2 rounded-full"
              onClick={() => setExpandedImage(null)}
            >
              <X className="w-6 h-6" /> Cerrar
            </button>
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={expandedImage} 
                alt="Imagen ampliada" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}