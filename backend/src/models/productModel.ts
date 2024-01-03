import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'


@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
    public _id!: string

    @prop({ required: true })
    public name!: string

    @prop({ required: true })
    public slug!: string

    @prop({ required: true })
    public immagine!: string

    @prop({ required: true })
    public marca!: string

    @prop({ required: true })
    public categoria!: string

    @prop({ required: true })
    public descrizone!: string

    @prop({ required: true, default: 0 })
    public prezzo!: number

    @prop({ required: true, default: 0 })
    public disponibilita!: number

    @prop({ required: true, default: 0 })
    public valutazione!: number

    @prop({ required: true, default: 0 })
    public numRecensioni!: number
}


export const ProductModel = getModelForClass(Product)