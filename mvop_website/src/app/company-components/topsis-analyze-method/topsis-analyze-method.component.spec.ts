import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsisAnalyzeMethodComponent } from './topsis-analyze-method.component';

describe('TopsisAnalyzeMethodComponent', () => {
  let component: TopsisAnalyzeMethodComponent;
  let fixture: ComponentFixture<TopsisAnalyzeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopsisAnalyzeMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopsisAnalyzeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
