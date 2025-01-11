import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { isAuth } from '../utils'

export const productRouter = express.Router()

productRouter.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await ProductModel.find()
        res.json(products)
    })
)  //necessita dell'installazione di express-async-handler

productRouter.get(
    '/slug/:slug',
    asyncHandler(async (req, res) => {
        const product = await ProductModel.findOne({ slug: req.params.slug })
        
        if (product) {
            res.json(product)
            
        } else {
            res.status(404).json({ messaggio: 'Prodotto non trovato'})
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        if (req.user.isAdmin) {  
            const createdProduct = await ProductModel.create({
                nome: req.body.nome,
                slug: req.body.slug,
                immagine: req.body.immagine,
                marca: req.body.marca,
                categoria: req.body.categoria,
                descrizione: req.body.descrizione,
                prezzo: req.body.prezzo,
                disponibilita: req.body.disponibilita,
                valutazione: req.body.valutazione,
                numRecensioni: req.body.numRecensioni,
            })
            res.status(201).json({ message: 'Prodotto creato con successo', product: createdProduct })
        } else {
            res.status(401).json({ message: 'Utente non autorizzato' })
        }
    })
)

productRouter.put(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        if (req.user.isAdmin) {  
           
            const product = await ProductModel.findById(req.params.id)
            if (product) {
                product.nome = req.body.nome
                product.slug = req.body.slug
                product.immagine = req.body.immagine
                product.marca = req.body.marca
                product.categoria = req.body.categoria
                product.descrizione = req.body.descrizione
                product.prezzo = req.body.prezzo
                product.disponibilita = req.body.disponibilita
                product.valutazione = req.body.valutazione
                product.numRecensioni = req.body.numRecensioni 
                const updatedProduct = await product.save()
                res.status(200).json({ message: 'Prodotto modificato con successo', product: updatedProduct })
            } else {
                res.status(404).json({ message: 'Prodotto non trovato' })
            }

        } else {
            res.status(401).json({ message: 'Utente non autorizzato' })
        }
    })
)

productRouter.delete(
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        if (req.user.isAdmin) {
            const product = await ProductModel.findById(req.params.id)
            if (product) {
                await product.deleteOne()
                res.json({ message: 'Prodotto eliminato con successo' })
            } else {
                res.status(404).json({ message: 'Prodotto non trovato' })
            }
        } else {
            res.status(401).json({ message: 'Utente non autorizzato' })
        }
    })
)
