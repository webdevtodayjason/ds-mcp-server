/**
 * Function to get all bookings for a specific property.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.property_id - The ID of the property to get bookings for.
 * @returns {Promise<Object>} - The result of the bookings retrieval.
 */
const executeFunction = async ({ property_id }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/api/bookings/property/${property_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error getting property bookings:', error);
    return { error: 'An error occurred while retrieving property bookings.' };
  }
};

/**
 * Tool configuration for getting property bookings.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_property_bookings',
      description: 'Get all bookings for a specific property.',
      parameters: {
        type: 'object',
        properties: {
          property_id: {
            type: 'string',
            description: 'The ID of the property to get bookings for.'
          }
        },
        required: ['property_id']
      }
    }
  }
};

export { apiTool };