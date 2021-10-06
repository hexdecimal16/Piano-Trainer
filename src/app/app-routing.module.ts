import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SheetComponent } from './pages/sheet/sheet.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  }, 
  {
    path: 'sheet',
    component: SheetComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
