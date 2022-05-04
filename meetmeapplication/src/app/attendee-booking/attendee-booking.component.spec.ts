import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeBookingComponent } from './attendee-booking.component';

describe('AttendeeBookingComponent', () => {
  let component: AttendeeBookingComponent;
  let fixture: ComponentFixture<AttendeeBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
