import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, FileText, TrendingUp, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ScreeningTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // PHQ-9 Questions
  const phq9Questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead, or of hurting yourself in some way?"
  ];

  // GAD-7 Questions
  const gad7Questions = [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it is hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid, as if something awful might happen?"
  ];

  // K-10 Questions (simplified version)
  const k10Questions = [
    "About how often did you feel tired out for no good reason?",
    "About how often did you feel nervous?",
    "About how often did you feel so nervous that nothing could calm you down?",
    "About how often did you feel hopeless?",
    "About how often did you feel restless or fidgety?",
    "About how often did you feel so restless you could not sit still?",
    "About how often did you feel depressed?",
    "About how often did you feel that everything was an effort?",
    "About how often did you feel so sad that nothing could cheer you up?",
    "About how often did you feel worthless?"
  ];

  const screeningTools = [
    {
      id: "phq9",
      name: "PHQ-9",
      title: "Patient Health Questionnaire-9",
      description: "Screens for depression severity over the past 2 weeks",
      questions: phq9Questions,
      icon: Brain,
      color: "primary",
      timeEstimate: "2-3 minutes"
    },
    {
      id: "gad7", 
      name: "GAD-7",
      title: "Generalized Anxiety Disorder-7",
      description: "Measures anxiety symptoms over the past 2 weeks",
      questions: gad7Questions,
      icon: FileText,
      color: "secondary",
      timeEstimate: "2 minutes"
    },
    {
      id: "k10",
      name: "K-10",
      title: "Kessler Psychological Distress Scale",
      description: "Assesses general psychological distress",
      questions: k10Questions,
      icon: TrendingUp,
      color: "accent",
      timeEstimate: "3-4 minutes"
    }
  ];

  const responseOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const k10ResponseOptions = [
    { value: 1, label: "None of the time" },
    { value: 2, label: "A little of the time" },
    { value: 3, label: "Some of the time" },
    { value: 4, label: "Most of the time" },
    { value: 5, label: "All of the time" }
  ];

  const handleStartScreening = (toolId: string) => {
    setSelectedTool(toolId);
    setCurrentQuestion(0);
    setResponses([]);
    setIsComplete(false);
    setScore(null);
  };

  const handleResponse = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };

  const handleNext = () => {
    const tool = screeningTools.find(t => t.id === selectedTool);
    if (!tool) return;

    if (currentQuestion < tool.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score and complete
      const totalScore = responses.reduce((sum, response) => sum + (response || 0), 0);
      setScore(totalScore);
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScoreInterpretation = (toolId: string, score: number) => {
    switch (toolId) {
      case "phq9":
        if (score <= 4) return { level: "Minimal", color: "success", description: "Minimal depression symptoms" };
        if (score <= 9) return { level: "Mild", color: "warning", description: "Mild depression symptoms" };
        if (score <= 14) return { level: "Moderate", color: "warning", description: "Moderate depression symptoms" };
        if (score <= 19) return { level: "Moderately Severe", color: "destructive", description: "Moderately severe depression" };
        return { level: "Severe", color: "destructive", description: "Severe depression symptoms" };

      case "gad7":
        if (score <= 4) return { level: "Minimal", color: "success", description: "Minimal anxiety symptoms" };
        if (score <= 9) return { level: "Mild", color: "warning", description: "Mild anxiety symptoms" };
        if (score <= 14) return { level: "Moderate", color: "warning", description: "Moderate anxiety symptoms" };
        return { level: "Severe", color: "destructive", description: "Severe anxiety symptoms" };

      case "k10":
        if (score <= 15) return { level: "Low", color: "success", description: "Likely to be well" };
        if (score <= 21) return { level: "Moderate", color: "warning", description: "Likely to have mild distress" };
        if (score <= 29) return { level: "High", color: "warning", description: "Likely to have moderate distress" };
        return { level: "Very High", color: "destructive", description: "Likely to have severe distress" };

      default:
        return { level: "Unknown", color: "secondary", description: "Score interpretation unavailable" };
    }
  };

  const resetScreening = () => {
    setSelectedTool(null);
    setCurrentQuestion(0);
    setResponses([]);
    setIsComplete(false);
    setScore(null);
  };

  if (selectedTool && !isComplete) {
    const tool = screeningTools.find(t => t.id === selectedTool);
    if (!tool) return null;

    const progress = ((currentQuestion + 1) / tool.questions.length) * 100;
    const options = selectedTool === "k10" ? k10ResponseOptions : responseOptions;

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">{tool.title}</h2>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
            <Button variant="outline" onClick={resetScreening}>
              Cancel
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {tool.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-6 bg-muted/30">
            <h3 className="text-lg font-medium mb-4">
              Over the last 2 weeks, how often have you been bothered by the following problem?
            </h3>
            <p className="text-lg mb-6">{tool.questions[currentQuestion]}</p>

            <RadioGroup 
              value={responses[currentQuestion]?.toString() || ""} 
              onValueChange={(value) => handleResponse(parseInt(value))}
              className="space-y-3"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="text-base cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={responses[currentQuestion] === undefined}
              className="bg-primary hover:bg-primary/90"
            >
              {currentQuestion === tool.questions.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isComplete && score !== null) {
    const tool = screeningTools.find(t => t.id === selectedTool);
    const interpretation = tool ? getScoreInterpretation(tool.id, score) : null;

    return (
      <div className="space-y-6">
        <Card className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Screening Complete</h2>
          <p className="text-muted-foreground mb-6">Thank you for completing the {tool?.title}</p>

          {interpretation && (
            <div className="bg-muted/30 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl font-bold">{score}</span>
                <Badge variant={
                  interpretation.color === "destructive" ? "destructive" : 
                  interpretation.color === "success" ? "outline" : 
                  "secondary"
                } className="text-base px-3 py-1">
                  {interpretation.level}
                </Badge>
              </div>
              <p className="text-lg">{interpretation.description}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={resetScreening}>
              Take Another Screening
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              View Recommendations
            </Button>
          </div>

          {interpretation?.color === "destructive" && (
            <Card className="p-4 mt-6 bg-destructive-soft border border-destructive/20">
              <p className="text-sm font-medium text-destructive mb-2">⚠️ Immediate Support Available</p>
              <p className="text-sm text-muted-foreground mb-3">
                Your responses indicate you may benefit from speaking with a counselor.
              </p>
              <Button size="sm" variant="destructive">
                Contact Counselor Now
              </Button>
            </Card>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Validated Screening Tools</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Evidence-based assessments to help understand your current mental health status. 
          All tools use clinically validated cutoff points for accurate screening.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {screeningTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card 
              key={tool.id} 
              className="p-6 hover:shadow-medium transition-all duration-300 cursor-pointer group"
              onClick={() => handleStartScreening(tool.id)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 bg-${tool.color}-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 text-${tool.color}`} />
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {tool.timeEstimate}
                  </Badge>
                </div>
                
                <h4 className="font-medium text-muted-foreground mb-3">{tool.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Screening
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Information Section */}
      <Card className="p-6 bg-primary-soft/30">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">About These Screenings</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Evidence-Based Tools</h4>
            <p className="text-muted-foreground">
              All screening instruments are clinically validated with established reliability and validity. 
              Scores are automatically calculated using evidence-based cutoff points.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Privacy & Confidentiality</h4>
            <p className="text-muted-foreground">
              Your responses are confidential and used only for clinical assessment. 
              High-risk scores may trigger counselor notification with your consent.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScreeningTools;