import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface BudgetTrackerProps {
  monthlyIncome: number;
  needsSpent: number;
  wantsSpent: number;
  savings: number;
  budgetRule: { needs: number; wants: number; savings: number };
}

const BudgetTracker = ({ monthlyIncome, needsSpent, wantsSpent, savings, budgetRule }: BudgetTrackerProps) => {
  const needsBudget = (monthlyIncome * budgetRule.needs) / 100;
  const wantsBudget = (monthlyIncome * budgetRule.wants) / 100;
  const savingsBudget = (monthlyIncome * budgetRule.savings) / 100;

  const needsUtilization = (needsSpent / needsBudget) * 100;
  const wantsUtilization = (wantsSpent / wantsBudget) * 100;
  const savingsRate = (savings / monthlyIncome) * 100;

  const getColor = (utilization: number) => {
    if (utilization <= 90) return "hsl(var(--success))";
    if (utilization <= 100) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const pieData = [
    { name: "Needs", value: needsSpent, target: needsBudget, color: "hsl(var(--primary))" },
    { name: "Wants", value: wantsSpent, target: wantsBudget, color: "hsl(var(--accent))" },
    { name: "Savings", value: savings, target: savingsBudget, color: "hsl(var(--success))" },
  ];

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">Budget Tracker - {budgetRule.needs}/{budgetRule.wants}/{budgetRule.savings} Rule</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Needs */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-card-foreground">Needs</span>
              <span className="text-sm font-medium" style={{ color: getColor(needsUtilization) }}>
                ₹{needsSpent.toLocaleString('en-IN')} / ₹{needsBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <Progress value={Math.min(needsUtilization, 100)} className="h-3" />
            <p className="text-xs text-muted-foreground">{needsUtilization.toFixed(0)}% utilized</p>
          </div>

          {/* Wants */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-card-foreground">Wants</span>
              <span className="text-sm font-medium" style={{ color: getColor(wantsUtilization) }}>
                ₹{wantsSpent.toLocaleString('en-IN')} / ₹{wantsBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <Progress value={Math.min(wantsUtilization, 100)} className="h-3" />
            <p className="text-xs text-muted-foreground">{wantsUtilization.toFixed(0)}% utilized</p>
          </div>

          {/* Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-card-foreground">Savings</span>
              <span className="text-sm font-medium text-success">
                ₹{savings.toLocaleString('en-IN')} / ₹{savingsBudget.toLocaleString('en-IN')}
              </span>
            </div>
            <Progress value={Math.min(savingsRate / (budgetRule.savings / 100), 100)} className="h-3" />
            <p className="text-xs text-muted-foreground">{savingsRate.toFixed(1)}% saved</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default BudgetTracker;
