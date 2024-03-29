jest.setTimeout(10000);

const usuarios = [];
usuarios.push(criarUsuario("fulano de sicrano", "fulano@escolar.ifrn.edu.br", "20201038060099", "senha123"));

// Existem inputs que estão dentro de divs, então é necessario usar o "click" e "keybord.type"
const seletores = receberSeletores();

const emailInvalido = 'lkasnmlkanvka.com';
const urls = receberUrls();

describe('Testes E2E', () => {
    beforeAll(async () => {
      await page.goto(urls.login);
    });
  
    it('Ao entrar na tela inicial, o título se chamar "Semadec - Login"', async () => {
      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    });

    it('Botão Cadastrar-se deve existir na tela inicial', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
    });

    it('Botão cadastrar-se deve levar a tela de cadastro (title = Semadec - Cadastre-se)', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      await page.click(seletores.botoes.irCadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();
    });

    it('Na tela de Cadastro, deve haver botão "entrar" de retornar a tela inicial', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await expect(page.waitForSelector(seletores.botoes.irEntrar)).resolves.toBeTruthy();
    });

    it('Botão "entrar", na tela de cadastro, deve levar a tela inicial (title = Semadec - Login)', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      
      await page.click(seletores.botoes.irEntrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    });

    it('Tentar acessar paginas sem a autenticação não deve ser permitido', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      if(await page.url() == urls.home){
        await page.click(seletores.botoes.homeSair);
        if(await page.url() != urls.login){
          await page.goto(urls.login);
        }
      }

      await page.goto(urls.home);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();
    
      await page.goto(urls.modalidades);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();

      await page.goto(urls.horarios);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();

      await page.goto(urls.contatos);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();

      await page.goto(urls.perfil);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();

      await page.goto(urls.times);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();

      await page.goto(urls.equipes);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();
      
      await page.goto(urls.deleteInfo);
      await page.waitForSelector(seletores.botoes.irLogin);
      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();
    });

    it('Tela que bloqueia acesso sem a autenticação deve ter um botão que leva a tela de Login', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      if(await page.url() == urls.home){
        await page.click(seletores.botoes.homeSair);
        if(await page.url() != urls.login){
          await page.goto(urls.login);
        }
      }

      await page.goto(urls.home);
      await page.click(seletores.botoes.irLogin);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial sem adicionar nada em nenhum input, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: false})).resolves.toBeTruthy();

      await page.click(seletores.botoes.entrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial sem adicionar nada em apenas um dos inputs para cada input, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      await page.reload();

      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].nome);

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.irEntrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();

      await page.reload();

      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].nome);

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.irEntrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial adicionando email e senha não existentes no banco de dados, deve não cadastrar o usuario, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      await page.reload();

      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.loginSenha);
      await page.keyboard.type(usuarios[0].senhaErrada);

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.irEntrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Na tela "cadastar", sem adicionar nada em nenhum input, deve não cadastrar o usuario, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
    });
    
    it('Na tela "cadastar", sem adicionar nada em apenas um dos inputs para cada input, deve não cadastrar o usuario, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await page.reload();

      // Nada só em: "Nome"
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);
      
      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();

      await page.reload();

      // Nada só em: "Matricula"
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
      
      await page.reload();

      // Nada só em: "Email"
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
      
      await page.reload();

      // Nada só em: "Sexo"
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
      
      await page.reload();

      // Nada só em: "Senha"
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMatricula);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
      
      await page.reload();

      // Nada só em: "Confirmar Senha"
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMatricula);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
    }, 25000);

    it('Na tela "cadastar", adicionando tudo, porem com um e-mail invalido, deve não cadastrar o usuario, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await page.reload();

      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(emailInvalido);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Na tela "cadastar", adicionando tudo, porem com senhas diferente na confirmação, deve não cadastrar o usuario, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await page.reload();

      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senhaErrada);

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.cadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.cadastrar);
      await expect(page.waitForSelector(seletores.inputs.signupNome)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupConfSenha)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupFeminino)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.signupMasculino)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.signupErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Na tela "cadastar", adicionando tudo, clicando em criar conta, deve cadastrar, saindo da página indo pra o login', async () => {
      if(await page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await page.reload();
      await page.waitForSelector(seletores.inputs.signupNome);
      
      await page.click(seletores.inputs.signupNome);
      await page.keyboard.type(usuarios[0].nome);
      await page.click(seletores.inputs.signupMatricula);
      await page.keyboard.type(usuarios[0].matricula);
      await page.click(seletores.inputs.signupEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.signupMasculino);
      await page.click(seletores.inputs.signupSenha);
      await page.keyboard.type(usuarios[0].senha);
      await page.click(seletores.inputs.signupConfSenha);
      await page.keyboard.type(usuarios[0].senha);
      
      await page.waitForSelector(seletores.botoes.cadastrar);
      await page.click(seletores.botoes.cadastrar);
      await page.waitForSelector(seletores.botoes.irCadastrar);
      
      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    });

    it('Fazendo login do usuario logo após o cadastro, deve ir para a pagina Home', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
      }
      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.loginSenha);
      await page.keyboard.type(usuarios[0].senha);

      await page.click(seletores.botoes.entrar);
      await page.waitForSelector(seletores.botoes.homeEdital);

      await expect(page.title()).resolves.toMatch(seletores.titulos.home);
      await expect(page.waitForSelector(seletores.botoes.homeEdital)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeModalidade)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeSair)).resolves.toBeTruthy();
    });

    it('Se o login foi feto com sucesso no teste anterior, não deve ser possivel acessar nem a pagina de login nem de cadastro estando autenticado, retornando sempre para a Home', async () => {
      await page.goto(urls.login);
      await page.waitForSelector(seletores.botoes.homeEdital);

      await expect(page.title()).resolves.toMatch(seletores.titulos.home);
      await expect(page.waitForSelector(seletores.botoes.homeEdital)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeModalidade)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeSair)).resolves.toBeTruthy();

      await page.goto(urls.cadastrar);
      await page.waitForSelector(seletores.botoes.homeEdital);

      await expect(page.title()).resolves.toMatch(seletores.titulos.home);
      await expect(page.waitForSelector(seletores.botoes.homeEdital)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeModalidade)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.botoes.homeSair)).resolves.toBeTruthy();
    });

    it('Estando ainda autenticado na Home, botão sair deve retirar a autenticação e voltar ao login, não permitindo acesso a Home novamente', async ()=> {
      if(await page.url() != urls.home){
       await page.goto(urls.home);
      }
      await page.waitForSelector(seletores.botoes.homeSair);
      await page.click(seletores.botoes.homeSair);
      await page.waitForSelector(seletores.botoes.irCadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await page.goto(urls.home);
      await page.waitForSelector(seletores.botoes.irLogin);

      await expect(page.title()).resolves.toMatch("");
      await expect(page.waitForSelector(seletores.botoes.irLogin)).resolves.toBeTruthy();
    });

    it('Com usuário autenticado, testa os redirecionamentos do navBar', async () => {
      if(await page.url() != urls.login){
        await page.goto(urls.login);
        if(!await page.waitForSelector(seletores.botoes.irCadastrar) && await page.url() != urls.login){
          await page.goto(urls.home);
          await page.waitForSelector(seletores.botoes.homeSair);
          await page.click(seletores.botoes.homeSair);
        }
      }
      await page.waitForSelector(seletores.botoes.irCadastrar);

      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.loginSenha);
      await page.keyboard.type(usuarios[0].senha);

      await page.click(seletores.botoes.entrar);
      await expect(page.waitForSelector(seletores.botoes.homeEdital)).resolves.toBeTruthy();

      // Horários
      await page.click(seletores.botoes.navBar.horarios);
      await page.waitForSelector(seletores.botoes.horariosVerTimes);

      await expect(page.title()).resolves.toMatch(seletores.titulos.horarios);
      await expect(await page.waitForSelector(seletores.botoes.horariosVerTimes)).resolves.toBeTruthy();

      // // Contatos
      // await page.click(seletores.botoes.navBar.contatos);

      // await expect(page.title()).resolves.toMatch(seletores.titulos.contatos);

      // // Meu Perfil
      // await page.click(seletores.botoes.navBar.perfil);
      // await page.waitForSelector(seletores.botoes.perfilVerModalidade);

      // await expect(page.title()).resolves.toMatch(seletores.titulos.perfil);
      // await expect(await page.waitForSelector(seletores.botoes.perfilVerModalidade)).resolves.toBeTruthy();

      // // Home
      // await page.click(seletores.botoes.navBar.home);
      // await page.waitForSelector(seletores.botoes.homeEdital);

      // await expect(page.title()).resolves.toMatch(seletores.titulos.home);
      // await expect(page.waitForSelector(seletores.botoes.homeEdital)).resolves.toBeTruthy();
      // await expect(page.waitForSelector(seletores.botoes.homeModalidade)).resolves.toBeTruthy();

      // Logout
      await page.goto(urls.home);
      await page.waitForSelector(seletores.botoes.homeSair);
      await page.click(seletores.botoes.homeSair);
      await page.waitForSelector(seletores.botoes.irCadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
    }, 25000);
  });



