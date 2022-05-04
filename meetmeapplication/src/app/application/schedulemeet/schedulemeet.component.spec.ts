import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulemeetComponent } from './schedulemeet.component';

describe('SchedulemeetComponent', () => {
  let component: SchedulemeetComponent;
  let fixture: ComponentFixture<SchedulemeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulemeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulemeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
