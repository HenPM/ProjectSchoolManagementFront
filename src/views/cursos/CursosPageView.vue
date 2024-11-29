<template>
  <div class="container">
    <h2>Lista de Cursos</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Modalidade</th>
          <th>Nivel</th>
          <th>Professor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.nome }}</td>
          <td>{{ curso.descricao }}</td>
          <td>{{ curso.modalidade }}</td>
          <td>{{ curso.nivel }}</td> <!-- Corrigido para `curso.nivel` -->
          <td>{{ curso.professor?.nome || 'Sem professor' }}</td> <!-- Correção para professor -->
          <td>
            <button class="btn btn-warning" @click="editarCurso(curso)">Editar</button>
            <button class="btn btn-danger" @click="excluirCursos(curso.id)">Excluir</button>
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
    <button class="btn btn-primary" @click="novoCurso">Adicionar Curso</button>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'CursosPageView',
  data() {
    return {
      cursos: [],
      paginaAtual: 0,
      totalPaginas: 1, // Inicializado com 1 para evitar problemas antes do carregamento
    };
  },
  methods: {
    async carregarCursos(pagina = 0) {
      try {
        const response = await api.get(`/cursos?page=${pagina}&size=10&sort=nome,asc`);
        console.log(response);
        this.cursos = response.data._embedded.cursoDtoList; // Atribui os cursos corretamente
         this.curso = response.data._embedded.teacherDtoList;
        this.paginaAtual = response.data.page.number; // Página atual
        this.totalPaginas = response.data.page.totalPages; // Total de páginas
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    },
    alterarPagina(novaPagina) {
      if (typeof novaPagina === "number" && novaPagina >= 0) {
        this.carregarCursos(novaPagina);
      }
    },
    novoCurso() {
      this.$router.push('/cursos/novo');
    },
    editarCurso(curso) {
      this.$router.push({ path: `/cursos/editar`, query: { id: curso.id } });
    },
    async excluirCursos(id) {
      if (confirm('Deseja realmente excluir este curso?')) { // Corrigido para 'curso'
        try {
          await api.delete(`/cursos/${id}`);
          alert('Curso excluído com sucesso!');
          this.carregarCursos(this.paginaAtual); // Recarregar a página atual
        } catch (error) {
          console.error('Erro ao excluir curso:', error);
        }
      }
    },
  },
  mounted() {
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
