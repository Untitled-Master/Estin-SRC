"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Loader2,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Globe,
  Monitor,
  Clock,
  Users,
  Eye,
  Activity,
  MapPin,
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

        // Fetch dashboard data and recent visits in parallel
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

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Transform data for charts
  const getChartData = () => {
    if (!dashboardData?.dailyVisits) return []

    return Object.entries(dashboardData.dailyVisits)
      .slice(-14) // Last 14 days
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

  // Enhanced color schemes
  const countryColors = ["#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]
  const browserColors = ["#3B82F6", "#F97316", "#84CC16", "#EC4899", "#6366F1"]

  const countryData = getPieData(dashboardData?.countryStats, countryColors)
  const browserData = getPieData(dashboardData?.browserStats, browserColors)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="animate-spin text-white size-16 mx-auto" />
            <div className="absolute inset-0 animate-ping">
              <Loader2 className="text-blue-400/30 size-16 mx-auto" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">Loading Analytics</p>
            <p className="text-gray-400">Fetching your dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center p-6">
        <Alert variant="destructive" className="max-w-md bg-red-950/50 border-red-500/50">
          <AlertDescription className="text-white">
            <div className="space-y-2">
              <p className="font-semibold">Failed to load analytics data</p>
              <p className="text-sm text-red-200">{error}</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10 p-6 space-y-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Activity className="size-8 text-white" />
              </div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                ESTINSRC
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-2">Real-time Website Analytics Dashboard</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live Data</span>
            </div>
            {dashboardData?.lastVisit && (
              <p className="text-sm text-gray-400 mt-4 flex items-center justify-center gap-2">
                <MapPin className="size-4" />
                Last visit: {formatTimestamp(dashboardData.lastVisit.timestamp)} from {dashboardData.lastVisit.country}
              </p>
            )}
          </div>

          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Visits</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Eye className="h-4 w-4 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {(dashboardData?.totalVisits || 0).toLocaleString()}
                </div>
                <p className="text-xs text-blue-200">All time visitors</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Today's Visits</CardTitle>
                <div className={`p-2 rounded-lg transition-colors ${
                  trend.direction === 'up' 
                    ? 'bg-green-500/20 group-hover:bg-green-500/30' 
                    : 'bg-red-500/20 group-hover:bg-red-500/30'
                }`}>
                  {trend.direction === 'up' ? (
                    <ChevronUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {todayVisits.toLocaleString()}
                </div>
                <p className={`text-xs ${trend.direction === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                  {trend.percentage}% {trend.direction} from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Countries</CardTitle>
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {dashboardData?.countryStats ? Object.keys(dashboardData.countryStats).length : 0}
                </div>
                <p className="text-xs text-purple-200">Unique countries</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 backdrop-blur-sm hover:border-orange-400/40 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Peak Hour</CardTitle>
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Clock className="h-4 w-4 text-orange-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">
                  {hourlyData.length ? hourlyData.reduce((max, curr) => curr.visits > max.visits ? curr : max).hour : '--'}
                </div>
                <p className="text-xs text-orange-200">Most active time today</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visits Trend */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Visits Trend</div>
                    <div className="text-sm text-gray-400 font-normal">Last 14 days</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ 
                        r: 6, 
                        style: { fill: "#10B981", opacity: 0.8 } 
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Activity */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Hourly Activity</div>
                    <div className="text-sm text-gray-400 font-normal">Today's traffic pattern</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <XAxis 
                      dataKey="hour" 
                      stroke="#9CA3AF" 
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Bar 
                      dataKey="visits" 
                      fill="url(#orangeGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Demographics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Country Distribution */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Top Countries</div>
                    <div className="text-sm text-gray-400 font-normal">Visitor distribution</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={countryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {countryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {countryData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-lg"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                        {entry.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Browser Distribution */}
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Monitor className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Top Browsers</div>
                    <div className="text-sm text-gray-400 font-normal">Browser preferences</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={browserData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {browserData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '12px',
                          color: '#FFFFFF',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-3">
                  {browserData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-lg"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                        {entry.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Recent Visits */}
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-bold">Recent Visits</div>
                  <div className="text-sm text-gray-400 font-normal">Latest visitor activity</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {recentVisits.map((visit, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {visit.country.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{visit.country}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-300">{visit.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Monitor className="size-3" />
                          <span>{visit.browser}</span>
                          <span>•</span>
                          <span>{visit.os}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm font-medium text-white">{formatTimestamp(visit.timestamp)}</div>
                      <div className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                        {visit.path}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  )
}

export default VisitDashboard
