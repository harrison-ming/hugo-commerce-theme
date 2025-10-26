/**
 * Checkout Page - Stripe Payment Element Integration
 * Supports multiple pricing plans via Radio buttons
 */

(async function() {
  // Get configuration from window
  const config = window.checkoutConfig;
  if (!config) {
    console.error('Checkout configuration not found');
    return;
  }

  // Initialize Stripe
  const stripe = Stripe(config.publishableKey);

  let elements;
  let paymentElement;
  let addressElement;
  let currentPlan = 'family'; // Default to family plan

  // Get selected plan from radio buttons
  function getSelectedPlan() {
    const selectedRadio = document.querySelector('input[name="plan"]:checked');
    return selectedRadio ? selectedRadio.value : 'family';
  }

  // Update summary when plan changes
  function updateSummary() {
    currentPlan = getSelectedPlan();
    const planConfig = config.plans[currentPlan];

    if (!planConfig) {
      console.error('Invalid plan selected:', currentPlan);
      return;
    }

    // Update summary
    const summaryPlanName = document.getElementById('summary-plan-name');
    const summaryPlanPrice = document.getElementById('summary-plan-price');
    const summaryTotalPrice = document.getElementById('summary-total-price');
    const buttonText = document.getElementById('button-text');

    if (summaryPlanName) summaryPlanName.textContent = `${planConfig.quantity}x Celestial Decree${planConfig.quantity > 1 ? 's' : ''}`;
    if (summaryPlanPrice) summaryPlanPrice.textContent = `$${planConfig.price}`;
    if (summaryTotalPrice) summaryTotalPrice.textContent = `$${planConfig.price} USD`;
    if (buttonText) buttonText.textContent = `Complete Order - $${planConfig.price}`;

    // Reinitialize payment with new amount
    if (elements) {
      initialize();
    }
  }

  // Listen to radio button changes
  const radios = document.querySelectorAll('input[name="plan"]');
  console.log('Found radio buttons:', radios.length);

  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      console.log('Radio changed to:', this.value);
      updateSummary();
    });
  });

  // Initialize summary on page load
  console.log('Initializing summary with plan:', currentPlan);
  updateSummary();

  // Initialize the payment flow
  initialize();

  /**
   * Initialize checkout session and create payment element
   */
  async function initialize() {
    const planConfig = config.plans[currentPlan];

    try {
      // Call Worker API to create Checkout Session
      const response = await fetch(config.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: planConfig.price_id, // Use price_id instead of amount
          quantity: planConfig.quantity,
          currency: config.currency,
          metadata: {
            product_name: config.productName,
            plan: currentPlan,
            quantity: planConfig.quantity,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to initialize payment');
      }

      const { clientSecret } = await response.json();

      // Create Stripe Elements
      const appearance = {
        theme: 'stripe',
        variables: {
          colorPrimary: '#3FA026',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#dc2626',
          fontFamily: 'system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '6px',
        },
      };

      elements = stripe.elements({
        clientSecret,
        appearance
      });

      // Create and mount Payment Element
      paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');

      // Create and mount Address Element
      addressElement = elements.create('address', {
        mode: 'shipping',
        defaultValues: {
          address: {
            country: 'US', // Default country
          }
        }
      });
      addressElement.mount('#address-element');

    } catch (error) {
      console.error('Initialization error:', error);
      showMessage('Failed to load payment form. Please refresh the page.');
    }
  }

  /**
   * Handle form submission
   */
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', handleSubmit);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Get form values
    const email = document.getElementById('email').value;

    try {
      // Confirm payment
      // Note: Address Element automatically collects shipping address
      // and includes it in the PaymentIntent
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          receipt_email: email,
        },
        redirect: 'if_required', // Don't redirect, handle success here
      });

      if (error) {
        // Payment failed
        if (error.type === "card_error" || error.type === "validation_error") {
          showMessage(error.message);
        } else {
          showMessage("An unexpected error occurred.");
        }
        setLoading(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        showSuccess();
      } else {
        showMessage("Payment processing...");
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      showMessage('Payment failed. Please try again.');
      setLoading(false);
    }
  }

  /**
   * Show error message
   */
  function showMessage(messageText) {
    const messageContainer = document.getElementById('payment-message');
    messageContainer.textContent = messageText;
    messageContainer.style.display = 'block';

    setTimeout(() => {
      messageContainer.style.display = 'none';
    }, 5000);
  }

  /**
   * Show success state
   */
  function showSuccess() {
    // Hide form
    document.getElementById('payment-form').style.display = 'none';

    // Show success message
    document.getElementById('payment-success').style.display = 'block';

    // Redirect to success page after 3 seconds
    setTimeout(() => {
      window.location.href = '/success';
    }, 3000);
  }

  /**
   * Show loading state on submit button
   */
  function setLoading(isLoading) {
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const buttonSpinner = document.getElementById('button-spinner');

    if (isLoading) {
      submitButton.disabled = true;
      buttonText.style.display = 'none';
      buttonSpinner.style.display = 'inline';
    } else {
      submitButton.disabled = false;
      buttonText.style.display = 'inline';
      buttonSpinner.style.display = 'none';
    }
  }

})();
