<template>
  <div class="container mt-4">
    <h2>Editar Professor</h2>
    <form @submit.prevent="salvarTeacher">
      <div class="mb-3" v-if="teacher">
        <label for="nome" class="form-label">Nome</label>
        <input
          type="text"
          id="nome"
          class="form-control"
          v-model="teacher.nome"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="teacher.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="cpf" class="form-label">CPF</label>
        <input
          type="number"
          id="cpf"
          class="form-control"
          v-model="teacher.cpf"
          required
        />
      </div>
      <div class="mb-3">
        <label for="telefone" class="form-label">Telefone</label>
        <textarea
          id="telefone"
          class="form-control"
          v-model="teacher.telefone"
          required
        ></textarea>
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
  name: "EditarProfessorForm",
  data() {
    return {
      teacher: {
        id: null,
        nome: "",
        email: "",
        cpf: null,
        telefone: null,
      },
    };
  },

  methods: {
    async carregarTeacher() {
      // Obtém o ID do professor a partir da query string
      const id = this.$route.query.id;
      if (id) {
        try {
          const response = await api.get(`/teachers/${id}`);
           console.log(response);
          this.teacher = response.data; // Corrigido para acessar os dados diretamente
        } catch (error) {
          console.error("Erro ao carregar o professor:", error);
          alert("Não foi possível carregar os dados do professor.");
        }
      } else {
        alert("ID do professor não fornecido.");
        this.voltar();
      }
    },

    async salvarTeacher() {
      try {
        const teacherAtualizado = {
          ...this.teacher,
         
        };
        await api.put(`/teachers`, teacherAtualizado);
        alert("Aluno atualizado com sucesso!");
        this.voltar();
      } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar aluno.");
      }
    },
  

    voltar() {
      this.$router.push("/professores");
    },
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
