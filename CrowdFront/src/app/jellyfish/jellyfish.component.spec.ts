import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JellyfishComponent } from './jellyfish.component';

describe('JellyfishComponent', () => {
  let component: JellyfishComponent;
  let fixture: ComponentFixture<JellyfishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JellyfishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JellyfishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
