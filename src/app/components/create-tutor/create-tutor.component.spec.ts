import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTutorComponent } from './create-tutor.component';

describe('CreateTutorComponent', () => {
  let component: CreateTutorComponent;
  let fixture: ComponentFixture<CreateTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTutorComponent]
    });
    fixture = TestBed.createComponent(CreateTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
