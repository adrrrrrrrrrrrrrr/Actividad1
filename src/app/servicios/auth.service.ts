import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public login(username: string, password: string) {
    return fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Login failed');
      }
      return res.json();
    })
    .then(data => {
      console.log('Respuesta de la API:', data); // Verifica lo que devuelve la API
      if (data && data.accessToken) {
        // Almacena el token en localStorage
        localStorage.setItem('accessToken', data.accessToken);
        console.log('Token almacenado:', data.accessToken);
      } else {
        throw new Error('No access token returned');
      }
      return data;
    });
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken'); // Obtiene el token de localStorage
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null; // Verifica si hay un token
  }

  public logout(): void {
    localStorage.removeItem('accessToken'); // Elimina el token del localStorage
  }



  public getUserInfo() {
    const token = localStorage.getItem('accessToken');
    
    return fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Aquí pasas el token real
      }, 
      credentials: 'include'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch user info');
      }
      return res.json();
    })
    .then(data => {
      console.log('Información del usuario:', data);
      return data; // Retorna los datos del usuario
    });
  }
  
}
