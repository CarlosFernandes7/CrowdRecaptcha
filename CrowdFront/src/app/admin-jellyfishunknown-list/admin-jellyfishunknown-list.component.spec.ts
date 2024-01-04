import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJellyfishunknownListComponent } from './admin-jellyfishunknown-list.component';

describe('AdminJellyfishunknownListComponent', () => {
  let component: AdminJellyfishunknownListComponent;
  let fixture: ComponentFixture<AdminJellyfishunknownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJellyfishunknownListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminJellyfishunknownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
