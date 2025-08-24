import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { translate } from "../utils/translations.js";
import { saveUserData } from "../utils/authHelper";

const SignupPage = () => {
  const [t, setT] = useState(translate("en"));
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const lang = localStorage.getItem("preferredLanguage") || "en";
    setT(translate(lang));
    
    // Pre-fill phone number from welcome page
    const welcomePhone = localStorage.getItem("welcomePhone");
    if (welcomePhone) {
      setPhoneNumber(welcomePhone);
    }
    
    // Update debug info
    updateDebugInfo();
  }, []);

  const updateDebugInfo = () => {
    const debugData = {
      welcomePhone: localStorage.getItem("welcomePhone"),
      userPhone: localStorage.getItem("userPhone"),
      userPassword: localStorage.getItem("userPassword"),
      userData: localStorage.getItem("userData"),
      isAuthenticated: localStorage.getItem("isAuthenticated")
    };
    setDebugInfo(JSON.stringify(debugData, null, 2));
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    
    // Validate phone number
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      setError(t.phoneInvalid || "Please enter a valid phone number");
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } catch (err) {
      setError(t.otpSendError || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    
    // Validate OTP
    if (!otp || otp.length !== 6) {
      setError(t.otpInvalid || "Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    } catch (err) {
      setError(t.otpVerifyError || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    setLoading(true);
    setError("");
    
    // Validate passwords
    if (!password || password.length < 6) {
      setError(t.passwordShort || "Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t.passwordMismatch || "Passwords do not match");
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API call to create account
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get user data from welcome page or use defaults
      const userName = localStorage.getItem("userName") || "User";
      const userLocation = localStorage.getItem("userLocation") || "";
      
      // Normalize phone number (remove any non-digit characters)
      const normalizedPhone = phoneNumber.replace(/\D/g, '');
      
      // Create user data object
      const userData = {
        phone: normalizedPhone,
        password: password,
        name: userName,
        location: userLocation
      };
      
      // Save user data
      if (saveUserData(userData)) {
        // Clean up welcome page data
        localStorage.removeItem("welcomePhone");
        
        // Update debug info
        updateDebugInfo();
        
        // Redirect to login page with success message
        navigate("/login", { 
          state: { message: "Account created successfully! Please login." } 
        });
      } else {
        setError("Failed to save account data. Please try again.");
      }
    } catch (err) {
      setError(t.accountCreateError || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">
            {step === 1 ? t.signup : step === 2 ? t.verifyOtp : t.createPassword}
          </h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? t.signupDesc || "Create your account" : 
             step === 2 ? t.verifyOtpDesc || "Enter the OTP sent to your phone" : 
             t.createPasswordDesc || "Create a secure password"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.phoneNumber || "Phone Number"}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.phonePlaceholder || "Enter your phone number"}
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? t.sendingOtp || "Sending OTP..." : t.sendOtp || "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.enterOtp || "Enter OTP"}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.otpPlaceholder || "Enter 6-digit OTP"}
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? t.verifyingOtp || "Verifying..." : t.verifyOtp || "Verify OTP"}
              </button>
              
              <div className="text-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-blue-600 text-sm hover:underline"
                  disabled={loading}
                >
                  {t.changeNumber || "Change phone number"}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.password || "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.passwordPlaceholder || "Create a password"}
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.confirmPassword || "Confirm Password"}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t.confirmPasswordPlaceholder || "Confirm your password"}
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleCreateAccount}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? t.creatingAccount || "Creating account..." : t.createAccount || "Create Account"}
              </button>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t.alreadyHaveAccount || "Already have an account?"}{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              {t.login || "Login"}
            </Link>
          </p>
        </div>
        
        {/* Debug information - remove in production */}
        <details className="mt-6 text-xs">
          <summary className="cursor-pointer text-gray-500">Debug Info</summary>
          <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto">
            {debugInfo}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default SignupPage;