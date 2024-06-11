import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

export class Comment {
  @prop({ required: true })
  public text!: string;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true })
  public author!: string;

  @prop({ ref: () => require('./productModel').Product, required: true })
  public productId!: Ref<any>;

  @prop({ ref: () => Comment, default: [] })
  public replies!: Ref<Comment>[];

  @prop({ default: 0 })
  public likes!: number;
}

export const CommentModel = getModelForClass(Comment);