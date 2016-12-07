import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { PlayerService } from './';

class MockPlayerService extends PlayerService {
  video = {
    duration: 100,
    currentTime: 10
  };

  torrent = {
    downloadSpeed: 20,
    uploadSpeed: 10
  };

  getVideo(): Observable<void> {
    return Observable.create(observer => {
      this.video = {
        duration: 1000,
        currentTime: 0
      };

      this.torrent = {
        downloadSpeed: 200,
        uploadSpeed: 100
      };

      observer.next();
    });
  }

  checkCompatibility(): Observable<boolean> {
    return Observable.of(true);
  }
}

describe('Service: PlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PlayerService, useClass: MockPlayerService },
        MockBackend
      ],
    });
  });

  it('should check compatibility', inject([PlayerService], (playerService: PlayerService) => {
    playerService.checkCompatibility().subscribe(isCompatible => {
      expect(isCompatible).toBe(true);
    });
  }));

  it('should get video', inject([PlayerService], (playerService: PlayerService) => {
    playerService.getVideo('https://example.com/').subscribe(result => {
      expect(playerService.video).toEqual({ duration: 1000, currentTime: 0 });
      expect(playerService.torrent).toEqual({ downloadSpeed: 200, uploadSpeed: 100 });
      expect(result).toBeUndefined();
    });
  }));

  it('should jump to 5', inject([PlayerService], (playerService: PlayerService) => {
    playerService.jumpTo(5).subscribe(progress => {
      expect(progress).toBe(5);
    });
  }));

  it('should return info { downloadSpeed: 20, uploadSpeed: 10 }', inject([PlayerService], (playerService: PlayerService) => {
    playerService.updateInfo().subscribe(info => {
      expect(info).toEqual({ downloadSpeed: playerService.torrent.downloadSpeed, uploadSpeed: playerService.torrent.uploadSpeed });
    });
  }));

  it('should update progress', inject([PlayerService], (playerService: PlayerService) => {
    playerService.updateProgress().subscribe(progress => {
      expect(progress).toBe(playerService.video.currentTime / playerService.video.duration * 1000);
    });
  }));

  it('should drift', inject([PlayerService], (playerService: PlayerService) => {
    const expected = playerService.video.currentTime - 5;
    playerService.drift(-5);
    expect(playerService.video.currentTime).toBe(expected);
  }));
});
