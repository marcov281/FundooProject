import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindmeComponent } from './remindme.component';

describe('RemindmeComponent', () => {
  let component: RemindmeComponent;
  let fixture: ComponentFixture<RemindmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
