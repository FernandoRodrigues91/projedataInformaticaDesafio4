import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar os usuários mockados', (done) => {
    service.listar().subscribe((usuarios) => {
      expect(usuarios.length).toBe(3);
      expect(usuarios[0].nome).toBe('Ana Silva');
      done();
    });
  });

  it('deve criar um novo usuário e adicioná-lo à lista', (done) => {
    const novoUsuario = {
      nome: 'Teste Silva',
      email: 'teste@email.com',
      cpf: '000.000.000-00',
      telefone: '(21) 90000-0000',
      tipoTelefone: 'celular' as const,
    };

    service.criar(novoUsuario).subscribe((usuarioCriado) => {
      expect(usuarioCriado.nome).toBe('Teste Silva');
      expect(usuarioCriado.id).toBeDefined();

      service.listar().subscribe((usuarios) => {
        expect(usuarios.length).toBe(4);
        done();
      });
    });
  });

  it('deve atualizar um usuário existente', (done) => {
    const dadosAtualizados = {
      nome: 'Ana Atualizada',
      email: 'ana.nova@email.com',
      cpf: '111.111.111-11',
      telefone: '(21) 91111-1111',
      tipoTelefone: 'celular' as const,
    };

    service.atualizar(1, dadosAtualizados).subscribe((usuarioAtualizado) => {
      expect(usuarioAtualizado.nome).toBe('Ana Atualizada');
      done();
    });
  });

  it('deve retornar erro ao tentar atualizar usuário inexistente', (done) => {
    const dados = {
      nome: 'Fulano',
      email: 'fulano@email.com',
      cpf: '999.999.999-99',
      telefone: '(21) 99999-9999',
      tipoTelefone: 'fixo' as const,
    };

    service.atualizar(999, dados).subscribe({
      error: (erro) => {
        expect(erro.message).toBe('Usuário não encontrado');
        done();
      },
    });
  });
});