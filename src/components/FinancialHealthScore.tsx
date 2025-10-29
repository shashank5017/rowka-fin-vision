import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface FinancialHealthScoreProps {
  score: number;
}

const FinancialHealthScore = ({ score }: FinancialHealthScoreProps) => {
  const getScoreDetails = (score: number) => {
    if (score >= 85) return { grade: "A+", emoji: "🏆", message: "Outstanding! You're a financial rockstar!", color: "hsl(var(--success))" };
    if (score >= 70) return { grade: "A", emoji: "💪", message: "Great job! Minor tweaks for perfection.", color: "hsl(var(--primary))" };
    if (score >= 55) return { grade: "B", emoji: "📈", message: "Good progress! Keep improving.", color: "hsl(var(--accent))" };
    if (score >= 40) return { grade: "C", emoji: "⚠️", message: "Needs attention. Let's fix some areas.", color: "hsl(var(--warning))" };
    return { grade: "D", emoji: "🚨", message: "Critical! Let's build a recovery plan.", color: "hsl(var(--destructive))" };
  };

  const details = getScoreDetails(score);
  const data = [
    { value: score },
    { value: 100 - score }
  ];

  return (
    <Card className="p-8 bg-gradient-card shadow-lg">
      <div className="text-center">
        <h2 className="text-sm font-medium text-muted-foreground mb-6">Financial Health Score</h2>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius={70}
                outerRadius={90}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={details.color} />
                <Cell fill="hsl(var(--muted))" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold" style={{ color: details.color }}>{score}</div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl">{details.emoji}</span>
            <span className="text-2xl font-bold" style={{ color: details.color }}>{details.grade}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">{details.message}</p>
        </div>
      </div>
    </Card>
  );
};

export default FinancialHealthScore;
