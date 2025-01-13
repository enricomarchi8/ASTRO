import axios from 'axios'
import { toast } from 'react-toastify'

const apiClient = axios.create({
    baseURL:
      process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/',
    headers: {
        'Content-type' : 'application/json'
    },
})

apiClient.interceptors.request.use(async (config) => {
  if (localStorage.getItem('userInfo'))
  config.headers.Authorization = `Bearer ${
  JSON.parse(localStorage.getItem('userInfo')!).token
  }`

  return config
},
(error) => {
  Promise.reject(error)
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      
      toast.error('Errore di connessione al server. Riprova più tardi.');
    } else if (error.response.status >= 500) {
      
      toast.error("Errore del server. Contatta l'amministratore.");
    } else if (error.response.status === 404) {
      
      toast.warn('Risorsa non trovata.');
    } else if (error.response.status === 401) {
      
      toast.warn('Sessione scaduta. Accedi nuovamente.');
      
      localStorage.removeItem('userInfo');
      window.location.href = '/signin'; 
    }
    return Promise.reject(error);
  }
)

export default apiClient