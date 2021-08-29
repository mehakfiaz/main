import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/auth/starter/starter.module').then( m => m.StarterPageModule)
   },
  {
    path: 'navigator',
    loadChildren: () => import('../app/pages/navigator/navigator.module').then( m => m.NavigatorPageModule)
  },
  {
    path: 'starter',
    loadChildren: () => import('../app/pages/auth/starter/starter.module').then( m => m.StarterPageModule)
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
