import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrometheeAnalyzeMethodComponent } from './promethee-analyze-method.component';

describe('PrometheeAnalyzeMethodComponent', () => {
  let component: PrometheeAnalyzeMethodComponent;
  let fixture: ComponentFixture<PrometheeAnalyzeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrometheeAnalyzeMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrometheeAnalyzeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
