import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Heart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState([5]);
  const [currentEnergy, setCurrentEnergy] = useState([5]);
  const [currentAnxiety, setCurrentAnxiety] = useState([5]);
  const [notes, setNotes] = useState("");

  // Sample mood history data
  const moodHistory = [
    { date: "2024-01-15", mood: 7, energy: 6, anxiety: 4, note: "Good day, productive work session" },
    { date: "2024-01-14", mood: 5, energy: 4, anxiety: 6, note: "Feeling stressed about upcoming exam" },
    { date: "2024-01-13", mood: 8, energy: 8, anxiety: 3, note: "Great workout, feeling energized" },
    { date: "2024-01-12", mood: 6, energy: 5, anxiety: 5, note: "Average day, nothing special" },
    { date: "2024-01-11", mood: 4, energy: 3, anxiety: 7, note: "Difficult day, feeling overwhelmed" },
  ];

  const activities = [
    { name: "Exercise", impact: "+2 mood", frequency: "3x this week" },
    { name: "Meditation", impact: "+1 mood, -2 anxiety", frequency: "Daily" },
    { name: "Social Time", impact: "+3 mood", frequency: "2x this week" },
    { name: "Good Sleep", impact: "+1 mood, +2 energy", frequency: "5x this week" },
  ];

  const getMoodEmoji = (value: number) => {
    if (value <= 2) return "😢";
    if (value <= 4) return "😟";
    if (value <= 6) return "😐";
    if (value <= 8) return "🙂";
    return "😄";
  };

  const getEnergyEmoji = (value: number) => {
    if (value <= 2) return "😴";
    if (value <= 4) return "😌";
    if (value <= 6) return "😊";
    if (value <= 8) return "😃";
    return "⚡";
  };

  const getAnxietyEmoji = (value: number) => {
    if (value <= 2) return "😌";
    if (value <= 4) return "😐";
    if (value <= 6) return "😰";
    if (value <= 8) return "😨";
    return "😱";
  };

  const handleMoodSubmit = () => {
    // Here you would save the mood data
    console.log({
      mood: currentMood[0],
      energy: currentEnergy[0], 
      anxiety: currentAnxiety[0],
      notes,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Reset form
    setCurrentMood([5]);
    setCurrentEnergy([5]);
    setCurrentAnxiety([5]);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Mood & Behavioral Tracking</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Track your daily mood, energy, and anxiety levels to identify patterns and 
          monitor your progress over time.
        </p>
      </div>

      <Tabs defaultValue="checkin" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checkin">Daily Check-in</TabsTrigger>
          <TabsTrigger value="history">History & Trends</TabsTrigger>
          <TabsTrigger value="insights">Behavioral Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="checkin" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">How are you feeling today?</h3>
            </div>

            <div className="space-y-8">
              {/* Mood Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium">Mood</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMoodEmoji(currentMood[0])}</span>
                    <span className="text-lg font-semibold">{currentMood[0]}/10</span>
                  </div>
                </div>
                <Slider
                  value={currentMood}
                  onValueChange={setCurrentMood}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Low</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Energy Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium">Energy Level</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getEnergyEmoji(currentEnergy[0])}</span>
                    <span className="text-lg font-semibold">{currentEnergy[0]}/10</span>
                  </div>
                </div>
                <Slider
                  value={currentEnergy}
                  onValueChange={setCurrentEnergy}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Exhausted</span>
                  <span>Energized</span>
                </div>
              </div>

              {/* Anxiety Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-medium">Anxiety Level</label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getAnxietyEmoji(currentAnxiety[0])}</span>
                    <span className="text-lg font-semibold">{currentAnxiety[0]}/10</span>
                  </div>
                </div>
                <Slider
                  value={currentAnxiety}
                  onValueChange={setCurrentAnxiety}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Calm</span>
                  <span>Very Anxious</span>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <label className="text-lg font-medium">Notes (Optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How was your day? Any specific events or thoughts to remember?"
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                onClick={handleMoodSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Save Check-in
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h3 className="text-2xl font-semibold">Your Progress</h3>
            </div>

            {/* Summary Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-primary-soft rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">6.2</div>
                <p className="text-sm text-muted-foreground">Average Mood (7 days)</p>
              </div>
              <div className="text-center p-4 bg-secondary-soft rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">5.8</div>
                <p className="text-sm text-muted-foreground">Average Energy (7 days)</p>
              </div>
              <div className="text-center p-4 bg-accent-soft rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">4.8</div>
                <p className="text-sm text-muted-foreground">Average Anxiety (7 days)</p>
              </div>
            </div>

            {/* History List */}
            <div className="space-y-3">
              <h4 className="font-semibold">Recent Check-ins</h4>
              {moodHistory.map((entry, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{entry.date}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Mood:</span>
                        <Badge variant="outline">{entry.mood}/10</Badge>
                        <span className="text-sm">Energy:</span>
                        <Badge variant="outline">{entry.energy}/10</Badge>
                        <span className="text-sm">Anxiety:</span>
                        <Badge variant="outline">{entry.anxiety}/10</Badge>
                      </div>
                    </div>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-muted-foreground mt-2 ml-8">{entry.note}</p>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-success" />
              <h3 className="text-2xl font-semibold">Behavioral Activation</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              Track activities that positively impact your mood and wellbeing.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <Card key={index} className="p-4 bg-success-soft/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{activity.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {activity.frequency}
                    </Badge>
                  </div>
                  <p className="text-sm text-success font-medium">{activity.impact}</p>
                </Card>
              ))}
            </div>

            <Card className="p-4 mt-6 bg-primary-soft/30">
              <h4 className="font-medium mb-2">💡 Insight</h4>
              <p className="text-sm text-muted-foreground">
                Your mood tends to be highest on days when you exercise and get good sleep. 
                Consider maintaining these habits for better mental wellbeing.
              </p>
            </Card>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodTracker;