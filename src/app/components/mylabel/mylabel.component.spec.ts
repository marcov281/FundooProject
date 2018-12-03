import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MylabelComponent } from './mylabel.component';

describe('MylabelComponent', () => {
  let component: MylabelComponent;
  let fixture: ComponentFixture<MylabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MylabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
