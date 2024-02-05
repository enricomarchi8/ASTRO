import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useSignupMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const { mutateAsync: signup, isPending } = useSignupMutation()

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('La password non combacia')
            return
        }
        try {
            const data = await signup({
                name,
                email,
                password,
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect)
        } catch (err) {
            toast.error(getError(err as ApiError))
        }
    }

    return (
        <Container className="small-container">
            <Helmet>
                <title>ASTRO-Registrati</title>
            </Helmet>
            <h1 className="my-3">Registrati</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Conferma la Password</Form.Label>
                    <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Registrati</Button>
                </div>

                <div className="mb-3">
                    Hai già un account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Accedi</Link>
                </div>
            </Form>
        </Container>
    )
}