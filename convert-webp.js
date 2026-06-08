const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'gallery');

async function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDir(fullPath);
    } else {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const outPath = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        try {
          await sharp(fullPath).webp({ quality: 80 }).toFile(outPath);
          console.log(`Converted: ${file}`);
          fs.unlinkSync(fullPath);
        } catch (err) {
          console.error(`Error converting ${file}:`, err);
        }
      }
    }
  }
}

processDir(baseDir).then(() => console.log('Done converting images.'));
