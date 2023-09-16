import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CodedListsService {

  constructor(private http: HttpClient) { }

  getEducationLevels() {
    return this.http.get(`${environment.apiUrl}/codedLists/educationLevels`);
  }

  getGenders() {
    return this.http.get(`${environment.apiUrl}/codedLists/genders`);
  }

  getTeachingPreferences() {
    return this.http.get(`${environment.apiUrl}/codedLists/teachingPreferences`);
  }

  getTimeRanges() {
    return this.http.get(`${environment.apiUrl}/codedLists/timeranges`);
  }

  getWeekdays() {
    return this.http.get(`${environment.apiUrl}/codedLists/weekdays`);
  }

  getDocumentTypes() {
    return this.http.get(`${environment.apiUrl}/codedLists/documentTypes`);
  }

  getDocumentTypesForStudent() {
    return this.http.get(`${environment.apiUrl}/codedLists/documentTypesForStudent`);
  }

  getUserTypes() {
    return this.http.get(`${environment.apiUrl}/codedLists/userTypes`);
  }
}
