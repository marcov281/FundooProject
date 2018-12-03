import { TestBed } from '@angular/core/testing';

import { MessagingService } from './push-notification.service';

describe('PushNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagingService = TestBed.get(MessagingService);
    expect(service).toBeTruthy();
  });
});
