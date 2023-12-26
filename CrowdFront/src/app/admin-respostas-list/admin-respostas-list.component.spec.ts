import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRespostasListComponent } from './admin-respostas-list.component';

describe('AdminRespostasListComponent', () => {
  let component: AdminRespostasListComponent;
  let fixture: ComponentFixture<AdminRespostasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRespostasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRespostasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
