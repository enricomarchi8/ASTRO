import { Col, Row } from "react-bootstrap"

export default function CheckoutSteps(props: {
    step1?: boolean
    step2?: boolean
    
    step3?: boolean
}) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Accedi</Col>
            <Col className={props.step2 ? 'active' : ''}>Spedizione</Col>
            
            <Col className={props.step3 ? 'active' : ''}>Conferma Ordine</Col>
        </Row>
    )
}