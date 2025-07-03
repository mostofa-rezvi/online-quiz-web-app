import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInfoModalComponent } from './quiz-info-modal.component';

describe('QuizInfoModalComponent', () => {
  let component: QuizInfoModalComponent;
  let fixture: ComponentFixture<QuizInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
