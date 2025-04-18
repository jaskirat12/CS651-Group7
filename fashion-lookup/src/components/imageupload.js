
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './imageupload.css';

function ImageUpload({ onImageAnalyzed }) {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useAuth();

    function handleFileChange(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function handleUpload() {
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = await currentUser.getIdToken();

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            
            const { imageUrl } = response.data;
            // const { imageUrl } = 'https://www.gentlemansflair.com/content/images/size/w1600/2024/05/GF-507-1.jpg';

            
            const analysisResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/analysis`,
                { imageUrl },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            
            onImageAnalyzed({
                imageUrl,
                ...analysisResponse.data
            });
        } catch (error) {
            console.error('Upload/analysis error:', error);
            setError('Failed to upload or analyze image');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="upload-container">
            <h2>Upload an Outfit</h2>

            <div className="upload-area">
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <label htmlFor="file-input" className="file-input-label">
                    Select Image
                </label>

                {imageUrl && (
                    <div className="image-preview">
                        <img src={imageUrl} alt="Selected" />
                    </div>
                )}

                {file && (
                    <button
                        className="analyze-button"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Processing...' : 'Analyze Outfit'}
                    </button>
                )}

                {error && <p className="upload-error">{error}</p>}
            </div>
        </div>
    );
}

export default ImageUpload;