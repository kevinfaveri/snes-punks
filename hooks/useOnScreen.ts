import { useCallback, useRef, useState } from 'react'

function useOnScreen(rootMargin = '0px') {
  const ref = useRef(null)
  const [isIntersecting, setIntersecting] = useState(false)

  const setRef = useCallback(node => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { rootMargin }
    )

    if (ref.current) {
      observer.unobserve(ref.current as any)
    }

    if (node) {
      observer.observe(node)
    }

    ref.current = node
  }, [rootMargin])

  return { setRef, isOnScreen: isIntersecting }
}

export default useOnScreen
