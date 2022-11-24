describe('Testes E2E', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000');
    });
  
    it('Ao entrar na tela inicial, o título se chamar "SEMADEC"', async () => {
      await expect(page.title()).resolves.toMatch('SEMADEC');
    });
  });