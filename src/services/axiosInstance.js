import axios from 'axios';

// Cria uma instância do Axios com a configuração desejada
const instance = axios.create({
  baseURL: 'https://localhost:7172/api'
});

export default instance;
