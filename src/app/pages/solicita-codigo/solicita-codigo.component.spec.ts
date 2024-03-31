import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitaCodigoComponent } from './solicita-codigo.component';

describe('SolicitaCodigoComponent', () => {
  let component: SolicitaCodigoComponent;
  let fixture: ComponentFixture<SolicitaCodigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitaCodigoComponent]
    });
    fixture = TestBed.createComponent(SolicitaCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
