import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistComponent } from './admin-userlist.component';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
