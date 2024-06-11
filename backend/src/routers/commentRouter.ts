import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { CommentModel } from '../models/commentModel'
import { ProductModel } from '../models/productModel'


const commentRouter = express.Router();

// Gestione della richiesta GET per ottenere tutti i commenti
commentRouter.get('/comments', 
  asyncHandler(async (req: Request, res: Response) => {
  
    const comments = await CommentModel.find().populate('replies');
    res.json(comments);
  
  })
);

// Gestione della richiesta POST per aggiungere un nuovo commento
commentRouter.post('/comments/:productId', 
    asyncHandler(async (req: Request, res: Response) => {
  
    
      const { text, rating, author } = req.body;
      const productId = req.params.productId;
      console.log('Product ID: ', productId);
      console.log('request body: ', req.body);

      const newComment = new CommentModel({
        text, 
        rating,
        author,
        productId,
      });

      const savedComment = await newComment.save();

      await ProductModel.findByIdAndUpdate(
        productId,
        { $push: { commenti: savedComment._id } },
        { new: true }
      );

      res.status(201).json(savedComment);
    })
);

// Gestione della richiesta DELETE per eliminare un commento
commentRouter.delete('/comments/:id',
  asyncHandler(async (req: Request, res: Response) => {
    
      const commentId = req.params.id;
      const deletedComment = await CommentModel.findByIdAndDelete(commentId);
      
      if(!deletedComment) {
        res.status(404).json({ message: 'Commento non trovato'});
        return;
      }
      //Rimozione del commento da quello genitore
      await ProductModel.updateMany({}, {$pull: { commenti: commentId }});
      
      res.status(204).json();
    })
);

// Gestione della richiesta POST per aggiungere un like a un commento
commentRouter.post('/comments/:id/like', 
  asyncHandler(async (req: Request, res: Response) => {
    
      const commentId = req.params.id;
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        res.status(404).json({ message: 'Commento non trovato' });
        return;
      }
      comment.likes++;
      const updatedComment = await comment.save();
      res.json(updatedComment);
  })
);

// Gestione della richiesta PUT per aggiornare un commento
commentRouter.put('/comments/:id', 
  asyncHandler(async (req: Request, res: Response) => {
    
      const comment = await CommentModel.findById(req.params.id);
      if(!comment) {
        res.status(404).json({ message: 'Commento non trovato'});
        return;
      }

      comment.text = req.body.text;
      comment.rating = req.body.rating;
      
      const updatedComment = await comment.save();
      res.json(updatedComment);
  })
);

async function getNestedReplies(commentId: string): Promise<any[]> {
  const comment = await CommentModel.findById(commentId).populate('Risposte');
  if (!comment) return [];

  const nestedReplies: any[] = [];
  for (const replyId of comment.replies) {
    const reply = await getNestedReplies(replyId.toString());
    nestedReplies.push(...reply);
  }
  return [comment, ...nestedReplies];
}

commentRouter.get('/comments/nested', 
  asyncHandler(async (req: Request, res: Response) => {
    
      const comments = await CommentModel.find({ replies: { $exists: false } });
      const nestedComments: any[] = [];
      for (const comment of comments) {
        const nestedComment = await getNestedReplies(comment._id.toString());
        nestedComments.push(...nestedComment);
      }
      res.json(nestedComments);
  })
);


export default commentRouter;


