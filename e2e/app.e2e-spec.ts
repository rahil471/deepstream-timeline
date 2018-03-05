import { DsTimelinePage } from './app.po';

describe('ds-timeline App', () => {
  let page: DsTimelinePage;

  beforeEach(() => {
    page = new DsTimelinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
