import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../data-access/usuario.model';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form-modal.component.html',
})
export class UserFormModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<UserFormModalComponent>);
  private readonly dadosUsuario = inject<Usuario | null>(MAT_DIALOG_DATA);

  formulario = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', Validators.required],
    telefone: ['', Validators.required],
    tipoTelefone: ['celular', Validators.required],
  });

  get modoEdicao(): boolean {
    return !!this.dadosUsuario;
  }

  constructor() {
    if (this.dadosUsuario) {
      this.formulario.patchValue(this.dadosUsuario);
    }
  }

  salvar(): void {
    if (this.formulario.invalid) {
      return;
    }

    this.dialogRef.close(this.formulario.value);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}