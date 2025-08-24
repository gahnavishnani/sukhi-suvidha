// src/components/Emergency.jsx
import React from "react";

const Emergency = () => {
  const emergencyContacts = [
    { name: "Police", number: "100", icon: "👮", color: "bg-blue-100" },
    { name: "Ambulance", number: "102", icon: "🚑", color: "bg-red-100" },
    { name: "Fire Brigade", number: "101", icon: "🚒", color: "bg-orange-100" },
    { name: "Disaster Management", number: "108", icon: "🌪️", color: "bg-purple-100" },
    { name: "Women Helpline", number: "1091", icon: "👩", color: "bg-pink-100" },
    { name: "Child Helpline", number: "1098", icon: "🧒", color: "bg-green-100" },
    { name: "Emergency Disaster", number: "1077", icon: "⚠️", color: "bg-yellow-100" },
    { name: "Senior Citizen", number: "1090", icon: "👵", color: "bg-indigo-100" },
  ];

  const handleCall = (number) => {
    if (window.confirm(`Call ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Emergency Contacts
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 ${contact.color} rounded-lg hover:shadow-md transition cursor-pointer`}
            onClick={() => handleCall(contact.number)}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{contact.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-gray-600 text-sm">{contact.number}</p>
              </div>
            </div>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">
              Call
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Important Note:</h3>
        <p className="text-yellow-700 text-sm">
          In case of emergency, please call the appropriate number immediately. 
          These are toll-free numbers available across India.
        </p>
      </div>
    </div>
  );
};

export default Emergency;