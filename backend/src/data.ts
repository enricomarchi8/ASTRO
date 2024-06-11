import bcrypt from 'bcryptjs'
import { User } from "./models/userModel";
import { Product } from "./models/productModel";
import { Blog } from './models/blogModel';

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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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
        commenti: []
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

export const sampleBlogs: Blog[] = [
    {
        title: "L'Affascinante Viaggio delle Sonde Voyager",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Dario Crea",
        date: new Date('2024-04-13'),
        imageUrl: "../images/spacecraft.jpeg",
    },
    {
        title: "Il Mistero della Materia Oscura: Cosa Non Sappiamo Ancora?",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Enrico Marchi",
        date: new Date('2024-05-7'),
        imageUrl: "../images/darkMatter.jpeg",
    },
    {
        title: "Marte: Un Passo Verso la Colonizzazione Spaziale",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Dario Crea",
        date: new Date('2024-06-8'),
        imageUrl: "../images/mars_colonization.jpeg",
    },
    {
        title: "Onde Gravitazionali: Un Nuovo Modo di Guardare l'Universo",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Enrico Marchi",
        date: new Date('2024-02-18'),
        imageUrl: "../images/gravi_waves.jpeg",
    },
    {
        title: "L'Origine della Vita: Teorie e Ricerche Sugli Esopianeti",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Dario Crea",
        date: new Date('2024-01-28'),
        imageUrl: "../images/origin-of-life.jpg",
    },
    {
        title: "Asteroidi e Comete: Minacce e Opportunità per la Terra",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Enrico Marchi",
        date: new Date('2024-03-21'),
        imageUrl: "../images/comet.jpeg",
    },
    {
        title: "Il Futuro delle Stazioni Spaziali: La Nuova Era della Collaborazione Internazionale",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Dario Crea",
        date: new Date('2024-04-11'),
        imageUrl: "../images/ss.jpg",
    },
    {
        title: "L'Universo Primordiale: Cos'è Successo nei Primi Secondi Dopo il Big Bang?",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Enrico Marchi",
        date: new Date('2024-01-31'),
        imageUrl: "../images/prime_uni.jpg",
    },
    {
        title: "Buchi Neri: I Mostri dell'Universo",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Dario Crea",
        date: new Date('2024-06-3'),
        imageUrl: "../images/blackhole.jpg",
    },
    {
        title: "Terraformare Venere: Utopia o Possibilità?",
        content: "Lorem ipsum dolor sit amet, consectetur adip",
        author: "Enrico Marchi",
        date: new Date('2024-02-23'),
        imageUrl: "../images/venus.jpg",
    },
];