import express from 'express'

export const keyRouter = express.Router()

keyRouter.get('/paypal', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' })
})

/*keyRouter.get('/googlepay', (req, res) => {
    res.json({ clientId: process.env.GOOGLEPAY_CLIENT_ID || 'sb' })
})

keyRouter.get('/applepay', (req, res) => {
    res.json({ clientId: process.env.APPLEPAY_CLIENT_ID || 'sb' })
})*/