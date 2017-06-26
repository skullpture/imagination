import { ImaginationPage } from './app.po';

describe('imagination App', () => {
  let page: ImaginationPage;

  beforeEach(() => {
    page = new ImaginationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
