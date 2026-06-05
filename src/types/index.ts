export type NavTab = 'inicio' | 'ingressar' | 'portal' | 'campi' | 'a-puc'

export interface CourseCard {
  id: string
  title: string
  imageUrl: string
  href?: string
}

export interface InsideCard {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  buttonLabel: string
  href?: string
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  imageUrl?: string
  date: string
  category: string
  href?: string
}

export interface Campus {
  id: string
  name: string
  address: string
  city: string
  imageUrl?: string
  coordinates?: { lat: number; lng: number }
}
