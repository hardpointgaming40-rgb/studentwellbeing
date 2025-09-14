import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Heart, Shield, BarChart3, Brain, Phone } from "lucide-react";
import StudentDashboard from "@/components/StudentDashboard";
import CounselorDashboard from "@/components/CounselorDashboard";
import CrisisSupport from "@/components/CrisisSupport";

const Index = () => {
  const [activeView, setActiveView] = useState<"landing" | "student" | "counselor" | "crisis">("landing");

  if (activeView === "student") {
    return <StudentDashboard onBack={() => setActiveView("landing")} />;
  }

  if (activeView === "counselor") {
    return <CounselorDashboard onBack={() => setActiveView("landing")} />;
  }

  if (activeView === "crisis") {
    return <CrisisSupport onBack={() => setActiveView("landing")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 bg-primary-soft rounded-full px-4 py-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Evidence-Based Mental Health Support</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Clinical Framework for
            <br />
            <span className="text-accent">Student Wellbeing</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Validated screening tools, evidence-based interventions, and real-time crisis detection 
            to support student mental health with clinical precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setActiveView("student")}
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold shadow-strong"
            >
              Student Portal
            </Button>
            <Button 
              onClick={() => setActiveView("counselor")}
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
            >
              Counselor Dashboard
            </Button>
          </div>
        </div>

        {/* Quick Access Crisis Support */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setActiveView("crisis")}
            className="bg-destructive hover:bg-destructive/90 text-white shadow-strong rounded-full p-4"
            size="lg"
          >
            <Phone className="w-6 h-6 mr-2" />
            Crisis Support
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Validated Screening</h3>
            <p className="text-white/80">
              PHQ-9, GAD-7, K-10, and DASS-21 assessments with automated scoring and evidence-based cutoff points.
            </p>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-secondary-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Micro-Interventions</h3>
            <p className="text-white/80">
              Evidence-based tools including box breathing, grounding techniques, CBT exercises, and behavioral activation.
            </p>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-warning-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Crisis Detection</h3>
            <p className="text-white/80">
              Multi-level risk assessment with real-time monitoring, safety plan building, and immediate intervention protocols.
            </p>
          </Card>
        </div>

        {/* Clinical Evidence */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-semibold text-white">Evidence-Based Outcomes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">78%</div>
              <p className="text-white/80">Reduction in crisis episodes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">65%</div>
              <p className="text-white/80">Improved screening scores</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">92%</div>
              <p className="text-white/80">Student satisfaction rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">45%</div>
              <p className="text-white/80">Increased service utilization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;