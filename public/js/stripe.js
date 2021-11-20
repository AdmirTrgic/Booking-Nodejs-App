import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JxAaWFav7UMvQIgLPWn5ZwDOoONeAOQQiJV9N3DO3VBXAwr1JtT2rbydOabx9GMs0ngy8PxO7wJ6w5G95aKRP2k009g9YsKbf'
  );
  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
