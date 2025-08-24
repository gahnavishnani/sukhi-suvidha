import React from "react";
import { translate } from "../utils/translations.js";

const GeneralMedicinesPage = () => {
  const [t, setT] = React.useState(translate("en"));
  
  React.useEffect(() => {
    const lang = localStorage.getItem("preferredLanguage") || "en";
    setT(translate(lang));
  }, []);

  const medicines = [
    {
      name: "Paracetamol",
      purpose: "Fever and Pain Relief",
      dosage: "500mg every 4-6 hours",
      timing: "After meals",
      sideEffects: "Rare when taken as directed"
    },
    {
      name: "Ibuprofen",
      purpose: "Pain, Inflammation, Fever",
      dosage: "200-400mg every 6-8 hours",
      timing: "With food",
      sideEffects: "Stomach upset, heartburn"
    },
    {
      name: "Cetirizine",
      purpose: "Allergy Relief",
      dosage: "10mg once daily",
      timing: "With or without food",
      sideEffects: "Drowsiness (rare)"
    },
    {
      name: "Omeprazole",
      purpose: "Acid Reflux, Heartburn",
      dosage: "20mg once daily",
      timing: "Before meals",
      sideEffects: "Headache, nausea"
    },
    {
      name: "Amoxicillin",
      purpose: "Bacterial Infections",
      dosage: "250-500mg every 8 hours",
      timing: "With or without food",
      sideEffects: "Diarrhea, nausea"
    },
    {
      name: "Atorvastatin",
      purpose: "Cholesterol Management",
      dosage: "10-80mg once daily",
      timing: "At bedtime",
      sideEffects: "Muscle pain, headache"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {t.generalMedicines || "General Medicines"}
          </h1>
          <p className="text-green-600">
            {t.medicineDesc || "Commonly used medicines and their information"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {medicines.map((medicine, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{medicine.name}</h2>
              <p className="text-green-600 font-medium mb-4">{medicine.purpose}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dosage:</span>
                  <span className="font-medium">{medicine.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timing:</span>
                  <span className="font-medium">{medicine.timing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Side Effects:</span>
                  <span className="font-medium text-sm">{medicine.sideEffects}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Disclaimer: Consult a doctor before taking any medication
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-green-700 font-medium hover:text-green-900 transition"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.backToFacilities || "Back to Facilities"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralMedicinesPage;