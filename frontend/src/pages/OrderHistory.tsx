import { useNavigate } from "react-router-dom";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Button } from "react-bootstrap";

export default function OrderHistoryPage() {
    const navigate = useNavigate()
    const { data: orders, isLoading, error } = useGetOrderHistoryQuery()

    return (
        <div>
            <Helmet>
                <title>Storico Ordini</title>
            </Helmet>

            <h1>Storico Ordini</h1>
            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATA</th>
                            <th>TOTALE</th>
                            <th>PAGATO</th>
                            <th>CONSEGNATO</th>
                            <th>AZIONI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders!.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>
                                    {order.isDelivered
                                    ? order.deliveredAt.substring(0, 10)
                                    : 'No'}
                                </td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() => {
                                            navigate(`/order/${order._id}`)
                                        }}
                                    >
                                        Dettagli
                                    </Button>
                                </td>
                            </tr>   
                        ))} 
                    </tbody>
                </table>
            )}
        </div>
    )
}