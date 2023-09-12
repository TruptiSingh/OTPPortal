import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICreateStudent } from '../../interfaces/ICreateStudent.interface';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { SubjectsApiService } from '../../services/api-services/subjects/subjects-api.service';
import { AuthService } from '../../services/authentication/auth.service';
import { StudentApiService } from '../../services/students-api/student-api.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private studentService: StudentApiService,
    private codedListsService: CodedListsService,
    private subjectsService: SubjectsApiService) { }

  student: ICreateStudent = {

      linkedUserId: '',
      educationLevelId: 0,
      studentSubjects: []
  }

  subjects: any = [];
  levels: any = [];

  ngOnInit(): void {

    this.student.linkedUserId = this.authService.currentUserValue.profile.sub;

    this.codedListsService.getEducationLevels().subscribe(

      (level) => {

        this.levels = level;
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

  onSubmit() {

    this.studentService.createStudent(this.student).subscribe(
      response => {
        console.log('Student created successfully', response);
        this.router.navigate(['/edit-student']);
      },
      error => {
        console.error('Error creating student', error);
      }
    );

  }
}
