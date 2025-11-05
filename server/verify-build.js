#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('=== Nutrify Build Verification ===\n');

// Check if we're in the server directory
const currentDir = process.cwd();
console.log('Current directory:', currentDir);

// Check for client directory
const clientPath = path.join(currentDir, '../client');
const clientExists = fs.existsSync(clientPath);
console.log('Client directory exists:', clientExists);

if (clientExists) {
    // Check for client package.json
    const clientPackageJson = path.join(clientPath, 'package.json');
    console.log('Client package.json exists:', fs.existsSync(clientPackageJson));
    
    // Check for dist folder
    const distPath = path.join(clientPath, 'dist');
    const distExists = fs.existsSync(distPath);
    console.log('Client dist folder exists:', distExists);
    
    if (distExists) {
        const indexHtml = path.join(distPath, 'index.html');
        console.log('index.html exists:', fs.existsSync(indexHtml));
        
        // List dist contents
        console.log('\nDist folder contents:');
        const files = fs.readdirSync(distPath);
        files.forEach(file => console.log('  -', file));
    } else {
        console.log('\n⚠️  Dist folder not found. Run: cd ../client && npm run build');
    }
} else {
    console.log('\n❌ Client directory not found at:', clientPath);
}

console.log('\n=== End Verification ===');
