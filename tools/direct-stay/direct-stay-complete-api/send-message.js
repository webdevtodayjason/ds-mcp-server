/**
 * Function to send a message to a channel in DirectStay.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.channelId - The ID of the channel to send the message to.
 * @param {string} args.message - The message content to send.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ channelId, message }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for the message sending endpoint
    const url = `${baseUrl}/api/messages/send`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      channelId,
      message
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending messages in DirectStay.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_message',
      description: 'Send a message to a channel in DirectStay.',
      parameters: {
        type: 'object',
        properties: {
          channelId: {
            type: 'string',
            description: 'The ID of the channel to send the message to.'
          },
          message: {
            type: 'string',
            description: 'The message content to send.'
          }
        },
        required: ['channelId', 'message']
      }
    }
  }
};

export { apiTool };