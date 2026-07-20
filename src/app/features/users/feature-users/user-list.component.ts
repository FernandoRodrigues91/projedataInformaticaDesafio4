import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../data-access/usuario.service';
import { Usuario } from '../data-access/usuario.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  usuarios = signal<Usuario[]>([]);

  private readonly usuarioService = inject(UsuarioService);

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((usuarios) => {
      this.usuarios.set(usuarios);
    });
  }
}