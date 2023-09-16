import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilesAndImageComponent } from './upload-files-and-image.component';

describe('UploadFilesAndImageComponent', () => {
  let component: UploadFilesAndImageComponent;
  let fixture: ComponentFixture<UploadFilesAndImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFilesAndImageComponent]
    });
    fixture = TestBed.createComponent(UploadFilesAndImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
