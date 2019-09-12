import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsPortalComponent } from './admins-portal.component';

describe('AdminsPortalComponent', () => {
  let component: AdminsPortalComponent;
  let fixture: ComponentFixture<AdminsPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
