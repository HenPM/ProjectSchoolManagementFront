<template>
  <div class="container mt-4">
    <h2>Editar Aluno</h2>
    <form @submit.prevent="salvarAluno">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input
          type="text"
          id="nome"
          class="form-control"
          v-model="aluno.nome"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="aluno.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="cpf" class="form-label">CPF</label>
        <input
          type="number"
          id="cpf"
          class="form-control"
          v-model="aluno.cpf"
          required
        />
      </div>
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço</label>
        <textarea
          id="endereco"
          class="form-control"
          v-model="aluno.endereco"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="curso" class="form-label">Curso</label>
        <select id="curso" class="form-select" v-model="aluno.cursoId" required>
          <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
            {{ curso.nome }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <button @click="voltar" type="button" class="btn btn-secondary ms-2">
        Cancelar
      </button>
    </form>
  </div>
</template>


<script>
import api from "../../services/api";

export default {
  name: "EditarAlunoForm",
  data() {
    return {
      aluno: {
        id: null,
        nome: "",
        email: "",
        cpf: null,
        endereco: "",
        cursoId: null, // Altera para vincular apenas o ID do curso
      },
      cursos: [],
    };
  },
  

  methods: {
    async carregarAluno() {
      // Obtém o ID do aluno a partir da query string
      const id = this.$route.query.id;
      if (id) {
        try {
          const response = await api.get(`/alunos/${id}`);
          this.aluno = {
            ...response.data,
            cursoId: response.data.curso?.id || null, // Configura o ID do curso no aluno
          };
        } catch (error) {
          console.error("Erro ao carregar o aluno:", error);
          alert("Não foi possível carregar os dados do aluno.");
        }
      } else {
        alert("ID do aluno não fornecido.");
        this.voltar();
      }
    },
    async carregarCursos() {
      try {
        const response = await api.get("/cursos/all");
        this.cursos = response.data._embedded.cursoDtoList; // Ajuste dependendo do retorno da API
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
        alert("Erro ao carregar a lista de cursos.");
      }
    },
    async salvarAluno() {
      try {
        const alunoAtualizado = {
          ...this.aluno,
          curso: { id: this.aluno.cursoId }, // Relaciona o curso pelo ID
        };
        await api.put(`/alunos`, alunoAtualizado);
        alert("Aluno atualizado com sucesso!");
        this.voltar();
      } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar aluno.");
      }
    },
    voltar() {
      this.$router.push("/alunos");
    },
  },
  mounted() {
    this.carregarAluno();
    this.carregarCursos();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
