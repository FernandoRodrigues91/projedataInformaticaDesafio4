import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from './usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana.silva@email.com',
      cpf: '111.111.111-11',
      telefone: '(21) 91111-1111',
      tipoTelefone: 'celular',
    },
    {
      id: 2,
      nome: 'Bruno Costa',
      email: 'bruno.costa@email.com',
      cpf: '222.222.222-22',
      telefone: '(21) 2222-2222',
      tipoTelefone: 'fixo',
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla.souza@email.com',
      cpf: '333.333.333-33',
      telefone: '(21) 93333-3333',
      tipoTelefone: 'celular',
    },
  ];

  private proximoId = 4;

  listar(): Observable<Usuario[]> {
    return of([...this.usuarios]).pipe(delay(800));
  }

  criar(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    const novoUsuario: Usuario = {
      ...usuario,
      id: this.proximoId++,
    };

    this.usuarios.push(novoUsuario);

    return of(novoUsuario).pipe(delay(500));
  }

  atualizar(id: number, dados: Omit<Usuario, 'id'>): Observable<Usuario> {
    const index = this.usuarios.findIndex((u) => u.id === id);

    if (index === -1) {
      return throwError(() => new Error('Usuário não encontrado'));
    }

    const usuarioAtualizado: Usuario = { ...dados, id };
    this.usuarios[index] = usuarioAtualizado;

    return of(usuarioAtualizado).pipe(delay(500));
  }
}