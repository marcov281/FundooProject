import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QAComponent } from './qa.component';

describe('QAComponent', () => {
  let component: QAComponent;
  let fixture: ComponentFixture<QAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ask question ', () => {
   component.questionBody= {
      "message": "fafa21313a@#$",
      "notesId": "datv7143v91c1u3"
    }
    expect(component.questionBody).toBeTruthy();
  });

});
