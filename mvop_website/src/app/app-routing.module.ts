import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './company-components/add-company/add-company.component';
import { ShowCompaniesComponent } from './company-components/show-companies/show-companies.component';
import { WelcomeComponent } from './general-components/welcome/welcome.component';
import { UpdateCompanyComponent } from './company-components/update-company/update-company.component';
import { SelectAnalyzeCompaniesComponent } from './company-components/select-analyze-companies/select-analyze-companies.component';
import { SelectAnalyzeMethodComponent } from './company-components/select-analyze-method/select-analyze-method.component';
import { TopsisAnalyzeMethodComponent } from './company-components/topsis-analyze-method/topsis-analyze-method.component';
import { WsmAnalyzeMethodComponent } from './company-components/wsm-analyze-method/wsm-analyze-method.component';
import { PrometheeAnalyzeMethodComponent } from './company-components/promethee-analyze-method/promethee-analyze-method.component';
import { AhpAnalyzeMethodComponent } from './company-components/ahp-analyze-method/ahp-analyze-method.component';
import { DisplayResultsComponent } from './company-components/display-results/display-results.component';



const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'add', component: AddCompanyComponent},
  {path: 'show', component: ShowCompaniesComponent},
  {path: 'show/update/:id', component: UpdateCompanyComponent },
  {path: 'analyze', component: SelectAnalyzeCompaniesComponent},
  {path: 'analyze/method', component: SelectAnalyzeMethodComponent},
  {path:'analyze/method/topsis', component: TopsisAnalyzeMethodComponent},
  {path:'analyze/method/wsm', component: WsmAnalyzeMethodComponent},
  {path:'analyze/method/promethee', component: PrometheeAnalyzeMethodComponent},
  {path:'analyze/method/ahp', component: AhpAnalyzeMethodComponent},
  {path: 'display', component: DisplayResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AddCompanyComponent, ShowCompaniesComponent, WelcomeComponent, UpdateCompanyComponent, SelectAnalyzeCompaniesComponent
  ,SelectAnalyzeMethodComponent, TopsisAnalyzeMethodComponent, WsmAnalyzeMethodComponent, PrometheeAnalyzeMethodComponent, AhpAnalyzeMethodComponent, DisplayResultsComponent
];
