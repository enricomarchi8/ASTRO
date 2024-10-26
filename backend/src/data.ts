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
        numRecensioni: 130
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
        numRecensioni: 88
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
        numRecensioni: 68
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
        numRecensioni: 54
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
        numRecensioni: 60
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
        numRecensioni: 80
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
        numRecensioni: 37
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
        numRecensioni: 23
    },
]

export const sampleUsers: User[] = [
    {
        name: 'Dario',
        email: 'admin1@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent('Dario')}`
    },
    {
        name: 'Enrico',
        email: 'admin2@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
        avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent('Enrico')}`
    },
    {
        name: 'Pippo',
        email: 'user1@example.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: false,
        avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent('Pippo')}`
    }
]

export const sampleBlogs: Blog[] = [
    {
        title: "L'Affascinante Viaggio delle Sonde Voyager",
        content: `**Introduzione:**\n
            Le sonde Voyager 1 e Voyager 2, lanciate dalla NASA nel 1977, sono due delle missioni spaziali più longeve e di successo. 
            Nate per esplorare i pianeti esterni del nostro sistema solare, hanno superato le aspettative degli scienziati, continuando a inviare dati preziosi dallo spazio interstellare.\n\n
            **Principali Traguardi:**\n
            Voyager 1: Ha sorvolato Giove e Saturno, fornendo immagini dettagliate e dati scientifici senza precedenti. Nel 2012, è diventata la prima sonda a entrare nello spazio interstellare.\n
            Voyager 2: Ha visitato tutti i giganti gassosi del nostro sistema solare, aggiungendo Urano e Nettuno alla sua lista di successi. È l'unica sonda ad aver esplorato questi due pianeti in dettaglio.\n\n
            **Scoperte Chiave:**\n
            Giacimenti di Acqua e Vapore: Le immagini di Europa (luna di Giove) hanno rivelato la presenza di ghiaccio e possibili oceani sotterranei.\n
            Tempeste e Anelli: Le sonde hanno scoperto dettagli intricati delle tempeste su Giove e Saturno, nonché strutture complesse negli anelli di Saturno.\n\n
            **Stato Attuale e Futuro:**\n
            Nonostante siano a miliardi di chilometri dalla Terra, entrambe le sonde continuano a inviare dati. Si prevede che entro il 2025 le loro batterie nucleari si esauriranno, ma le loro scoperte continueranno a influenzare la scienza per decenni.
            `
            ,
        author: {
            name:"Dario Crea",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Dario%20Crea"
        },
        date: new Date('2024-04-13'),
        imageUrl: "../images/spacecraft.jpeg",
    },
    {
        title: "Il Mistero della Materia Oscura: Cosa Non Sappiamo Ancora?",
        content: `
            **Introduzione:**\n
            La materia oscura costituisce circa il 27% dell'universo, ma resta una delle più grandi incognite della cosmologia. Non emette né assorbe luce, rendendola invisibile e rilevabile solo attraverso la sua influenza gravitazionale.\n\n
            **Teorie Principali:**\n
            Particelle Massicce che Interagiscono Debolmente (WIMP): Una delle teorie più accreditate suggerisce che la materia oscura sia composta da particelle massicce che interagiscono solo attraverso la gravità e la forza nucleare debole.\n
            Assioni: Un'altra teoria propone che la materia oscura sia formata da particelle leggere e ultrafredde chiamate assioni.\n\n
            **Esperimenti in Corso:**\n
            LUX-ZEPLIN (LZ):Un esperimento sotterraneo che cerca di rilevare direttamente le interazioni delle particelle di materia oscura.\n
            Large Hadron Collider (LHC): Il più potente acceleratore di particelle al mondo, dove si cercano indizi indiretti della materia oscura attraverso collisioni ad alta energia.\n\n
            **Implicazioni Cosmologiche:**\n
            Comprendere la materia oscura potrebbe risolvere numerosi enigmi cosmologici, come la formazione delle galassie e la struttura dell'universo su larga scala. Gli scienziati continuano a esplorare nuove teorie e tecnologie per svelare questo mistero fondamentale.
            `,
        author: {
            name: "Enrico Marchi",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Enrico%20Marchi"},
        date: new Date('2024-05-7'),
        imageUrl: "../images/darkMatter.jpeg",
    },
    {
        title: "Marte: Un Passo Verso la Colonizzazione Spaziale",
        content: `
            **Introduzione:**\n
            Con le missioni di SpaceX, NASA e altre agenzie spaziali, Marte è più vicino che mai. La possibilità di colonizzare il Pianeta Rosso rappresenta una delle sfide più ambiziose dell'umanità.\n\n
            **Piani di Colonizzazione:**\n
            SpaceX: Elon Musk ha delineato un piano ambizioso per inviare colonie umane su Marte entro il prossimo decennio, utilizzando la navetta Starship.\n
            NASA: La missione Artemis, che punta a riportare l'uomo sulla Luna, è vista come un passo fondamentale verso una futura missione su Marte, prevista per la fine degli anni '30.\n\n
            **Sfide Tecnologiche e Biologiche:**\n
            Sopravvivenza e Sostenibilità: Creare habitat in grado di proteggere gli esseri umani dalle radiazioni e dalle temperature estreme. Ricerca di metodi per produrre cibo, acqua e ossigeno in loco.\n
            Salute Umana: Effetti a lungo termine della bassa gravità marziana sul corpo umano, compresi problemi muscoloscheletrici e cardiovascolari.\n\n
            **Cosa Significa per il Futuro dell'Umanità:**\n
            La colonizzazione di Marte non è solo una questione di tecnologia, ma anche una prova della capacità umana di adattarsi e prosperare in ambienti estremi. Potrebbe rappresentare un nuovo capitolo per l'umanità, aprendo la strada alla colonizzazione di altri pianeti.
            `,
        author: {
            name:"Dario Crea",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Dario%20Crea"
        },
        date: new Date('2024-06-8'),
        imageUrl: "../images/mars_colonization.jpeg",
    },
    {
        title: "Onde Gravitazionali: Un Nuovo Modo di Guardare l'Universo",
        content: `
            **Introduzione:**\n
            La rilevazione delle onde gravitazionali ha aperto una nuova finestra sull'universo. Queste onde sono increspature nel tessuto dello spaziotempo causate da eventi cosmici estremamente energetici.\n\n
            **Scoperte Rivoluzionarie:**\n
            LIGO e Virgo: Gli osservatori LIGO negli Stati Uniti e Virgo in Italia hanno rilevato le prime onde gravitazionali nel 2015, provenienti dalla fusione di due buchi neri.\n
            Eventi Successivi: Oltre alle fusioni di buchi neri, sono state rilevate onde gravitazionali provenienti dalla fusione di stelle di neutroni, fornendo nuovi dati sulle proprietà della materia nelle condizioni più estreme.\n\n
            **Come Funzionano:**\n
            Gli interferometri LIGO e Virgo utilizzano fasci laser per misurare minuscole variazioni nella distanza tra specchi sospesi, causate dal passaggio delle onde gravitazionali. Queste variazioni sono dell'ordine di una frazione del diametro di un protone.\n\n
            **Implicazioni per l'Astronomia:**\n
            Le onde gravitazionali permettono agli scienziati di osservare eventi cosmici che sarebbero altrimenti invisibili. Questa nuova forma di astronomia complementa l'osservazione elettromagnetica, offrendo una visione più completa dell'universo.
            `,
        author: {
            name: "Enrico Marchi",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Enrico%20Marchi"},
        date: new Date('2024-02-18'),
        imageUrl: "../images/gravi_waves.jpeg",
    },
    {
        title: "L'Origine della Vita: Teorie e Ricerche Sugli Esopianeti",
        content: `
            **Introduzione:**\n
            Con migliaia di esopianeti scoperti, la ricerca di vita extraterrestre è più attiva che mai. Gli scienziati cercano pianeti che possano ospitare condizioni simili a quelle terrestri.\n\n
            **Condizioni Necessarie per la Vita:**\n
            Zona Abitabile: La regione intorno a una stella dove le temperature permettono l'esistenza di acqua liquida.\n
            Atmosfera:La presenza di un'atmosfera protettiva che possa mantenere condizioni stabili e permettere processi chimici complessi.\n\n
            **Missioni Attuali:**\n
            Kepler e TESS: Telescopi spaziali che hanno scoperto migliaia di esopianeti, molti dei quali situati nella zona abitabile delle loro stelle.\n
            James Webb Space Telescope (JWST): Il JWST, lanciato nel 2021, ha la capacità di analizzare le atmosfere degli esopianeti, cercando segnali di vita come ossigeno e metano.\n\n
            **Teorie sull'Origine della Vita:**\n
            Panspermia: La teoria che la vita potrebbe essere stata portata sulla Terra da comete o asteroidi.\n
            Abiogenesi: La formazione spontanea della vita da composti chimici semplici attraverso processi naturali. Gli esperimenti cercano di replicare queste condizioni in laboratorio.
            `,
        author: {
            name:"Dario Crea",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Dario%20Crea"
        },
        date: new Date('2024-01-28'),
        imageUrl: "../images/origin-of-life.jpg",
    },
    {
        title: "Asteroidi e Comete: Minacce e Opportunità per la Terra",
        content: `
            **Introduzione:**\n
            Gli asteroidi e le comete sono oggetti celesti che possono rappresentare sia minacce che opportunità per la Terra. La loro comprensione è cruciale per la difesa planetaria e l'estrazione di risorse.\n\n
            **Minacce:**\n
            Impatto con la Terra: Gli asteroidi potenzialmente pericolosi (PHA) sono monitorati costantemente. Un impatto significativo potrebbe avere conseguenze devastanti.\n
            Programmi di Difesa: Missioni come DART (Double Asteroid Redirection Test) della NASA mirano a testare tecnologie per deviare asteroidi in rotta di collisione con la Terra.\n\n
            **Opportunità:**\n
            Risorse Minerarie: Gli asteroidi contengono metalli preziosi e materiali rari. Le missioni di estrazione mineraria potrebbero rivoluzionare l'approvvigionamento di risorse sulla Terra.\n
            Acqua e Combustibili: La presenza di ghiaccio su alcuni asteroidi e comete potrebbe fornire acqua e propellenti per future missioni spaziali.\n\n
            **Missioni Significative:**\n
            OSIRIS-REx: Ha prelevato campioni dall'asteroide Bennu, che torneranno sulla Terra per analisi dettagliate.\n
            Hayabusa2: La missione giapponese ha riportato campioni dall'asteroide Ryugu, rivelando preziose informazioni sulla composizione dei corpi primitivi del sistema solare.
            `,
        author: {
            name: "Enrico Marchi",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Enrico%20Marchi"},
        date: new Date('2024-03-21'),
        imageUrl: "../images/comet.jpeg",
    },
    {
        title: "Il Futuro delle Stazioni Spaziali: La Nuova Era della Collaborazione Internazionale",
        content: `
            **Introduzione:**\n
            La Stazione Spaziale Internazionale (ISS) è un esempio di cooperazione globale. La sua successora potrebbe vedere una maggiore partecipazione del settore privato e nuove collaborazioni internazionali.\n\n
            **Stato Attuale dell'ISS:**\n
            Collaborazione Internazionale: Coinvolge NASA, Roscosmos, ESA, JAXA e CSA, con astronauti di diversi paesi che vivono e lavorano insieme.\n
            Ricerca Scientifica: Esperimenti in microgravità che spaziano dalla biologia alla fisica dei materiali, offrendo risultati impossibili da ottenere sulla Terra.\n\n
            **Futuri Progetti:**\n
            Stazioni Spaziali Private: Aziende come Axiom Space e Blue Origin stanno sviluppando stazioni spaziali commerciali che potrebbero sostituire l'ISS.\n
            Lunar Gateway: Parte del programma Artemis, il Gateway sarà una stazione spaziale in orbita lunare, che fungerà da punto di appoggio per le missioni lunari e marziane.\n\n
            **Collaborazioni Internazionali:**\n
            Nuovi Partner: Paesi emergenti nel campo spaziale, come Cina e India, potrebbero giocare ruoli cruciali nelle future stazioni spaziali.\n
            Benefici della Cooperazione: La collaborazione internazionale riduce i costi, condivide i rischi e massimizza i benefici scientifici, promuovendo la pace e la cooperazione globale.
            `,
        author: {
            name:"Dario Crea",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Dario%20Crea"
        },
        date: new Date('2024-04-11'),
        imageUrl: "../images/ss.jpg",
    },
    {
        title: "L'Universo Primordiale: Cos'è Successo nei Primi Secondi Dopo il Big Bang?",
        content: `
            **Introduzione:**\n
            Gli scienziati cercano di comprendere cosa sia accaduto nei primi momenti dopo il Big Bang. Questo periodo cruciale ha determinato la struttura dell'universo come lo conosciamo oggi.\n\n
            **Teorie Attuali:**\n
            Inflazione Cosmologica: Una rapidissima espansione esponenziale dell'universo nei primi istanti, spiegando la sua omogeneità e isotropia.\n
            Bariogenesi: Processi che hanno portato alla prevalenza della materia sull'antimateria, permettendo la formazione di stelle, galassie e pianeti.\n\n
            **Osservazioni e Esperimenti:**\n
            Radiazione Cosmica di Fondo (CMB): Le osservazioni della CMB, la "luce fossile" del Big Bang, forniscono indizi cruciali sulle condizioni dell'universo primordiale.\n
            Acceleratori di Particelle: Gli esperimenti al LHC cercano di replicare le condizioni del Big Bang per capire meglio le forze fondamentali e le particelle subatomiche.\n\n
            **Scoperte Recenti:**\n
            Fluttuazioni Quantistiche: Le variazioni primordiali nella densità, amplificate durante l'inflazione, hanno dato origine alla struttura a grande scala dell'universo.\n
            Elementi Leggeri: Le abbondanze relative di idrogeno, elio e litio nell'universo osservabile confermano le previsioni del modello del Big Bang nucleosintetico.
            `,
        author: {
            name: "Enrico Marchi",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Enrico%20Marchi"},
        date: new Date('2024-01-31'),
        imageUrl: "../images/prime_uni.jpg",
    },
    {
        title: "Buchi Neri: I Mostri dell'Universo",
        content: `
            **Introduzione:**\n
            I buchi neri sono tra gli oggetti più misteriosi e affascinanti dell'universo. Formati dalla morte di stelle massicce, questi corpi celesti hanno una gravità così intensa che nulla, nemmeno la luce, può sfuggire.\n\n
            **Come si Formano:**\n
            Collasso Stellare: La maggior parte dei buchi neri si forma dal collasso gravitazionale di stelle molto massicce alla fine del loro ciclo vitale.\n
            Fusione di Stelle di Neutroni: La fusione di stelle di neutroni può dare origine a buchi neri, rivelati dalle onde gravitazionali.\n\n
            **Proprietà e Struttura:**\n
            Orizzonte degli Eventi: Il confine oltre il quale nulla può sfuggire. È il punto di non ritorno per la materia e la radiazione.\n
            Singolarità: Il cuore del buco nero, dove la densità è infinita e le leggi della fisica come le conosciamo cessano di esistere.\n\n
            **Recenti Scoperte:**\n
            Immagini del Buco Nero: Nel 2019, l'Event Horizon Telescope ha catturato la prima immagine di un buco nero, situato al centro della galassia M87.\n
            Onde Gravitazionali: La rilevazione di fusioni di buchi neri ha aperto una nuova finestra per lo studio di questi oggetti attraverso le onde gravitazionali.\n\n
            **Implicazioni per la Fisica:** I buchi neri sfidano la nostra comprensione della fisica, combinando la relatività generale e la meccanica quantistica. Lo studio di questi "mostri cosmici" potrebbe portare a nuove teorie che unificano queste due discipline fondamentali.
            `,
        author: {
            name:"Dario Crea",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Dario%20Crea"
        },
        date: new Date('2024-06-3'),
        imageUrl: "../images/blackhole.jpg",
    },
    {
        title: "Terraformare Venere: Utopia o Possibilità?",
        content: `
            **Introduzione:**\n
            Mentre Marte è il candidato principale per la colonizzazione, alcuni scienziati suggeriscono che Venere potrebbe essere "terraformata" per ospitare la vita umana. Questa idea rivoluzionaria presenta sfide uniche ma affascinanti.\n\n
            **Condizioni Attuali di Venere:**\n
            Atmosfera Densa: L'atmosfera di Venere è composta principalmente di anidride carbonica, con nuvole di acido solforico e una pressione 90 volte superiore a quella terrestre.\n
            Temperature Estreme: La superficie di Venere raggiunge temperature di circa 467 gradi Celsius, sufficienti a fondere il piombo.\n\n
            **Metodi di Terraformazione Proposti:**\n
            Schermi Solari: Utilizzare enormi schermi solari per ridurre la quantità di luce solare che raggiunge Venere, raffreddando gradualmente il pianeta.\n
            Bioingegneria Atmosferica: Introduzione di microorganismi geneticamente modificati che potrebbero convertire l'anidride carbonica in ossigeno e altri composti utili.\n\n
            **Sfide e Considerazioni:**\n
            Tecnologiche: La creazione di tecnologie in grado di operare e sopravvivere in condizioni così estreme.\n
            Etiche e Filosofiche: Le implicazioni morali della trasformazione di un pianeta intero per renderlo abitabile per gli esseri umani.\n\n
            **Futuro della Terraformazione:** Sebbene la terraformazione di Venere rimanga, per ora, un concetto teorico, i progressi nella scienza e nella tecnologia potrebbero rendere possibile questa utopia. Studiare e comprendere meglio Venere ci offre anche preziosi spunti sulla regolazione climatica e la gestione dell'ambiente sulla Terra.
            `,
        author: {
            name: "Enrico Marchi",
            avatar: "https://api.dicebear.com/9.x/identicon/svg?seed=Enrico%20Marchi"},
        date: new Date('2024-02-23'),
        imageUrl: "../images/venus.jpg",
    },
];