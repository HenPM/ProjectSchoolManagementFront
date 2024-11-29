<template>
  <div class="container">
   
    <form @submit.prevent="salvarCurso">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input v-model="curso.nome" type="text" class="form-control" id="nome" required />
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <input v-model="curso.descricao" type="text" class="form-control" id="descricao" required />
      </div>
      <div class="mb-3">
        <label for="modalidade" class="form-label">Modalidade</label>
        <input v-model="curso.modalidade" type="text" class="form-control" id="modalidade" required />
      </div>
      <div class="mb-3">
        <label for="nivel" class="form-label">Nivel</label>
        <input v-model="curso.nivel" type="text" class="form-control" id="endereco" />
      </div>
     <div class="mb-3">
  <label for="professor" class="form-label">Teacher</label>
  <select v-model="curso.professorId" class="form-control" id="professor" required>
    <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
      {{ teacher.nome }}
    </option>
  </select>
</div>
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
<script>
import api from "../../services/api";

export default {
  name: "NovoCursoForm",
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
      carregando: false,// Flag para carregamento
    };
  },
  
  methods: {
    async carregarCurso() {
      const id = this.$route.query.id;
      if (id) {
        try {
          this.carregando = true;
          const response = await api.get(`/cursos/${id}`);
          this.curso = {
            ...response.data,
            teacherId: response.data.teacher?.id || null, // Configura o ID do teacher no aluno
          };
        } catch (error) {
          console.error("Erro ao carregar o curso:", error);
          alert("Não foi possível carregar os dados do curso.");
        } finally {
          this.carregando = false;
        }
      } else {
        alert("ID do curso não fornecido.");
        this.voltar();
      }
    },

    async carregarTeacher() {
      try {
        this.carregando = true;
        const response = await api.get("/teachers");
        this.teachers = response.data._embedded?.teacherDtoList || []; // Ajuste dependendo do retorno da API
      } catch (error) {
        console.error("Erro ao carregar teacher:", error);
        alert("Erro ao carregar a lista de teacher.");
      } finally {
        this.carregando = false;
      }
    },

    async salvarCurso() {
      try {
        const cursoAtualizado = {
          ...this.curso,
          professor: { id: this.curso.professorId }, // Relaciona o curso pelo ID
        };
        
          await api.post(`/cursos`, cursoAtualizado); // Adiciona o id na URL
          alert("Aluno atualizado com sucesso!");
        
        this.voltar();
      } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar aluno.");
      }
    },
    },

    voltar() {
      this.$router.push("/cursos");
    },
  

  mounted() {
 
    this.carregarTeacher();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
