import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { isAuth } from '../utils'
import { OrderModel } from '../models/orderModel'
import { Product } from '../models/productModel'
export const orderRouter = express.Router()

orderRouter.get(
    '/mine',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find({ user: req.user._id })
        res.json(orders)
    })
)

orderRouter.get(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({ message: 'Ordine non trovato' })
        }
    })
)

orderRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: 'Il carrello è vuoto.' })
        } else {
            const createdOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x: Product) => ({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            })
            res.status(201).json({ message: 'Ordine creato con successo', order: createdOrder })
        }
    })
)

orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)

        if (order) {
            order.isPaid = true 
            order.paidAt = new Date(Date.now())
            order.paymentResult = {
                paymentId: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save()

            res.send({ order: updatedOrder, message:'Ordine pagato correttamente' })
        } else {
            res.status(404).json({ message: 'Ordine non trovato' })
        }
    })
)