/**
 * Function to get property details by ID from the DirectStay API.
 *
 * @param {Object} args - Arguments for the property retrieval.
 * @param {string} args.property_id - The ID of the property to retrieve.
 * @returns {Promise<Object>} - The details of the property.
 */
const executeFunction = async ({ property_id }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for the property retrieval
    const url = `${baseUrl}/api/properties/${property_id}`;

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
    console.error('Error fetching property details:', error);
    return { error: 'An error occurred while fetching property details.' };
  }
};

/**
 * Tool configuration for getting property details by ID from the DirectStay API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_property_by_id',
      description: 'Get property details by ID from the DirectStay API.',
      parameters: {
        type: 'object',
        properties: {
          property_id: {
            type: 'string',
            description: 'The ID of the property to retrieve.'
          }
        },
        required: ['property_id']
      }
    }
  }
};

export { apiTool };