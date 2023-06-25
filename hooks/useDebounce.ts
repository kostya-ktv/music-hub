import { useEffect, useState } from "react"

const useDebounce = <T>(data: T, delay: number): T => {
   const [debouncedValue, setDebouncedValue] = useState<T>(data)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(data)
        }, delay)
        return () => clearTimeout(timeout)
    },[data, delay])
    return debouncedValue
}

export default useDebounce