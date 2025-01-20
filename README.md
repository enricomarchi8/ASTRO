## Introduzione
ASTRO è un'applicazione web full-stack che combina un e-commerce di merchandising a tema astronomico con un blog dedicato alle ultime scoperte spaziali. Il progetto mira a creare una community appassionata di astronomia, offrendo sia contenuti informativi che prodotti tematici.

## Features
  - Autenticazione
  - Catalogo prodotti
  - Gestione carrello
  - Gestione ordini e pagamenti
  - Dashboard admin
  - Selezione taglie e colori per i prodotti
  - Calcolo automatico IVA
  - Articoli con immagini
  - Layout responsive per una lettura ottimale

## Tecnologie Utilizzate

### Frontend
- **React** con TypeScript
- **Vite** come build tool
- **React Bootstrap** per l'UI
- **React Query** per la gestione dello stato
- **React Router** per la navigazione
- **Axios** per le chiamate API
- **React Toastify** per le notifiche
- **React Helmet** per la gestione dei meta tag

### Backend
- **Node.js** con Express
- **TypeScript**
- **MongoDB** con Mongoose
- **JWT** per l'autenticazione
- **Bcrypt** per la crittografia delle password

## Installazione

1. Clona il repository:
```bash
git clone https://github.com/enricomarchi8/ASTRO.git
cd ASTRO
```

2. Installa le dipendenze per il frontend:
```bash
cd frontend
npm install
```

3. Installa le dipendenze per il backend:
```bash
cd ../backend
npm install
```

4. Crea un file `.env` nella cartella backend con le seguenti variabili:
```env
MONGODB_URI=mongodb://localhost/ASTROdb
JWT_SECRET=your_jwt_secret
```

## Esecuzione

1. Avvia il server MongoDB locale

2. Avvia il backend:
```bash
cd backend
npm run dev
```

3. In un nuovo terminale, avvia il frontend:
```bash
cd frontend
npm run dev
```

4. Accedi all'applicazione:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:4000](http://localhost:4000)

5. Credenziali

- User
  - Email: user@example.com
  - Password: user

- Admin
  - Email: admin@example.com
  - Password: admin