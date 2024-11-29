<template>
  <div class="container">
   
    <form @submit.prevent="salvarAluno">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input v-model="aluno.nome" type="text" class="form-control" id="nome" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="aluno.email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="cpf" class="form-label">CPF</label>
        <input v-model="aluno.cpf" type="number" class="form-control" id="cpf" required />
      </div>
      <div class="mb-3">
        <label for="endereco" class="form-label">Endereço</label>
        <input v-model="aluno.endereco" type="text" class="form-control" id="endereco" />
      </div>
     <div class="mb-3">
  <label for="curso" class="form-label">Curso</label>
  <select v-model="aluno.cursoId" class="form-control" id="curso" required>
    <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
      {{ curso.nome }}
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
      carregando: false, // Flag para carregamento
    };
  },
  
  methods: {
    async carregarAluno() {
      const id = this.$route.query.id;
      if (id) {
        try {
          this.carregando = true;
          const response = await api.get(`/alunos/${id}`);
          this.aluno = {
            ...response.data,
            cursoId: response.data.curso?.id || null, // Configura o ID do curso no aluno
          };
        } catch (error) {
          console.error("Erro ao carregar o aluno:", error);
          alert("Não foi possível carregar os dados do aluno.");
        } finally {
          this.carregando = false;
        }
      } else {
        alert("ID do aluno não fornecido.");
        this.voltar();
      }
    },

    async carregarCursos() {
      try {
        this.carregando = true;
        const response = await api.get("/cursos/all");
        this.cursos = response.data._embedded?.cursoDtoList || []; // Ajuste dependendo do retorno da API
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
        alert("Erro ao carregar a lista de cursos.");
      } finally {
        this.carregando = false;
      }
    },

    async salvarAluno() {
      try {
        const alunoAtualizado = {
          ...this.aluno,
          curso: { id: this.aluno.cursoId }, // Relaciona o curso pelo ID
        };
        if (this.aluno.id) {
          await api.pOST(`/alunos`, alunoAtualizado); // Adiciona o id na URL
          alert("Aluno atualizado com sucesso!");
        } else {
          await api.post("/alunos", alunoAtualizado);
          alert("Aluno criado com sucesso!");
        }
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
   
    this.carregarCursos();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
