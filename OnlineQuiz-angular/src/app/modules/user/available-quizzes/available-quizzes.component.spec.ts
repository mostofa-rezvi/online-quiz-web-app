import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableQuizzesComponent } from './available-quizzes.component';

describe('AvailableQuizzesComponent', () => {
  let component: AvailableQuizzesComponent;
  let fixture: ComponentFixture<AvailableQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailableQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
