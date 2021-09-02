import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/pages/auth/login/login.module').then( m => m.LoginPageModule)
   },
  {
    path: 'navigator',
    loadChildren: () => import('../app/pages/navigator/navigator.module').then( m => m.NavigatorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../app/pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
