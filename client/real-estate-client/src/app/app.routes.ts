import { Routes } from '@angular/router';
import { ApartmentsList } from './pages/apartments-list/apartments-list';
import { ApartmentDetails } from './pages/apartment-detailes/apartment-detailes';
import { ApartmentForm } from './pages/apartment-form/apartment-form';

export const routes: Routes = [
  { path: '', redirectTo: 'apartments', pathMatch: 'full' },
  { path: 'apartments', component: ApartmentsList },
  { path: 'apartments/:id', component: ApartmentDetails },
  { path: 'create-apartment', component: ApartmentForm },
  { path: 'edit-apartment/:id', component: ApartmentForm },
  { path: '**', redirectTo: 'apartments' }
];

