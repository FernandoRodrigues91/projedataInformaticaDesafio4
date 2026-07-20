# Desafio Técnico — Front-End Angular (Attus)

Aplicação de listagem de usuários desenvolvida para o desafio prático (item 4) da avaliação técnica da Attus Procuradoria Digital.

## O que foi feito

- Listagem de usuários com cards (nome, e-mail e botão de editar)
- Filtro por nome com debounce de 300ms
- Estado de loading durante o carregamento e mensagem de erro em caso de falha (com botão de tentar novamente)
- Modal de cadastro/edição de usuário, com formulário reativo e validação por campo
- Botão de salvar desabilitado enquanto o formulário estiver inválido
- No modo edição, o formulário já vem preenchido com os dados do usuário selecionado
- Dados mockados em um service (array estático simulando uma API, com delay artificial pra simular tempo de resposta real)

## Stack utilizada

- Angular 17+ (standalone components)
- Angular Material
- Signals (estado local do componente de listagem)
- RxJS (debounceTime, distinctUntilChanged, takeUntilDestroyed)
- Jest (testes unitários)

## Estrutura do projeto

src/app/features/users/
├── data-access/     → modelo do usuário e service (dados mockados)
├── ui/              → modal de cadastro/edição (componente reutilizável)
└── feature-users/   → componente da listagem (tela principal)

## Como rodar o projeto

```bash
npm install
ng serve
```

Depois é só acessar `http://localhost:4200`.

## Como rodar os testes

```bash
npm test
```

Para ver o relatório de cobertura:

```bash
npm test -- --coverage
```

Cobertura atual: 100% statements, 85,71% branch, 100% functions, 100% lines.

## Observações

- O desafio pedia criação e edição de usuário (não foi solicitada exclusão), então não implementei um delete.
- Os dados ficam salvos apenas em memória durante a execução — ao dar refresh na página, a lista volta ao estado inicial (3 usuários mockados).