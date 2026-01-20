// lib/customMarkerIcon.ts
export const categoryIcons: { [key: string]: string } = {
  "Turismo arquitectónico": "🏛️",
  "Turismo de naturaleza": "🌿",
  "Turismo de entretenimiento": "🎪",
  "Turismo de negocios": "💼",
  "Turismo gastronómico": "🍽️",
  Hotelería: "🏨",
}

export const categoryColors: { [key: string]: string } = {
  "Turismo arquitectónico": "#8B4513",
  "Turismo de naturaleza": "#228B22",
  "Turismo de entretenimiento": "#FF4500",
  "Turismo de negocios": "#1E3A8A",
  "Turismo gastronómico": "#DC143C",
  Hotelería: "#DAA520",
}

export const createCustomMarkerIcon = (category: string, color: string, isSelected: boolean = false) => {
  if (typeof window === "undefined") return undefined // Prevenir errores en SSR

  const { DivIcon } = require("leaflet") // Importa dinámicamente

  const icon = categoryIcons[category] || "📍"
  const size = isSelected ? 50 : 40
  const fontSize = isSelected ? "20px" : "16px"

  return new DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: ${fontSize};
        cursor: pointer;
        transition: all 0.2s ease;
        ${isSelected ? 'transform: scale(1.1); z-index: 1000;' : ''}
      ">
        ${icon}
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}
