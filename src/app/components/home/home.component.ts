import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { AuthService } from '../../services/authentication/auth.service';
import { StudentApiService } from '../../services/students-api/student-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private tutorService: TutorsApiService,
  private studentService: StudentApiService) {

  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/user-administration']);
      }
      else if (this.authService.isTutor()) {

        this.tutorService.getTutorByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

          response => {
            if (response == null || response == undefined) {
              this.router.navigate(['/create-tutor']);
            }
          },
          error => {
            console.error('Error fetching tutor', error);
          }
        );
        this.router.navigate(['/edit-tutor-profile']);
      }
      else if (this.authService.isStudent()) {

        this.studentService.getStudentByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

          response => {
            if (response == null || response == undefined) {
              this.router.navigate(['/create-student']);
            }
          },
          error => {
            console.error('Error fetching student', error);
          }
        );
        this.router.navigate(['/edit-student']);
      }
      else {
        throwError("Invalid user role");
      }
    }
    else {
      this.router.navigate(['/home']);
    }
  }

}
