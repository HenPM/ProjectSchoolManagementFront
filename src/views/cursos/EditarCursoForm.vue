<template>
  <div class="container mt-4">
    <h2>Editar Curso</h2>
    <form @submit.prevent="salvarCurso">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input
          type="text"
          id="nome"
          class="form-control"
          v-model="curso.nome"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <input
          type="text"
          id="descricao"
          class="form-control"
          v-model="curso.descricao"
          required
        />
      </div>
      <div class="mb-3">
        <label for="modalidade" class="form-label">Modalidade</label>
        <input
          type="text"
          id="modalidade"
          class="form-control"
          v-model="curso.modalidade"
          required
        />
      </div>
      <div class="mb-3">
        <label for="nivel" class="form-label">Nivel</label>
        <textarea
          id="nivel"
          class="form-control"
          v-model="curso.nivel"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="teacher" class="form-label">Teacher</label>
        <select id="teacher" class="form-select" v-model="curso.teacherId" required>
          <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
            {{ teacher.nome }}
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
      curso: {
        id: null,
        nome: "",
        descricao: "",
        modalidade: "",
        nivel: "",
        teacherId: null, // Altera para vincular apenas o ID do curso
      },
      teachers: [],
    };
  },
  

  methods: {
    async carregarCurso() {
      // Obtém o ID do curso a partir da query string
      const id = this.$route.query.id;
      if (id) {
        try {
          const response = await api.get(`/cursos/${id}`);
          this.curso = {
            ...response.data,
            teacherId: response.data.teacher?.id || null, // Configura o ID do teacher no aluno
          };
        } catch (error) {
          console.error("Erro ao carregar o curso:", error);
          alert("Não foi possível carregar os dados do curso.");
        }
      } else {
        alert("ID do curso não fornecido.");
        this.voltar();
      }
    },
    async carregarTeacher() {
      try {
        const response = await api.get("/teachers");
        this.teachers = response.data._embedded.teacherDtoList; // Ajuste dependendo do retorno da API
      } catch (error) {
        console.error("Erro ao carregar teacher:", error);
        alert("Erro ao carregar a lista de teacher.");
      }
    },
    async salvarCurso() {
      try {
        const cursoAtualizado = {
          ...this.curso,
          teacher: { id: this.curso.teacherId }, // Relaciona o curso pelo ID
        };
        await api.put(`/cursos`, cursoAtualizado);
        alert("Curso atualizado com sucesso!");
        this.voltar();
      } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar aluno.");
      }
    },
    voltar() {
      this.$router.push("/cursos");
    },
  },
  mounted() {
    this.carregarCurso();
    this.carregarTeacher();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>