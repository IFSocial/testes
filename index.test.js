jest.setTimeout(10000);


describe('Testes E2E', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000');
      const nome = "fulano de sicrano";
      const email = "fulano@escolar.ifrn.edu.br";
      const matricula = "20201038060099";
      const senha = "senha123";
    });
  
    it('Ao entrar na tela inicial, o título se chamar "SEMADEC"', async () => {
      await expect(page.title()).resolves.toMatch('SEMADEC');
    });

    it('Botão Cadastrar-se deve existir na tela inicial', async () => {
      await expect(page.waitForSelector('button[itemid="cadastrar"]')).resolves.toBeTruthy();
    });

    it('Botão cadastrar-se deve levar a tela de cadastro', async () => {
      await page.click('button[itemid="cadastrar"]');
      await expect(page.waitForSelector('input[id=":rb:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[id=":rd:"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[value="feminino"]')).resolves.toBeTruthy();
      await expect(page.waitForSelector('input[value="masculino"]')).resolves.toBeTruthy();
    });


  });