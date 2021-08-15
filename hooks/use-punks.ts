import { useEffect } from 'react'
import useInfinitePagination from './use-infinite-pagination'
import useOnScreen from './use-on-screen'

const getKey = (ids) => (pageIndex, previousPageData) => {
  new URLSearchParams(ids).toString()

  if (previousPageData && !previousPageData.data.length) {
    return null
  }
  if (pageIndex === 0) return `/api/punks?${ids.map((id) => `ids[]=${id}&`)}`
  return `/api/punks?cursor=${previousPageData.meta.cursor}`
}

export default function usePunks(ids: number[] = []) {
  const {
    data,
    isEndReached,
    size,
    setSize,
    isLoadingMore,
  } = useInfinitePagination(getKey(ids), 500)
  const { isOnScreen, setRef } = useOnScreen('200px')

  useEffect(() => {
    if (isOnScreen && !isLoadingMore) setSize(size + 1)
  }, [isLoadingMore, isOnScreen, setSize, size])

  let punks = []
  data.forEach(({ data: punkList }) => {
    punks = punks.concat(punkList)
  })

  return { punks, isEndReached, setRefInfiniteLoading: setRef, isLoadingMore }
}
