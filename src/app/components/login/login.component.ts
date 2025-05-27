import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe(response => {
      localStorage.setItem('JWT', response.jwtToken);
      localStorage.setItem('email', response.username);
      this.router.navigateByUrl('/view-all');
    }, err => {
      console.error(err);
      alert('Erro no login. Tente novamente.');
    });
  }

}
