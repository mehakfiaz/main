import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigatorPage } from './navigator.page';

const routes: Routes = [
  {
    path: '',
    component: NavigatorPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../auth/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'order-info',
        loadChildren: () => import('../../pages/orders/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../../pages/orders/order/order.module').then( m => m.OrderPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('../../pages/explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../../pages/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'favourite',
        loadChildren: () => import('../../pages/favourite/favourite.module').then( m => m.FavouritePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/auth/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'addresses',
        loadChildren: () => import('../../pages/addresses/addresses.module').then( m => m.AddressesPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../../pages/help/help.module').then( m => m.HelpPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../../pages/notification/notification.module').then( m => m.NotificationPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigatorPageRoutingModule {}
