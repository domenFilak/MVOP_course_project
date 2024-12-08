import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhpAnalyzeMethodComponent } from './ahp-analyze-method.component';

describe('AhpAnalyzeMethodComponent', () => {
  let component: AhpAnalyzeMethodComponent;
  let fixture: ComponentFixture<AhpAnalyzeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AhpAnalyzeMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhpAnalyzeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
