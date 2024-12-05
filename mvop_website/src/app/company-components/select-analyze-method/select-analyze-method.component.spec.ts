import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnalyzeMethodComponent } from './select-analyze-method.component';

describe('SelectAnalyzeMethodComponent', () => {
  let component: SelectAnalyzeMethodComponent;
  let fixture: ComponentFixture<SelectAnalyzeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAnalyzeMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAnalyzeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
