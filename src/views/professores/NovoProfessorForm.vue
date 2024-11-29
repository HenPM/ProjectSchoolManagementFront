<template>
  <div class="container">
   
    <form @submit.prevent="salvarProfessor">
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input v-model="teacher.nome" type="text" class="form-control" id="nome" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="teacher.email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="cpf" class="form-label">CPF</label>
        <input v-model="teacher.cpf" type="number" class="form-control" id="cpf" required />
      </div>
      <div class="mb-3">
        <label for="telefone" class="form-label">Endereço</label>
        <input v-model="teacher.telefone" type="text" class="form-control" id="telefone" />
      </div>
    
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>
<script>
import api from "../../services/api";

export default {
  name: "NovoProfessorForm",
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
    async carregarProfessor() {
      const id = this.$route.query.id;
      if (id) {
        try {
          this.carregando = true;
          const response = await api.get(`/teachers/${id}`);
          this.aluno = {
            ...response.data,
           
          };
        } catch (error) {
          console.error("Erro ao carregar o professor:", error);
          alert("Não foi possível carregar os dados do professor.");
        } finally {
          this.carregando = false;
        }
      } else {
        alert("ID do professor não fornecido.");
        this.voltar();
      }
    },

   

    async salvarProfessor() {
      try {
        const teacherAtualizado = {
          ...this.teacher,
         
        };
        
          await api.post(`/teachers`, teacherAtualizado); // Adiciona o id na URL
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
   
   
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>