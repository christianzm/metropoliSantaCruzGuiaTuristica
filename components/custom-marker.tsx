"use client"

interface CustomMarkerProps {
  color: string
  category: string
}

export function createCustomMarker(color: string, category: string) {
  if (typeof window !== "undefined") {
    // Dynamically import Leaflet only on client side
    return import("leaflet").then((L) => {
      return new L.DivIcon({
        html: `
          <div style="
            background-color: ${color}; 
            width: 25px; 
            height: 25px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 12px;
          ">
            ${getCategoryIcon(category)}
          </div>
        `,
        className: `custom-marker marker-${category}`,
        iconSize: [25, 25],
        iconAnchor: [12, 12],
      })
    })
  }
  return Promise.resolve(null)
}

function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    arquitectonico: "🏛",
    naturaleza: "🌿",
    entretenimiento: "🎪",
    negocios: "💼",
    gastronomico: "🍽",
    hoteleria: "🏨",
  }
  return icons[category] || "📍"
}
