import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultModalComponent } from './quiz-result-modal.component';

describe('QuizResultModalComponent', () => {
  let component: QuizResultModalComponent;
  let fixture: ComponentFixture<QuizResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizResultModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
