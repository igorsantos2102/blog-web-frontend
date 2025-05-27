import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { EditPostComponent } from './pages/edit-post/edit-post.component';


const routes: Routes = [
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},  
  {path: 'view-all', component: ViewAllComponent},  
  {path: 'search-by-name', component: SearchByNameComponent},  
  {path: 'view-post/:id', component: ViewPostComponent},  
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
