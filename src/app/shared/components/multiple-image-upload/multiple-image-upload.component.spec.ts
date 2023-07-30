import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleImageUploadComponent } from './multiple-image-upload.component';

describe('MultipleImageUploadComponent', () => {
  let component: MultipleImageUploadComponent;
  let fixture: ComponentFixture<MultipleImageUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleImageUploadComponent]
    });
    fixture = TestBed.createComponent(MultipleImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
