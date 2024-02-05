import bcrypt from 'bcryptjs'
import { User } from "./models/userModel";
import { Product } from "./models/productModel";

export const sampleProducts:Product[] = [
    {
        nome: 'T-Shirt Uomo logo ASTRO',
        slug: 'T-Shirt Uomo logo ASTRO',
        immagine: '../images/T-shirt_U_ASTRO.jpeg',
        categoria: 'Magliette', 
        marca: 'Astro',
        prezzo: 80, 
        disponibilita: 0,
        descrizione: 'Maglietta 100% cotone. Made in Italy.',
        valutazione: 5,
        numRecensioni: 130,
    },
    {
        nome: 'T-Shirt Donna logo ASTRO',
        slug: 'T-Shirt Donna logo ASTRO',
        immagine: '../images/T-shirt_2_D_ASTRO.jpeg',
        categoria: 'Magliette', 
        marca: 'Astro',
        prezzo: 80, 
        disponibilita: 100,
        descrizione: 'Maglietta 100% cotone. Made in Italy.',
        valutazione: 4.8,
        numRecensioni: 88,
    },
    {
        nome: 'T-Shirt Donna scritta ASTRO',
        slug: 'T-Shirt Donna scritta ASTRO',
        immagine: '../images/T-shirt_D_ASTRO.jpeg',
        categoria: 'Magliette', 
        marca: 'Astro',
        prezzo: 70, 
        disponibilita: 100,
        descrizione: 'Maglietta 100% cotone. Made in Italy.',
        valutazione: 3.5,
        numRecensioni: 68,
    },
    {
        nome: 'Felpa Uomo ASTRO',
        slug: 'Felpa Uomo ASTRO',
        immagine: '../images/Felpa_U_ASTRO.jpeg',
        categoria: 'Felpe', 
        marca: 'Astro',
        prezzo: 120, 
        disponibilita: 100,
        descrizione: 'Felpa 100% cotone. Made in Italy.',
        valutazione: 4.9,
        numRecensioni: 54,
    },
    {
        nome: 'Felpa Donna ASTRO',
        slug: 'Felpa Donna ASTRO',
        immagine: '../images/Felpa_D_ASTRO.jpeg',
        categoria: 'Felpe', 
        marca: 'Astro',
        prezzo: 120, 
        disponibilita: 100,
        descrizione: 'Felpa 100% cotone. Made in Italy.',
        valutazione: 4.9,
        numRecensioni: 60,
    },
    {
        nome: 'Tazza ASTRO',
        slug: 'Tazza ASTRO',
        immagine: '../images/Tazza_ASTRO.jpeg',
        categoria: 'Gadgets', 
        marca: 'Astro',
        prezzo: 10, 
        disponibilita: 100,
        descrizione: 'Tazza 100% ceramica. Made in Italy.',
        valutazione: 3.5,
        numRecensioni: 80,
    },
    {
        nome: 'Cappello con visiera ASTRO',
        slug: 'Cappello con visiera ASTRO',
        immagine: '../images/Cappello_visiera_ASTRO.jpeg',
        categoria: 'Cappelli', 
        marca: 'Astro',
        prezzo: 35, 
        disponibilita: 100,
        descrizione: 'Cappello 100% cotone. Made in Italy.',
        valutazione: 4.0,
        numRecensioni: 100,
    },
    {
        nome: 'Calzini ASTRO',
        slug: 'Calzini ASTRO',
        immagine: '../images/Calzini_ASTRO.jpeg',
        categoria: 'Calzini', 
        marca: 'Astro',
        prezzo: 5, 
        disponibilita: 100,
        descrizione: 'Calzini 100% cotone. Made in Italy.',
        valutazione: 4.2,
        numRecensioni: 37,
    },
    {
        nome: 'Quaderno ASTRO',
        slug: 'Quaderno ASTRO',
        immagine: '../images/Quaderno_ASTRO.jpeg',
        categoria: 'Cancelleria', 
        marca: 'Astro',
        prezzo: 3.50, 
        disponibilita: 100,
        descrizione: 'Quaderno a righe ottimo per gli appunti.',
        valutazione: 3.7,
        numRecensioni: 23,
    },
]

export const sampleUsers: User[] = [
    {
        name: 'Dario',
        email: 'admin1@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'Enrico',
        email: 'admin2@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
    },
    {
        name: 'Pippo',
        email:'user1@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
    }
]