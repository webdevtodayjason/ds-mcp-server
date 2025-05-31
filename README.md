# DirectStay MCP Server

An MCP (Model Context Protocol) server that provides tools for interacting with the DirectStay API.

## Installation

You can run this MCP server using `npx` without installing it locally:

```bash
npx @webdevtoday/ds-mcp-server
```

## Configuration

### Claude Desktop

Add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "directstay": {
      "command": "npx",
      "args": ["-y", "@webdevtoday/ds-mcp-server"],
      "env": {
        "DS_TOKEN": "your_directstay_api_token_here"
      }
    }
  }
}
```

To find your Claude Desktop configuration:
1. Open Claude Desktop
2. Go to Settings → Developer → Edit Config

## Available Tools

This MCP server provides the following tools for interacting with the DirectStay API:

- **get_all_properties** - Get a list of all properties
- **get_property_by_id** - Get details of a specific property
- **get_property_bookings** - Get all bookings for a specific property
- **create_booking** - Create a new booking
- **update_booking_status** - Update the status of an existing booking
- **identify_caller** - Identify a caller based on phone number
- **generate_otp** - Generate a one-time password
- **verify_otp** - Verify a one-time password
- **send_message** - Send a message to a user
- **create_comparison** - Create a property comparison
- **submit_conversation_insights** - Submit conversation insights

To see detailed information about all available tools and their parameters:

```bash
npx @webdevtoday/ds-mcp-server tools
```

## Getting Your DirectStay API Token

To use this MCP server, you'll need a DirectStay API token. Contact DirectStay to obtain your API credentials.

## Development

### Prerequisites

- Node.js (v16+ required, v20+ recommended)
- npm

### Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your API token:
   ```
   DS_TOKEN=your_directstay_api_token_here
   ```
4. Run the server:
   ```bash
   node mcpServer.js
   ```

### Running with SSE (Server-Sent Events)

```bash
node mcpServer.js --sse
```

### Docker Support

Build and run with Docker:

```bash
docker build -t ds-mcp-server .
docker run -i --rm -e DS_TOKEN=your_token_here ds-mcp-server
```

## License

MIT

## Support

For issues or questions about this MCP server, please open an issue on GitHub.

For DirectStay API support, contact DirectStay directly.