import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './AngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { LOCALE_ID } from '@angular/core';
import locale from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { EditPostComponent } from './pages/edit-post/edit-post.component';


registerLocaleData(locale, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    SearchByNameComponent,
    DashboardComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [ {provide:LOCALE_ID, useValue: 'pt-BR'},
    AuthGuard, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
