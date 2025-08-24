// src/components/ChatbotWidget.jsx
import React, { useState } from "react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your healthcare assistant. How can I help you today?", sender: "bot", options: [] }
  ]);
  const [currentStep, setCurrentStep] = useState("main");
  const [conversationData, setConversationData] = useState({});
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const mainOptions = [
    { id: "appointment", text: "Appointment", icon: "📅" },
    { id: "symptoms", text: "Symptoms", icon: "🤒" },
    { id: "medicine", text: "Medicine", icon: "💊" },
    { id: "routine", text: "Routine", icon: "🔄" }
  ];

  const appointmentOptions = [
    { id: "general", text: "General Physician" },
    { id: "specialist", text: "Specialist Doctor" },
    { id: "followup", text: "Follow-up Visit" },
    { id: "emergency", text: "Emergency Care" }
  ];

  const symptomOptions = [
    { id: "fever", text: "Fever" },
    { id: "headache", text: "Headache" },
    { id: "stomach", text: "Stomach Pain" },
    { id: "other", text: "Other Symptoms" }
  ];

  const medicineOptions = [
    { id: "prescription", text: "Prescription Refill" },
    { id: "information", text: "Medicine Information" },
    { id: "side_effects", text: "Side Effects" },
    { id: "interaction", text: "Drug Interactions" }
  ];

  const routineOptions = [
    { id: "exercise", text: "Exercise" },
    { id: "diet", text: "Diet" },
    { id: "sleep", text: "Sleep" },
    { id: "mental_health", text: "Mental Health" }
  ];

  const ageOptions = [
    { id: "child", text: "Child (0-12)" },
    { id: "teen", text: "Teenager (13-19)" },
    { id: "adult", text: "Adult (20-59)" },
    { id: "senior", text: "Senior (60+)" }
  ];

  const weightOptions = [
    { id: "underweight", text: "Underweight" },
    { id: "normal", text: "Normal" },
    { id: "overweight", text: "Overweight" },
    { id: "obese", text: "Obese" }
  ];

  const lifestyleOptions = [
    { id: "student", text: "Student" },
    { id: "working", text: "Working Professional" },
    { id: "homemaker", text: "Homemaker" },
    { id: "retired", text: "Retired" }
  ];

  const handleOptionSelect = (optionId, optionText, step) => {
    // Add user's selection to chat
    setMessages(prev => [...prev, { text: optionText, sender: "user", options: [] }]);
    
    // Update conversation data
    const newData = { ...conversationData, [step]: optionId };
    setConversationData(newData);
    
    // Determine next step based on current step and selection
    let nextStep = "";
    let botResponse = "";
    let nextOptions = [];
    
    switch(step) {
      case "main":
        nextStep = optionId;
        botResponse = `You selected ${optionText}. What would you like to know about ${optionText}?`;
        
        // Set options based on selection
        switch(optionId) {
          case "appointment":
            nextOptions = appointmentOptions;
            break;
          case "symptoms":
            nextOptions = symptomOptions;
            break;
          case "medicine":
            nextOptions = medicineOptions;
            break;
          case "routine":
            nextOptions = routineOptions;
            break;
        }
        break;
        
      case "appointment":
        nextStep = "appointment_details";
        botResponse = `You need an appointment for ${optionText}. When would you like to schedule it?`;
        nextOptions = [
          { id: "asap", text: "As soon as possible" },
          { id: "this_week", text: "This week" },
          { id: "next_week", text: "Next week" },
          { id: "flexible", text: "Flexible timing" }
        ];
        break;
        
      case "symptoms":
        nextStep = "symptom_details";
        botResponse = `You're experiencing ${optionText}. How long have you had these symptoms?`;
        nextOptions = [
          { id: "today", text: "Today only" },
          { id: "few_days", text: "A few days" },
          { id: "week", text: "About a week" },
          { id: "longer", text: "More than a week" }
        ];
        break;
        
      case "medicine":
        nextStep = "medicine_details";
        botResponse = `You need help with ${optionText}. Please provide more details.`;
        nextOptions = [
          { id: "name", text: "Medicine name" },
          { id: "dosage", text: "Dosage information" },
          { id: "duration", text: "How long to take" },
          { id: "concern", text: "Specific concern" }
        ];
        break;
        
      case "routine":
        if (optionId === "exercise") {
          nextStep = "exercise_frequency";
          botResponse = "How often do you exercise?";
          nextOptions = [
            { id: "daily", text: "Daily" },
            { id: "weekly", text: "3-4 times a week" },
            { id: "occasional", text: "Occasionally" },
            { id: "never", text: "Rarely/Never" }
          ];
        } else if (optionId === "diet") {
          nextStep = "diet_type";
          botResponse = "What type of diet do you follow?";
          nextOptions = [
            { id: "vegetarian", text: "Vegetarian" },
            { id: "non_vegetarian", text: "Non-vegetarian" },
            { id: "vegan", text: "Vegan" },
            { id: "other", text: "Other" }
          ];
        } else if (optionId === "sleep") {
          nextStep = "sleep_hours";
          botResponse = "How many hours do you sleep on average?";
          nextOptions = [
            { id: "less5", text: "Less than 5 hours" },
            { id: "5-7", text: "5-7 hours" },
            { id: "7-9", text: "7-9 hours" },
            { id: "more9", text: "More than 9 hours" }
          ];
        } else if (optionId === "mental_health") {
          nextStep = "mental_health_frequency";
          botResponse = "How often do you feel stressed or anxious?";
          nextOptions = [
            { id: "rarely", text: "Rarely" },
            { id: "sometimes", text: "Sometimes" },
            { id: "often", text: "Often" },
            { id: "always", text: "Almost always" }
          ];
        }
        break;
        
      case "routine_age":
        nextStep = "routine_weight";
        botResponse = "Please select your weight category:";
        nextOptions = weightOptions;
        break;
        
      case "routine_weight":
        nextStep = "routine_lifestyle";
        botResponse = "Please select your lifestyle:";
        nextOptions = lifestyleOptions;
        break;
        
      case "routine_lifestyle":
        // End of routine flow
        setShowRating(true);
        botResponse = `Thank you for providing your information. Based on your profile (${conversationData.routine_age}, ${conversationData.routine_weight}, ${optionText}), I can recommend a suitable health routine.`;
        break;
        
      default:
        // For other flows, end with rating
        setShowRating(true);
        botResponse = `Thank you for your response. I have noted your ${step} concern about ${optionText}. A healthcare professional will contact you shortly.`;
    }
    
    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: "bot", 
        options: nextOptions.length > 0 ? nextOptions : [] 
      }]);
      
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }, 500);
  };

  const handleRating = (stars) => {
    setRating(stars);
    setMessages(prev => [...prev, { 
      text: `Thank you for your ${stars}-star rating!`, 
      sender: "bot", 
      options: [] 
    }]);
    
    // Reset after rating
    setTimeout(() => {
      setShowRating(false);
      setCurrentStep("main");
      setConversationData({});
      setMessages([{ text: "Hello! I'm your healthcare assistant. How can I help you today?", sender: "bot", options: mainOptions }]);
    }, 2000);
  };

  const startChat = () => {
    setIsOpen(true);
    setMessages([{ text: "Hello! I'm your healthcare assistant. How can I help you today?", sender: "bot", options: mainOptions }]);
    setCurrentStep("main");
    setConversationData({});
    setShowRating(false);
    setRating(0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Healthcare Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${message.sender === "user" ? "text-right" : ""}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {message.options.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id, option.text, currentStep)}
                        className="bg-blue-100 text-blue-800 text-xs p-2 rounded hover:bg-blue-200 transition"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {showRating && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">How would you rate this conversation?</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={startChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;