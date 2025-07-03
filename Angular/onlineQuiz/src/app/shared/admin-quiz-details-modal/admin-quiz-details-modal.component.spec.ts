import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizDetailsModalComponent } from './admin-quiz-details-modal.component';

describe('AdminQuizDetailsModalComponent', () => {
  let component: AdminQuizDetailsModalComponent;
  let fixture: ComponentFixture<AdminQuizDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminQuizDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuizDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
