const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  setFormResponse(null);

  console.log('Submitting enquiry form with data:', { 
    ...data, 
    message: data.message.substring(0, 30) + '...',
    enquiryType,
    flightDetails: flightDetails ? '...' : null,
    holidayDetails: holidayDetails ? '...' : null,
    packageDetails: packageDetails ? '...' : null
  });

  // Try up to 3 times to submit the form
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt}/3 to submit enquiry form`);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          // Include the details based on enquiry type
          enquiryType,
          flightDetails: enquiryType === 'flight' ? flightDetails : null,
          holidayDetails: enquiryType === 'holiday' ? holidayDetails : null,
          packageDetails: enquiryType === 'package' ? packageDetails : null
        }),
      });

      const result = await response.json();
      console.log('Form submission response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit the form');
      }

      // Form submitted successfully
      setFormResponse({
        status: 'success',
        message: result.message || 'Thank you for your enquiry. We will be in touch shortly!',
      });

      // Reset the form
      reset();
      
      // Exit the retry loop on success
      break;
    } catch (error) {
      console.error(`Error submitting form (attempt ${attempt}/3):`, error);
      
      // Only set error response on final attempt
      if (attempt === 3) {
        setFormResponse({
          status: 'error',
          message: error instanceof Error 
            ? error.message 
            : 'Our system is currently experiencing difficulties. Please try again later or contact us by phone.'
        });
      } else {
        // Small delay before retrying
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  setIsSubmitting(false);
}; 