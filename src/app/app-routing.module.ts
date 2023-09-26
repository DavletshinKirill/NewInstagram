import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoutingComponent } from './components/routing/routing.component';


const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  },
  {
  path: 'login',
  component: LoginComponent,
  },
    {
    path: 'admin',
    component: AdminComponent,
    },

    {
      path: 'user/:id',
      component: UserComponent,
    },
      {
        path: 'routing',
        component: RoutingComponent
        },
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
