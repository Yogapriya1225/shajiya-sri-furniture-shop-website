import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Extract URLs from imageConstants.ts
const imageConstantsPath = path.join(process.cwd(), 'src', 'data', 'imageConstants.ts');
let content = fs.readFileSync(imageConstantsPath, 'utf-8');

const urlRegex = /"(https:\/\/images\.unsplash\.com\/[^"]+)"/g;
let match;
const urls = new Set();

while ((match = urlRegex.exec(content)) !== null) {
  urls.add(match[1]);
}

console.log(`Found ${urls.size} unique image URLs.`);

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // follow redirect
        https.get(res.headers.location, (res2) => {
          res2.pipe(fs.createWriteStream(filepath))
             .on('error', reject)
             .once('close', () => resolve(filepath));
        }).on('error', reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  let index = 1;
  const urlMap = {};
  
  for (const url of urls) {
    const filename = `img_${index}.jpg`;
    const filepath = path.join(imagesDir, filename);
    const localUrl = `/images/${filename}`;
    
    urlMap[url] = localUrl;

    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${url} -> already exists`);
      index++;
      continue;
    }
    
    console.log(`Downloading ${url} -> ${localUrl}`);
    try {
      await downloadImage(url, filepath);
      urlMap[url] = localUrl;
      index++;
    } catch (err) {
      console.error(`Failed to download ${url}: ${err.message}`);
      // Create a fallback SVG if download fails
      const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#E2C29D"/><text x="400" y="300" font-family="sans-serif" font-size="24" fill="#3D2617" text-anchor="middle" dominant-baseline="middle">Furniture Image ${index}</text></svg>`;
      fs.writeFileSync(path.join(imagesDir, `img_${index}.svg`), fallbackSvg);
      urlMap[url] = `/images/img_${index}.svg`;
      index++;
    }
  }

  // Replace URLs in the file
  for (const [originalUrl, localUrl] of Object.entries(urlMap)) {
    content = content.split(`"${originalUrl}"`).join(`"${localUrl}"`);
  }

  fs.writeFileSync(imageConstantsPath, content);
  console.log('Updated imageConstants.ts with local image paths.');
}

main();
