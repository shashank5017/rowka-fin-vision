import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EMI {
  type: string;
  emiAmount: number;
  outstanding: number;
  interestRate: number;
  lender: string;
}

interface EMICalculatorProps {
  emis: EMI[];
  monthlyIncome: number;
}

const EMICalculator = ({ emis, monthlyIncome }: EMICalculatorProps) => {
  const totalEMI = emis.reduce((sum, emi) => sum + emi.emiAmount, 0);
  const emiRatio = (totalEMI / monthlyIncome) * 100;

  const getRiskLevel = (ratio: number) => {
    if (ratio < 30) return { level: "Healthy", color: "hsl(var(--success))", emoji: "🟢" };
    if (ratio < 40) return { level: "Caution", color: "hsl(var(--warning))", emoji: "🟡" };
    if (ratio < 50) return { level: "High Risk", color: "hsl(var(--warning))", emoji: "🟠" };
    return { level: "Danger", color: "hsl(var(--destructive))", emoji: "🔴" };
  };

  const risk = getRiskLevel(emiRatio);

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">EMI & Debt Burden</h3>
      
      <div className="space-y-6">
        {/* EMI Ratio Gauge */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-card-foreground">Total EMI Burden</span>
            <span className="text-sm font-medium" style={{ color: risk.color }}>
              {risk.emoji} {risk.level}
            </span>
          </div>
          <div className="relative">
            <Progress value={Math.min(emiRatio, 100)} className="h-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-foreground">
                {emiRatio.toFixed(1)}% of income
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{totalEMI.toLocaleString('en-IN')} / ₹{monthlyIncome.toLocaleString('en-IN')}</span>
            <span>Target: &lt;30%</span>
          </div>
        </div>

        {/* EMI Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Loan Breakdown</h4>
          {emis.map((emi, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="text-sm font-medium text-card-foreground">{emi.type}</p>
                <p className="text-xs text-muted-foreground">{emi.lender} • {emi.interestRate}% p.a.</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-card-foreground">₹{emi.emiAmount.toLocaleString('en-IN')}/mo</p>
                <p className="text-xs text-muted-foreground">₹{emi.outstanding.toLocaleString('en-IN')} left</p>
              </div>
            </div>
          ))}
        </div>

        {emiRatio > 40 && (
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <p className="text-sm text-warning-foreground">
              💡 <strong>Tip:</strong> Your EMI burden is high. Consider consolidating loans or increasing income.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EMICalculator;
