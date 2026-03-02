const fs = require('fs');
const path = require('path');
const src = 'C:\\Users\\Mauro\\.gemini\\antigravity\\brain\\6a98056d-2de0-4f5e-98e8-893a5e7060a0';
const dest = 'c:\\Users\\Mauro\\Desktop\\ai-bussiness-assistant\\public\\images';

fs.mkdirSync(dest, { recursive: true });

fs.readdirSync(src)
    .filter(f => f.endsWith('.png'))
    .forEach(f => {
        fs.copyFileSync(path.join(src, f), path.join(dest, f));
    });

const heroFile = fs.readdirSync(dest).find(f => f.startsWith('hero_restaurant'));
if (heroFile) {
    fs.renameSync(path.join(dest, heroFile), path.join(dest, 'hero.png'));
}
