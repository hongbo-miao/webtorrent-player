import { WebtorrentPlayerPage } from './app.po';

describe('webtorrent-player App', function() {
  let page: WebtorrentPlayerPage;

  beforeEach(() => {
    page = new WebtorrentPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
