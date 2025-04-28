import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './results.css';

function ResultsPage() {
  const { analysisId } = useParams();
  const { currentUser } = useAuth();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('premium');

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        setLoading(true);
        const token = await currentUser.getIdToken();
        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/analysis/${analysisId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        setResults(response.data);
      } catch (error) {
        console.error('Analysis fetch error:', error);
        setError('Failed to load analysis results');
      } finally {
        setLoading(false);
      }
    }
    
    if (analysisId) {
      fetchAnalysis();
    }
  }, [analysisId, currentUser]);
  
  if (loading) {
    return <div className="results-loading">Loading results...</div>;
  }
  
  if (error) {
    return <div className="results-error">{error}</div>;
  }
  
  if (!results) {
    return <div className="no-results">Analysis not found</div>;
  }
  
  const { imageUrl, detectedItems, expensiveOptions, affordableOptions } = results;
  const options = activeTab === 'premium' ? expensiveOptions : affordableOptions;
  
  return (
    <div className="results-page">
      <div className="results-header">
        <h1>FashionThief Results</h1>
        <Link to="/" className="back-button">Back to Feed</Link>
      </div>
      
      <div className="results-container">
        <div className="original-outfit-section">
          <div className="outfit-card">
            <div className="outfit-header">Original Outfit</div>
            <div className="outfit-image-container">
              <img src={imageUrl} alt="Original outfit" className="outfit-image" />
            </div>
            
            <div className="detected-items">
              <h3>Detected Items</h3>
              <ul>
                {detectedItems.map((item, index) => (
                  <li key={index} className="detected-item">
                    <span className="item-type">{item.type}:</span> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="alternatives-section">
          <div className="alternatives-tabs">
            <button 
              className={`tab-button ${activeTab === 'premium' ? 'active' : ''}`}
              onClick={() => setActiveTab('premium')}
            >
              Premium Options
            </button>
            <button 
              className={`tab-button ${activeTab === 'affordable' ? 'active' : ''}`}
              onClick={() => setActiveTab('affordable')}
            >
              Affordable Options
            </button>
          </div>
          
          <div className="alternatives-grid">
            {options.map((item, index) => (
              <div key={index} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/300x400?text=Fashion+Item'} 
                    alt={item.name} 
                    className="product-image" 
                  />
                </div>
                <div className="product-details">
                  <h4 className="product-name">{item.name}</h4>
                  <p className="product-brand">{item.brand}</p>
                  <p className={`product-price ${activeTab === 'premium' ? 'premium' : 'affordable'}`}>
                    ${item.price}
                  </p>
                  <a 
                    href={item.productUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="product-button"
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="sharing-options">
            <h3>Share your fashion find</h3>
            <div className="share-buttons">
              <button className="share-button">
                <span className="share-icon" role="img" aria-label="smartphone">📱</span> Share to Instagram
              </button>
              <button className="share-button">
                <span className="share-icon" role="img" aria-label="bird">🐦</span> Share to Twitter
              </button>
              <button className="share-button">
                <span className="share-icon" role="img" aria-label="pin">📌</span> Save to Pinterest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;