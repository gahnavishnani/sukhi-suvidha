// src/components/UploadPanel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const UploadPanel = ({ t }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { languageCode } = useLanguage();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert(t?.noFile || 'Please select a file first!');
      return;
    }

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('uploadFile', selectedFile);
    formData.append('language_code', languageCode);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/simplified-output', { 
          state: { 
            simplifiedText: data.text, 
            audioUrl: `http://localhost:8000${data.audio_url}` 
          } 
        });
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.detail}`);
      }
    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">{t?.uploadPrescription || 'Upload Prescription'}</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={isUploading || !selectedFile}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isUploading ? (t?.uploading || 'Uploading...') : (t?.uploadSimplify || 'Upload & Simplify')}
      </button>
    </div>
  );
};

export default UploadPanel;