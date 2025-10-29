import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EmergencyFundTrackerProps {
  currentFund: number;
  monthlyExpenses: number;
  targetMonths: number;
}

const EmergencyFundTracker = ({ currentFund, monthlyExpenses, targetMonths }: EmergencyFundTrackerProps) => {
  const targetAmount = monthlyExpenses * targetMonths;
  const currentMonths = currentFund / monthlyExpenses;
  const adequacy = (currentFund / targetAmount) * 100;

  const getMilestone = (months: number) => {
    if (months >= 6) return { badge: "🥇 Summit", color: "hsl(var(--success))" };
    if (months >= 3) return { badge: "🥈 Camp 2", color: "hsl(var(--primary))" };
    if (months >= 1) return { badge: "🥉 Camp 1", color: "hsl(var(--accent))" };
    return { badge: "⛺ Base Camp", color: "hsl(var(--muted-foreground))" };
  };

  const milestone = getMilestone(currentMonths);

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-card-foreground">Emergency Fund Tracker</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-card-foreground">
              ₹{currentFund.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentMonths.toFixed(1)} months of expenses covered
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-1">{milestone.badge.split(' ')[0]}</div>
            <p className="text-xs font-medium" style={{ color: milestone.color }}>
              {milestone.badge.split(' ')[1]}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={Math.min(adequacy, 100)} className="h-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Current: {adequacy.toFixed(0)}%</span>
            <span>Target: ₹{targetAmount.toLocaleString('en-IN')} ({targetMonths} months)</span>
          </div>
        </div>

        {/* Milestone badges */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { months: 1, icon: "🥉", name: "1 Month" },
            { months: 3, icon: "🥈", name: "3 Months" },
            { months: 6, icon: "🥇", name: "6 Months" },
            { months: 9, icon: "🏆", name: "9 Months" }
          ].map((badge) => (
            <div
              key={badge.months}
              className={`p-3 rounded-lg text-center transition-all ${
                currentMonths >= badge.months
                  ? "bg-success/20 border-2 border-success"
                  : "bg-muted/20 border border-muted"
              }`}
            >
              <div className="text-2xl mb-1 opacity-${currentMonths >= badge.months ? '100' : '40'}">
                {badge.icon}
              </div>
              <p className="text-xs font-medium text-card-foreground">{badge.name}</p>
            </div>
          ))}
        </div>

        {adequacy < 100 && (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-card-foreground">
              💡 <strong>Keep Building:</strong> Save ₹{((targetAmount - currentFund) / 12).toFixed(0)}/month to reach your goal in 1 year!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmergencyFundTracker;
