<template>
  <div class="container">
    <h2>Lista de Alunos</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>CPF</th>
          <th>Endereço</th>
          <th>Curso</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aluno in alunos" :key="aluno.id">
          <td>{{ aluno.nome }}</td>
          <td>{{ aluno.email }}</td>
          <td>{{ aluno.cpf }}</td>
          <td>{{ aluno.endereco }}</td>
           <td>{{aluno.curso.nome}}</td>
          <td>
            <button class="btn btn-warning" @click="editarAluno(aluno)">Editar</button>
            <button class="btn btn-danger" @click="excluirAluno(aluno.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Controles de Paginação -->
    <div class="pagination">
      <button 
        class="btn btn-secondary" 
        :disabled="paginaAtual === 0" 
        @click="alterarPagina(paginaAtual - 1)">
        Anterior
      </button>
      <span>Página {{ paginaAtual + 1 }} de {{ totalPaginas }}</span>
      <button 
        class="btn btn-secondary" 
        :disabled="paginaAtual + 1 >= totalPaginas" 
        @click="alterarPagina(paginaAtual + 1)">
        Próxima
      </button>
    </div>
    <br/>
     <button class="btn btn-primary" @click="novoAluno">Adicionar Aluno</button>
  </div>
</template>

<script>
import api from '../../services/api';


export default {
 name: 'AlunosPageView',
  data() {
    return {
      alunos: [],
      paginaAtual: 0,
      totalPaginas: 1, // Inicializado com 1 para evitar problemas antes do carregamento
    };
  },
  methods: {
    async carregarAlunos(pagina = 0) {
      try {
        const response = await api.get(`/alunos?page=${pagina}&size=10&sort=nome,asc`);
        console.log(response);
        this.alunos = response.data._embedded.alunoDtoList;
        this.aluno = response.data._embedded.cursoDtoList
        this.paginaAtual = response.data.page.number; // Página atual
        this.totalPaginas = response.data.page.totalPages; // Total de páginas
      } catch (error) {
        console.error('Erro ao carregar alunos:', error);
      }
    },
    alterarPagina(novaPagina) {
      if (typeof novaPagina === "number" && novaPagina >= 0) {
      this.carregarAlunos(novaPagina);
      }
    },
    novoAluno() {
      this.$router.push('/alunos/novo');
    },
    editarAluno(aluno) {
      this.$router.push({ path: `/alunos/editar`, query: { id: aluno.id } });
    },
    async carregarCursos() {
  try {
    const response = await api.get('/cursos');
    console.log(response);
    this.cursos = response.data; // Presume-se que `response.data` seja um array de cursos
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
},
    async excluirAluno(id) {
      if (confirm('Deseja realmente excluir este aluno?')) {
        try {
          await api.delete(`/alunos/${id}`);
          alert('Aluno excluído com sucesso!');
          this.carregarAlunos(this.paginaAtual); // Recarregar a página atual
        } catch (error) {
          console.error('Erro ao excluir aluno:', error);
        }
      }
    },
  },
  mounted() {
    this.carregarAlunos();
    this.carregarCursos();
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
