import { createRouter, createWebHistory } from 'vue-router';

// Importando componentes de cada pasta
import Home from './views/HomePageView.vue';

// Alunos
import Alunos from './views/alunos/AlunosPageView.vue';
import NovoAluno from './views/alunos/NovoAlunoForm.vue';
import EditarAluno from './views/alunos/EditarAlunoForm.vue';

// Cursos
import Cursos from './views/cursos/CursosPageView.vue';
import NovoCurso from './views/cursos/NovoCursoForm.vue';
import EditarCurso from './views/cursos/EditarCursoForm.vue';

// Professores
import Professores from './views/professores/ProfessoresPageView.vue';
import NovoProfessor from './views/professores/NovoProfessorForm.vue';
import EditarProfessor from './views/professores/EditarProfessorForm.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },

  // Rotas de Alunos
  { path: '/alunos', name: 'Alunos', component: Alunos },
  { path: '/alunos/novo', name: 'NovoAluno', component: NovoAluno },
  { path: '/alunos/editar', name: 'EditarAluno', component: EditarAluno },

  // Rotas de Cursos
  { path: '/cursos', name: 'Cursos', component: Cursos },
  { path: '/cursos/novo', name: 'NovoCurso', component: NovoCurso },
  { path: '/cursos/editar', name: 'EditarCurso', component: EditarCurso },

  // Rotas de Professores
  { path: '/professores', name: 'Professores', component: Professores },
  { path: '/professores/novo', name: 'NovoProfessor', component: NovoProfessor },
  { path: '/professores/editar', name: 'EditarProfessor', component: EditarProfessor },
];

const router = createRouter({
    history: createWebHistory('/front-management-school-app/'),  // A base é a subpasta
    routes,
  });

export default router;