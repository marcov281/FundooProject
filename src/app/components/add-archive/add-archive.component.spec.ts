import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArchiveComponent } from './add-archive.component';

describe('AddArchiveComponent', () => {
  let component: AddArchiveComponent;
  let fixture: ComponentFixture<AddArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
