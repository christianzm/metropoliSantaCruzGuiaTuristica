import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types based on our database schema
export interface Place {
  id: string
  technical_name: string
  commercial_name: string
  municipality: string
  province: string
  description: string
  location: string
  latitude: number
  longitude: number
  schedules: string
  access: string
  price: string
  map_url: string
  rating_avg: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface TourismType {
  id: string
  name: string
}

export interface PlaceImage {
  id: string
  place_id: string
  url: string
  is_main: boolean
  alt_text: string
  created_at: string
}

export interface SocialMedia {
  place_id: string
  facebook?: string
  instagram?: string
  tiktok?: string
  website?: string
}

export interface PlaceWithDetails extends Place {
  images: PlaceImage[]
  categories: Category[]
  tourism_types: TourismType[]
  social_media: SocialMedia[]
}
