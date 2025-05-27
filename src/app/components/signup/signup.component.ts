import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  // Facilita acesso no template
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  private passwordMatchValidator(fg: FormGroup): null {
    const pass = fg.get('password')!;
    const confirm = fg.get('confirmPassword')!;
    if (pass.value !== confirm.value) {
      confirm.setErrors({ passwordMismatch: true });
    } else {
      confirm.setErrors(null);
    }
    return null;
  }


  signup() {
    if (this.signupForm.invalid) return;
    this.service.signup(this.signupForm.value).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigateByUrl('/login');
      },
      error: err => {
        if (err.status === 409) {
          // usuário já existe
          alert('Email já cadastrado.');
        } else {
          alert('Erro no cadastro. Tente novamente.');
        }
      }
    });
  }
}
