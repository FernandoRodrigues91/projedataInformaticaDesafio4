import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UsuarioService } from '../data-access/usuario.service';
import { Usuario } from '../data-access/usuario.model';

describe('UserListComponent', () => {
  let usuarioServiceMock: jasmine.SpyObj<UsuarioService> | any;

  const usuariosMock: Usuario[] = [
    {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana@email.com',
      cpf: '111.111.111-11',
      telefone: '(21) 91111-1111',
      tipoTelefone: 'celular',
    },
  ];

  beforeEach(async () => {
    usuarioServiceMock = {
      listar: jest.fn().mockReturnValue(of(usuariosMock)),
      criar: jest.fn(),
      atualizar: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [{ provide: UsuarioService, useValue: usuarioServiceMock }],
    }).compileComponents();
  });

  it('deve criar o componente', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve carregar os usuários ao iniciar', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    expect(usuarioServiceMock.listar).toHaveBeenCalled();
    expect(fixture.componentInstance.usuarios().length).toBe(1);
    expect(fixture.componentInstance.usuarios()[0].nome).toBe('Ana Silva');
  });

  it('deve mostrar erro quando o carregamento falhar', () => {
    usuarioServiceMock.listar.mockReturnValue(
      throwError(() => new Error('Falha na API'))
    );

    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.erro()).toBe(
      'Não foi possível carregar os usuários. Tente novamente.'
    );
  });

  it('deve filtrar usuários pelo nome', (done) => {
    const usuariosComMais: Usuario[] = [
      ...usuariosMock,
      {
        id: 2,
        nome: 'Bruno Costa',
        email: 'bruno@email.com',
        cpf: '222.222.222-22',
        telefone: '(21) 92222-2222',
        tipoTelefone: 'celular',
      },
    ];

    usuarioServiceMock.listar.mockReturnValue(of(usuariosComMais));

    const fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();

    fixture.componentInstance.filtroNome.setValue('bruno');

    setTimeout(() => {
      expect(fixture.componentInstance.usuarios().length).toBe(1);
      expect(fixture.componentInstance.usuarios()[0].nome).toBe('Bruno Costa');
      done();
    }, 350);
  });
});