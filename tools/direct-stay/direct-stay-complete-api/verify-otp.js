/**
 * Function to verify OTP for a user.
 *
 * @param {Object} args - Arguments for the OTP verification.
 * @param {string} args.userId - The ID of the user to verify the OTP for.
 * @param {string} args.otpInput - The OTP input provided by the user.
 * @returns {Promise<Object>} - The result of the OTP verification.
 */
const executeFunction = async ({ userId, otpInput }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for OTP verification
    const url = `${baseUrl}/api/agent/verify-otp`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({
      userId,
      otpInput
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
    console.error('Error verifying OTP:', error);
    return { error: 'An error occurred while verifying OTP.' };
  }
};

/**
 * Tool configuration for verifying OTP for a user.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'verify_otp',
      description: 'Verify OTP for a user and retrieve user data.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user to verify the OTP for.'
          },
          otpInput: {
            type: 'string',
            description: 'The OTP input provided by the user.'
          }
        },
        required: ['userId', 'otpInput']
      }
    }
  }
};

export { apiTool };