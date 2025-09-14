import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Plus, Phone, MapPin, Users, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SafetyPlan = () => {
  const [warningSign, setWarningSign] = useState("");
  const [copingStrategy, setCopingStrategy] = useState("");
  const [supportPerson, setSupportPerson] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [safePlace, setSafePlace] = useState("");

  // Sample existing safety plan data
  const [warningSigns] = useState([
    "Feeling hopeless or worthless",
    "Isolation from friends and family",
    "Changes in sleep patterns",
    "Increased anxiety or panic"
  ]);

  const [copingStrategies] = useState([
    "Use box breathing exercise",
    "Listen to calming music",
    "Take a warm shower",
    "Practice grounding techniques"
  ]);

  const [supportContacts] = useState([
    { name: "Sarah (Best Friend)", phone: "(555) 123-4567", relationship: "Friend" },
    { name: "Mom", phone: "(555) 987-6543", relationship: "Family" },
    { name: "Campus Counselor", phone: "(555) 456-7890", relationship: "Professional" }
  ]);

  const [safePlaces] = useState([
    "Campus library quiet study room",
    "Local park walking trail",
    "Coffee shop downtown",
    "Friend's apartment"
  ]);

  const professionalContacts = [
    { name: "Crisis Hotline", number: "988", description: "24/7 immediate support", type: "crisis" },
    { name: "Campus Counseling", number: "(555) 123-HELP", description: "On-campus mental health", type: "campus" },
    { name: "Emergency Services", number: "911", description: "Medical emergencies", type: "emergency" }
  ];

  const addWarningSign = () => {
    if (warningSign.trim()) {
      // Add logic to save warning sign
      setWarningSign("");
    }
  };

  const addCopingStrategy = () => {
    if (copingStrategy.trim()) {
      // Add logic to save coping strategy
      setCopingStrategy("");
    }
  };

  const addSupportPerson = () => {
    if (supportPerson.trim() && supportPhone.trim()) {
      // Add logic to save support person
      setSupportPerson("");
      setSupportPhone("");
    }
  };

  const addSafePlace = () => {
    if (safePlace.trim()) {
      // Add logic to save safe place
      setSafePlace("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-semibold">Personal Safety Plan</h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A personalized plan to help you recognize warning signs and take action to stay safe 
          during difficult times.
        </p>
      </div>

      {/* Crisis Alert */}
      <Card className="p-4 bg-destructive-soft border border-destructive/20">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <div>
            <p className="font-semibold text-destructive">If you are in immediate danger</p>
            <p className="text-sm text-muted-foreground">Call 911 or go to your nearest emergency room</p>
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => window.open("tel:911")}
          >
            Call 911
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Warning Signs */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <h3 className="text-xl font-semibold">Warning Signs</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Signs that tell me I might be entering a crisis
          </p>

          <div className="space-y-3 mb-4">
            {warningSigns.map((sign, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-warning-soft rounded-lg">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm">{sign}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={warningSign}
              onChange={(e) => setWarningSign(e.target.value)}
              placeholder="Add a warning sign..."
              className="flex-1"
            />
            <Button onClick={addWarningSign} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Coping Strategies */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-success" />
            <h3 className="text-xl font-semibold">Coping Strategies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Things I can do by myself to help me feel better
          </p>

          <div className="space-y-3 mb-4">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-success-soft rounded-lg">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm">{strategy}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={copingStrategy}
              onChange={(e) => setCopingStrategy(e.target.value)}
              placeholder="Add a coping strategy..."
              className="flex-1"
            />
            <Button onClick={addCopingStrategy} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Support People */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Support People</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            People I can contact for help and support
          </p>

          <div className="space-y-3 mb-4">
            {supportContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-primary-soft rounded-lg">
                <div>
                  <p className="font-medium text-sm">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(`tel:${contact.phone.replace(/\D/g, '')}`)}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  {contact.phone}
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Input
              value={supportPerson}
              onChange={(e) => setSupportPerson(e.target.value)}
              placeholder="Name and relationship..."
            />
            <div className="flex gap-2">
              <Input
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                placeholder="Phone number..."
                className="flex-1"
              />
              <Button onClick={addSupportPerson} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Safe Places */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-secondary" />
            <h3 className="text-xl font-semibold">Safe Places</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Places where I feel safe and can go for support
          </p>

          <div className="space-y-3 mb-4">
            {safePlaces.map((place, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary-soft rounded-lg">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm">{place}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={safePlace}
              onChange={(e) => setSafePlace(e.target.value)}
              placeholder="Add a safe place..."
              className="flex-1"
            />
            <Button onClick={addSafePlace} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Professional Contacts */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Phone className="w-6 h-6 text-destructive" />
          <h3 className="text-xl font-semibold">Professional Support</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Professional help available 24/7
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {professionalContacts.map((contact, index) => (
            <Card key={index} className="p-4 border-2 border-destructive/20">
              <div className="text-center">
                <h4 className="font-semibold mb-1">{contact.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{contact.description}</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full"
                  onClick={() => window.open(`tel:${contact.number.replace(/\D/g, '')}`)}
                >
                  <Phone className="w-3 h-3 mr-1" />
                  {contact.number}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Environmental Safety */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-accent" />
          <h3 className="text-xl font-semibold">Environmental Safety</h3>
        </div>
        
        <div className="bg-accent-soft/30 rounded-lg p-4">
          <h4 className="font-medium mb-3">Safety Checklist:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Remove or secure any means of self-harm</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Have emergency contacts easily accessible</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Keep medication in a safe place</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Stay with trusted friends or family when possible</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          variant="outline" 
          size="lg"
        >
          Save Safety Plan
        </Button>
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          Share with Counselor
        </Button>
        <Button 
          variant="destructive" 
          size="lg"
          onClick={() => window.open("tel:988")}
        >
          <Phone className="w-4 h-4 mr-2" />
          Crisis Line (988)
        </Button>
      </div>
    </div>
  );
};

export default SafetyPlan;