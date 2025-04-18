// backend/routes/analysis.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const visionService = require('../services/vision');
const geminiService = require('../services/gemini');
const authenticateUser = require('../middleware/auth');

const db = admin.firestore();

router.post('/', authenticateUser, async (req, res) => {
    try {
        const { imageUrl } = req.body;

        // const { imageUrl } = 'https://www.gentlemansflair.com/content/images/size/w1600/2024/05/GF-507-1.jpg';
        const userId = req.user.uid;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        
        console.log('Calling Vision API', imageUrl);
        const visionResults = await visionService.analyzeImage(imageUrl);
        console.log('Vision API results:', visionResults);
        
        console.log('Calling Gemini API');
        const geminiResults = await geminiService.generateAlternatives(imageUrl, visionResults);

        
        const analysisData = {
            userId,
            imageUrl,
            visionResults,
            detectedItems: geminiResults.detectedItems,
            expensiveOptions: geminiResults.expensiveOptions,
            affordableOptions: geminiResults.affordableOptions,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('analyses').add(analysisData);

        return res.json({
            analysisId: docRef.id,
            imageUrl,
            detectedItems: geminiResults.detectedItems,
            expensiveOptions: geminiResults.expensiveOptions,
            affordableOptions: geminiResults.affordableOptions
        });
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze image' });
    }
});

router.get('/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;

        const docRef = await db.collection('analyses').doc(id).get();

        if (!docRef.exists) {
            return res.status(404).json({ error: 'Analysis not found' });
        }

        const analysis = docRef.data();

        if (analysis.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json({
            analysisId: docRef.id,
            imageUrl: analysis.imageUrl,
            detectedItems: analysis.detectedItems,
            expensiveOptions: analysis.expensiveOptions,
            affordableOptions: analysis.affordableOptions,
            timestamp: analysis.timestamp
        });
    } catch (error) {
        console.error('Get analysis error:', error);
        res.status(500).json({ error: 'Failed to get analysis' });
    }
});

router.get('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.uid;

        const snapshot = await db.collection('analyses')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .limit(10)
            .get();

        const analyses = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                imageUrl: data.imageUrl,
                detectedItems: data.detectedItems,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            };
        });

        res.json({ analyses });
    } catch (error) {
        console.error('Get analyses error:', error);
        res.status(500).json({ error: 'Failed to get analyses' });
    }
});

module.exports = router;