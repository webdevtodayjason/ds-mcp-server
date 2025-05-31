/**
 * Function to update the status of a booking in the DirectStay API.
 *
 * @param {Object} args - Arguments for the booking status update.
 * @param {string} args.booking_id - The ID of the booking to update.
 * @param {string} args.status - The new status for the booking (e.g., "confirmed").
 * @returns {Promise<Object>} - The result of the booking status update.
 */
const executeFunction = async ({ booking_id, status }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;

  try {
    // Construct the URL for the booking status update
    const url = `${baseUrl}/api/bookings/${booking_id}/status`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({ status });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating booking status:', error);
    return { error: 'An error occurred while updating the booking status.' };
  }
};

/**
 * Tool configuration for updating booking status in the DirectStay API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_booking_status',
      description: 'Update the status of a booking in the DirectStay API.',
      parameters: {
        type: 'object',
        properties: {
          booking_id: {
            type: 'string',
            description: 'The ID of the booking to update.'
          },
          status: {
            type: 'string',
            description: 'The new status for the booking (e.g., "confirmed").'
          }
        },
        required: ['booking_id', 'status']
      }
    }
  }
};

export { apiTool };