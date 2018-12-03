import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlabeldialogComponent } from './userlabeldialog.component';

describe('UserlabeldialogComponent', () => {
  let component: UserlabeldialogComponent;
  let fixture: ComponentFixture<UserlabeldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlabeldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlabeldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
