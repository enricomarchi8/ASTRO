import { getModelForClass, prop } from "@typegoose/typegoose";

export class Blog {
    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public date!: Date;

    @prop({ required: true })
    public author!: string;
    
    @prop({ required: true })
    public content!: string;

    @prop({ required: true })
    public imageUrl!: string;
}

const BlogModel = getModelForClass(Blog);
export default BlogModel;