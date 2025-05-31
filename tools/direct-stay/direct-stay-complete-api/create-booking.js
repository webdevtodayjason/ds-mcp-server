/**
 * Function to create a new booking on DirectStay.
 *
 * @param {Object} args - Arguments for creating a booking.
 * @param {string} args.propertyId - The ID of the property to book.
 * @param {string} args.checkIn - The check-in date (YYYY-MM-DD).
 * @param {string} args.checkOut - The check-out date (YYYY-MM-DD).
 * @param {number} args.guests - The number of guests.
 * @param {number} args.totalPrice - The total price for the booking.
 * @param {string} [args.notes] - Optional notes for the booking.
 * @returns {Promise<Object>} - The result of the booking creation.
 */
const executeFunction = async ({ propertyId, checkIn, checkOut, guests, totalPrice, notes }) => {
  const baseUrl = 'https://directstaynow.com'; // Base URL for the API
  const accessToken = process.env.DS_TOKEN || process.env.DIRECT_STAY_API_KEY || ''; // will be provided by the user

  try {
    // Construct the booking data
    const bookingData = {
      propertyId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      notes
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
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
    console.error('Error creating booking:', error);
    return { error: 'An error occurred while creating the booking.' };
  }
};

/**
 * Tool configuration for creating a booking on DirectStay.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_booking',
      description: 'Create a new booking on DirectStay.',
      parameters: {
        type: 'object',
        properties: {
          propertyId: {
            type: 'string',
            description: 'The ID of the property to book.'
          },
          checkIn: {
            type: 'string',
            description: 'The check-in date (YYYY-MM-DD).'
          },
          checkOut: {
            type: 'string',
            description: 'The check-out date (YYYY-MM-DD).'
          },
          guests: {
            type: 'integer',
            description: 'The number of guests.'
          },
          totalPrice: {
            type: 'number',
            description: 'The total price for the booking.'
          },
          notes: {
            type: 'string',
            description: 'Optional notes for the booking.'
          }
        },
        required: ['propertyId', 'checkIn', 'checkOut', 'guests', 'totalPrice']
      }
    }
  }
};

export { apiTool };