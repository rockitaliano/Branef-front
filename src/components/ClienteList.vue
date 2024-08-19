<template>
  <div class="container mt-5">
    <h1 class="mb-4">Clientes</h1>
    <div v-if="clientes.length" class="list-group">
      <div 
        v-for="cliente in clientes" 
        :key="cliente.id" 
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <h5 class="mb-1">{{  cliente.companyName }}</h5>
          <small class="text-muted">{{ cliente.companyType  }}</small>
        </div>
        <div>
          <button 
            @click="editCliente(cliente.id)" 
            class="btn btn-sm btn-warning me-2"
          >
            Editar
          </button>
          <button 
            @click="deleteCliente(cliente.id)" 
            class="btn btn-sm btn-danger"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info" role="alert">
      Nenhum cliente encontrado.
    </div>
    <router-link 
      to="/customer/novo" 
      class="btn btn-primary mt-3"
    >
      Adicionar Novo Cliente
    </router-link>
  </div>
</template>
  
  <script>
  import axiosInstance from '@/services/axiosInstance';
  
  export default {
    data() {
      return {
        clientes: []
      };
    },
    methods: {
      async fetchClientes() {
        try {
        const response = await axiosInstance.get('/Customer');
          this.clientes = response.data.data;
        } catch (error) {
          console.error('Erro ao buscar clientes:', error);
        }          
      },
      async deleteCliente(id) {
        await axiosInstance.delete(`/Customer/${id}`)
          .then(() => {
            this.fetchClientes();
          });
      },
      async editCliente(id) {
        await this.$router.push(`/Customer/${id}`);
      }
    },
    created() {
      this.fetchClientes();
    }
  };
  </script>
  
  <style scoped>
.list-group-item {
  background-color: #f8f9fa;
}
</style>