import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const Payment = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;