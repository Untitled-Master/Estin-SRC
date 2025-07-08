import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, ChevronUp, ChevronDown, Globe, Monitor, Calendar, Clock, Users, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const VisitDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentVisits, setRecentVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://visitcounter-estinsrc.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard data and recent visits in parallel
        const [dashboardRes, recentRes] = await Promise.all([
          fetch(`${BASE_URL}/dashboard`),
          fetch(`${BASE_URL}/recent-visits?limit=20`)
        ]);

        if (!dashboardRes.ok || !recentRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [dashboard, recent] = await Promise.all([
          dashboardRes.json(),
          recentRes.json()
        ]);

        setDashboardData(dashboard);
        setRecentVisits(recent.recentVisits || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Transform data for charts
  const getChartData = () => {
    if (!dashboardData?.dailyVisits) return [];
    
    return Object.entries(dashboardData.dailyVisits)
      .slice(-14) // Last 14 days
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        visits: count,
        fullDate: date
      }));
  };

  const getHourlyData = () => {
    if (!dashboardData?.hourlyStats) return [];
    
    const today = new Date().toISOString().split('T')[0];
    const todayHours = dashboardData.hourlyStats[today] || {};
    
    return Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      visits: todayHours[hour] || 0
    }));
  };

  const getPieData = (data, colors) => {
    if (!data) return [];
    
    return Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length]
      }));
  };

  const calculateTrend = () => {
    if (!dashboardData?.dailyVisits) return { percentage: 0, direction: 'up' };
    
    const dailyVisitsArray = Object.values(dashboardData.dailyVisits).slice(-7);
    const lastTwoDays = dailyVisitsArray.slice(-2);
    
    if (lastTwoDays.length < 2) return { percentage: 0, direction: 'up' };
    
    const percentageChange = ((lastTwoDays[1] - lastTwoDays[0]) / lastTwoDays[0]) * 100;
    return {
      percentage: Math.abs(Math.round(percentageChange)),
      direction: percentageChange >= 0 ? 'up' : 'down'
    };
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const chartData = getChartData();
  const hourlyData = getHourlyData();
  const trend = calculateTrend();
  const today = new Date().toISOString().split('T')[0];
  const todayVisits = dashboardData?.dailyVisits?.[today] || 0;

  // Color schemes
  const countryColors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];
  const browserColors = ['#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'];

  const countryData = getPieData(dashboardData?.countryStats, countryColors);
  const browserData = getPieData(dashboardData?.browserStats, browserColors);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#FAFAFA] size-12 mx-auto mb-4" />
          <p className="text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex justify-center items-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Failed to load analytics data: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#FAFAFA] via-blue-400 to-purple-400 bg-clip-text text-transparent">
            ESTINSRC Analytics
          </h1>
          <p className="text-lg text-gray-400">Real-time website analytics dashboard</p>
          {dashboardData?.lastVisit && (
            <p className="text-sm text-gray-500 mt-2">
              Last visit: {formatTimestamp(dashboardData.lastVisit.timestamp)} from {dashboardData.lastVisit.country}
            </p>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Eye className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{dashboardData?.totalVisits || 0}</div>
              <p className="text-xs text-gray-400">All time visitors</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              {trend.direction === 'up' ? (
                <ChevronUp className="h-4 w-4 text-green-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{todayVisits}</div>
              <p className="text-xs text-gray-400">
                {trend.percentage}% {trend.direction} from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Countries</CardTitle>
              <Globe className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {dashboardData?.countryStats ? Object.keys(dashboardData.countryStats).length : 0}
              </div>
              <p className="text-xs text-gray-400">Unique countries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">
                {hourlyData.length ? hourlyData.reduce((max, curr) => curr.visits > max.visits ? curr : max).hour : '--'}
              </div>
              <p className="text-xs text-gray-400">Most active time today</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Visits Trend */}
          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Visits Trend (14 Days)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#171717', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#FAFAFA'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#10B981"
                    strokeWidth={3}
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
          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                Today's Hourly Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis 
                    dataKey="hour" 
                    stroke="#888888" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#171717', 
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#FAFAFA'
                    }}
                  />
                  <Bar
                    dataKey="visits"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Demographics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Country Distribution */}
          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-400" />
                Top Countries
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
                        backgroundColor: '#171717', 
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#FAFAFA'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {countryData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <Badge variant="outline">{entry.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browser Distribution */}
          <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-cyan-400" />
                Top Browsers
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
                        backgroundColor: '#171717', 
                        border: '1px solid #333',
                        borderRadius: '8px',
                        color: '#FAFAFA'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {browserData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                    <Badge variant="outline">{entry.value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Visits */}
        <Card className="bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-none text-[#FAFAFA] shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-400" />
              Recent Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentVisits.map((visit, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between bg-[#262626] rounded-lg p-4 hover:bg-[#2c2c2c] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {visit.country.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{visit.country}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{visit.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{visit.browser}</span>
                        <span>•</span>
                        <span>{visit.os}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatTimestamp(visit.timestamp)}</div>
                    <div className="text-xs text-gray-400">{visit.path}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitDashboard;
