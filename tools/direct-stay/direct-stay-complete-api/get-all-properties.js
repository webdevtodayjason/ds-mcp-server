/**
 * Function to get a paginated list of properties from DirectStay.
 *
 * @param {Object} args - Arguments for the property retrieval.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.limit=10] - The number of properties to return per page.
 * @returns {Promise<Object>} - The result of the properties retrieval.
 */
const executeFunction = async ({ page = 1, limit = 10 }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/api/properties`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving properties:', error);
    return { error: 'An error occurred while retrieving properties.' };
  }
};

/**
 * Tool configuration for getting all properties from DirectStay.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_properties',
      description: 'Get a paginated list of properties from DirectStay.',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'The page number to retrieve.'
          },
          limit: {
            type: 'integer',
            description: 'The number of properties to return per page.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };