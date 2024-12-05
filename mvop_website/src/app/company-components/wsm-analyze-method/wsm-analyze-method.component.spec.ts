import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsmAnalyzeMethodComponent } from './wsm-analyze-method.component';

describe('WsmAnalyzeMethodComponent', () => {
  let component: WsmAnalyzeMethodComponent;
  let fixture: ComponentFixture<WsmAnalyzeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsmAnalyzeMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WsmAnalyzeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
