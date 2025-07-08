"use client"

import { useState, useEffect, useRef } from "react"
import { Globe } from "lucide-react"

const VisitCounter = () => {
  const [visits, setVisits] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Prevent duplicate requests
    if (hasFetched.current) return

    const controller = new AbortController()
    const signal = controller.signal

    const fetchVisits = async () => {
      try {
        hasFetched.current = true
        const response = await fetch("https://visitcounter-estinsrc.onrender.com/", { signal })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Only update state if component is still mounted
        if (!signal.aborted) {
          setVisits(data.totalVisits)
          setIsLoading(false)
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching visit data:", error)
          // Reset the flag on error so it can retry if needed
          hasFetched.current = false
        }

        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchVisits()

    return () => {
      controller.abort()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Globe className="h-4 w-4 animate-spin" />
        <span>Loading visits...</span>
      </div>
    )
  }

  if (visits === null) return null

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-4 w-4" />
      <span>{visits.toLocaleString()} visits</span>
    </div>
  )
}

export default VisitCounter
