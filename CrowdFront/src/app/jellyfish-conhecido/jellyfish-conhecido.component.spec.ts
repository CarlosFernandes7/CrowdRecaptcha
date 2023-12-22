import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JellyfishConhecidoComponent } from './jellyfish-conhecido.component';

describe('JellyfishConhecidoComponent', () => {
  let component: JellyfishConhecidoComponent;
  let fixture: ComponentFixture<JellyfishConhecidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JellyfishConhecidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JellyfishConhecidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
