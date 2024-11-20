import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'cadastro-pessoas', loadComponent: () => import('./features/pessoas/cadastro-pessoas/cadastro-pessoas.component').then(m => m.CadastroPessoasComponent) },
  { path: 'cadastro-atividades', loadComponent: () => import('./features/atividades/cadastro-atividades/cadastro-atividades.component').then(m => m.CadastroAtividadesComponent) },
  { path: 'lista-pessoas', loadComponent: () => import('./features/pessoas/lista-pessoas/lista-pessoas.component').then((m) => m.ListaPessoasComponent) },

];
