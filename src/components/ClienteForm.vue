<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ isEdit ? 'Editar' : 'Adicionar' }} Cliente</h1>
    <form @submit.prevent="submitForm" class="needs-validation">
      <div class="mb-3">
        <label for="nomeEmpresa">Nome da Empresa: </label>
        <input 
          type="text"       
          id="nomeEmpresa"    
          v-model="cliente.companyName" 
          class="form-control" 
          placeholder="Digite o nome da empresa" 
          required 
        />
      </div>
      <div>
        <label for="nomeEmpresa" class="form-label">Porte da Empresa:</label>
        <select id="porteEmpresa" v-model="cliente.porteEmpresa" class="form-select" required>
          <option value="SmallBusiness">Pequena Empresa</option>
          <option value="MediumBusiness">Média Empresa</option>
          <option value="BigCompany">Grande Empresa</option>
        </select>
      </div>
      <br />
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Salvar' : 'Adicionar' }}</button>
    </form>
  </div>
</template>
  
  <script>
  import axiosInstance from '@/services/axiosInstance'; // Importe a instância configurada
  
  export default {
    data() {
      return {
        cliente: {
          companyName: '',
          porteEmpresa:  ''
        },
        isEdit: false,
      };
    },
    methods: {
     async submitForm() {
      try {
        if (this.isEdit) {
           await axiosInstance.put(`/Customer/${this.cliente.id}`, this.cliente);
          } else {
            const response = await axiosInstance.post('/Customer', this.cliente);
           console.log(response);
          }
        this.$router.push('/Customer'); // Assumindo que esta rota existe para listar clientes
      } catch (error) {
        console.error('Erro ao salvar cliente:', error);
      }
    },
    async fetchCliente(id) {
      try {
        const response = await axiosInstance.get(`/Customer/${id}`);
        this.cliente = response.data;
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    }
  },
    created() {
      const id = this.$route.params.id;
      if (id) {
        this.isEdit = true;
        this.fetchCliente(id);
      }
    }
  };
  </script>
  
<style scoped>
.container {
  max-width: 500px;
}
</style>