import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Brain, Heart, Zap, Shield, TrendingUp } from "lucide-react";
import ScreeningTools from "@/components/screening/ScreeningTools";
import MicroInterventions from "@/components/interventions/MicroInterventions";
import MoodTracker from "@/components/tracking/MoodTracker";
import SafetyPlan from "@/components/crisis/SafetyPlan";

interface StudentDashboardProps {
  onBack: () => void;
}

const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [currentRiskLevel, setCurrentRiskLevel] = useState<"low" | "moderate" | "high">("low");
  const [lastScreeningScore] = useState({ phq9: 8, gad7: 6, overall: "Mild" });
  const [weeklyProgress] = useState(75);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "bg-success";
      case "moderate": return "bg-warning";
      case "high": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Your Wellbeing Dashboard</h1>
          </div>

          {/* Quick Status Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getRiskColor(currentRiskLevel)}`} />
                <div>
                  <p className="text-sm text-white/80">Current Status</p>
                  <p className="font-semibold text-white capitalize">{currentRiskLevel} Risk</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-white/80">Weekly Progress</p>
                  <p className="font-semibold text-white">{weeklyProgress}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-white/80">Last Screening</p>
                  <p className="font-semibold text-white">{lastScreeningScore.overall}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="safety">Safety Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Weekly Progress */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">This Week's Progress</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Wellbeing</span>
                    <span>{weeklyProgress}%</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-3" />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-primary-soft rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">12</div>
                    <p className="text-sm text-muted-foreground">Interventions Used</p>
                  </div>
                  <div className="text-center p-4 bg-success-soft rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">8.2</div>
                    <p className="text-sm text-muted-foreground">Avg Mood Rating</p>
                  </div>
                  <div className="text-center p-4 bg-secondary-soft rounded-lg">
                    <div className="text-2xl font-bold text-secondary mb-1">5</div>
                    <p className="text-sm text-muted-foreground">Check-ins This Week</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col gap-2 hover:bg-primary-soft"
              >
                <Brain className="w-8 h-8 text-primary" />
                <span>Take Screening</span>
              </Button>

              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col gap-2 hover:bg-secondary-soft"
              >
                <Heart className="w-8 h-8 text-secondary" />
                <span>Quick Intervention</span>
              </Button>

              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col gap-2 hover:bg-accent-soft"
              >
                <Zap className="w-8 h-8 text-accent" />
                <span>Mood Check-in</span>
              </Button>

              <Button 
                variant="outline" 
                className="p-6 h-auto flex-col gap-2 hover:bg-destructive-soft"
              >
                <Shield className="w-8 h-8 text-destructive" />
                <span>Safety Resources</span>
              </Button>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">Completed GAD-7 screening - Score: 6 (Mild anxiety)</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm">Used Box Breathing exercise for 5 minutes</span>
                  <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm">Mood check-in: Feeling better (7/10)</span>
                  <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="screening">
            <ScreeningTools />
          </TabsContent>

          <TabsContent value="interventions">
            <MicroInterventions />
          </TabsContent>

          <TabsContent value="tracking">
            <MoodTracker />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyPlan />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;