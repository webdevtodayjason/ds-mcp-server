#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn, execSync } from 'child_process';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if node_modules exists
const nodeModulesPath = join(__dirname, '..', 'node_modules');
if (!existsSync(nodeModulesPath)) {
  console.error('Installing dependencies...');
  try {
    execSync('npm install --omit=dev', {
      cwd: join(__dirname, '..'),
      stdio: ['ignore', 'ignore', 'inherit'] // Only show errors
    });
  } catch (error) {
    console.error('Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Get the path to mcpServer.js
const serverPath = join(__dirname, '..', 'mcpServer.js');

// Pass all arguments to mcpServer.js
const child = spawn(process.execPath, [serverPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: process.env
});

// Forward exit codes
child.on('exit', (code) => {
  process.exit(code);
});