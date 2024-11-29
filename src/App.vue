<template>
  <div id="app">
    <!-- Barra de navegação com menu hambúrguer -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Meu Projeto</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/alunos" class="nav-link">Alunos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cursos" class="nav-link">Cursos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/professores" class="nav-link">Professores</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Conteúdo da página -->
    <div class="container mt-4">
      <router-view></router-view> <!-- Onde as páginas serão renderizadas -->
    </div>
  </div>
</template>

<script>
// Importando Bootstrap para garantir que a navbar funcione corretamente
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.navbar {
  margin-bottom: 20px;
}
</style>
