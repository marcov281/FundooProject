import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetErrorComponent } from './internet-error.component';

describe('InternetErrorComponent', () => {
  let component: InternetErrorComponent;
  let fixture: ComponentFixture<InternetErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
