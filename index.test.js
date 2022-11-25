jest.setTimeout(8000);

const nome = "fulano de sicrano";
const email = "fulano@escolar.ifrn.edu.br";
const matricula = "20201038060099";
const senha = "senha123";

describe('Testes E2E', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000');
    });
  
    it('Ao entrar na tela inicial, o título se chamar "SEMADEC"', async () => {
      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();
    });

    it('Botão Cadastrar-se deve existir na tela inicial', async () => {
      await expect(page.waitForSelector('button[itemid="cadastrar"]')).resolves.toBeTruthy();
    });

    it('Botão cadastrar-se deve levar a tela de cadastro (title = SEMADEC - Cadastre-se)', async () => {
      await page.click('button[itemid="cadastrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC - Cadastre-se');
      await expect(page.waitForSelector('input[id=":rb:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":rd:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[value="feminino"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[value="masculino"]')).resolves.toBeTruthy();
    });

    it('Na tela de Cadastro, deve haver botão "entrar" de retornar a tela inicial', async () => {
      if(page.url() != 'http://localhost:3000/signup'){
        await page.goto('http://localhost:3000/signup');
      }
      await expect(page.waitForSelector('button[itemid="entrar"]')).resolves.toBeTruthy();
    });

    it('Botão "entrar", na tela de cadastro, deve levar a tela inicial (title = SEMADEC)', async () => {
      if(page.url() != 'http://localhost:3000/signup'){
        await page.goto('http://localhost:3000/signup');
      }
      
      await page.click('button[itemid="entrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial sem adicionar nada em nenhum input, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(page.url() != 'http://localhost:3000'){
        await page.goto('http://localhost:3000');
      }

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ', {visible: false})).resolves.toBeTruthy();

      await page.click('button[itemid="entrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ')).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial sem adicionar nada em apenas um dos inputs para cada input, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(page.url() != 'http://localhost:3000'){
        await page.goto('http://localhost:3000');
      }
      await page.reload();

      await page.type('input[id=":r1:"]', nome)

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ', {visible: false})).resolves.toBeTruthy();
      await page.click('button[itemid="entrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ')).resolves.toBeTruthy();

      await page.reload();

      await page.type('input[id=":r3:"]', nome)

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ', {visible: false})).resolves.toBeTruthy();
      await page.click('button[itemid="entrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ')).resolves.toBeTruthy();
    });

    it('Ao cliquar em "entrar" na tela inicial adicionando email e senha não existentes no banco de dados, deve não fazer login, não saindo da página e emitindo mensagem avisando usuario', async () => {
      if(page.url() != 'http://localhost:3000'){
        await page.goto('http://localhost:3000');
      }
      await page.reload();

      await page.type('input[id=":r1:"]', nome)
      await page.type('input[id=":r3:"]', nome)

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ', {visible: false})).resolves.toBeTruthy();
      await page.click('button[itemid="entrar"]');

      await expect(page.title()).resolves.toMatch('SEMADEC');
      await expect(page.waitForSelector('.sc-eDvSVe.iJIwIK')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r1:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":r3:"]')).resolves.toBeTruthy();

      await expect(page.waitForSelector('.sc-jSUZER.jwQhsZ')).resolves.toBeTruthy();
    });
  });