import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { ICreateOrUpdateTutor } from '../../interfaces/ICreateOrUpdateTutor.interface';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { SubjectsApiService } from '../../services/api-services/subjects/subjects-api.service';

@Component({
  selector: 'app-create-tutor',
  templateUrl: './create-tutor.component.html',
  styleUrls: ['./create-tutor.component.css']
})
export class CreateTutorComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private tutorService: TutorsApiService,
    private codedListsService: CodedListsService,
    private subjectsService: SubjectsApiService) {
  }

  teachingPreferences: any = [];
  subjects: any = [];
  levels: any = [];
  availableDays: any = [];
  genders: any = [];
  timeRanges: any = [];
  selectedTimeRanges1: any = [];
  selectedTimeRanges2: any = [];
  selectedTimeRanges3: any = [];
  selectedTimeRanges4: any = [];
  selectedTimeRanges5: any = [];
  selectedTimeRanges6: any = [];
  selectedTimeRanges7: any = [];
  selectedWeekDays: any = [];

  tutor: ICreateOrUpdateTutor = {
    linkedUserId: '',
    bio: '',
    introduction: '',
    pricePerHour: 0,
    tutorEducationLevels: [],
    tutorSubjects: [],
    tutorTeachingPreferences: [],
    tutorAvailibilities: [],
  };

  ngOnInit(): void {

    this.tutor.linkedUserId = this.authService.currentUserValue.profile.sub;

    //this.tutorService.getTutorByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

    //  response => {
    //    if (response == null || response == undefined) {
    //      //this.router.navigate(['/edit-tutor-profile']);
    //    }
    //  },
    //  error => {
    //    console.error('Error fetching tutor', error);
    //  }
    //);

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

  onSelectedDayChanged(event): void {

    if (event.target.checked) {
      this.selectedWeekDays.push(event.target.value);
    }
    else {

      this.selectedWeekDays.splice(this.selectedWeekDays.indexOf(event.target.value), 1);
    }

  }

  onSubmit() {

    //this.router.navigate(['/upload-files-image'], { queryParams: { userId: 1, userType: 2 } });
    
    for (let i = 0; i < this.selectedWeekDays.length; i++) {

      if (this.selectedTimeRanges1.length > 0 && this.selectedWeekDays[i] == 1) {

        for (let j = 0; j < this.selectedTimeRanges1.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges1[j] });
        }

      }

      if (this.selectedTimeRanges2.length > 0 && this.selectedWeekDays[i] == 2) {

        for (let j = 0; j < this.selectedTimeRanges2.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges2[j] });
        }

      }

      if (this.selectedTimeRanges3.length > 0 && this.selectedWeekDays[i] == 3) {

        for (let j = 0; j < this.selectedTimeRanges3.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges3[j] });
        }

      }

      if (this.selectedTimeRanges4.length > 0 && this.selectedWeekDays[i] == 4) {

        for (let j = 0; j < this.selectedTimeRanges4.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges4[j] });
        }

      }

      if (this.selectedTimeRanges5.length > 0 && this.selectedWeekDays[i] == 5) {

        for (let j = 0; j < this.selectedTimeRanges5.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges5[j] });
        }

      }

      if (this.selectedTimeRanges6.length > 0 && this.selectedWeekDays[i] == 6) {

        for (let j = 0; j < this.selectedTimeRanges1.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges6[j] });
        }

      }

      if (this.selectedTimeRanges7.length > 0 && this.selectedWeekDays[i] == 7) {

        for (let j = 0; j < this.selectedTimeRanges7.length; j++) {

          this.tutor.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges1[j] });
        }

      }

    }

    /*console.log(this.tutor.tutorAvailibilities);*/

    this.tutorService.createTutor(this.tutor).subscribe(
      response => {
        console.log('Tutor created successfully', response);
        this.router.navigate(['/upload-files-image']);
        //this.router.navigate(['/upload-files-image'], { queryParams: { userId: response, userType: 2 } });
      },
      error => {
        console.error('Error creating tutor', error);
      }
    );
  }
}
