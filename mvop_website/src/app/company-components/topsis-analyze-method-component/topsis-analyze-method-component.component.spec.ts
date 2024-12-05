import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsisAnalyzeMethodComponentComponent } from './topsis-analyze-method-component.component';

describe('TopsisAnalyzeMethodComponentComponent', () => {
  let component: TopsisAnalyzeMethodComponentComponent;
  let fixture: ComponentFixture<TopsisAnalyzeMethodComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopsisAnalyzeMethodComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopsisAnalyzeMethodComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
