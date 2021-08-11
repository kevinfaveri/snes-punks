import { useEffect } from 'react'
import useInfinitePagination from './useInfinitePagination'
import useOnScreen from './useOnScreen'

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.data.length) {
    return null
  }

  if (pageIndex === 0) return `/api/punks`
  return `/api/punks?cursor=${previousPageData.meta.cursor}`
}

export default function usePunks() {
  const {
    data,
    isEndReached,
    size,
    setSize,
    isLoadingMore,
  } = useInfinitePagination(getKey, 500)
  const { isOnScreen, setRef } = useOnScreen('200px')

  useEffect(() => {
    if (isOnScreen && !isLoadingMore) setSize(size + 1)
  }, [isLoadingMore, isOnScreen, setSize, size])

  let punks = []
  data.forEach(({ data: punkList }) => {
    punks = punks.concat(punkList)
  })

  return { punks, isEndReached, setRefInfiniteLoading: setRef }
}
