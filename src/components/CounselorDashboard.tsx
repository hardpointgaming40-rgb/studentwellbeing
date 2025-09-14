import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Users, TrendingUp, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CounselorDashboardProps {
  onBack: () => void;
}

const CounselorDashboard = ({ onBack }: CounselorDashboardProps) => {
  const [crisisQueue] = useState([
    { id: 1, name: "Sarah M.", risk: "high", lastActivity: "5 min ago", score: { phq9: 18, gad7: 15 } },
    { id: 2, name: "Alex K.", risk: "moderate", lastActivity: "23 min ago", score: { phq9: 12, gad7: 9 } },
    { id: 3, name: "Jordan L.", risk: "high", lastActivity: "1 hour ago", score: { phq9: 20, gad7: 17 } },
  ]);

  const [studentList] = useState([
    { id: 4, name: "Emma R.", status: "stable", lastScreening: "2 days ago", trend: "improving" },
    { id: 5, name: "Marcus T.", status: "monitoring", lastScreening: "1 day ago", trend: "stable" },
    { id: 6, name: "Lisa P.", status: "stable", lastScreening: "3 days ago", trend: "improving" },
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "destructive";
      case "moderate": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return "📈";
      case "declining": return "📉";
      default: return "📊";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Counselor Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6" />
              <Badge variant="destructive">3 Alerts</Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm text-white/80">Crisis Queue</p>
                  <p className="font-semibold text-white">{crisisQueue.length} Students</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-white/80">Active Monitoring</p>
                  <p className="font-semibold text-white">24 Students</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-white/80">This Week</p>
                  <p className="font-semibold text-white">89% Improvement</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-white/80">Avg Response</p>
                  <p className="font-semibold text-white">&lt; 15 min</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="crisis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crisis">Crisis Queue</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="crisis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Priority Interventions</h2>
              <div className="flex gap-3">
                <Input placeholder="Search students..." className="w-64" />
                <Button variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {crisisQueue.map((student) => (
                <Card key={student.id} className="p-6 border-l-4 border-l-destructive">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">Last activity: {student.lastActivity}</p>
                      </div>
                      <Badge variant={
                        student.risk === "high" ? "destructive" :
                        student.risk === "moderate" ? "secondary" :
                        "outline"
                      }>
                        {student.risk} risk
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">Screening Scores</p>
                        <p className="text-sm text-muted-foreground">
                          PHQ-9: {student.score.phq9} | GAD-7: {student.score.gad7}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Contact Now
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {student.risk === "high" && (
                    <div className="mt-4 p-3 bg-destructive-soft rounded-lg border border-destructive/20">
                      <p className="text-sm font-medium text-destructive mb-1">⚠️ High Risk Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Severe depression symptoms detected. Safety plan review recommended.
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Active Monitoring</h2>
            
            <div className="grid gap-4">
              {studentList.map((student) => (
                <Card key={student.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last screening: {student.lastScreening}
                        </p>
                      </div>
                      <Badge variant={student.status === "stable" ? "outline" : "secondary"}>
                        {student.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {getTrendIcon(student.trend)} {student.trend}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Analytics & Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Weekly Screening Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>PHQ-9 Average:</span>
                    <span className="font-medium">8.2 (Mild)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GAD-7 Average:</span>
                    <span className="font-medium">6.8 (Mild)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crisis Interventions:</span>
                    <span className="font-medium">12 this week</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Intervention Effectiveness</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Box Breathing:</span>
                    <span className="font-medium text-success">92% effective</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grounding 5-4-3-2-1:</span>
                    <span className="font-medium text-success">87% effective</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety Planning:</span>
                    <span className="font-medium text-success">94% effective</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Reports & Data Export</h2>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Generate Reports</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="p-4 h-auto">
                    <div className="text-left">
                      <p className="font-medium">Weekly Summary</p>
                      <p className="text-sm text-muted-foreground">Anonymized student data</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto">
                    <div className="text-left">
                      <p className="font-medium">Intervention Analysis</p>
                      <p className="text-sm text-muted-foreground">Tool effectiveness data</p>
                    </div>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CounselorDashboard;