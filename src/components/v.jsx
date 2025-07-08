"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

const VisitCounter = () => {
  const [visits, setVisits] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch("https://visitcounter-estinsrc.onrender.com/")
        const data = await response.json()
        setVisits(data.totalVisits)
      } catch (error) {
        console.error("Error fetching visit data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVisits()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Globe className="w-4 h-4" />
        <span>-</span>
      </div>
    )
  }

  if (visits === null) return null

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Globe className="w-4 h-4" />
      <span>{visits.toLocaleString()}</span>
    </div>
  )
}

export default VisitCounter
