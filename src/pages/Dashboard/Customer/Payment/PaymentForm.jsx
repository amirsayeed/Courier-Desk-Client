import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);
  const {totalCost,trackingId} = state;

  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || isProcessing) return;

    const confirm = await Swal.fire({
      title: 'Confirm Payment',
      html: `You are paying <strong>${totalCost} Tk.</strong> for parcel <code>${trackingId}</code>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    console.log(paymentMethod);

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    }

    setError('');

    try {
      const res = await axiosSecure.post('/create-payment-intent', {
        totalCost: totalCost,
      });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || 'Customer',
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setIsProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {

        const paymentData = {
          email: user.email,
          parcelId: trackingId,
          totalCost: totalCost,
          paymentMethod: 'Prepaid',
          transactionId: result.paymentIntent.id,
          parcelData: state
        };

        await axiosSecure.post('/payments', paymentData);

       await Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        html: `<strong>Transaction ID:</strong><br><code>${result.paymentIntent.id}</code>`,
        confirmButtonText: 'Go to My Parcels',
        });

        navigate('/dashboard/my-parcels');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md bg-secondary shadow-xl p-8 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-secondary-content">Complete Your Payment</h2>
        <p className="text-sm text-center mb-4 text-secondary-content">
          Tracking ID: <code>{trackingId}</code>
        </p>

        <div className="border border-primary rounded p-4 mb-6 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1c1a29',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>

        {error && <p className="text-error mb-4 text-center">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? 'Processing...' : `Pay ${totalCost} Tk.`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
