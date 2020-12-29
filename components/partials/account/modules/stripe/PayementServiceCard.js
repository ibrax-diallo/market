import React, {useEffect, useState} from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";

import api from "./api";
import Link from 'next/link';
import {API_KEY_SECRET} from "../config";

const Settings = {
    // url: 'https://api.transfert.kwaber.com'
    url: "http://52.47.61.219:5000"
};

export default function PayementServiceCard() {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("");
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [frais, setFrais] = useState(undefined);
    const stripe = useStripe();
    const elements = useElements();
    let url = Settings.url;

    useEffect(() => {
        setFrais(20);
        const total = 100;

        // Step 1: Fetch product details such as amount and currency from
        // API to make sure it can't be tampered with in the client.
        const montant = total * 100;
        setAmount(total);
        setCurrency("EUR");


        // Step 2: Create PaymentIntent over Stripe API
        api.createPaymentIntent({
            payment_method_types: ["card"],
            amount: montant,
        })
            .then(clientSecret => {
                setClientSecret(clientSecret);
            })
            .catch(err => {
                setError(err.message);
            });

    }, []);

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        // Step 3: Use clientSecret from PaymentIntent and the CardElement
        // to confirm payment with stripe.confirmCardPayment()
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: "test" + " / " + "essai" + " / \n " + "paix"

                }
            }
        });

        if (payload.error) {
            setError(`Payment failed: ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setSucceeded(true);
            setProcessing(false);
            setMetadata(payload.paymentIntent);

            const paymentIntents = payload.paymentIntent.id;

            const axios = require('axios');

            const config = {
                method: 'post',
                url: 'https://api.stripe.com/v1/payment_intents/' + paymentIntents,
                headers: {
                    'Authorization': 'Bearer ' + API_KEY_SECRET,
                }
            };
            axios(config)
                .then(function (response) {
                    console.log(response)

                })
                .catch(function (error) {
                    console.log(error)
                });


        }
    };

    const renderSuccess = () => {
        return (
            <div className="sr-field-success message">
                <h1>Mantant prélévé avec success sur la carte </h1>
                <p>Merci de nous faire confiance</p>
            </div>
        );

    };


    const renderForm = () => {
        const options = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a"
                }
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <div className="sr-combo-inputs">

                    <div className="form-group row">
                        <label htmlFor="CardNumber" className="col-sm-4 col-form-label">
                            N° carte </label>
                        <div className="col-sm-8">
                            <CardNumberElement
                                options={options}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="expirationDate" className="col-sm-4 col-form-label">
                            Date expiration</label>
                        <div className="col-sm-8">
                            <CardExpiryElement
                                options={options}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="CVC" className="col-sm-4 col-form-label">
                            CVC
                        </label>
                        <div className="col-sm-8">
                            <CardCvcElement
                                options={options}
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    {error && <div className="message sr-field-error">{error}</div>}
                </div>
                <div className="row">
                    <button className="btn btn-danger" type="button">
                        <Link href="/blog-one" activeClassName="active">
                            <a className="btn-danger">Annuler</a>
                        </Link>
                    </button>

                    <button
                        className="btn btn btn-primary btnStart" style={{left: "35%"}}
                        disabled={processing || !clientSecret || !stripe}
                    >
                        {processing ? "Paiement en cours…" : "Payez"}
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="checkout-form">
            <div className="sr-payment-form">
                <div className="sr-form-row"/>
                {succeeded ? renderSuccess() : renderForm()}
            </div>
        </div>
    );
}
