/**
 * Function to create a property comparison for the AI agent.
 *
 * @param {Object} args - Arguments for the comparison.
 * @param {string} args.userId - The ID of the user creating the comparison.
 * @param {string} args.title - The title of the comparison.
 * @param {Array<string>} args.propertyIds - An array of property IDs to compare.
 * @param {Array<string>} args.attributes - An array of attributes to compare.
 * @param {Object} args.preferences - User preferences for the comparison.
 * @param {Array<string>} args.preferences.mustHave - An array of must-have features.
 * @param {Object} args.preferences.budgetRange - The budget range for the comparison.
 * @param {number} args.preferences.budgetRange.min - The minimum budget.
 * @param {number} args.preferences.budgetRange.max - The maximum budget.
 * @returns {Promise<Object>} - The result of the comparison creation.
 */
const executeFunction = async ({ userId, title, propertyIds, attributes, preferences }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      userId,
      title,
      propertyIds,
      attributes,
      preferences
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/api/agent/comparisons`, {
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
    console.error('Error creating comparison:', error);
    return { error: 'An error occurred while creating the comparison.' };
  }
};

/**
 * Tool configuration for creating property comparisons for the AI agent.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_comparison',
      description: 'Create a property comparison for the AI agent.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user creating the comparison.'
          },
          title: {
            type: 'string',
            description: 'The title of the comparison.'
          },
          propertyIds: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of property IDs to compare.'
          },
          attributes: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of attributes to compare.'
          },
          preferences: {
            type: 'object',
            properties: {
              mustHave: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'An array of must-have features.'
              },
              budgetRange: {
                type: 'object',
                properties: {
                  min: {
                    type: 'number',
                    description: 'The minimum budget.'
                  },
                  max: {
                    type: 'number',
                    description: 'The maximum budget.'
                  }
                },
                description: 'The budget range for the comparison.'
              }
            },
            description: 'User preferences for the comparison.'
          }
        },
        required: ['userId', 'title', 'propertyIds', 'attributes', 'preferences']
      }
    }
  }
};

export { apiTool };