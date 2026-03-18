// // import { Component, inject } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { Api } from '../../services/api';

// // @Component({
// //   selector: 'app-apartment-form',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule],
// //   templateUrl: './apartment-form.html',
// //   styleUrls: ['./apartment-form.css']
// // })
// // export class ApartmentForm {
// //   private fb = inject(FormBuilder);
// //   private api = inject(Api);
// //   private router = inject(Router);

// //   isSubmitted: boolean = false;
// //   isLoading: boolean = false;
// //   errorMessage: string = '';

// //   apartmentForm = this.fb.group({
// //     Title: ['', [Validators.required, Validators.minLength(3)]],
// //     Description: ['', [Validators.required, Validators.minLength(10)]],
// //     Price: [null as number | null, [Validators.required, Validators.min(1)]],
// //     StatusId: [null as number | null, [Validators.required, Validators.min(1)]],
// //     AgentId: [null as number | null, [Validators.required, Validators.min(1)]]
// //   });

// //   get f() {
// //     return this.apartmentForm.controls;
// //   }

// //   onSubmit(): void {
// //     this.isSubmitted = true;
// //     this.errorMessage = '';

// //     if (this.apartmentForm.invalid) {
// //       this.apartmentForm.markAllAsTouched();
// //       return;
// //     }

// //     this.isLoading = true;

// //     const newApartment = {
// //       Title: this.apartmentForm.value.Title!,
// //       Description: this.apartmentForm.value.Description!,
// //       Price: this.apartmentForm.value.Price!,
// //       StatusId: this.apartmentForm.value.StatusId!,
// //       AgentId: this.apartmentForm.value.AgentId!
// //     };

// //     this.api.createApartment(newApartment).subscribe({
// //       next: (response) => {
// //         this.isLoading = false;
// //         alert('הדירה נוספה בהצלחה');
// //         console.log('Create apartment response:', response);
// //         this.router.navigate(['/apartments']);
// //       },
// //       error: (err) => {
// //         this.isLoading = false;
// //         this.errorMessage = 'אירעה שגיאה בהוספת הדירה';
// //         console.error('Error creating apartment:', err);
// //       }
// //     });
// //   }

// //   resetForm(): void {
// //     this.apartmentForm.reset();
// //     this.isSubmitted = false;
// //     this.errorMessage = '';
// //   }

// //   goBack(): void {
// //     this.router.navigate(['/apartments']);
// //   }
// // }


// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Api, Status, Agent } from '../../services/api';

// @Component({
//   selector: 'app-apartment-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './apartment-form.html',
//   styleUrls: ['./apartment-form.css']
// })
// export class ApartmentForm implements OnInit {
//   private fb = inject(FormBuilder);
//   private api = inject(Api);
//   private router = inject(Router);

//   isSubmitted: boolean = false;
//   isLoading: boolean = false;
//   errorMessage: string = '';

//   statuses: Status[] = [];
//   agents: Agent[] = [];

//   apartmentForm = this.fb.group({
//     Title: ['', [Validators.required, Validators.minLength(3)]],
//     Description: ['', [Validators.required, Validators.minLength(10)]],
//     Price: [null as number | null, [Validators.required, Validators.min(1)]],
//     StatusId: [null as number | null, [Validators.required]],
//     AgentId: [null as number | null, [Validators.required]]
//   });

//   get f() {
//     return this.apartmentForm.controls;
//   }

//   ngOnInit(): void {
//     this.loadStatuses();
//     this.loadAgents();
//   }

//   loadStatuses(): void {
//     this.api.getStatuses().subscribe({
//       next: (data) => {
//         this.statuses = data;
//         console.log('Statuses loaded:', data);
//       },
//       error: (err) => {
//         console.error('Error loading statuses:', err);
//       }
//     });
//   }

//   loadAgents(): void {
//     this.api.getAgents().subscribe({
//       next: (data) => {
//         this.agents = data;
//         console.log('Agents loaded:', data);
//       },
//       error: (err) => {
//         console.error('Error loading agents:', err);
//       }
//     });
//   }

//   onSubmit(): void {
//     this.isSubmitted = true;
//     this.errorMessage = '';

//     if (this.apartmentForm.invalid) {
//       this.apartmentForm.markAllAsTouched();
//       return;
//     }

//     this.isLoading = true;

//     const newApartment = {
//       Title: this.apartmentForm.value.Title!,
//       Description: this.apartmentForm.value.Description!,
//       Price: this.apartmentForm.value.Price!,
//       StatusId: this.apartmentForm.value.StatusId!,
//       AgentId: this.apartmentForm.value.AgentId!
//     };

