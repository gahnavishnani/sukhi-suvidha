import React, { useEffect, useState, useRef } from "react";
import { translate } from "../utils/translations.js";
import UploadPanel from "../components/UploadPanel.jsx";
import EmergencyPanel from "../components/EmergencyPanel.jsx";
import ChatbotWidget from "../components/ChatbotWidget.jsx";
import { useNavigate } from "react-router-dom";

const FacilitiesPage = () => {
  const [t, setT] = useState(translate("en"));
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const lang = localStorage.getItem("preferredLanguage") || "en";
    setT(translate(lang));
    
    // Get username from localStorage (set in WelcomePage)
    const name = localStorage.getItem("userName") || "User";
    setUserName(name);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user initial from name
  const getUserInitial = () => {
    return userName.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    // Only remove authentication flag, keep user data for future logins
    localStorage.removeItem("isAuthenticated");
    
    // Show confirmation message
    alert("Logged out successfully! You can login again with the same credentials.");
    
    // Navigate to home page
    navigate("/");
  };

  const handleProfileAction = (action) => {
    setIsProfileOpen(false);
    switch(action) {
      case "profile":
        navigate("/profile");
        break;
      case "history":
        navigate("/history");
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  // Card data with navigation paths
  const facilityCards = [
    {
      id: 1,
      title: t.hospital,
      description: t.hospitalDesc,
      icon: "🏥",
      path: "/nearby-hospitals",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: t.generalMedicines || "General Medicines",
      description: t.medicineDesc || "Commonly used medicines and their purposes",
      icon: "💊",
      path: "/general-medicines",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: t.doctor,
      description: t.doctorDesc,
      icon: "👨‍⚕️",
      path: "/doctors-consultation",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: t.healthyDiet || "Healthy Diet",
      description: t.dietDesc || "Nutrition plans for different age groups",
      icon: "🥗",
      path: "/healthy-diet",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex flex-col items-center p-6 relative">
      {/* Profile Icon with Username */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <span className="text-green-800 font-medium hidden md:block">
          Hello, {userName}
        </span>
        <div ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            {getUserInitial()}
          </button>
          
          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">
                  {localStorage.getItem("userPhone") || ""}
                </p>
              </div>
              <button
                onClick={() => handleProfileAction("profile")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
              >
                👤 Profile
              </button>
              <button
                onClick={() => handleProfileAction("history")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-100"
              >
                📋 History
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={() => handleProfileAction("logout")}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-900 mb-6 mt-4">{t.heading}</h1>

      {/* Four Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-8">
        {facilityCards.map((card) => (
          <div
            key={card.id}
            className={`p-6 bg-gradient-to-r ${card.color} text-white rounded-2xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl`}
            onClick={() => navigate(card.path)}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">{card.icon}</span>
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
            <p className="text-white text-opacity-90">{card.description}</p>
            <div className="mt-4 flex items-center text-white text-opacity-80">
              <span>Click to explore</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Existing Upload and Emergency Panels */}
      <UploadPanel t={t} />
      <EmergencyPanel t={t} />
      <ChatbotWidget t={t} />
    </div>
  );
};

export default FacilitiesPage;