
import React from 'react';
import './results.css';

function Results({ results }) {
    if (!results) {
        return <div className="no-results">No analysis results to display</div>;
    }

    const { imageUrl, detectedItems, expensiveOptions, affordableOptions } = results;

    return (
        <div className="results-container">
            <div className="original-outfit">
                <h2>Your Outfit</h2>
                <img src={imageUrl} alt="Original outfit" className="outfit-image" />

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

            <div className="alternatives">
                <div className="premium-options">
                    <h3>Premium Options</h3>
                    <div className="options-grid">
                        {expensiveOptions.map((item, index) => (
                            <div key={index} className="product-card">
                                <img
                                    src={item.imageUrl || './placeholder.jpg'}
                                    alt={item.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h4>{item.name}</h4>
                                    <p className="product-brand">{item.brand}</p>
                                    <p className="product-price premium">${item.price}</p>
                                    <a
                                        href={item.productUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="product-link"
                                    >
                                        View Product
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="affordable-options">
                    <h3>Affordable Options</h3>
                    <div className="options-grid">
                        {affordableOptions.map((item, index) => (
                            <div key={index} className="product-card">
                                <img
                                    src={item.imageUrl || './placeholder.jpg'}
                                    alt={item.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h4>{item.name}</h4>
                                    <p className="product-brand">{item.brand}</p>
                                    <p className="product-price affordable">${item.price}</p>
                                    <a
                                        href={item.productUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="product-link"
                                    >
                                        View Product
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;