import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private tutorService: TutorsApiService ) {

  }

  ngOnInit() {

  }

  getTutorAvailabilities(tutorId: number): void {
    this.tutorService.getTutorAvailibility(tutorId).subscribe(
      (availabilities) => {
        console.log('Tutor availabilities:', availabilities);
      },
      (error) => {
        console.error('Error fetching tutor availabilities:', error);
      }
    );
  }
}
