import { useState } from "react";
import FinancialHealthScore from "@/components/FinancialHealthScore";
import BudgetTracker from "@/components/BudgetTracker";
import EMICalculator from "@/components/EMICalculator";
import IncomeBreakdown from "@/components/IncomeBreakdown";
import EmergencyFundTracker from "@/components/EmergencyFundTracker";
import QuickStats from "@/components/QuickStats";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Index = () => {
  // Sample data - in a real app, this would come from user input/database
  const [userData] = useState({
    monthlyIncome: 75000,
    incomeSources: [
      { name: "Salary", amount: 60000, type: "active" as const },
      { name: "Freelance", amount: 10000, type: "active" as const },
      { name: "Dividends", amount: 3000, type: "passive" as const },
      { name: "Rental", amount: 2000, type: "passive" as const },
    ],
    needsSpent: 32000,
    wantsSpent: 18000,
    savings: 25000,
    budgetRule: { needs: 50, wants: 30, savings: 20 },
    emis: [
      { type: "Home Loan", emiAmount: 15000, outstanding: 2500000, interestRate: 8.5, lender: "SBI" },
      { type: "Car Loan", emiAmount: 8000, outstanding: 350000, interestRate: 9.2, lender: "HDFC" },
    ],
    emergencyFund: 180000,
    monthlyExpenses: 50000,
    targetEmergencyMonths: 6,
    financialHealthScore: 76,
  });

  const totalExpenses = userData.needsSpent + userData.wantsSpent;
  const savingsRate = (userData.savings / userData.monthlyIncome) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Rowka</h1>
                <p className="text-xs text-muted-foreground">Financial Health Engine</p>
              </div>
            </div>
            <Button className="bg-gradient-primary text-white hover:opacity-90">
              Update Data
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-2 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Your Financial Dashboard
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your financial health, manage budgets, and build wealth with data-driven insights tailored for Indian users.
            </p>
          </div>

          {/* Quick Stats */}
          <QuickStats
            monthlyIncome={userData.monthlyIncome}
            totalExpenses={totalExpenses}
            savings={userData.savings}
            savingsRate={savingsRate}
          />

          {/* Financial Health Score */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <FinancialHealthScore score={userData.financialHealthScore} />
          </div>

          {/* Budget and Income Section */}
          <div className="grid lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <BudgetTracker
              monthlyIncome={userData.monthlyIncome}
              needsSpent={userData.needsSpent}
              wantsSpent={userData.wantsSpent}
              savings={userData.savings}
              budgetRule={userData.budgetRule}
            />
            <IncomeBreakdown incomeSources={userData.incomeSources} />
          </div>

          {/* EMI and Emergency Fund Section */}
          <div className="grid lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <EMICalculator
              emis={userData.emis}
              monthlyIncome={userData.monthlyIncome}
            />
            <EmergencyFundTracker
              currentFund={userData.emergencyFund}
              monthlyExpenses={userData.monthlyExpenses}
              targetMonths={userData.targetEmergencyMonths}
            />
          </div>

          {/* Footer CTA */}
          <div className="text-center py-8 animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="inline-block p-8 rounded-2xl bg-gradient-primary text-white">
              <h3 className="text-2xl font-bold mb-2">Ready to improve your score?</h3>
              <p className="text-white/90 mb-4">Get personalized recommendations based on your financial data</p>
              <Button variant="secondary" size="lg">
                Get AI Insights
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
