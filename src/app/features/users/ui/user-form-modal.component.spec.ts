import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFormModalComponent } from './user-form-modal.component';
import { Usuario } from '../data-access/usuario.model';

describe('UserFormModalComponent', () => {
  let dialogRefMock: any;

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn(),
    };
  });

  it('deve criar o componente em modo criação (sem dados)', async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormModalComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
    expect(component.modoEdicao).toBe(false);
    expect(component.formulario.get('nome')?.value).toBe('');
  });

  it('deve preencher o formulário automaticamente em modo edição', async () => {
    const usuarioMock: Usuario = {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana@email.com',
      cpf: '111.111.111-11',
      telefone: '(21) 91111-1111',
      tipoTelefone: 'celular',
    };

    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: usuarioMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormModalComponent);
    const component = fixture.componentInstance;

    expect(component.modoEdicao).toBe(true);
    expect(component.formulario.get('nome')?.value).toBe('Ana Silva');
    expect(component.formulario.get('email')?.value).toBe('ana@email.com');
  });

  it('não deve fechar o modal se o formulário estiver inválido', async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormModalComponent);
    const component = fixture.componentInstance;

    component.salvar();

    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('deve fechar o modal com os dados quando o formulário for válido', async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormModalComponent);
    const component = fixture.componentInstance;

    component.formulario.setValue({
      nome: 'Teste Silva',
      email: 'teste@email.com',
      cpf: '000.000.000-00',
      telefone: '(21) 90000-0000',
      tipoTelefone: 'celular',
    });

    component.salvar();

    expect(dialogRefMock.close).toHaveBeenCalledWith(
      expect.objectContaining({ nome: 'Teste Silva' })
    );
  });

  it('deve fechar o modal sem dados ao cancelar', async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(UserFormModalComponent);
    const component = fixture.componentInstance;

    component.cancelar();

    expect(dialogRefMock.close).toHaveBeenCalledWith();
  });
});