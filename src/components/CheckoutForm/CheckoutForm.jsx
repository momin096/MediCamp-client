import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ handlePayNow, setIsOpen, camp }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const [clientSecret, setClientSecret] = useState('');
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');

    useEffect(() => {
        if (camp) {
            createPaymentIntent();
        }
    }, [camp]);

    console.log('price,', camp);

    console.log('stripe ->', stripe, 'secred', clientSecret);

    const createPaymentIntent = async () => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', {
                price: camp,
            });
            setClientSecret(data.clientSecret);
        } catch (err) {
            console.error('Payment intent error:', err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodError) {
            setPaymentError(methodError.message);
            setPaymentSuccess('');
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: camp?.participantName || 'Anonymous',
                    email: camp?.participantEmail || 'unknown@example.com',
                },
            },
        });

        if (confirmError) {
            setPaymentError(confirmError.message);
            setPaymentSuccess('');
        } else if (paymentIntent.status === 'succeeded') {
            setPaymentSuccess('Payment successful!');
            setPaymentError('');
            handlePayNow(); // Call your custom handler
            setIsOpen(false); // Close modal
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            <div className="flex justify-evenly mt-4">
                <button
                    disabled={!stripe || !clientSecret}
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium hover:bg-green-400 transition disabled:cursor-not-allowed"
                >
                    Pay Now
                </button>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-400 transition"
                >
                    Cancel
                </button>
            </div>

            {/* Feedback */}
            {paymentError && <p className="text-red-500 mt-2">{paymentError}</p>}
            {paymentSuccess && <p className="text-green-500 mt-2">{paymentSuccess}</p>}
        </form>
    );
};

export default CheckoutForm;
