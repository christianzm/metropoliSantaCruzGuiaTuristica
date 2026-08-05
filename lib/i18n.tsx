"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

// Supported languages
export type Language = "es" | "en" | "pt" | "gn" | "qu"

// Translation interface
export interface Translations {
  // Header & Navigation
  title: string
  subtitle: string
  home: string
  explore: string
  featured: string
  categories: string
  municipalities: string
  about: string
  contact: string
  language: string
  selectLanguage: string

  // Hero Section
  heroText: string
  exploreNow: string
  topPlaces: string

  // Search & Filters
  searchPlaces: string
  searchPlaceholder: string
  category: string
  allCategories: string
  municipality: string
  allMunicipalities: string
  searchRadius: string
  sortBy: string
  rating: string
  name: string
  distance: string
  clearFilters: string
  resultsCount: string
  noResults: string

  // Place Details
  description: string
  schedules: string
  price: string
  access: string
  location: string
  socialMedia: string
  website: string
  gallery: string
  viewOnMap: string
  openInGoogleMaps: string
  ratePlace: string
  thanksForRating: string

  // Tourism Guide Section
  instructions: string
  readGuide: string
  touristGuide: string
  santaCruz: string
  metropolitan: string
  knowMunicipalities: string
  distanceFrom: string
  municipalitiesMap: string
  tourismCategories: string
  categoryColors: string
  clickIcons: string
  clickLocation: string
  clickSocial: string

  // Categories
  architecturalTourism: string
  natureTourism: string
  entertainmentTourism: string
  businessTourism: string
  gastronomicTourism: string
  hospitality: string

  // Actions & Buttons
  allowLocation: string
  update: string
  loading: string
  loadingPlaces: string
  optimizingData: string
  backToMap: string
  placeNotFound: string
  retry: string
  loadingMap: string

  // Footer
  completeGuide: string
  links: string
  statistics: string
  touristicPlaces: string
  allRightsReserved: string

  // CTA Section
  readyToExplore: string
  discoverPlaces: string
  exploreOnMap: string

  // Error Messages
  errorLoadingData: string
  errorLoadingPlace: string
  locationDenied: string
  locationUnavailable: string
  locationTimeout: string

  // Analytics
  photos: string
  yourLocation: string
  viewDetails: string

  // Transportation guide
  gettingAround: string
  gettingAroundSubtitle: string
  organizeTrip: string
  transportationOptions: string
  airplane: string
  bus: string
  car: string
  urbanTransport: string
  distancesFromSantaCruz: string
  distancesIntro: string
  travelTip: string
  travelerTips: string
  safety: string
  budget: string
  planning: string
  enjoyHospitality: string
  updatedTourismInfo: string

  // Misc
  km: string
  na: string
  of: string
}

