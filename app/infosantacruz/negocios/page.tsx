"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {Menu,X,MapPin,Clock,ChevronRight, ChevronLeft,XCircle,} from "lucide-react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

export default function EventoPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState<LightboxContent | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const t = {
    links: "Enlaces",
    home: "Inicio",
    explore: "Explorar",
    featured: "Destacados",
    categories: "Categorías",
  };
  // Datos de las organizaciones de negocios
  const businessData = [
    {
      id: "cainco",
      title: "CAINCO",
      description:
        "Cámara de Industria, Comercio, Servicios y Turismo de Santa Cruz",
      location: "Esq. Calle Cochabamba y Calle Saavedra",
      ubicacion: "https://maps.app.goo.gl/wq2rE12GsqjZ5Mhf9",
      schedule: "Lunes a Viernes de 08:00 a 12:00 y de 15:00 a 18:30",
      images: [
        {
          id: 1,
          title: "Fachada principal de CAINCO",
          description: "Edificio moderno en el centro de Santa Cruz",
        },
        {
          id: 2,
          title: "Salón de eventos",
          description: "Espacio para conferencias y reuniones de negocios",
        },
        {
          id: 3,
          title: "Área de trabajo colaborativo",
          description: "Espacios modernos para networking",
        },
      ],
    },
    {
      id: "cao",
      title: "CAO",
      description: "Cámara Agropecuaria del Oriente",
      location: "Av. Roca y Coronado (Predios de FEXPOCRUZ)",
      ubicacion: "https://maps.app.goo.gl/2YMW4zKMhBZ2EXJF6",
      schedule: "Horario de Oficina",
      images: [
        {
          id: 1,
          title: "Sede de CAO",
          description: "Centro de operaciones de la cámara agropecuaria",
        },
        {
          id: 2,
          title: "Eventos agropecuarios",
          description: "Feria anual de productos agrícolas",
        },
      ],
    },
    {
      id: "cadex",
      title: "CADEX",
      description: "Cámara de Exportadores de Santa Cruz",
      location: "Calle Domingo Banegas N° 3901",
      ubicacion: "https://maps.app.goo.gl/GM8MSxtE3zQCFDgJ7",
      schedule: "Horario de Oficina",
      images: [
        {
          id: 1,
          title: "Centro de exportadores",
          description: "Sede principal de CADEX",
        },
        {
          id: 2,
          title: "Capacitaciones",
          description: "Talleres para exportadores",
        },
        {
          id: 3,
          title: "Ruedas de negocios",
          description: "Eventos de conexión internacional",
        },
      ],
    },
    {
      id: "cadecocruz",
      title: "CADECOCRUZ",
      description: "Cámara Departamental de Comercio de Santa Cruz",
      location: "Av. Santos Dumont, entre 3er y 4to anillo N° 3223",
      ubicacion: "https://maps.app.goo.gl/4WRTFiQMcumQUvHd9",
      schedule: "Horario de Oficina",
      images: [
        {
          id: 1,
          title: "Sede CADECOCRUZ",
          description: "Edificio corporativo moderno",
        },
        {
          id: 2,
          title: "Salón de reuniones",
          description: "Espacio para encuentros empresariales",
        },
      ],
    },
    {
      id: "parque-industrial",
      title: "PARQUE INDUSTRIAL",
      description: "El primer parque industrial de Bolivia",
      location:
        "Entre el cuarto y séptimo anillo, entre Av. Mutualista y Virgen de Cotoca",
      ubicacion: "https://maps.app.goo.gl/o6rUEwqZmqwtTiMr8",
      schedule: "Horario de oficina",
      images: [
        {
          id: 1,
          title: "Vista aérea del parque",
          description: "Extensa zona industrial",
        },
        {
          id: 2,
          title: "Naves industriales",
          description: "Infraestructura moderna para empresas",
        },
        {
          id: 3,
          title: "Acceso principal",
          description: "Entrada al parque industrial",
        },
      ],
    },
    {
      id: "ceramica-norte",
      title: "CERAMICA NORTE",
      description: "Zona de producción cerámica",
      location: "Km 30-42, carretera al Norte",
      ubicacion: "https://maps.app.goo.gl/b4zr7SyxRSxqSGtg7",
      schedule: "Horario de producción",
      images: [
        {
          id: 1,
          title: "Planta de cerámica",
          description: "Fábrica de productos cerámicos",
        },
        {
          id: 2,
          title: "Proceso de producción",
          description: "Tecnología moderna en fabricación",
        },
      ],
    },
    {
      id: "guabira",
      title: "UNION DE CAÑERO GUABIRA",
      description: "Asociación de productores de caña",
      location:
        "Casco viejo de Montero, sobre calle Bolivar entre Rafael Terrazas y c Cañoto",
      ubicacion: "https://maps.app.goo.gl/CtmsbQ2tRGMmY1BS7",
      schedule:
        "Lunes a viernes: 8:00 a 12:00 y 14:00 a 18:00 Hrs. Sábado: 08:00 a 12:00 Hrs.",
      images: [
        {
          id: 1,
          title: "Plantaciones de caña",
          description: "Campos de cultivo extensos",
        },
        {
          id: 2,
          title: "Procesamiento de caña",
          description: "Tecnología en la producción de azúcar",
        },
        {
          id: 3,
          title: "Sede administrativa",
          description: "Centro de operaciones de Guabirá",
        },
      ],
    },
    {
      id: "belgica",
      title: "LA BELGICA",
      description: "Ingenio azucarero líder en la región",
      location: "Km 40, sobre carretera norte",
      ubicacion: "https://maps.app.goo.gl/jo2uCCb4hAfnWugZA",
      schedule: "Horario de producción continua",
      images: [
        {
          id: 1,
          title: "Planta procesadora",
          description: "Instalaciones modernas",
        },
        {
          id: 2,
          title: "Proceso de refinación",
          description: "Tecnología avanzada en producción de azúcar",
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección activa
      const scrollPosition = window.scrollY + 200;
      for (const [section, ref] of Object.entries(sectionRefs.current)) {
        if (ref instanceof HTMLElement) {
          const { offsetTop, offsetHeight } = ref;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface LightboxContent {
    id: number;
    title: string;
    description: string;
    org: BusinessOrganization;
  }

  interface BusinessOrganization {
    id: string;
    title: string;
    description: string;
    location: string;
    ubicacion: string;
    schedule: string;
    images: BusinessImage[];
  }

  interface BusinessImage {
    id: number;
    title: string;
    description: string;
  }

  const openLightbox = (content: LightboxContent) => {
    setLightboxContent(content);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <main className="bg-white text-gray-800 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between md:grid md:grid-cols-3 md:items-center">
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

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="w-6 h-6 text-green-700" />
              ) : (
                <Menu className="w-6 h-6 text-green-700" />
              )}
            </button>
          </div>

          <div className="hidden md:block" />
        </div>

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

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0">
          <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
            Turismo de Negocios
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-8 animate-fade-in delay-200">
            Santa Cruz de la Sierra
          </h2>
          <div className="animate-bounce mt-12">
            <ChevronDown className="text-white h-10 w-10" />
          </div>
        </div>
      </section>

      {/* BUSINESS ORGANIZATIONS */}
      <div className="sticky top-16 z-40 bg-gradient-to-r from-green-600 to-emerald-700 py-3 px-4 shadow-lg">
        {/* SOLO PARA TELÉFONO: SELECT DESPLEGABLE */}
        <div className="block md:hidden">
          <select
            value={activeSection}
            onChange={(e) => {
              const selectedId = e.target.value;
              document
                .getElementById(selectedId)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full px-4 py-2 rounded-md bg-white text-green-800 font-medium shadow-inner"
          >
            {businessData.map((org) => (
              <option key={org.id} value={org.id}>
                {org.title}
              </option>
            ))}
          </select>
        </div>

        {/* SOLO PARA ESCRITORIO Y TABLET: BARRA HORIZONTAL */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden md:flex justify-center overflow-x-auto scrollbar-hide space-x-4 mt-2"
        >
          {businessData.map((org) => (
            <a
              key={org.id}
              href={`#${org.id}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all ${
                activeSection === org.id
                  ? "bg-white text-green-700 shadow-lg"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {org.title}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ORGANIZATION SECTIONS */}
      <div className="container mx-auto py-16 px-4">
        {businessData.map((org, index) => (
          <section
            key={org.id}
            id={org.id}
            ref={(el) => { sectionRefs.current[org.id] = el; }}
            className={`py-16 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } transition-all duration-700 ease-in-out`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                  {org.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {org.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Ubicación</h3>
                      {org.ubicacion ? (
                        <a
                          href={org.ubicacion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-700 hover:underline"
                        >
                          {org.location}
                        </a>
                      ) : (
                        <p className="text-gray-700">{org.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Horario de Atención
                      </h3>
                      <p className="text-gray-700">{org.schedule}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-4">
                    {org.images.map((image, imgIndex) => (
                      <div
                        key={image.id}
                        className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer aspect-square"
                        onClick={() => openLightbox({ ...image, org })}
                      >
                        <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                            <h3 className="font-bold">{image.title}</h3>
                            <p className="text-sm opacity-80">
                              {image.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para explorar el potencial empresarial de Santa Cruz?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Descubre oportunidades de negocio, conexiones empresariales y el
            vibrante ecosistema económico de nuestra ciudad.
          </p>

          <Link href="/explore?category=turismo-de-negocios">
            <button className="bg-white text-green-700 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
              Planificar Visita
            </button>
          </Link>
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
                  <Phone className="mr-2" width={16} height={16} /> Telf. (591-3) 3636000 – 3636001
                </li>
                <li className="flex items-center">
                  <Mail width={16} height={16} className="mr-2" />{" "}
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
                  <Facebook width={20} height={20} className={undefined} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Instagram width={20} height={20} className={undefined} />
                </a>
                <a
                  href="#"
                  className="bg-green-800 p-2 rounded-full hover:bg-green-700 transition"
                >
                  <Twitter width={20} height={20} className={undefined} />
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

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxContent && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col">
            {/* Botón cerrar */}
            <div className="flex justify-end mb-2">
              <button
                onClick={closeLightbox}
                className="text-white hover:text-green-400 transition"
              >
                <XCircle size={32} />
              </button>
            </div>

            {/* Imagen o contenedor de imagen */}
            <div className="bg-gray-200 border-2 border-dashed w-full h-[70vh] rounded-xl overflow-hidden mb-6" />

            {/* Contenido del Lightbox */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {lightboxContent.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {lightboxContent.description}
                  </p>

                  {/* Ubicación con enlace si está disponible */}
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin size={18} className="text-green-600" />
                    {lightboxContent.org.ubicacion ? (
                      <a
                        href={lightboxContent.org.ubicacion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 hover:underline"
                      >
                        {lightboxContent.org.location}
                      </a>
                    ) : (
                      <span>{lightboxContent.org.location}</span>
                    )}
                  </div>

                  {/* Horario */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} className="text-green-600" />
                    <span>{lightboxContent.org.schedule}</span>
                  </div>
                </div>

                {/* Nombre de la organización */}
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <span className="font-bold">{lightboxContent.org.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Componente para el ícono de flecha hacia abajo
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Componentes para íconos de redes sociales
function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
