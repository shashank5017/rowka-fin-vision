import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

interface QuickStatsProps {
  monthlyIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}

const QuickStats = ({ monthlyIncome, totalExpenses, savings, savingsRate }: QuickStatsProps) => {
  const stats = [
    {
      label: "Monthly Income",
      value: `₹${monthlyIncome.toLocaleString('en-IN')}`,
      icon: Wallet,
      gradient: "bg-gradient-primary",
      trend: null
    },
    {
      label: "Total Expenses",
      value: `₹${totalExpenses.toLocaleString('en-IN')}`,
      icon: TrendingDown,
      gradient: "bg-gradient-warning",
      trend: null
    },
    {
      label: "Savings",
      value: `₹${savings.toLocaleString('en-IN')}`,
      icon: PiggyBank,
      gradient: "bg-gradient-success",
      trend: null
    },
    {
      label: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      icon: TrendingUp,
      gradient: "bg-gradient-success",
      trend: savingsRate >= 20 ? "good" : "poor"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-gradient-card shadow-md hover:shadow-lg transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-card-foreground mb-1">{stat.value}</p>
              {stat.trend && (
                <div className="flex items-center gap-1">
                  {stat.trend === "good" ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-warning" />
                  )}
                  <span className={`text-xs ${stat.trend === "good" ? "text-success" : "text-warning"}`}>
                    {stat.trend === "good" ? "On track" : "Below target"}
                  </span>
                </div>
              )}
            </div>
            <div className={`p-3 rounded-full ${stat.gradient}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
