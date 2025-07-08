"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Globe,
  Monitor,
  Clock,
  Users,
  Eye,
  Activity,
  BarChart3,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const VisitDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [recentVisits, setRecentVisits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const BASE_URL = "https://visitcounter-estinsrc.onrender.com"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [dashboardRes, recentRes] = await Promise.all([
          fetch(`${BASE_URL}/dashboard`),
          fetch(`${BASE_URL}/recent-visits?limit=20`),
        ])

        if (!dashboardRes.ok || !recentRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const [dashboard, recent] = await Promise.all([dashboardRes.json(), recentRes.json()])

        setDashboardData(dashboard)
        setRecentVisits(recent.recentVisits || [])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getChartData = () => {
    if (!dashboardData?.dailyVisits) return []

    return Object.entries(dashboardData.dailyVisits)
      .slice(-14)
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        visits: count,
        fullDate: date,
      }))
  }

  const getHourlyData = () => {
    if (!dashboardData?.hourlyStats) return []

    const today = new Date().toISOString().split("T")[0]
    const todayHours = dashboardData.hourlyStats[today] || {}

    return Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      visits: todayHours[hour] || 0,
    }))
  }

  const getPieData = (data, colors) => {
    if (!data) return []

    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      }))
  }

  const calculateTrend = () => {
    if (!dashboardData?.dailyVisits) return { percentage: 0, direction: "up" }

    const dailyVisitsArray = Object.values(dashboardData.dailyVisits).slice(-7)
    const lastTwoDays = dailyVisitsArray.slice(-2)

    if (lastTwoDays.length < 2) return { percentage: 0, direction: "up" }

    const percentageChange = ((lastTwoDays[1] - lastTwoDays[0]) / lastTwoDays[0]) * 100
    return {
      percentage: Math.abs(Math.round(percentageChange)),
      direction: percentageChange >= 0 ? "up" : "down",
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const chartData = getChartData()
  const hourlyData = getHourlyData()
  const trend = calculateTrend()
  const today = new Date().toISOString().split("T")[0]
  const todayVisits = dashboardData?.dailyVisits?.[today] || 0

  const countryColors = ["#00D9FF", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]
  const browserColors = ["#FF9F43", "#5F27CD", "#00D2D3", "#FF3838", "#2ED573"]

  const countryData = getPieData(dashboardData?.countryStats, countryColors)
  const browserData = getPieData(dashboardData?.browserStats, browserColors)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
            <Activity className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 size-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Analytics</h2>
          <p className="text-gray-300">Fetching your dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex justify-center items-center">
        <Alert className="max-w-md bg-red-900/50 border-red-500 text-white">
          <AlertDescription className="text-white">Failed to load analytics data: {error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const backgroundPattern = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.2,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute inset-0" style={backgroundPattern}></div>

      <div className="relative z-10 p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <BarChart3 className="size-8 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                ESTINSRC
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-4">Real-time Website Analytics Dashboard</p>
            {dashboardData?.lastVisit && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Last visit: {formatTimestamp(dashboardData.lastVisit.timestamp)} from {dashboardData.lastVisit.country}
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border-blue-500/30 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Total Visits</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="h-5 w-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-1">
                  {(dashboardData?.totalVisits || 0).toLocaleString()}
                </div>
                <p className="text-xs text-gray-300">All time visitors</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border-green-500/30 text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Today's Visits</CardTitle>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  {trend.direction === "up" ? (
                    <ChevronUp className="h-5 w-5 text-green-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-1">{todayVisits.toLocaleString()}</div>
                <p className={`text-xs ${trend.direction === "up" ? "text-green-300" : "text-red-300"}`}>
                  {trend.percentage}% {trend.direction} from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border-purple-500/30 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Countries</CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-1">
                  {dashboardData?.countryStats ? Object.keys(dashboardData.countryStats).length : 0}
                </div>
                <p className="text-xs text-gray-300">Unique countries</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm border-orange-500/30 text-white shadow-2xl hover:shadow-orange-500/25 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">Peak Hour</CardTitle>
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-1">
                  {hourlyData.length
                    ? hourlyData.reduce((max, curr) => (curr.visits > max.visits ? curr : max)).hour
                    : "--"}
                </div>
                <p className="text-xs text-gray-300">Most active time today</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Visits Trend */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-lg">Visits Trend (14 Days)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(59, 130, 246, 0.5)",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#3B82F6"
                      strokeWidth={4}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: "#60A5FA" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Activity */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                  <span className="text-lg">Today's Hourly Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <XAxis dataKey="hour" stroke="#E5E7EB" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(249, 115, 22, 0.5)",
                        borderRadius: "12px",
                        color: "#FFFFFF",
                        backdropFilter: "blur(10px)",
                      }}
                    />
                    <Bar dataKey="visits" fill="#F97316" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Demographics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Country Distribution */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-lg">Top Countries</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={countryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {countryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(147, 51, 234, 0.5)",
                          borderRadius: "12px",
                          color: "#FFFFFF",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {countryData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: entry.color }} />
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">{entry.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Browser Distribution */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Monitor className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-lg">Top Browsers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={browserData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {browserData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.95)",
                          border: "1px solid rgba(6, 182, 212, 0.5)",
                          borderRadius: "12px",
                          color: "#FFFFFF",
                          backdropFilter: "blur(10px)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {browserData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: entry.color }} />
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20">{entry.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Visits */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
                <span className="text-lg">Recent Visits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {recentVisits.map((visit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {visit.country.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-white text-lg">{visit.country}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-300">{visit.city}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>{visit.browser}</span>
                          <span>•</span>
                          <span>{visit.os}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium mb-1">{formatTimestamp(visit.timestamp)}</div>
                      <div className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{visit.path}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default VisitDashboard
