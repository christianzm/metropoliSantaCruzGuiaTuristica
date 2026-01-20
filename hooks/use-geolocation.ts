"use client"

import { useState, useEffect, useCallback } from "react"

interface GeolocationState {
  location: { lat: number; lng: number } | null
  permission: "pending" | "granted" | "denied"
  error: string | null
  loading: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    permission: "pending",
    error: null,
    loading: false,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        permission: "denied",
        error: "Geolocation is not supported by this browser",
        loading: false,
      }))
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          permission: "granted",
          error: null,
          loading: false,
        })
      },
      (error) => {
        let errorMessage = "Error getting location"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out"
            break
        }

        setState({
          location: { lat: -17.7833, lng: -63.1821 }, // Default to Santa Cruz center
          permission: "denied",
          error: errorMessage,
          loading: false,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }, [])

  useEffect(() => {
    // Auto-request location on mount
    requestLocation()
  }, [requestLocation])

  return {
    ...state,
    requestLocation,
  }
}
