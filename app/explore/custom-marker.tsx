"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Marker } from "react-leaflet"
import type { LatLngExpression } from "leaflet"

interface CustomMarkerProps {
  position: LatLngExpression
  category: string
  color: string
  onClick?: () => void
  children?: React.ReactNode
}

const getCategoryEmoji = (category: string) => {
  const emojis: { [key: string]: string } = {
    arquitectonico: "🏛",
    naturaleza: "🌿",
    entretenimiento: "🎪",
    negocios: "💼",
    gastronomico: "🍽",
    hoteleria: "🏨",
  }
  return emojis[category] || "📍"
}

export default function CustomMarker({ position, category, color, onClick, children }: CustomMarkerProps) {
  const markerRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.L && markerRef.current) {
      const marker = markerRef.current

      // Create custom icon
      const customIcon = new window.L.DivIcon({
        html: `
          <div class="custom-marker-wrapper">
            <div class="custom-marker-circle" style="
              width: 20px; 
              height: 20px; 
              background-color: ${color}; 
              border: 2px solid white; 
              border-radius: 50%; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 10px;
              color: white;
              font-weight: bold;
              transition: transform 0.2s ease;
            ">
              ${getCategoryEmoji(category)}
            </div>
          </div>
        `,
        className: `custom-marker custom-marker-${category}`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
      })

      // Set the custom icon
      if (marker.leafletElement) {
        marker.leafletElement.setIcon(customIcon)
      }
    }
  }, [category, color])

  return (
    <Marker
      ref={markerRef}
      position={position}
      eventHandlers={{
        click: onClick,
      }}
    >
      {children}
    </Marker>
  )
}
