import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, Shield, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CrisisSupportProps {
  onBack: () => void;
}

const CrisisSupport = ({ onBack }: CrisisSupportProps) => {
  const [currentLocation, setCurrentLocation] = useState("Unknown");

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7, free and confidential support",
      type: "immediate"
    },
    {
      name: "Crisis Text Line", 
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text",
      type: "immediate"
    },
    {
      name: "National Alliance on Mental Illness",
      number: "1-800-950-NAMI (6264)",
      description: "Information and referral services",
      type: "support"
    },
    {
      name: "Campus Counseling Center",
      number: "(555) 123-4567",
      description: "On-campus mental health services",
      type: "campus"
    }
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", description: "Immediate medical emergency" },
    { name: "Campus Security", number: "(555) 123-SAFE", description: "On-campus emergency" },
    { name: "Local Hospital", number: "(555) 123-HOSP", description: "Regional medical center" }
  ];

  const safetyTips = [
    "Remove or secure any means of self-harm",
    "Stay with trusted friends or family",
    "Avoid alcohol and drugs",
    "Keep emergency numbers easily accessible",
    "Have a list of coping strategies ready"
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <div className="p-6 text-white">
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
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-destructive" />
              <h1 className="text-3xl font-bold">Crisis Support & Safety Resources</h1>
            </div>
          </div>

          <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-white" />
              <span className="font-semibold text-lg">You Are Not Alone</span>
            </div>
            <p className="text-white/90">
              If you're having thoughts of suicide or self-harm, please reach out for help immediately. 
              Your life has value and there are people who want to help.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Immediate Crisis Resources */}
        <Card className="p-6 mb-6 border-2 border-destructive">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-destructive" />
            <h2 className="text-2xl font-semibold text-destructive">Immediate Help - Available Now</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {crisisResources
              .filter(resource => resource.type === "immediate")
              .map((resource, index) => (
                <Card key={index} className="p-4 bg-destructive-soft border border-destructive/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Badge variant="destructive">24/7</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      className="bg-destructive hover:bg-destructive/90 text-white flex-1"
                      onClick={() => window.open(`tel:${resource.number.replace(/\D/g, '')}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {resource.number}
                    </Button>
                    {resource.name.includes("Text") && (
                      <Button variant="outline" size="icon">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-warning" />
              <h2 className="text-xl font-semibold">Emergency Contacts</h2>
            </div>
            
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-warning-soft rounded-lg">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`tel:${contact.number.replace(/\D/g, '')}`)}
                  >
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Resources */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Support Resources</h2>
            </div>
            
            <div className="space-y-3">
              {crisisResources
                .filter(resource => resource.type !== "immediate")
                .map((resource, index) => (
                  <div key={index} className="p-3 bg-primary-soft rounded-lg">
                    <h3 className="font-medium">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(`tel:${resource.number.replace(/\D/g, '')}`)}
                    >
                      {resource.number}
                    </Button>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Safety Tips */}
        <Card className="p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-success" />
            <h2 className="text-xl font-semibold">Immediate Safety Steps</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium">Safety Checklist:</h3>
              {safetyTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-success mt-2" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-success-soft p-4 rounded-lg">
              <h3 className="font-medium mb-2">Remember:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Crisis feelings are temporary</li>
                <li>• Help is available 24/7</li>
                <li>• You deserve support and care</li>
                <li>• Recovery is possible</li>
                <li>• You are valued and loved</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-destructive hover:bg-destructive/90 text-white"
            onClick={() => window.open("tel:988")}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Crisis Lifeline (988)
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-primary hover:bg-primary-soft"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Text Crisis Line
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
          >
            <Clock className="w-5 h-5 mr-2" />
            Schedule Counselor Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;