import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutorProfileComponent } from './edit-tutor-profile.component';

describe('EditTutorProfileComponent', () => {
  let component: EditTutorProfileComponent;
  let fixture: ComponentFixture<EditTutorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTutorProfileComponent]
    });
    fixture = TestBed.createComponent(EditTutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
