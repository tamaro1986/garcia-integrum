const sharp = require('sharp');

async function processImage() {
    try {
        const inputPath = 'public/logo-garcia.png';
        const outputPath = 'public/logo-garcia-icon.png';
        const original = sharp(inputPath);
        const metadata = await original.metadata();

        // The image is 1024x1024. The shield is on the left half. 
        // Let's crop just the left 320 pixels (roughly 30% of width) and the full height, 
        // then trim any remaining transparent/white space.
        await sharp(inputPath)
            .extract({ left: 120, top: 400, width: 220, height: 260 })
            .toFile(outputPath);

        console.log(`Successfully created ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

processImage();
