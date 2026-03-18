
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment';

export interface Status {
  Id: number;
  Name: string;
}

export interface Agent {
  Id: number;
  FullName: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'https://localhost:7001/api/exec';

  http = inject(HttpClient);

  getApartments(search: string = ''): Observable<Apartment[]> {
    const body = {
      procedureName: 'Apartments_GetAll',
      parameters: {
        Search: search
      }
    };

    console.log('API request body:', body);

    return this.http.post<Apartment[]>(this.apiUrl, body);
  }

  getStatuses(): Observable<Status[]> {
    const body = {
      procedureName: 'Statuses_GetAll',
      parameters: {}
    };

    console.log('API request body:', body);

    return this.http.post<Status[]>(this.apiUrl, body);
  }

  getAgents(): Observable<Agent[]> {
    const body = {
      procedureName: 'Agents_GetAll',
      parameters: {}
    };

    console.log('API request body:', body);

    return this.http.post<Agent[]>(this.apiUrl, body);
  }

  createApartment(apartment: {
    Title: string;
    Description: string;
    Price: number;
    StatusId: number;
    AgentId: number;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      procedureName: 'Apartments_Create',
      parameters: {
        Title: apartment.Title,
        Description: apartment.Description,
        Price: apartment.Price,
        StatusId: apartment.StatusId,
        AgentId: apartment.AgentId
      }
    });
  }

  getApartmentById(id: number): Observable<Apartment[]> {
    return this.http.post<Apartment[]>(this.apiUrl, {
      procedureName: 'Apartments_GetById',
      parameters: {
        Id: id
      }
    });
  }

  updateApartment(id: number, apartment: any) {
  return this.http.post<any>(this.apiUrl, {
    procedureName: 'Apartments_Update',
    parameters: {
      Id: id,
      Title: apartment.Title,
      Description: apartment.Description,
      Price: apartment.Price,
      StatusId: apartment.StatusId,
      AgentId: apartment.AgentId
    }
  });
}

}
