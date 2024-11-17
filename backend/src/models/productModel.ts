import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'


export @modelOptions({ schemaOptions: { timestamps: true }})
class Product {
    public _id?: string

    @prop({ required: true })
    public nome!: string

    @prop({ required: true })
    public slug!: string

    @prop({ required: true })
    public immagine!: string

    @prop({ required: true })
    public marca!: string

    @prop({ required: true })
    public categoria!: string

    @prop({ required: true })
    public descrizione!: string

    @prop({ required: true, default: 0 })
    public prezzo!: number

    @prop({ required: true, default: 0 })
    public disponibilita!: number

    @prop({ required: true, default: 0 })
    public valutazione!: number

    @prop({ required: true, default: 0 })
    public numRecensioni!: number

    @prop({ type: () => [String], default: [] })
    public taglie!: string[]

    @prop({ type: () => [String], default: [] })
    public colori!: string[]
}


export const ProductModel = getModelForClass(Product)