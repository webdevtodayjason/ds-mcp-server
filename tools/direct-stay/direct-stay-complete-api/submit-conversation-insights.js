/**
 * Function to submit conversation insights to the DirectStay API.
 *
 * @param {Object} args - Arguments for submitting insights.
 * @param {string} args.userId - The ID of the user.
 * @param {string} args.conversationId - The ID of the conversation.
 * @param {string} args.phoneNumber - The phone number of the user.
 * @param {number} args.duration - The duration of the conversation in seconds.
 * @param {Object} args.insights - The insights from the conversation.
 * @param {Object} args.insights.preferences - User preferences.
 * @param {string} args.insights.preferences.propertyType - Preferred property type.
 * @param {Array<string>} args.insights.preferences.amenities - List of preferred amenities.
 * @param {Array<string>} args.insights.concerns - List of user concerns.
 * @param {string} args.insights.sentiment - Sentiment of the conversation.
 * @param {string} args.insights.intentToPurchase - User's intent to purchase.
 * @param {boolean} args.insights.followUpRequired - Whether follow-up is required.
 * @returns {Promise<Object>} - The result of the submission.
 */
const executeFunction = async ({ userId, conversationId, phoneNumber, duration, insights }) => {
  const baseUrl = 'https://directstaynow.com';
  const token = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/api/agent/insights/conversation`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      userId,
      conversationId,
      phoneNumber,
      duration,
      insights
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
    console.error('Error submitting conversation insights:', error);
    return { error: 'An error occurred while submitting conversation insights.' };
  }
};

/**
 * Tool configuration for submitting conversation insights to the DirectStay API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'submit_conversation_insights',
      description: 'Submit insights from AI phone conversation.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user.'
          },
          conversationId: {
            type: 'string',
            description: 'The ID of the conversation.'
          },
          phoneNumber: {
            type: 'string',
            description: 'The phone number of the user.'
          },
          duration: {
            type: 'integer',
            description: 'The duration of the conversation in seconds.'
          },
          insights: {
            type: 'object',
            properties: {
              preferences: {
                type: 'object',
                properties: {
                  propertyType: {
                    type: 'string',
                    description: 'Preferred property type.'
                  },
                  amenities: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    description: 'List of preferred amenities.'
                  }
                }
              },
              concerns: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'List of user concerns.'
              },
              sentiment: {
                type: 'string',
                description: 'Sentiment of the conversation.'
              },
              intentToPurchase: {
                type: 'string',
                description: 'User\'s intent to purchase.'
              },
              followUpRequired: {
                type: 'boolean',
                description: 'Whether follow-up is required.'
              }
            },
            required: ['preferences', 'concerns', 'sentiment', 'intentToPurchase', 'followUpRequired']
          }
        },
        required: ['userId', 'conversationId', 'phoneNumber', 'duration', 'insights']
      }
    }
  }
};

export { apiTool };