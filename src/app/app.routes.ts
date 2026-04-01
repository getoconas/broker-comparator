import { Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';

export const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: '**', pathMatch:'full', redirectTo:'calculator' }
];
