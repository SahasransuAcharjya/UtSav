const fs = require('fs');
try {
    const content = fs.readFileSync('backend/.env', 'utf8');
    console.log(content);
} catch (err) {
    console.error(err);
}
