import React, { useState } from "react";
import { translate } from "../utils/translations.js";

const DoctorsConsultationPage = () => {
  const [t, setT] = React.useState(translate("en"));
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [appointmentType, setAppointmentType] = useState("offline");
  
  React.useEffect(() => {
    const lang = localStorage.getItem("preferredLanguage") || "en";
    setT(translate(lang));
  }, []);

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      specialty: "Cardiologist",
      hospital: "Apollo Hospital, Delhi",
      experience: "15 years",
      rating: 4.8,
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      timings: {
        offline: "Mon-Fri: 10AM-4PM",
        virtual: "Tue-Thu: 6PM-9PM"
      },
      fee: {
        offline: "₹1000",
        virtual: "₹800"
      }
    },
    {
      id: 2,
      name: "Dr. Priya Singh",
      specialty: "Pediatrician",
      hospital: "AIIMS Hospital, Delhi",
      experience: "12 years",
      rating: 4.7,
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      timings: {
        offline: "Mon-Sat: 9AM-3PM",
        virtual: "Mon-Wed-Fri: 5PM-8PM"
      },
      fee: {
        offline: "₹900",
        virtual: "₹700"
      }
    },
    {
      id: 3,
      name: "Dr. Amit Kumar",
      specialty: "Orthopedic Surgeon",
      hospital: "Max Hospital, Delhi",
      experience: "18 years",
      rating: 4.9,
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
      timings: {
        offline: "Tue-Sat: 11AM-5PM",
        virtual: "Mon-Wed: 7PM-10PM"
      },
      fee: {
        offline: "₹1200",
        virtual: "₹1000"
      }
    }
  ];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const confirmAppointment = () => {
    alert(`Appointment booked with ${selectedDoctor.name} for ${appointmentType} consultation`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {t.doctorsConsultation || "Doctors Consultation"}
          </h1>
          <p className="text-purple-600">
            {t.doctorDesc || "Book appointments with experienced doctors"}
          </p>
        </div>

        <div className="space-y-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
                  />
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-purple-600 font-medium">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.hospital}</p>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{doctor.rating}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{doctor.experience} experience</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Offline Consultation</p>
                      <p className="text-gray-600">{doctor.timings.offline}</p>
                      <p className="text-green-600 font-medium">Fee: {doctor.fee.offline}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Virtual Consultation</p>
                      <p className="text-gray-600">{doctor.timings.virtual}</p>
                      <p className="text-green-600 font-medium">Fee: {doctor.fee.virtual}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Modal */}
        {showModal && selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Book Appointment with {selectedDoctor.name}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="appointmentType"
                      value="offline"
                      checked={appointmentType === "offline"}
                      onChange={() => setAppointmentType("offline")}
                      className="mr-2"
                    />
                    Offline (₹{selectedDoctor.fee.offline})
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="appointmentType"
                      value="virtual"
                      checked={appointmentType === "virtual"}
                      onChange={() => setAppointmentType("virtual")}
                      className="mr-2"
                    />
                    Virtual (₹{selectedDoctor.fee.virtual})
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Timing
                </label>
                <p className="text-gray-800">
                  {appointmentType === "offline" 
                    ? selectedDoctor.timings.offline 
                    : selectedDoctor.timings.virtual}
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAppointment}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition"
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

export default DoctorsConsultationPage;