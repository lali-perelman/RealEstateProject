
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Apartment } from '../../models/apartment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-apartments-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apartments-list.html',
  styleUrls: ['./apartments-list.css'],
})
export class ApartmentsList implements OnInit {
  apartments: Apartment[] = [];
  searchText: string = '';
  api = inject(Api);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('oninit called');
    this.loadApartments('');
  }

  loadApartments(filter: string = ''): void {
    this.api.getApartments(filter).subscribe({
      next: (data: Apartment[]) => {
        console.log('Apartments loaded:', data);
        this.apartments = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching apartments:', err);
      }
    });
  }

  onSearch(): void {
    const value = this.searchText.trim();
    this.loadApartments(value);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/apartments', id]);
  }

}