#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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