// Translations for each language
const translations: Record<Language, Translations> = {
  es: {
    // Header & Navigation
    title: "Turismo Metropolitano",
    subtitle: "¡Vení puej a Santa Cruz!",
    home: "Inicio",
    explore: "Explorar",
    featured: "Lugares Top",
    categories: "Categorías",
    municipalities: "Municipios",
    about: "Acerca de",
    contact: "Contacto",
    language: "Idioma",
    selectLanguage: "Seleccionar idioma",

    // Hero Section
    heroText: "Recorré los rincones más pintudos de la capital oriental.",
    exploreNow: "Explorar Ahora",
    topPlaces: "Lugares Top",

    // Search & Filters
    searchPlaces: "Buscar lugares",
    searchPlaceholder: "Buscar lugares...",
    category: "Categoría",
    allCategories: "Todas las categorías",
    municipality: "Municipio",
    allMunicipalities: "Todos los municipios",
    searchRadius: "Radio de búsqueda",
    sortBy: "Ordenar por",
    rating: "Rating",
    name: "Nombre",
    distance: "Distancia",
    clearFilters: "Limpiar filtros",
    resultsCount: "de",
    noResults: "No se encontraron lugares con los filtros seleccionados.",

    // Place Details
    description: "Descripción",
    schedules: "Horarios",
    price: "Precio",
    access: "Acceso",
    location: "Ubicación",
    socialMedia: "Redes Sociales",
    website: "Sitio Web",
    gallery: "Galería",
    viewOnMap: "Ver en el Mapa",
    openInGoogleMaps: "Abrir en Google Maps",
    ratePlace: "¿Cómo calificarías este lugar?",
    thanksForRating: "¡Gracias por tu calificación!",

    // Tourism Guide Section
    instructions: "INSTRUCCIONES",
    readGuide: "PARA LEER LA",
    touristGuide: "GUÍA TURÍSTICA",
    santaCruz: "¡Vení puej a Santa Cruz!",
    metropolitan: "METROPOLITANA",
    knowMunicipalities: "CONOCE LOS MUNICIPIOS",
    distanceFrom: "Distancia de Santa Cruz de la Sierra a:",
    municipalitiesMap: "Mapa de Municipios",
    tourismCategories: "CATEGORÍAS DE TURISMO Y SU COLOR",
    categoryColors: "CATEGORÍAS DE TURISMO Y SU COLOR",
    clickIcons: "HACE CLICK EN LOS SIGUIENTES ÍCONOS",
    clickLocation: "Hace click y conoce la ubicación",
    clickSocial: "Hace click y conoce sus redes sociales",

    // Categories
    architecturalTourism: "Turismo arquitectónico, cultural, histórico y religioso",
    natureTourism: "Turismo de naturaleza",
    entertainmentTourism: "Turismo de entretenimiento y recreación",
    businessTourism: "Turismo de negocios",
    gastronomicTourism: "Turismo gastronómico",
    hospitality: "Hotelería",

    // Actions & Buttons
    allowLocation: "Permitir Ubicación",
    update: "Actualizar",
    loading: "Cargando...",
    loadingPlaces: "Cargando lugares turísticos...",
    optimizingData: "Optimizando datos para mejor rendimiento...",
    backToMap: "Volver al Mapa",
    placeNotFound: "Lugar no encontrado",
    retry: "Reintentar",
    loadingMap: "Cargando mapa...",

    // Footer
    completeGuide: "Tu guía completa para descubrir Santa Cruz de la Sierra",
    links: "Enlaces",
    statistics: "Estadísticas",
    touristicPlaces: "lugares turísticos",
    allRightsReserved: "Todos los derechos reservados.",

    // CTA Section
    readyToExplore: "¿Listo para explorar Santa Cruz?",
    discoverPlaces: "Descubre",
    exploreOnMap: "Explorar en el Mapa",

    // Error Messages
    errorLoadingData: "Error al cargar datos",
    errorLoadingPlace: "Cargando lugar...",
    locationDenied: "Acceso a ubicación denegado por el usuario",
    locationUnavailable: "Información de ubicación no disponible",
    locationTimeout: "Tiempo de espera de ubicación agotado",

    // Analytics
    photos: "fotos",
    yourLocation: "Tu ubicación",
    viewDetails: "Ver Detalles",

    // Misc
    km: "km",
    na: "N/A",
    of: "de",
  },

  en: {
    // Header & Navigation
    title: "Metropolitan Tourism",
    subtitle: "Santa Cruz",
    home: "Home",
    explore: "Explore",
    featured: "Top Places",
    categories: "Categories",
    municipalities: "Municipalities",
    about: "About",
    contact: "Contact",
    language: "Language",
    selectLanguage: "Select language",

    // Hero Section
    heroText: "Is waiting for you",
    exploreNow: "Explore Now",
    topPlaces: "Top Places",

    // Search & Filters
    searchPlaces: "Search places",
    searchPlaceholder: "Search places...",
    category: "Category",
    allCategories: "All categories",
    municipality: "Municipality",
    allMunicipalities: "All municipalities",
    searchRadius: "Search radius",
    sortBy: "Sort by",
    rating: "Rating",
    name: "Name",
    distance: "Distance",
    clearFilters: "Clear filters",
    resultsCount: "of",
    noResults: "No places found with the selected filters.",

    // Place Details
    description: "Description",
    schedules: "Schedules",
    price: "Price",
    access: "Access",
    location: "Location",
    socialMedia: "Social Media",
    website: "Website",
    gallery: "Gallery",
    viewOnMap: "View on Map",
    openInGoogleMaps: "Open in Google Maps",
    ratePlace: "How would you rate this place?",
    thanksForRating: "Thanks for your rating!",

    // Tourism Guide Section
    instructions: "INSTRUCTIONS",
    readGuide: "TO READ THE",
    touristGuide: "TOURIST GUIDE",
    santaCruz: "SANTA CRUZ",
    metropolitan: "METROPOLITAN",
    knowMunicipalities: "KNOW THE MUNICIPALITIES",
    distanceFrom: "Distance from Santa Cruz de la Sierra to:",
    municipalitiesMap: "Municipalities Map",
    tourismCategories: "TOURISM CATEGORIES AND THEIR COLOR",
    categoryColors: "TOURISM CATEGORIES AND THEIR COLOR",
    clickIcons: "CLICK ON THE FOLLOWING ICONS",
    clickLocation: "Click and know the location",
    clickSocial: "Click and know their social networks",

    // Categories
    architecturalTourism: "Architectural, cultural, historical and religious tourism",
    natureTourism: "Nature tourism",
    entertainmentTourism: "Entertainment and recreation tourism",
    businessTourism: "Business tourism",
    gastronomicTourism: "Gastronomic tourism",
    hospitality: "Hospitality",

    // Actions & Buttons
    allowLocation: "Allow Location",
    update: "Update",
    loading: "Loading...",
    loadingPlaces: "Loading tourist places...",
    optimizingData: "Optimizing data for better performance...",
    backToMap: "Back to Map",
    placeNotFound: "Place not found",
    retry: "Retry",
    loadingMap: "Loading map...",

    // Footer
    completeGuide: "Your complete guide to discover Santa Cruz de la Sierra",
    links: "Links",
    statistics: "Statistics",
    touristicPlaces: "tourist places",
    allRightsReserved: "All rights reserved.",

    // CTA Section
    readyToExplore: "Ready to explore Santa Cruz?",
    discoverPlaces: "Discover",
    exploreOnMap: "Explore on Map",

    // Error Messages
    errorLoadingData: "Error loading data",
    errorLoadingPlace: "Loading place...",
    locationDenied: "Location access denied by user",
    locationUnavailable: "Location information unavailable",
    locationTimeout: "Location request timed out",

    // Analytics
    photos: "photos",
    yourLocation: "Your location",
    viewDetails: "View Details",

    // Transportation guide
    gettingAround: "Getting around Santa Cruz de la Sierra",
    gettingAroundSubtitle: "Your complete guide to exploring the vibrant city and its surroundings",
    organizeTrip: "Get organized and move around Santa Cruz with ease",
    transportationOptions: "Transportation options",
    airplane: "By airplane",
    bus: "By bus",
    car: "By car",
    urbanTransport: "Urban transportation",
    distancesFromSantaCruz: "Distances from Santa Cruz",
    distancesIntro: "Santa Cruz is the perfect starting point for exploring nearby municipalities.",
    travelTip: "Travel tip",
    travelerTips: "Tips for travelers",
    safety: "Safety",
    budget: "Budget",
    planning: "Planning",
    enjoyHospitality: "Enjoy the warm hospitality and rich culture of Santa Cruz!",
    updatedTourismInfo: "Updated tourism information",

    // Misc
    km: "km",
    na: "N/A",
    of: "de",
  },

  pt: {
    // Header & Navigation
    title: "Turismo Metropolitano",
    subtitle: "Santa Cruz",
    home: "Início",
    explore: "Explorar",
    featured: "Lugares Top",
    categories: "Categorias",
    municipalities: "Municípios",
    about: "Sobre",
    contact: "Contato",
    language: "Idioma",
    selectLanguage: "Selecionar idioma",

    // Hero Section
    heroText: "Está esperando por você",
    exploreNow: "Explorar Agora",
    topPlaces: "Lugares Top",

    // Search & Filters
    searchPlaces: "Buscar lugares",
    searchPlaceholder: "Buscar lugares...",
    category: "Categoria",
    allCategories: "Todas as categorias",
    municipality: "Município",
    allMunicipalities: "Todos os municípios",
    searchRadius: "Raio de busca",
    sortBy: "Ordenar por",
    rating: "Avaliação",
    name: "Nome",
    distance: "Distância",
    clearFilters: "Limpar filtros",
    resultsCount: "de",
    noResults: "Nenhum lugar encontrado com os filtros selecionados.",

    // Place Details
    description: "Descrição",
    schedules: "Horários",
    price: "Preço",
    access: "Acesso",
    location: "Localização",
    socialMedia: "Redes Sociais",
    website: "Site",
    gallery: "Galeria",
    viewOnMap: "Ver no Mapa",
    openInGoogleMaps: "Abrir no Google Maps",
    ratePlace: "Como você avaliaria este lugar?",
    thanksForRating: "Obrigado pela sua avaliação!",

    // Tourism Guide Section
    instructions: "INSTRUÇÕES",
    readGuide: "PARA LER O",
    touristGuide: "GUIA TURÍSTICO",
    santaCruz: "SANTA CRUZ",
    metropolitan: "METROPOLITANA",
    knowMunicipalities: "CONHEÇA OS MUNICÍPIOS",
    distanceFrom: "Distância de Santa Cruz de la Sierra para:",
    municipalitiesMap: "Mapa dos Municípios",
    tourismCategories: "CATEGORIAS DE TURISMO E SUA COR",
    categoryColors: "CATEGORIAS DE TURISMO E SUA COR",
    clickIcons: "CLIQUE NOS SEGUINTES ÍCONES",
    clickLocation: "Clique e conheça a localização",
    clickSocial: "Clique e conheça suas redes sociais",

    // Categories
    architecturalTourism: "Turismo arquitetônico, cultural, histórico e religioso",
    natureTourism: "Turismo de natureza",
    entertainmentTourism: "Turismo de entretenimento e recreação",
    businessTourism: "Turismo de negócios",
    gastronomicTourism: "Turismo gastronômico",
    hospitality: "Hotelaria",

    // Actions & Buttons
    allowLocation: "Permitir Localização",
    update: "Atualizar",
    loading: "Carregando...",
    loadingPlaces: "Carregando lugares turísticos...",
    optimizingData: "Otimizando dados para melhor desempenho...",
    backToMap: "Voltar ao Mapa",
    placeNotFound: "Lugar não encontrado",
    retry: "Tentar novamente",
    loadingMap: "Carregando mapa...",

    // Footer
    completeGuide: "Seu guia completo para descobrir Santa Cruz de la Sierra",
    links: "Links",
    statistics: "Estatísticas",
    touristicPlaces: "lugares turísticos",
    allRightsReserved: "Todos os direitos reservados.",

    // CTA Section
    readyToExplore: "Pronto para explorar Santa Cruz?",
    discoverPlaces: "Descubra",
    exploreOnMap: "Explorar no Mapa",

    // Error Messages
    errorLoadingData: "Erro ao carregar dados",
    errorLoadingPlace: "Carregando lugar...",
    locationDenied: "Acesso à localização negado pelo usuário",
    locationUnavailable: "Informações de localização indisponíveis",
    locationTimeout: "Tempo limite da solicitação de localização esgotado",

    // Analytics
    photos: "fotos",
    yourLocation: "Sua localização",
    viewDetails: "Ver Detalhes",

    // Misc
    km: "km",
    na: "N/A",
    of: "de",
  },

  gn: {
    // Header & Navigation (Guaraní)
    title: "Turismo Metropolitano",
    subtitle: "Santa Cruz",
    home: "Ñande róga",
    explore: "Jaheka",
    featured: "Tenda porãvéva",
    categories: "Ñemohenda",
    municipalities: "Táva",
    about: "Mba'éichapa",
    contact: "Ñe'ẽ",
    language: "Ñe'ẽ",
    selectLanguage: "Eiporavo ñe'ẽ",

    // Hero Section
    heroText: "Nde reha'arõ",
    exploreNow: "Jaheka ko'ág̃a",
    topPlaces: "Tenda porãvéva",

    // Search & Filters
    searchPlaces: "Jaheka tenda",
    searchPlaceholder: "Jaheka tenda...",
    category: "Ñemohenda",
    allCategories: "Opaite ñemohenda",
    municipality: "Táva",
    allMunicipalities: "Opaite táva",
    searchRadius: "Jeheka ypykue",
    sortBy: "Ñemohenda",
    rating: "Ñembohapy",
    name: "Téra",
    distance: "Mombyry",
    clearFilters: "Mopotĩ jeheka",
    resultsCount: "guive",
    noResults: "Ndaipóri tenda ojejuhúva ko jeheka rehe.",

    // Place Details
    description: "Ñe'ẽmondo",
    schedules: "Aravo",
    price: "Hepy",
    access: "Jeike",
    location: "Tendápe",
    socialMedia: "Ñe'ẽ ñanduti",
    website: "Ñanduti renda",
    gallery: "Ta'anga renda",
    viewOnMap: "Ehecha mapa-pe",
    openInGoogleMaps: "Eike Google Maps-pe",
    ratePlace: "Mba'éichapa rembohapy ko tenda?",
    thanksForRating: "Aguyje nde ñembohapy rehe!",

    // Tourism Guide Section
    instructions: "ÑEMOARANDU",
    readGuide: "EMOÑE'ẽ HAGUÃ",
    touristGuide: "TURISTA RAPE",
    santaCruz: "SANTA CRUZ",
    metropolitan: "METROPOLITANA",
    knowMunicipalities: "EIKUAA TÁVA KUÉRA",
    distanceFrom: "Mombyry Santa Cruz de la Sierra guive:",
    municipalitiesMap: "Táva kuéra mapa",
    tourismCategories: "TURISMO ÑEMOHENDA HA ISA",
    categoryColors: "TURISMO ÑEMOHENDA HA ISA",
    clickIcons: "EÑEPYRŨ KO'Ã ÍCONO KUÉRA",
    clickLocation: "Eñepyrũ ha eikuaa tendápe",
    clickSocial: "Eñepyrũ ha eikuaa ñe'ẽ ñanduti",

    // Categories
    architecturalTourism: "Turismo arquitectónico, tekoha, tembiasakue ha tupãsy",
    natureTourism: "Tekoha turismo",
    entertainmentTourism: "Vy'a ha ñembosarái turismo",
    businessTourism: "Ñemba'apo turismo",
    gastronomicTourism: "Tembi'u turismo",
    hospitality: "Óga ñembyaty",

    // Actions & Buttons
    allowLocation: "Emoneĩ tendápe",
    update: "Mbopyahu",
    loading: "Oñemyanyhẽ...",
    loadingPlaces: "Oñemyanyhẽ tenda turístico...",
    optimizingData: "Oñemboheko porã mba'ekuaarã...",
    backToMap: "Jeguevi mapa-pe",
    placeNotFound: "Ndojejuhúi tenda",
    retry: "Eha'ã jey",
    loadingMap: "Oñemyanyhẽ mapa...",

    // Footer
    completeGuide: "Nde rape tuichavéva eikuaa haguã Santa Cruz de la Sierra",
    links: "Joaju",
    statistics: "Papapy",
    touristicPlaces: "tenda turístico",
    allRightsReserved: "Opaite derecho ñongatu.",

    // CTA Section
    readyToExplore: "¿Reimépa ejaheka Santa Cruz?",
    discoverPlaces: "Ejuhu",
    exploreOnMap: "Ejaheka Mapa-pe",

    // Error Messages
    errorLoadingData: "Jejavy oñemyanyhẽvo mba'ekuaarã",
    errorLoadingPlace: "Oñemyanyhẽ tenda...",
    locationDenied: "Tendápe jeike noñemoneĩri",
    locationUnavailable: "Tendápe marandu ndaipóri",
    locationTimeout: "Tendápe jerure paha",

    // Analytics
    photos: "ta'anga",
    yourLocation: "Nde tenda",
    viewDetails: "Ehecha mba'emimi",

    // Transportation guide
    gettingAround: "Getting around Santa Cruz de la Sierra",
    gettingAroundSubtitle: "Your complete guide to exploring the vibrant city and its surroundings",
    organizeTrip: "Get organized and move around Santa Cruz with ease",
    transportationOptions: "Transportation options",
    airplane: "By airplane",
    bus: "By bus",
    car: "By car",
    urbanTransport: "Urban transportation",
    distancesFromSantaCruz: "Distances from Santa Cruz",
    distancesIntro: "Santa Cruz is the perfect starting point for exploring nearby municipalities.",
    travelTip: "Travel tip",
    travelerTips: "Tips for travelers",
    safety: "Safety",
    budget: "Budget",
    planning: "Planning",
    enjoyHospitality: "Enjoy the warm hospitality and rich culture of Santa Cruz!",
    updatedTourismInfo: "Updated tourism information",

    // Transportation guide
    gettingAround: "Como se locomover em Santa Cruz de la Sierra",
    gettingAroundSubtitle: "Seu guia completo para explorar a cidade vibrante e seus arredores",
    organizeTrip: "Organize-se para se locomover tranquilamente por Santa Cruz",
    transportationOptions: "Opções de transporte",
    airplane: "De avião",
    bus: "De ônibus",
    car: "De carro",
    urbanTransport: "Transporte urbano",
    distancesFromSantaCruz: "Distâncias de Santa Cruz",
    distancesIntro: "Santa Cruz é o ponto de partida perfeito para explorar os municípios da região.",
    travelTip: "Dica de viagem",
    travelerTips: "Dicas para viajantes",
    safety: "Segurança",
    budget: "Orçamento",
    planning: "Planejamento",
    enjoyHospitality: "Aproveite a hospitalidade acolhedora e a rica cultura de Santa Cruz!",
    updatedTourismInfo: "Informações turísticas atualizadas",

    // Misc
    km: "km",
    na: "N/A",
    of: "de",
  },

  qu: {
    // Header & Navigation (Quechua)
    title: "Turismo Metropolitano",
    subtitle: "Santa Cruz",
    home: "Wasi",
    explore: "Maskay",
    featured: "Aswan allin sitikuna",
    categories: "T'aqakuna",
    municipalities: "Llaqtakuna",
    about: "Imaynatas",
    contact: "Rimanakuy",
    language: "Simi",
    selectLanguage: "Simita akllay",

    // Hero Section
    heroText: "Qam suyasunki",
    exploreNow: "Kunan maskay",
    topPlaces: "Aswan allin sitikuna",

    // Search & Filters
    searchPlaces: "Sitikuna maskay",
    searchPlaceholder: "Sitikuna maskay...",
    category: "T'aqa",
    allCategories: "Tukuy t'aqakuna",
    municipality: "Llaqta",
    allMunicipalities: "Tukuy llaqtakuna",
    searchRadius: "Maskana muyuriq",
    sortBy: "Churay",
    rating: "Chanichay",
    name: "Suti",
    distance: "Karumanta",
    clearFilters: "Maskana pichay",
    resultsCount: "manta",
    noResults: "Mana sitikuna tarikurqanchu akllasqa maskanawan.",

    // Place Details
    description: "Willakuy",
    schedules: "Pachakuna",
    price: "Chanin",
    access: "Yaykuy",
    location: "Maypi",
    socialMedia: "Ayllu ñanakuna",
    website: "Web sitio",
    gallery: "Siq'ikuna wasi",
    viewOnMap: "Mapa ukhupi qaway",
    openInGoogleMaps: "Google Maps ukhupi kichay",
    ratePlace: "Imaynatas kay sitita chanichawaq?",
    thanksForRating: "Riqsikuyki chanichayniykimanta!",

    // Tourism Guide Section
    instructions: "YACHACHIKUNA",
    readGuide: "ÑAWIRINAPAQ",
    touristGuide: "TURISTA PUSAQ",
    santaCruz: "SANTA CRUZ",
    metropolitan: "METROPOLITANA",
    knowMunicipalities: "LLAQTAKUNATA RIQSIY",
    distanceFrom: "Santa Cruz de la Sierra manta karumanta:",
    municipalitiesMap: "Llaqtakuna mapa",
    tourismCategories: "TURISMO T'AQAKUNA LLIMP'INWAN",
    categoryColors: "TURISMO T'AQAKUNA LLIMP'INWAN",
    clickIcons: "KAY SEÑALKUNA ÑIT'IY",
    clickLocation: "Ñit'iy chaymanta maypi kasqanta riqsiy",
    clickSocial: "Ñit'iy chaymanta ayllu ñanakunata riqsiy",

    // Categories
    architecturalTourism: "Arquitectónico, kawsay, ñawpa pacha, dios turismo",
    natureTourism: "Sallqa turismo",
    entertainmentTourism: "Kusikuy, pukllay turismo",
    businessTourism: "Llamkay turismo",
    gastronomicTourism: "Mikhuy turismo",
    hospitality: "Wasi quy",

    // Actions & Buttons
    allowLocation: "Maypi kasqanta saqiy",
    update: "Musuqyachiy",
    loading: "Kargaspa...",
    loadingPlaces: "Turista sitikuna kargaspa...",
    optimizingData: "Willaykunata aswan allin ruraspa...",
    backToMap: "Mapa kaman kutiy",
    placeNotFound: "Mana siti tarikurqanchu",
    retry: "Wakmanta ruway",
    loadingMap: "Mapa kargaspa...",

    // Footer
    completeGuide: "Santa Cruz de la Sierra riqsinapaq hunt'asqa pusaqniyki",
    links: "T'inkikuna",
    statistics: "Yupanakuna",
    touristicPlaces: "turista sitikuna",
    allRightsReserved: "Tukuy derechokuna waqaychasqa.",

    // CTA Section
    readyToExplore: "¿Santa Cruz maskanaykipaq wakichikunkichu?",
    discoverPlaces: "Tariy",
    exploreOnMap: "Mapa ukhupi maskay",

    // Error Messages
    errorLoadingData: "Willaykunata kargaspa pantay",
    errorLoadingPlace: "Sitita kargaspa...",
    locationDenied: "Maypi kasqanta mana saqirqankuchu",
    locationUnavailable: "Maypi kasqan willaykunaqa mana kanchu",
    locationTimeout: "Maypi kasqanta mañakuy puchukay",

    // Analytics
    photos: "siq'ikuna",
    yourLocation: "Qam maypi kasqayki",
    viewDetails: "Detallekunata qaway",

    // Transportation guide
    gettingAround: "Mba'éichapa ñañemongu'e Santa Cruz de la Sierra-pe",
    gettingAroundSubtitle: "Nde rape eikuaa hag̃ua táva ha ijerekuéra",
    organizeTrip: "Eñembosako'i hag̃ua reñemongu'e porã Santa Cruz-pe",
    transportationOptions: "Ñemongu'e rape kuéra",
    airplane: "Avión-pe",
    bus: "Autobús-pe",
    car: "Kóche-pe",
    urbanTransport: "Ñemongu'e táva ryepýpe",
    distancesFromSantaCruz: "Mombyry Santa Cruz guive",
    distancesIntro: "Santa Cruz ha'e pe ñepyrũha iporãvéva eikuaa hag̃ua táva kuéra ijerekuéva.",
    travelTip: "Ñemoñe'ẽ tapicha guarápe",
    travelerTips: "Ñemoñe'ẽ tapichakuérape guarã",
    safety: "Tekorosã",
    budget: "Virupururã",
    planning: "Ñembosako'i",
    enjoyHospitality: "¡Evy'a Santa Cruz retãygua ipy'a porã ha heko arandu rehe!",
    updatedTourismInfo: "Marandu turística oñembopyahu",

    // Transportation guide
    gettingAround: "Santa Cruz de la Sierra llaqtapi puriy",
    gettingAroundSubtitle: "Kusisqa llaqtata hinaspa muyuriqninkunata riqsinapaq pusaq",
    organizeTrip: "Santa Cruzpi allin purinapaq wakichikuy",
    transportationOptions: "Puriykunapaq akllanakuna",
    airplane: "Aviónpi",
    bus: "Autobúspi",
    car: "Carropi",
    urbanTransport: "Llaqtapi puriy",
    distancesFromSantaCruz: "Santa Cruzmanta karukaykuna",
    distancesIntro: "Santa Cruzqa muyuriq llaqtakunata riqsinapaq allin qallariymi.",
    travelTip: "Puriypaq yuyay",
    travelerTips: "Puriykuqkunapaq yuyaykuna",
    safety: "Allin kawsay",
    budget: "Qullqi",
    planning: "Wakichiy",
    enjoyHospitality: "¡Santa Cruzpa sumaq chaskiyta hinaspa qhapaq kawsayninta kusikuy!",
    updatedTourismInfo: "Musuqyachisqa turista willakuy",

    // Misc
    km: "km",
    na: "N/A",
    of: "manta",
  },
}

// Language context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

// 4. Contexto y Provider
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}



export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("es")

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang)
      }
    }
  }, [])

  // Save the selected language and keep the document language accessible to browsers and screen readers.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
    }
  }, [language])

  const changeLanguage = (nextLanguage: Language) => {
    if (translations[nextLanguage]) {
      setLanguage(nextLanguage)
    }
  }

  const contextValue: LanguageContextType = {
    language,
    setLanguage: changeLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Language options for selectors
export const languageOptions = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "gn", name: "Guaraní", flag: "🇵🇾" },
  { code: "qu", name: "Quechua", flag: "🏔️" },
] as const

