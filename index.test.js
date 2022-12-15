jest.setTimeout(8000);

const usuarios = [];
usuarios.push(criarUsuario("fulano de sicrano", "fulano@escolar.ifrn.edu.br", "20201038060099", "senha123"));

// Existem inputs que estão dentro de divs, então é necessario usar o "click" e "keybord.type"
const seletores = receberSeletores();

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
      if(page.url() != urls.login){
        await page.goto(urls.login);
      }
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
    });

    it('Botão cadastrar-se deve levar a tela de cadastro (title = Semadec - Cadastre-se)', async () => {
      if(page.url() != urls.login){
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
      if(page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      await expect(page.waitForSelector(seletores.botoes.irEntrar)).resolves.toBeTruthy();
    });

    it('Botão "entrar", na tela de cadastro, deve levar a tela inicial (title = Semadec - Login)', async () => {
      if(page.url() != urls.cadastrar){
        await page.goto(urls.cadastrar);
      }
      
      await page.click(seletores.botoes.irEntrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    });

    it('Tentar acessar paginas sem a autenticação não deve ser permitido', async () => {
      if(page.url() != urls.login){
        await page.goto(urls.login);
      }

      await page.goto(urls.home);
      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();
    

    });

    it('Ao cliquar em "entrar" na tela inicial sem adicionar nada em nenhum input, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(page.url() != urls.login){
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
      if(page.url() != urls.login){
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
      await page.click(seletores.botoes.irCadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial adicionando email e senha não existentes no banco de dados, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(page.url() != urls.login){
        await page.goto(urls.login);
      }
      await page.reload();

      await page.click(seletores.inputs.loginEmail);
      await page.keyboard.type(usuarios[0].email);
      await page.click(seletores.inputs.loginSenha);
      await page.keyboard.type(usuarios[0].senhaErrada);

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: false})).resolves.toBeTruthy();
      await page.click(seletores.botoes.irCadastrar);

      await expect(page.title()).resolves.toMatch(seletores.titulos.login);
      await expect(page.waitForSelector(seletores.botoes.irCadastrar)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginEmail)).resolves.toBeTruthy();
      await expect(page.waitForSelector(seletores.inputs.loginSenha)).resolves.toBeTruthy();

      await expect(page.waitForSelector(seletores.textos.loginErro, {visible: true})).resolves.toBeTruthy();
    });
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
    entrar: 'button[data-testid="btnEntrar"]',
    cadastrar: 'button[data-testid="cadastrar"]'
  };
  const inputs = {
    loginEmail: 'div[data-testid="inputEmail"]',
    loginSenha: 'div[data-testid="inputSenha"]',
    signupNome: 'div[data-testid="nome"]',
    signupFeminino: 'input[value="feminino"]',
    signupMasculino: 'input[value="masculino"]',
    signupConfSenha: 'div[data-testid="confSenha"]',

  };
  const textos = {
    loginErro: 'label[data-testid="loginErro"]',
    signupErro: 'label[data-testid="signupErro"]'
  }
  const titulos = {
    login: 'Semadec - Login',
    cadastrar: 'Semadec - Cadastre-se',
    home: 'Semadec - Home'
  };
  return {botoes: botoes, inputs: inputs, titulos: titulos, textos: textos};
}

function receberUrls(){
  return {
    login: 'http://localhost:3000',
    cadastrar: 'http://localhost:3000/signup',
    home: 'http://localhost:3000/home'
  };
}