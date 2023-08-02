import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class TutorsApiService extends BaseService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    super();
  }

  getTutorAvailibility(tutorId) {
    console.log(`${environment.apiUrl}/Tutors/TutorAvailibility/${tutorId}`);
    return this.httpClient
      .get(`${environment.apiUrl}/Tutors/TutorAvailibility/${tutorId}`,
        {
          headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }
}
