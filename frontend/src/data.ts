import { Product } from "./types/Product";

export const sampleProducts:Product[] = [
    {
        nome: 'T-Shirt Uomo Astro',
        slug: 'T-Shirt Uomo Astro',
        immagine: '../images/t-shirt_U_nera.jpeg',
        categoria: 'Magliette', 
        marca: 'Astro',
        prezzo: 30, 
        disponibilita: 100,
        descrizione: 'string',
        valutazione: 4.7,
        numRecensioni: 20,
    },
    {
        nome: 'T-Shirt Donna Astro',
        slug: 'T-Shirt Donna Astro',
        immagine: '../images/t-shirt_D_rosa.jpg',
        categoria: 'Magliette', 
        marca: 'Astro',
        prezzo: 29.99, 
        disponibilita: 100,
        descrizione: 'string',
        valutazione: 4.8,
        numRecensioni: 23,
    },
]