import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { CommentModel } from '../models/commentModel'

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
            res.status(404).json({ messaggio: 'Prodotto Non Trovato'})
        }
    })
);

productRouter.post(
    '/:id/comments',
    asyncHandler(async (req, res) => {
        const productId = req.params.id;
        const { text, rating, autore} = req.body;

        try{
          const product = await ProductModel.findById(productId);
          if (product) {
            const newComment = new CommentModel({
                text,
                rating,
                autore,
                productId,
            });

            await newComment.save();

            product.commenti.push(newComment._id as any);
            await product.save();

            res.status(201).json(newComment);
          } else {
            res.status(404).json({ message: 'Prodotto non trovato'});
          }
        } catch (error) {
            res.status(500).json({ message: 'Errore nel server' });
        }
    })
);