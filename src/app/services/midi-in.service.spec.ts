import { TestBed } from '@angular/core/testing';

import { MidiInService } from './midi-in.service';

describe('MidiInService', () => {
  let service: MidiInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MidiInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
