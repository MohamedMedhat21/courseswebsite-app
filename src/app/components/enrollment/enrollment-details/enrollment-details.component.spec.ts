import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDetailsComponent } from './enrollment-details.component';

describe('EnrollmentDetailsComponent', () => {
  let component: EnrollmentDetailsComponent;
  let fixture: ComponentFixture<EnrollmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentDetailsComponent]
    });
    fixture = TestBed.createComponent(EnrollmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
