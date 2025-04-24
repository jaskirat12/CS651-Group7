const vision = require('@google-cloud/vision');
const path = require('path');

const credsPath = path.join(__dirname, 'creds.json');

const client = new vision.ImageAnnotatorClient({
    keyFilename: credsPath
});

// Function to send image to vision and return vision output
async function analyzeImage(imageUrl) {
    try {
        console.log(`Analyzing image: ${imageUrl}`);

        const [labelResponse] = await client.labelDetection(imageUrl);
        const [objectResponse] = await client.objectLocalization(imageUrl);

        const labels = labelResponse.labelAnnotations || [];
        const objects = objectResponse.localizedObjectAnnotations || [];

        const clothingKeywords = [
            'clothing', 'shirt', 'pants', 'dress', 'shoe', 'jacket',
            'hat', 'suit', 'tie', 'fashion', 'outfit', 'apparel'
        ];

        const clothingCategories = [
            'Clothing', 'Top', 'Pants', 'Footwear', 'Dress', 'Skirt',
            'Jacket', 'Suit', 'Hat', 'Tie', 'Shirt', 'Shorts'
        ];

        const clothingLabels = labels.filter(label =>
            clothingKeywords.some(keyword =>
                label.description.toLowerCase().includes(keyword)
            )
        );

        const clothingObjects = objects.filter(object =>
            clothingCategories.includes(object.name)
        );

        return {
            labels: clothingLabels,
            objects: clothingObjects
        };
    } catch (error) {
        console.error('Vision API error:', error);
        throw new Error('Failed to analyze image with Vision API');
    }
}

module.exports = {
    analyzeImage
};
