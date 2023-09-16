import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';
import { IStoreUserImage } from '../../interfaces/IStoreUserImage.interface';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserImagesApiService extends BaseService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    super();
  }

  getUserImage(userId: number) {

    return this.httpClient.get(`${environment.apiUrl}/Images/${userId}`,
      {
        responseType: 'blob',
        headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }

  storeUserImage(storeImage: IStoreUserImage) {

    const formData = new FormData();

    formData.append('userId', storeImage.userId.toString())
    formData.append('userType', storeImage.userType.toString());
    formData.append('webRootPath', storeImage.webRootPath);

    if (storeImage.imageFile) {
      formData.append('imageFile', storeImage.imageFile);
    }

    return this.httpClient.post(`${environment.apiUrl}/Images`, formData,
      {
        headers: new HttpHeaders(
          {
            Authorization: this.authService.authorizationHeaderValue
          }),
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
}
