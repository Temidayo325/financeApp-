import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-password',
    loadChildren: () => import('./verify-password/verify-password.module').then( m => m.VerifyPasswordPageModule)
  },
  {
    path: 'create-expense',
    loadChildren: () => import('./create-expense/create-expense.module').then( m => m.CreateExpensePageModule)
  },
  {
    path: 'create-income',
    loadChildren: () => import('./create-income/create-income.module').then( m => m.CreateIncomePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  }
  // {
  //   path: 'current-expense',
  //   loadChildren: () => import('./current-expense/current-expense.module').then( m => m.CurrentExpensePageModule)
  // },
  // {
  //   path: 'past-expense',
  //   loadChildren: () => import('./past-expense/past-expense.module').then( m => m.PastExpensePageModule)
  // },
  // {
  //   path: 'specific-expense',
  //   loadChildren: () => import('./specific-expense/specific-expense.module').then( m => m.SpecificExpensePageModule)
  // }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
