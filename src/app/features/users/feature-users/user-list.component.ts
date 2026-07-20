import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../data-access/usuario.service';
import { Usuario } from '../data-access/usuario.model';
import { UserFormModalComponent } from '../ui/user-form-modal.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  usuarios = signal<Usuario[]>([]);
  carregando = signal(false);
  erro = signal<string | null>(null);

  filtroNome = new FormControl('');

  private todosUsuarios: Usuario[] = [];
  private readonly usuarioService = inject(UsuarioService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.carregarUsuarios();
    this.observarFiltro();
  }

  carregarUsuarios(): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.usuarioService.listar().subscribe({
      next: (usuarios) => {
        this.todosUsuarios = usuarios;
        this.usuarios.set(usuarios);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os usuários. Tente novamente.');
        this.carregando.set(false);
      },
    });
  }

  abrirModalCriar(): void {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      data: null,
      width: '90vw',
      maxWidth: '560px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.usuarioService.criar(resultado).subscribe(() => {
          this.carregarUsuarios();
        });
      }
    });
  }

  abrirModalEditar(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      data: usuario,
      width: '90vw',
      maxWidth: '560px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.usuarioService.atualizar(usuario.id, resultado).subscribe(() => {
          this.carregarUsuarios();
        });
      }
    });
  }

  private observarFiltro(): void {
    this.filtroNome.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((termo) => {
        this.filtrarUsuarios(termo || '');
      });
  }

  private filtrarUsuarios(termo: string): void {
    const termoBusca = termo.toLowerCase();

    const filtrados = this.todosUsuarios.filter((usuario) =>
      usuario.nome.toLowerCase().includes(termoBusca)
    );

    this.usuarios.set(filtrados);
  }
}