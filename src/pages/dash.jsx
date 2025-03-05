import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const VisitDashboard = () => {
  const [visits, setVisits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await fetch("https://visitcounter-90007-default-rtdb.firebaseio.com/estinsrc.json");
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setVisits(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visit data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVisitData();
  }, []);

  // Transform daily visits into chart-friendly format
  const chartData = visits?.dailyVisits 
    ? Object.entries(visits.dailyVisits)
        .slice(-7)
        .reverse()
        .map(([date, count]) => ({
          date: new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          }),
          visits: count
        }))
    : [];

  // Calculate visit trends
  const calculateTrend = () => {
    if (!visits?.dailyVisits) return { percentage: 0, direction: 'up' };
    
    const dailyVisitsArray = Object.values(visits.dailyVisits).slice(-7);
    const lastTwoDays = dailyVisitsArray.slice(-2);
    
    if (lastTwoDays.length < 2) return { percentage: 0, direction: 'up' };
    
    const percentageChange = ((lastTwoDays[1] - lastTwoDays[0]) / lastTwoDays[0]) * 100;
    return {
      percentage: Math.abs(Math.round(percentageChange)),
      direction: percentageChange >= 0 ? 'up' : 'down'
    };
  };

  const trend = calculateTrend();

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#FAFAFA] to-gray-500 bg-clip-text text-transparent">
          Visit Analytics Dashboard
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin text-[#FAFAFA] size-12" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertDescription>
              Failed to load visit data. {error}
            </AlertDescription>
          </Alert>
        ) : visits ? (
          <div className="space-y-6">
            {/* Top-level stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[#171717] border-none text-[#FAFAFA] shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{visits.totalVisits}</div>
                  <p className="text-xs text-muted-foreground">
                    Overall website traffic
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#171717] border-none text-[#FAFAFA] shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
                  {trend.direction === 'up' ? (
                    <ChevronUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {visits.dailyVisits?.[new Date().toISOString().split("T")[0]] || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {trend.percentage}% {trend.direction} from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#171717] border-none text-[#FAFAFA] shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Performance</CardTitle>
                  <Badge variant="outline" className="bg-green-900/50 text-green-400">
                    Last 7 Days
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={chartData}>
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#171717', 
                          border: 'none' 
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Visits Chart */}
            <Card className="bg-[#171717] border-none text-[#FAFAFA] shadow-2xl">
              <CardHeader>
                <CardTitle>Visits Trend</CardTitle>
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
                        border: 'none',
                        color: '#FAFAFA'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visits"
                      stroke="#10B981"
                      strokeWidth={3}
                      activeDot={{
                        r: 8,
                        style: { fill: "#10B981", opacity: 0.7 }
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Daily Visits */}
            <Card className="bg-[#171717] border-none text-[#FAFAFA] shadow-2xl">
              <CardHeader>
                <CardTitle>Daily Visit Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chartData.map((entry) => (
                    <div 
                      key={entry.date} 
                      className="flex justify-between items-center bg-[#262626] rounded-md p-3 hover:bg-[#2c2c2c] transition-colors"
                    >
                      <span className="font-medium">{entry.date}</span>
                      <Badge variant="secondary" className="text-sm">
                        {entry.visits} visits
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VisitDashboard;