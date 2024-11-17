export type Product = {
    _id: string
    nome: string
    slug: string
    immagine: string
    categoria: string 
    marca: string
    prezzo: number 
    disponibilita: number
    descrizione: string
    valutazione: number
    numRecensioni: number
    taglie: string[]
    colori: string[]
}