import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { SubjectsApiService } from '../../services/api-services/subjects/subjects-api.service';
import { ISearchTutorRequest } from '../../interfaces/ISearchTutorRequest.interface';
import { ISearchTutorResponse } from '../../interfaces/ISearchTutorResponse.interface';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-search-tutor',
  templateUrl: './search-tutor.component.html',
  styleUrls: ['./search-tutor.component.css']
})
export class SearchTutorComponent implements OnInit {

  searchTutorsRequest: ISearchTutorRequest = {

      city: '',
      teachingPreferenceIds: [],
      subjectIds: [],
      levelId: null,
      availableDayIds: [],
      minPrice: null,
      maxPrice: null,
      genderId: null
  }

  searchTutorResponse: ISearchTutorResponse[] = [];

  teachingPreferences: any = [];
  subjects: any = [];
  levels: any = [];
  availableDays: any = [];
  genders: any = [];
  timeRanges: any = [];

  constructor(public authService: AuthService,
    private router: Router,
    private tutorService: TutorsApiService,
    private codedListsService: CodedListsService,
    private subjectsService: SubjectsApiService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.codedListsService.getEducationLevels().subscribe(

      (level) => {

        this.levels = level;
      },
      (error) => {
        console.error(error);
      }
    );

    this.codedListsService.getGenders().subscribe(

      (genders) => {

        this.genders = genders;
      },
      (error) => {
        console.error(error);
      }
    );

    this.codedListsService.getTeachingPreferences().subscribe(
      (teachingPreferences) => {
        this.teachingPreferences = teachingPreferences;
      },
      (error) => {
        console.error(error);
      }
    );

    this.codedListsService.getWeekdays().subscribe(
      (weekDays) => {
        this.availableDays = weekDays;
      },
      (error) => {
        console.error(error);
      }
    );

    this.codedListsService.getTimeRanges().subscribe(
      (timeRanges) => {
        this.timeRanges = timeRanges;
      },
      (error) => {
        console.error(error);
      }
    );

    this.subjectsService.getAllSubjects().subscribe(
      (subjects) => {
        this.subjects = subjects;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSafeUrl(image: string) {
    return this.sanitizer.bypassSecurityTrustUrl(image);
  }

  onSearch() {

    this.searchTutorResponse = [];

    this.tutorService.searchTutor(this.searchTutorsRequest).subscribe(
      (response: ISearchTutorResponse[]) => {
        this.searchTutorResponse = response
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
