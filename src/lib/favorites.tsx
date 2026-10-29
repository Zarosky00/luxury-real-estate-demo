import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PROPERTIES, type PropertyListing } from '@/data/properties'

const STORAGE_KEY = 'demo_urban_atelier_favorites_v1'

interface FavoritesContextValue {
  favoriteIds: string[]
  favoriteProperties: PropertyListing[]
  isLoaded: boolean
  isFavorite: (propertyId: string) => boolean
  toggleFavorite: (propertyId: string) => void
  removeFavorite: (propertyId: string) => void
  clearFavorites: () => void
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Hydrate strictly on the client from browser localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is string =>
              typeof id === 'string' && PROPERTIES.some((p) => p.id === id),
          )
          setFavoriteIds(validIds)
        }
      }
    } catch {
      // Ignore storage access errors in restricted modes
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const persistIds = useCallback((nextIds: string[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds))
    } catch {
      // Ignore storage quota errors
    }
  }, [])

  const isFavorite = useCallback(
    (propertyId: string) => favoriteIds.includes(propertyId),
    [favoriteIds],
  )

  const toggleFavorite = useCallback(
    (propertyId: string) => {
      setFavoriteIds((prev) => {
        const exists = prev.includes(propertyId)
        const next = exists
          ? prev.filter((id) => id !== propertyId)
          : [...prev, propertyId]
        persistIds(next)
        return next
      })
    },
    [persistIds],
  )

  const removeFavorite = useCallback(
    (propertyId: string) => {
      setFavoriteIds((prev) => {
        const next = prev.filter((id) => id !== propertyId)
        persistIds(next)
        return next
      })
    },
    [persistIds],
  )

  const clearFavorites = useCallback(() => {
    setFavoriteIds([])
    persistIds([])
  }, [persistIds])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  const favoriteProperties = useMemo(
    () =>
      favoriteIds
        .map((id) => PROPERTIES.find((p) => p.id === id))
        .filter((p): p is PropertyListing => Boolean(p)),
    [favoriteIds],
  )

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      favoriteProperties,
      isLoaded,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    }),
    [
      favoriteIds,
      favoriteProperties,
      isLoaded,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
    ],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

const FALLBACK_FAVORITES_CONTEXT: FavoritesContextValue = {
  favoriteIds: [],
  favoriteProperties: [],
  isLoaded: false,
  isFavorite: () => false,
  toggleFavorite: () => {},
  removeFavorite: () => {},
  clearFavorites: () => {},
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  return ctx ?? FALLBACK_FAVORITES_CONTEXT
}
