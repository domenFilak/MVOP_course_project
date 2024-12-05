import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnalyzeCompaniesComponent } from './select-analyze-companies.component';

describe('SelectAnalyzeCompaniesComponent', () => {
  let component: SelectAnalyzeCompaniesComponent;
  let fixture: ComponentFixture<SelectAnalyzeCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAnalyzeCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAnalyzeCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
