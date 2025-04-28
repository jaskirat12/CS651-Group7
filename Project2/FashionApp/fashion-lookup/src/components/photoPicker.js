import React, { useState, useEffect } from 'react';

const GooglePhotoPicker = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [tokenClient, setTokenClient] = useState(null);
    const [pickerApiLoaded, setPickerApiLoaded] = useState(false);

    const CLIENT_ID = '797768943876-lu1k5eiei4nvn8ad9kpi9hnqbh4p2uit.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBzJcuogqDi2YLAoy1cHsSJl59qGMSotd8';
    const SCOPES = 'https://www.googleapis.com/auth/photoslibrary.readonly';

    // 1. Load the required scripts
    useEffect(() => {
        const loadScripts = async () => {
            if (!window.google) {
                const gsiScript = document.createElement('script');
                gsiScript.src = 'https://accounts.google.com/gsi/client';
                gsiScript.async = true;
                document.body.appendChild(gsiScript);
            }

            const gapiScript = document.createElement('script');
            gapiScript.src = 'https://apis.google.com/js/api.js';
            gapiScript.onload = () => {
                window.gapi.load('picker', { callback: () => setPickerApiLoaded(true) });
            };
            document.body.appendChild(gapiScript);
        };

        loadScripts();
    }, []);

    // 2. Initialize the OAuth token client
    useEffect(() => {
        if (window.google && window.google.accounts) {
            const client = window.google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (tokenResponse) => {
                    if (tokenResponse.access_token) {
                        window.oauthToken = tokenResponse.access_token;
                        createPicker();
                        console.log("working?")
                    } else {
                        console.error('Failed to get access token', tokenResponse);
                    }
                },
            });
            setTokenClient(client);
        }
    }, [window.google]);

    // 3. Request access token
    const requestAccessToken = () => {
        if (tokenClient) {
            tokenClient.requestAccessToken();
        } else {
            console.error('Token client not initialized');
        }
    };

    // 4. Create and open the Picker
    const createPicker = () => {
        if (pickerApiLoaded && window.oauthToken) {
            const picker = new window.google.picker.PickerBuilder()
                .addView(window.google.picker.ViewId.PHOTOS) // You can also use DOCS_IMAGES
                .setOAuthToken(window.oauthToken)
                .setDeveloperKey(API_KEY)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        }
    };

    // 5. Handle picker callback
    const pickerCallback = (data) => {
        if (data.action === window.google.picker.Action.PICKED) {
            const url = data.docs[0].url;
            setImageUrl(url);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={requestAccessToken}
            >
                Pick from Google Photoss
            </button>

            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Selected" />
                </div>
            )}
        </div>
    );
};

export default GooglePhotoPicker;
