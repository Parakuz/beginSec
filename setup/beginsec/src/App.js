import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Create a preview if it's an image
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }

    // Here you would typically upload the file to a server
    // For demonstration, we'll just simulate an upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      console.log('File ready for upload:', file.name);
    }, 1500);
  };

  return (
    <div className="app-container">
      <h1>File Upload Component</h1>
      
      <div className="file-upload">
        <div className="upload-container">
          <div className="upload-icon">
            <img src="/public/file.svg" alt="" />
          </div>
          
          <input
            type="file"
            className="file-input"
            onChange={handleFileUpload}
          />
          
          {selectedFile && (
            <div className="file-info">
              <p>Selected file: {selectedFile.name}</p>
              {isUploading ? (
                <p>Uploading...</p>
              ) : (
                <p>Ready to submit</p>
              )}
            </div>
          )}
          
          {previewUrl && (
            <div className="preview-container">
              <h3>Preview:</h3>
              <img src={previewUrl} alt="Preview" className="file-preview" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;