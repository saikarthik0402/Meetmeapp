import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountmenuComponent } from './accountmenu.component';

describe('AccountmenuComponent', () => {
  let component: AccountmenuComponent;
  let fixture: ComponentFixture<AccountmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
