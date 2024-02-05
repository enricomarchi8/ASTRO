import { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, FormCheck } from "react-bootstrap";

export default function paymentMethod() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(Store)
    const {
        cart: { shippingAddress, paymentMethod },
    } = state

    const [paymentMethodName, setPaymentMethodName] = useState(
        paymentMethod || 'PayPal' 
    )

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
        localStorage.setItem('paymentMethod', paymentMethodName)
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container">
                <Helmet>
                    <title>ASTRO-Metodo di Pagamento</title>
                </Helmet>
                <h1 className="my-3">Metodo di Pagamento</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <FormCheck
                          type="radio"
                          id="PayPal"
                          label="PayPal"
                          value="PayPal"
                          checked={paymentMethodName === 'PayPal'}
                          onChange={(e) => setPaymentMethodName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <FormCheck
                            type="radio"
                            id="GooglePay"
                            label="GooglePay"
                            value="GooglePay"
                            checked={paymentMethodName === 'GooglePay'}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Button type="submit">Continua</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}