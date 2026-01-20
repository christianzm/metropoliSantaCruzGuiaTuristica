"use client"

import { useMemo } from "react"
import type { PlaceWithDetails } from "@/lib/supabase"

export function useFeaturedPlaces(places: PlaceWithDetails[]) {
  const featuredPlaces = useMemo(() => {
    if (!places || places.length === 0) return []

    // Filter places with good ratings and sort by rating
    const filtered = places
      .filter((place) => {
        // Include places with rating >= 4.0 OR places with images OR places with good descriptions
        return (
          (place.rating_avg && place.rating_avg >= 4.0) ||
          (place.images && place.images.length > 0) ||
          (place.description && place.description.length > 100)
        )
      })
      .sort((a, b) => {
        // Primary sort: by rating (descending)
        const ratingA = a.rating_avg || 0
        const ratingB = b.rating_avg || 0

        if (ratingB !== ratingA) {
          return ratingB - ratingA
        }

        // Secondary sort: by number of images (descending)
        const imagesA = a.images?.length || 0
        const imagesB = b.images?.length || 0

        if (imagesB !== imagesA) {
          return imagesB - imagesA
        }

        // Tertiary sort: by description length (descending)
        const descA = a.description?.length || 0
        const descB = b.description?.length || 0

        return descB - descA
      })
      .slice(0, 8) // Take top 8 places

    return filtered
  }, [places])

  return featuredPlaces
}
