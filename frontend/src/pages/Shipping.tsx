import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

export default function Shipping() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(Store)
    const {
        userInfo,
        cart: { shippingAddress },
    } = state

    useEffect(() => {
        if(!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])

    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        })
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        )

        navigate('/placeorder')
    }

    return (
        <div>
            <Helmet>
                <title>ASTRO - Spedizione</title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Indirizzo di Consegna</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Indirizzo</Form.Label>
                        <Form.Control 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>Città</Form.Label>
                        <Form.Control 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Codice Postale</Form.Label>
                        <Form.Control 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Paese</Form.Label>
                        <Form.Control 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continua
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}