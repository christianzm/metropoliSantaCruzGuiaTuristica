"use client"

import { useState, useMemo, useCallback } from "react"
import type { PlaceWithDetails } from "@/lib/supabase"

interface FilterOptions {
  searchTerm: string
  selectedCategory: string
  selectedMunicipality: string
  radiusFilter: number[]
  userLocation: { lat: number; lng: number } | null
  locationPermission: "pending" | "granted" | "denied"
}

interface SortOptions {
  field: "name" | "rating" | "distance"
  direction: "asc" | "desc"
}

export function usePlacesFilter(places: PlaceWithDetails[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    selectedCategory: "todos",
    selectedMunicipality: "Todos",
    radiusFilter: [100], // Cambiado de [50] a [100]
    userLocation: null,
    locationPermission: "pending",
  })

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "rating",
    direction: "desc",
  })

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }, [])

  // Memoized filtered and sorted places
  const filteredPlaces = useMemo(() => {
    let filtered = [...places]

    // Apply search filter - CORREGIDO: Solo busca por nombre comercial
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase().trim()
      filtered = filtered.filter(
        (place) =>
          place.commercial_name.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.selectedCategory !== "todos") {
      filtered = filtered.filter((place) =>
        place.categories.some((category) => category.id === filters.selectedCategory),
      )
    }

    // Apply municipality filter
    if (filters.selectedMunicipality !== "Todos") {
      filtered = filtered.filter((place) => place.municipality === filters.selectedMunicipality)
    }

    // Apply radius filter (if user location is available)
    if (filters.userLocation && filters.locationPermission === "granted") {
      filtered = filtered.filter((place) => {
        const distance = calculateDistance(
          filters.userLocation!.lat,
          filters.userLocation!.lng,
          place.latitude,
          place.longitude,
        )
        return distance <= filters.radiusFilter[0]
      })
    }

    // Add distance to places for sorting
    const placesWithDistance = filtered.map((place) => ({
      ...place,
      distance: filters.userLocation
        ? calculateDistance(filters.userLocation.lat, filters.userLocation.lng, place.latitude, place.longitude)
        : 0,
    }))

    // Apply sorting
    placesWithDistance.sort((a, b) => {
      let comparison = 0

      switch (sortOptions.field) {
        case "name":
          comparison = a.commercial_name.localeCompare(b.commercial_name)
          break
        case "rating":
          comparison = (b.rating_avg || 0) - (a.rating_avg || 0)
          break
        case "distance":
          comparison = a.distance - b.distance
          break
      }

      return sortOptions.direction === "desc" ? -comparison : comparison
    })

    return placesWithDistance
  }, [places, filters, sortOptions, calculateDistance])

  // Filter update functions
  const updateSearchTerm = useCallback((searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }))
  }, [])

  const updateCategory = useCallback((selectedCategory: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory }))
  }, [])

  const updateMunicipality = useCallback((selectedMunicipality: string) => {
    setFilters((prev) => ({ ...prev, selectedMunicipality }))
  }, [])

  const updateRadius = useCallback((radiusFilter: number[]) => {
    setFilters((prev) => ({ ...prev, radiusFilter }))
  }, [])

  const updateUserLocation = useCallback(
    (userLocation: { lat: number; lng: number } | null, locationPermission: "pending" | "granted" | "denied") => {
      setFilters((prev) => ({ ...prev, userLocation, locationPermission }))
    },
    [],
  )

  const updateSort = useCallback((field: SortOptions["field"], direction?: SortOptions["direction"]) => {
    setSortOptions((prev) => ({
      field,
      direction: direction || (prev.field === field && prev.direction === "asc" ? "desc" : "asc"),
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: "",
      selectedCategory: "todos",
      selectedMunicipality: "Todos",
      radiusFilter: [100], // Cambiado de [50] a [100]
    }))
  }, [])

  return {
    filteredPlaces,
    filters,
    sortOptions,
    updateSearchTerm,
    updateCategory,
    updateMunicipality,
    updateRadius,
    updateUserLocation,
    updateSort,
    clearFilters,
    totalCount: places.length,
    filteredCount: filteredPlaces.length,
  }
}