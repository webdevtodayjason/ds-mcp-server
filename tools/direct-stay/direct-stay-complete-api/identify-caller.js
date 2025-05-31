/**
 * Function to identify a caller by phone number using the DirectStay API.
 *
 * @param {Object} args - Arguments for identifying the caller.
 * @param {string} args.phoneNumber - The phone number of the caller to identify.
 * @returns {Promise<Object>} - The result of the caller identification.
 */
const executeFunction = async ({ phoneNumber }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for the API endpoint
    const url = `${baseUrl}/api/agent/identify-caller`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({ phoneNumber });

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
    console.error('Error identifying caller:', error);
    return { error: 'An error occurred while identifying the caller.' };
  }
};

/**
 * Tool configuration for identifying a caller using the DirectStay API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'identify_caller',
      description: 'Identify a caller by phone number.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumber: {
            type: 'string',
            description: 'The phone number of the caller to identify.'
          }
        },
        required: ['phoneNumber']
      }
    }
  }
};

export { apiTool };