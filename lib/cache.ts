"use client"

import React from "react"

import { getPlaces, getCategories, getMunicipalities } from "./database"
import type { PlaceWithDetails, Category } from "./supabase"

// Cache interface
interface CacheData {
  places: PlaceWithDetails[]
  categories: Category[]
  municipalities: any[]
  lastUpdated: number
}

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

class DataCache {
  private cache: CacheData | null = null
  private loading = false
  private listeners: Set<() => void> = new Set()

  // Subscribe to cache updates
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // Notify all listeners
  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  // Check if cache is valid
  private isCacheValid(): boolean {
    if (!this.cache) return false
    return Date.now() - this.cache.lastUpdated < CACHE_DURATION
  }

  // Load data from API
  private async loadData(): Promise<CacheData> {
    const [places, categories, municipalities] = await Promise.all([getPlaces(), getCategories(), getMunicipalities()])

    return {
      places,
      categories,
      municipalities,
      lastUpdated: Date.now(),
    }
  }

  // Get cached data or load if needed
  async getData(): Promise<CacheData> {
    // Return cached data if valid
    if (this.isCacheValid() && this.cache) {
      return this.cache
    }

    // If already loading, wait for it
    if (this.loading) {
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (!this.loading && this.cache) {
            resolve(this.cache)
          } else {
            setTimeout(checkLoading, 100)
          }
        }
        checkLoading()
      })
    }

    // Load data
    this.loading = true
    try {
      this.cache = await this.loadData()
      this.notify()
      return this.cache
    } finally {
      this.loading = false
    }
  }

  // Force refresh cache
  async refresh(): Promise<CacheData> {
    this.cache = null
    return this.getData()
  }

  // Get current cache without loading
  getCurrent(): CacheData | null {
    return this.isCacheValid() ? this.cache : null
  }

  // Clear cache
  clear() {
    this.cache = null
    this.notify()
  }
}

// Global cache instance
export const dataCache = new DataCache()

// Cache hook for React components
export function useDataCache() {
  const [data, setData] = React.useState<CacheData | null>(dataCache.getCurrent())
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const unsubscribe = dataCache.subscribe(() => {
      setData(dataCache.getCurrent())
    })

    return unsubscribe
  }, [])

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await dataCache.getData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading data")
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshData = React.useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await dataCache.refresh()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error refreshing data")
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    loading,
    error,
    loadData,
    refreshData,
    clearCache: () => dataCache.clear(),
  }
}
