import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface IncomeSource {
  name: string;
  amount: number;
  type: "active" | "passive";
}

interface IncomeBreakdownProps {
  incomeSources: IncomeSource[];
}

const IncomeBreakdown = ({ incomeSources }: IncomeBreakdownProps) => {
  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0);
  const passiveIncome = incomeSources
    .filter(s => s.type === "passive")
    .reduce((sum, source) => sum + source.amount, 0);
  const passiveRatio = (passiveIncome / totalIncome) * 100;

  const chartData = incomeSources.map(source => ({
    name: source.name,
    amount: source.amount,
    type: source.type
  }));

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">Income Analysis</h3>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-primary/10">
          <p className="text-xs text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold text-primary">₹{totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 rounded-lg bg-success/10">
          <p className="text-xs text-muted-foreground mb-1">Passive Income</p>
          <p className="text-2xl font-bold text-success">₹{passiveIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 rounded-lg bg-accent/10">
          <p className="text-xs text-muted-foreground mb-1">Passive Ratio</p>
          <p className="text-2xl font-bold text-accent">{passiveRatio.toFixed(1)}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
          />
          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.type === "passive" ? "hsl(var(--success))" : "hsl(var(--primary))"} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {passiveRatio < 10 && (
        <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-sm text-card-foreground">
            💡 <strong>Build Passive Income:</strong> Aim for 20%+ passive income through investments, rental income, or dividends for financial freedom.
          </p>
        </div>
      )}
    </Card>
  );
};

export default IncomeBreakdown;
