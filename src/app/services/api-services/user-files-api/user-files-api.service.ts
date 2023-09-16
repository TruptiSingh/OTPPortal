import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStoreUserFile } from '../../../interfaces/IStoreUserFile.interface';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class UserFilesApiService extends BaseService {

  constructor(private httpClient: HttpClient,
    private authService: AuthService) {
    super();
  }

  storeUserDocument(storeUserFile: IStoreUserFile) {

    const formData = new FormData();

    formData.append('userId', storeUserFile.userId.toString());
    formData.append('userType', storeUserFile.userType.toString());
    formData.append('documentType', storeUserFile.documentType.toString());
    formData.append('webRootPath', storeUserFile.webRootPath);

    if (storeUserFile.userDocumentFile) {
      formData.append('userDocumentFile', storeUserFile.userDocumentFile);
    }

    if (storeUserFile.documentFile) {
      formData.append('documentFile', new Blob([storeUserFile.documentFile]), 'document.blob');
    }

    return this.httpClient.post(`${environment.apiUrl}/Documents`, formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.authService.authorizationHeaderValue }),
      })
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        }));
  }
}