function criarUsuario(nome, email, matricula, senha){
    const senhaErrada = "ahsdbvacnlkajs";
    if(senhaErrada == senha){
        senhaErrada = "ahsdbvacnlkajssalt";
    }
    return {nome: nome, email: email, matricula: matricula, senha: senha, senhaErrada: senhaErrada};
}

function receberSeletores(){
  const botoes = {
    irCadastrar: 'button[data-testid="btnCadastrar"]',
    irEntrar: 'button[data-testid="btnEntrar"]',
    irLogin: 'button[data-testid="btnLogin"]',
    entrar: 'button[data-testid="btnEntrar"]',
    cadastrar: 'button[data-testid="cadastrar"]',
    homeEdital: 'button[data-testid="edital"]',
    homeModalidade: 'button[data-testid="ver-modalidades"]',
    homeSair: 'button[data-testid="sair"]',
    horariosVerTimes: 'button[data-testid="ver-modalidades"]',
    perfilVerModalidade: 'button[data-testid="ver-modalidades"]',
    navBar:{
      home: 'a[data-testid="home"]',
      horarios: 'a[data-testid="horarios"]',
      contatos: 'a[data-testid="contatos"]',
      perfil: 'a[data-testid="perfil"]',
    },
  };
  const inputs = {
    loginEmail: 'div[data-testid="inputEmail"]',
    loginSenha: 'div[data-testid="inputSenha"]',
    signupNome: 'div[data-testid="nome"]',
    signupMatricula: 'div[data-testid="matricula"]',
    signupEmail: 'div[data-testid="email"]',
    signupFeminino: 'input[value="feminino"]',
    signupMasculino: 'input[value="masculino"]',
    signupSenha: 'div[data-testid="senha"]',
    signupConfSenha: 'div[data-testid="confSenha"]',

  };
  const textos = {
    loginErro: 'label[data-testeid="loginErro"]',
    signupErro: 'label[data-testeid="signupErro"]',
  }
  const titulos = {
    login: 'Semadec - Login',
    cadastrar: 'Semadec - Cadastre-se',
    home: 'Semadec - Home',
    horarios: 'Semadec - Horários',
    contatos: 'Semadec - contatos',
    perfil: 'Semadec - Meu Perfil'
  };
  return {botoes: botoes, inputs: inputs, titulos: titulos, textos: textos};
}

function receberUrls(){
  // const url = "http://10.49.6.3:3000"
  const url = "http://localhost:3000"
  return {
    login: url,
    cadastrar: `${url}/signup`,
    home: `${url}/home`,
    modalidades: `${url}/modalidades`,
    horarios: `${url}/horarios`,
    contatos: `${url}/contatos`,
    perfil: `${url}/perfil`,
    times: `${url}/times/1`,
    equipes: `${url}/equipes`,
    deleteInfo: `${url}/deleteInfo`
  };
}