import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJellyListComponent } from './admin-jelly-list.component';

describe('AdminJellyListComponent', () => {
  let component: AdminJellyListComponent;
  let fixture: ComponentFixture<AdminJellyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminJellyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminJellyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
