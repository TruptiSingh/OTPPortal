import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUserFileComponent } from './store-user-file.component';

describe('StoreUserFileComponent', () => {
  let component: StoreUserFileComponent;
  let fixture: ComponentFixture<StoreUserFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreUserFileComponent]
    });
    fixture = TestBed.createComponent(StoreUserFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
