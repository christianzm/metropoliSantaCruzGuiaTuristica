import { supabase } from "./supabase"
import type { Category, TourismType, PlaceWithDetails } from "./supabase"

// Get all places with their related data
export async function getPlaces(): Promise<PlaceWithDetails[]> {
  const { data: places, error } = await supabase.from("places").select(`
      *,
      images (
        id,
        url,
        is_main,
        alt_text,
        created_at
      ),
      place_categories (
        categories (
          id,
          name,
          description
        )
      ),
      place_tourism_types (
        tourism_types (
          id,
          name
        )
      ),
      social_media (
        facebook,
        instagram,
        tiktok,
        website
      )
    `)

  if (error) {
    console.error("Error fetching places:", error)
    return []
  }

  // Transform the data to match our interface
  return (
    places?.map((place) => ({
      ...place,
      categories: place.place_categories?.map((pc: any) => pc.categories) || [],
      tourism_types: place.place_tourism_types?.map((pt: any) => pt.tourism_types) || [],
      social_media: place.social_media || [],
    })) || []
  )
}

// Get a single place by ID
export async function getPlaceById(id: string): Promise<PlaceWithDetails | null> {
  const { data: place, error } = await supabase
    .from("places")
    .select(`
      *,
      images (
        id,
        url,
        is_main,
        alt_text,
        created_at
      ),
      place_categories (
        categories (
          id,
          name,
          description
        )
      ),
      place_tourism_types (
        tourism_types (
          id,
          name
        )
      ),
      social_media (
        facebook,
        instagram,
        tiktok,
        website
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching place:", error)
    return null
  }

  if (!place) return null

  // Transform the data
  return {
    ...place,
    categories: place.place_categories?.map((pc: any) => pc.categories) || [],
    tourism_types: place.place_tourism_types?.map((pt: any) => pt.tourism_types) || [],
    social_media: place.social_media || [],
  }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

// Get all tourism types
export async function getTourismTypes(): Promise<TourismType[]> {
  const { data, error } = await supabase.from("tourism_types").select("*").order("name")

  if (error) {
    console.error("Error fetching tourism types:", error)
    return []
  }

  return data || []
}

// Get places by municipality
export async function getPlacesByMunicipality(municipality: string): Promise<PlaceWithDetails[]> {
  const { data: places, error } = await supabase
    .from("places")
    .select(`
      *,
      images (
        id,
        url,
        is_main,
        alt_text,
        created_at
      ),
      place_categories (
        categories (
          id,
          name,
          description
        )
      ),
      place_tourism_types (
        tourism_types (
          id,
          name
        )
      ),
      social_media (
        facebook,
        instagram,
        tiktok,
        website
      )
    `)
    .eq("municipality", municipality)

  if (error) {
    console.error("Error fetching places by municipality:", error)
    return []
  }

  return (
    places?.map((place) => ({
      ...place,
      categories: place.place_categories?.map((pc: any) => pc.categories) || [],
      tourism_types: place.place_tourism_types?.map((pt: any) => pt.tourism_types) || [],
      social_media: place.social_media || [],
    })) || []
  )
}

// Get places by category
export async function getPlacesByCategory(categoryId: string): Promise<PlaceWithDetails[]> {
  const { data: places, error } = await supabase
    .from("places")
    .select(`
      *,
      images (
        id,
        url,
        is_main,
        alt_text,
        created_at
      ),
      place_categories!inner (
        categories (
          id,
          name,
          description
        )
      ),
      place_tourism_types (
        tourism_types (
          id,
          name
        )
      ),
      social_media (
        facebook,
        instagram,
        tiktok,
        website
      )
    `)
    .eq("place_categories.category_id", categoryId)

  if (error) {
    console.error("Error fetching places by category:", error)
    return []
  }

  return (
    places?.map((place) => ({
      ...place,
      categories: place.place_categories?.map((pc: any) => pc.categories) || [],
      tourism_types: place.place_tourism_types?.map((pt: any) => pt.tourism_types) || [],
      social_media: place.social_media || [],
    })) || []
  )
}

// Record place view
export async function recordPlaceView(placeId: string, sessionId: string, userId?: string) {
  const { error } = await supabase.from("place_views").insert({
    place_id: placeId,
    session_id: sessionId,
    user_id: userId,
    view_date: new Date().toISOString(),
    view_duration: 0,
  })

  if (error) {
    console.error("Error recording place view:", error)
  }
}

// Record place click
export async function recordPlaceClick(placeId: string, clickType: string, sessionId: string, userId?: string) {
  const { error } = await supabase.from("place_clicks").insert({
    place_id: placeId,
    click_type: clickType,
    session_id: sessionId,
    user_id: userId,
    click_date: new Date().toISOString(),
  })

  if (error) {
    console.error("Error recording place click:", error)
  }
}

// Submit place rating
export async function submitPlaceRating(placeId: string, rating: number, sessionId: string) {
  const { error } = await supabase.from("place_ratings").insert({
    place_id: placeId,
    rating: rating,
    session_id: sessionId,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error("Error submitting rating:", error)
    return false
  }

  return true
}

// Get municipalities with place counts
export async function getMunicipalities() {
  const { data, error } = await supabase.from("places").select("municipality").not("municipality", "is", null)

  if (error) {
    console.error("Error fetching municipalities:", error)
    return []
  }

  // Count places per municipality
  const municipalityCounts = data?.reduce((acc: any, place) => {
    acc[place.municipality] = (acc[place.municipality] || 0) + 1
    return acc
  }, {})

  return Object.entries(municipalityCounts || {}).map(([name, count]) => ({
    name,
    count,
  }))
}
