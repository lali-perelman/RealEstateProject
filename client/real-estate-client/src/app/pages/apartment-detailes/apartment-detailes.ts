
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../../services/api';
import { Apartment } from '../../models/apartment';

@Component({
  selector: 'app-apartment-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './apartment-detailes.html',
  styleUrls: ['./apartment-detailes.css'],
})
export class ApartmentDetails implements OnInit {
  apartment: Apartment | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('route id:', id);

    if (!id || isNaN(id)) {
      this.router.navigate(['/apartments']);
      return;
    }

    this.api.getApartmentById(id).subscribe({
      next: (data: any) => {
        console.log('apartment details response:', data);

        if (Array.isArray(data) && data.length > 0) {
          this.apartment = data[0];
          console.log('AFTER SET:', this.apartment);
          this.cdr.detectChanges();
        } else {
          console.log('No apartment found');
          this.router.navigate(['/apartments']);
        }
      },
      error: (err) => {
        console.error('Error fetching apartment details:', err);
        this.router.navigate(['/apartments']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/apartments']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/edit-apartment', id]);
  }
}