import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewjellyComponent } from './admin-newjelly.component';

describe('AdminNewjellyComponent', () => {
  let component: AdminNewjellyComponent;
  let fixture: ComponentFixture<AdminNewjellyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewjellyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNewjellyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
