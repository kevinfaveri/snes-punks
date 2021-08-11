import { useSWRInfinite } from 'swr'

export default function useInfinitePagination(getKey, pageSize = 10) {
  const { data, size, setSize, error, isValidating, mutate } = useSWRInfinite(
    getKey
  )
  const errorData = error?.info

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  const isEmpty = !!errorData || data?.[0]?.result?.length === 0
  const isEndReached =
    isEmpty || (data && data[data.length - 1]?.result?.length < pageSize)
  const isRefreshing = isValidating && data && data.length === size

  return {
    data: data ?? [],
    size,
    setSize,
    error,
    errorData,
    isLoadingMore,
    isEmpty,
    isEndReached,
    isRefreshing,
    mutate,
  }
}
