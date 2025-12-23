import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";

const mockRevenueData = [
  { date: "Jan 1", revenue: 2400 },
  { date: "Jan 5", revenue: 3200 },
  { date: "Jan 10", revenue: 2800 },
  { date: "Jan 15", revenue: 4100 },
  { date: "Jan 20", revenue: 3900 },
  { date: "Jan 25", revenue: 5200 },
  { date: "Jan 30", revenue: 4800 },
];

type PeriodType = "1day" | "7days" | "monthly" | "all";

interface RevenueData {
  date: string;
  revenue: number;
}

export function RevenueChart() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>("7days");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");

  const chartData = useMemo<RevenueData[]>(() => {
    const today = new Date();
    let data = mockRevenueData;

    switch (selectedPeriod) {
      case "1day":
        return [
          { date: format(today, "MMM d, HH:mm"), revenue: 2500 },
          { date: format(new Date(today.getTime() - 6 * 60 * 60 * 1000), "MMM d, HH:mm"), revenue: 1800 },
          { date: format(new Date(today.getTime() - 12 * 60 * 60 * 1000), "MMM d, HH:mm"), revenue: 2200 },
        ];

      case "7days":
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const date = subDays(today, i);
          last7Days.push({
            date: format(date, "MMM d"),
            revenue: Math.floor(Math.random() * 3000 + 2000),
          });
        }
        return last7Days;

      case "monthly": {
        const currentMonth = startOfMonth(today);
        const lastMonth = startOfMonth(subMonths(today, 1));
        
        const last30Days = [];
        for (let i = 0; i < 30; i++) {
          const date = subDays(today, i);
          if (date >= lastMonth) {
            last30Days.unshift({
              date: format(date, "MMM d"),
              revenue: Math.floor(Math.random() * 4000 + 2000),
            });
          }
        }
        return last30Days;
      }

      case "all":
        const allData = [];
        for (let i = 0; i < 90; i++) {
          const date = subDays(today, i);
          allData.unshift({
            date: format(date, "MMM d"),
            revenue: Math.floor(Math.random() * 5000 + 1500),
          });
        }
        return allData;

      default:
        return data;
    }
  }, [selectedPeriod]);

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = Math.floor(totalRevenue / chartData.length);

  return (
    <Card className="border border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Track your revenue over time</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedPeriod === "1day" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("1day")}
              className="text-xs"
              data-testid="button-period-1day"
            >
              1 Day
            </Button>
            <Button
              size="sm"
              variant={selectedPeriod === "7days" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("7days")}
              className="text-xs"
              data-testid="button-period-7days"
            >
              7 Days
            </Button>
            <Button
              size="sm"
              variant={selectedPeriod === "monthly" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("monthly")}
              className="text-xs"
              data-testid="button-period-monthly"
            >
              Monthly
            </Button>
            <Button
              size="sm"
              variant={selectedPeriod === "all" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("all")}
              className="text-xs"
              data-testid="button-period-all"
            >
              All Time
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Revenue Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-0.5">Total Revenue</p>
            <p className="text-lg md:text-xl font-bold text-foreground">${(totalRevenue / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-0.5">Average</p>
            <p className="text-lg md:text-xl font-bold text-foreground">${(averageRevenue / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg border border-border/50 col-span-2 md:col-span-1">
            <p className="text-xs text-muted-foreground mb-0.5">Transactions</p>
            <p className="text-lg md:text-xl font-bold text-foreground">{chartData.length}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-56 -mx-4 px-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
                tick={{ fill: "var(--muted-foreground)" }}
              />
              <YAxis 
                stroke="var(--muted-foreground)"
                style={{ fontSize: "12px" }}
                tick={{ fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                dot={false}
                strokeWidth={2}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
