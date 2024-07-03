import express from "express";
import asyncHandler from 'express-async-handler'
import BlogModel from "../models/blogModel";

export const blogRouter = express.Router()

blogRouter.get(
  '/',
  asyncHandler(async (req, res) => {
      const posts = await BlogModel.find()
      res.json(posts)
  })
)  //necessita dell'installazione di express-async-handler

blogRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
      const post = await BlogModel.findById(req.params.id)
      
      if (post) {
          res.json(post)
          
      } else {
          res.status(404).json({ messaggio: 'Post Non Trovato'})
      }
  })
);
