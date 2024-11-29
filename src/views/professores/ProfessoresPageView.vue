<template>
  <div class="container">
    <h2>Lista de Professor</h2>
<br/>
     <button class="btn btn-primary" @click="novoProfessor">Adicionar Professor</button>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>telefone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="professor in professores" :key="professor.id">
          <td>{{ professor.nome }}</td>
          <td>{{ professor.email }}</td>
          <td>{{ professor.cpf }}</td>
          <td>{{ professor.telefone }}</td>
           
          <td>
            <button class="btn btn-warning" @click="editarProfessor(professor)">Editar</button>
            <button class="btn btn-danger" @click="excluirProfessor(professor.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

   
    
   
    
  </div>
</template>

<script>
import api from '../../services/api';


export default {
 name: 'ProfessoresPageView',
  data() {
    return {
      professores: [],
      
    };
  },
  methods: {
    async carregarProfessor() {
      try {
        const response = await api.get(`/teachers`);
        console.log(response);
        this.professores = response.data._embedded.teacherDtoList;
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
      }
    },
   
    novoProfessor() {
      this.$router.push('/professores/novo');
    },
    editarProfessor(professor) {
      this.$router.push({ path: `/professores/editar`, query: { id: professor.id } });
    },
   
     async excluirProfessor(id) {
      if (confirm('Deseja realmente excluir este aluno?')) {
        try {
          await api.delete(`/teachers/${id}`);
          alert('Professor excluído com sucesso!');
          this.carregarProfessor(this.paginaAtual); // Recarregar a página atual
        } catch (error) {
          console.error('Erro ao excluir Professor:', error);
        }
      }
    },
  },
  mounted() {
    this.carregarProfessor();
    
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>

