import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ICreateStudent } from '../../interfaces/ICreateStudent.interface';
import { AuthService } from '../authentication/auth.service';
import { BaseService } from '../base.service';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentApiService extends BaseService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    super();
  }

  getStudentByLinkedUserId(linkedUserId) {
    return this.httpClient
      .get(`${environment.apiUrl}/Students/LinkedUserId/${linkedUserId}`,
        {
          headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  createStudent(student: ICreateStudent) {
    return this.httpClient
      .post(`${environment.apiUrl}/Students`, student,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.authService.authorizationHeaderValue }),
        })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }
}
