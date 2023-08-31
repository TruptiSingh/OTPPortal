import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { ICreateTutor } from '../../interfaces/ICreateTutor.interface';

@Component({
  selector: 'app-create-tutor',
  templateUrl: './create-tutor.component.html',
  styleUrls: ['./create-tutor.component.css']
})
export class CreateTutorComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private tutorService: TutorsApiService) {
  }

  tutor: ICreateTutor = {
    linkedUserId: '',
    bio: '',
    introduction: '',
    pricePerHour: 0,
    tutorEducationLevels: [{ educationLevelId: 0 }],
    tutorSubjects: [{ subjectId: 0 }],
    tutorTeachingPreferences: [{ teachingPreferenceId: 0 }],
    tutorAvailabilities: [{ weekDayId: 0, timeRangeId: 0 }],
  };

  ngOnInit(): void {

    this.tutor.linkedUserId = this.authService.currentUserValue.profile.sub;

  }

  onSubmit() {
    this.tutorService.createTutor(this.tutor).subscribe(
      response => {
        console.log('Tutor created successfully', response);
        // Reset the form or perform other actions as needed
      },
      error => {
        console.error('Error creating tutor', error);
      }
    );
  }
}
