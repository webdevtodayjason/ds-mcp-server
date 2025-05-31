# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### List available tools
```sh
npm run list-tools
# or
node index.js tools
```

### Run MCP Server (Standard Mode)
```sh
node mcpServer.js
```

### Run MCP Server (SSE Mode)
```sh
node mcpServer.js --sse
```

### Install dependencies
```sh
npm install
```

## Code Architecture

This is a Postman MCP Generator project that creates an MCP-compatible server exposing API tools to MCP clients like Claude Desktop or Postman Desktop Application.

### Key Components

1. **mcpServer.js**: The main MCP server implementation
   - Handles both stdio and SSE transport modes
   - Implements tool listing and execution handlers
   - Loads tools dynamically from the tools directory

2. **Tool Discovery System**: 
   - `lib/tools.js`: Discovers and loads tools from the tools directory
   - `tools/paths.js`: Central registry of all available tool paths
   - Each tool follows a consistent structure with `executeFunction` and `apiTool` exports

3. **Tool Structure**: All tools in `tools/direct-stay/direct-stay-complete-api/` follow this pattern:
   - `executeFunction`: Async function that executes the API call
   - `apiTool`: Configuration object with function reference and MCP-compatible definition
   - Uses `DIRECT_STAY_API_KEY` environment variable for authentication

## Important Considerations

- This is an ES6 module project (`"type": "module"` in package.json)
- Environment variables are loaded from `.env` file using dotenv
- API authentication uses Bearer token from `DIRECT_STAY_API_KEY` environment variable
- All API calls go to `https://directstaynow.com` base URL
- Tools automatically handle errors and return structured responses