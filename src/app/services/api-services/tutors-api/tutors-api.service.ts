import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { BaseService } from '../../base.service';
import { ICreateOrUpdateTutor } from '../../../interfaces/ICreateOrUpdateTutor.interface';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TutorsApiService extends BaseService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    super();
  }

  getTutorAvailibility(tutorId) {
    return this.httpClient
      .get(`${environment.apiUrl}/Tutors/TutorAvailibility/${tutorId}`,
        {
          headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getTutorByLinkedUserId(linkedUserId) {
    return this.httpClient
      .get(`${environment.apiUrl}/Tutors/LinkedUserId/${linkedUserId}`,
        {
          headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  createTutor(tutor : ICreateOrUpdateTutor) {
    return this.httpClient
      .post(`${environment.apiUrl}/Tutors`, tutor,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json',Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  updateTutor(tutor: ICreateOrUpdateTutor) {
    return this.httpClient
      .put(`${environment.apiUrl}/Tutors`, tutor,
        {
          headers: new HttpHeaders({Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
