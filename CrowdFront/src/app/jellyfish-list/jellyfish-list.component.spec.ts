import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JellyfishListComponent } from './jellyfish-list.component';

describe('JellyfishListComponent', () => {
  let component: JellyfishListComponent;
  let fixture: ComponentFixture<JellyfishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JellyfishListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JellyfishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});