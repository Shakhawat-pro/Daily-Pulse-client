import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkoutForm.css'
import PropTypes from 'prop-types';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';

const CheckoutForm = ({ price, selectedPeriod  }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext)
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();

    console.log(clientSecret);


    // console.log(price);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    // console.log(res.data);
                    setClientSecret(res.data.clientSecret)
                })
        } else {
            navigate('/subscription');
        }
    }, [axiosSecure, price, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                const premiumTaken = new Date(Date.now() + selectedPeriod * 24 * 60 * 60 * 1000).toISOString(); // Calculate the expiry date
                console.log(premiumTaken);

                await axiosPublic.patch('/update-premium', {
                    email: user.email,
                    premiumTaken
                }).then(() =>{
                    navigate('/')
                })
                console.log('Premium taken updated successfully');

            
            }
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
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {error && <p className="text-red-600">{error}</p>}
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            <button type="submit" className='btn bg-black text-white px-8 mt-2' disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
    price: PropTypes.number,
    selectedPeriod: PropTypes.number
}