//     this.api.createApartment(newApartment).subscribe({
//       next: (response) => {
//         this.isLoading = false;
//         alert('הדירה נוספה בהצלחה');
//         console.log('Create apartment response:', response);
//         this.router.navigate(['/apartments']);
//       },
//       error: (err) => {
//         this.isLoading = false;
//         this.errorMessage = 'אירעה שגיאה בהוספת הדירה';
//         console.error('Error creating apartment:', err);
//       }
//     });
//   }

//   resetForm(): void {
//     this.apartmentForm.reset();
//     this.isSubmitted = false;
//     this.errorMessage = '';
//   }

//   goBack(): void {
//     this.router.navigate(['/apartments']);
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api, Status, Agent } from '../../services/api';

@Component({
  selector: 'app-apartment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apartment-form.html',
  styleUrls: ['./apartment-form.css']
})
export class ApartmentForm implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(Api);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isSubmitted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  statuses: Status[] = [];
  agents: Agent[] = [];

  isEditMode: boolean = false;
  apartmentId: number | null = null;

  apartmentForm = this.fb.group({
    Title: ['', [Validators.required, Validators.minLength(3)]],
    Description: ['', [Validators.required, Validators.minLength(10)]],
    Price: [null as number | null, [Validators.required, Validators.min(1)]],
    StatusId: [null as number | null, [Validators.required]],
    AgentId: [null as number | null, [Validators.required]]
  });

  get f() {
    return this.apartmentForm.controls;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id && !isNaN(id)) {
      this.isEditMode = true;
      this.apartmentId = id;
    }

    this.loadStatuses();
    this.loadAgents();

    if (this.isEditMode && this.apartmentId) {
      this.loadApartmentForEdit(this.apartmentId);
    }
  }

  loadStatuses(): void {
    this.api.getStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
        console.log('Statuses loaded:', data);
      },
      error: (err) => {
        console.error('Error loading statuses:', err);
      }
    });
  }

  loadAgents(): void {
    this.api.getAgents().subscribe({
      next: (data) => {
        this.agents = data;
        console.log('Agents loaded:', data);
      },
      error: (err) => {
        console.error('Error loading agents:', err);
      }
    });
  }

  loadApartmentForEdit(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.api.getApartmentById(id).subscribe({
      next: (data: any) => {
        console.log('Apartment for edit loaded:', data);

        let apartment = null;

        if (Array.isArray(data) && data.length > 0) {
          apartment = data[0];
        } else if (data) {
          apartment = data;
        }

        if (!apartment) {
          this.isLoading = false;
          this.errorMessage = 'לא נמצאה דירה לעריכה';
          return;
        }

        this.apartmentForm.patchValue({
          Title: apartment.Title ?? '',
          Description: apartment.Description ?? '',
          Price: apartment.Price ?? null,
          StatusId: apartment.StatusId ?? null,
          AgentId: apartment.AgentId ?? null
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'אירעה שגיאה בטעינת פרטי הדירה';
        console.error('Error loading apartment for edit:', err);
      }
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.apartmentForm.invalid) {
      this.apartmentForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const apartmentPayload = {
      Title: this.apartmentForm.value.Title!,
      Description: this.apartmentForm.value.Description!,
      Price: this.apartmentForm.value.Price!,
      StatusId: this.apartmentForm.value.StatusId!,
      AgentId: this.apartmentForm.value.AgentId!
    };

    if (this.isEditMode && this.apartmentId) {
      this.api.updateApartment(this.apartmentId, apartmentPayload).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert('הדירה עודכנה בהצלחה');
          console.log('Update apartment response:', response);
          this.router.navigate(['/apartments', this.apartmentId]);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'אירעה שגיאה בעדכון הדירה';
          console.error('Error updating apartment:', err);
        }
      });
    } else {
      this.api.createApartment(apartmentPayload).subscribe({
        next: (response) => {
          this.isLoading = false;
          alert('הדירה נוספה בהצלחה');
          console.log('Create apartment response:', response);
          this.router.navigate(['/apartments']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'אירעה שגיאה בהוספת הדירה';
          console.error('Error creating apartment:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.errorMessage = '';

    if (this.isEditMode && this.apartmentId) {
      this.loadApartmentForEdit(this.apartmentId);
    } else {
      this.apartmentForm.reset({
        Title: '',
        Description: '',
        Price: null,
        StatusId: null,
        AgentId: null
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/apartments']);
  }
}