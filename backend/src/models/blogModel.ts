import { getModelForClass, prop } from "@typegoose/typegoose";

class Author {
    @prop({ required: true})
    public name!: string;

    @prop({
        required: true,
        default: function() {
            return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(this.name)}`;
        }
    })
    public avatar!: string;
}

export class Blog {
    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public date!: Date;

    @prop({ required: true })
    public author!: Author;
    
    @prop({ required: true })
    public content!: string;

    @prop({ required: true })
    public imageUrl!: string;
}

const BlogModel = getModelForClass(Blog);
export default BlogModel;