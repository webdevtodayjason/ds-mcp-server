/**
 * Function to generate and send an OTP for user verification.
 *
 * @param {Object} args - Arguments for generating OTP.
 * @param {string} args.userId - The ID of the user for whom the OTP is being generated.
 * @param {string} args.phoneNumber - The phone number to which the OTP will be sent.
 * @returns {Promise<Object>} - The result of the OTP generation request.
 */
const executeFunction = async ({ userId, phoneNumber }) => {
  const baseUrl = 'https://directstaynow.com';
  const accessToken = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY || ''; // will be provided by the user

  try {
    // Construct the URL for the OTP generation
    const url = `${baseUrl}/api/agent/generate-otp`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      userId,
      phoneNumber
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
    console.error('Error generating OTP:', error);
    return { error: 'An error occurred while generating OTP.' };
  }
};

/**
 * Tool configuration for generating OTP for user verification.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_otp',
      description: 'Generate and send OTP for user verification.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user for whom the OTP is being generated.'
          },
          phoneNumber: {
            type: 'string',
            description: 'The phone number to which the OTP will be sent.'
          }
        },
        required: ['userId', 'phoneNumber']
      }
    }
  }
};

export { apiTool };