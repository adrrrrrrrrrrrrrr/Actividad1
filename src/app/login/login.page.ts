import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formulario: FormGroup;
  public errorMessage: string = ''; // Inicializa aquí

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.formulario = fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
  }

  public submitLogin() {
    if (this.formulario.valid) {
      const username = this.formulario.value.username;
      const password = this.formulario.value.password;
      this.onLogin(username, password);
    } else {
      this.errorMessage = 'Usuario y contraseña son obligatorios';
    }
  }

  public onLogin(username: string, password: string) {
    this.authService.login(username, password)
      .then(data => {
        console.log('Logged in successfully:', data);
        this.router.navigate(['/productos']);

        this.errorMessage = ''; // Limpia el mensaje de error si el inicio es exitoso
        // Aquí puedes redirigir al usuario o realizar otras acciones
      })
      .catch(err => {
        // Aquí verifica si el error es por contraseña incorrecta
        if (err.message === 'Login failed') {
          this.errorMessage = 'Contraseña incorrecta'; // Mensaje específico
        } else {
          this.errorMessage = 'Error en el inicio de sesión'; // Mensaje genérico
        }
        console.error('Login error:', err);
      });
  }
}
