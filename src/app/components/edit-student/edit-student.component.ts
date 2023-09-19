import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentApiService } from '../../services/students-api/student-api.service';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { SubjectsApiService } from '../../services/api-services/subjects/subjects-api.service';
import { UserImagesApiService } from '../../services/user-images-api/user-images-api.service';
import { AuthService } from '../../services/authentication/auth.service';
import { ICreateOrUpdateStudent } from '../../interfaces/ICreateOrUpdateStudent.interface';
import { IStoreUserImage } from '../../interfaces/IStoreUserImage.interface';
import { IGetStudent } from '../../interfaces/IGetStudent.interface';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private studentService: StudentApiService,
    private codedListsService: CodedListsService,
    private subjectsService: SubjectsApiService,
    private userImageService: UserImagesApiService) { }

  subjects: any = [];
  levels: any = [];
  isImageLoading = true;
  imageToShow: any;
  message = "";

  student: IGetStudent = {

      studentId: 0,
      linkedUserId: '',
      educationLevelId: 0,
      subjectIds: []
  }

  studentUpdate: ICreateOrUpdateStudent = {

      studentId: 0,
      linkedUserId: '',
      educationLevelId: 0,
      studentSubjects: []
  }

  storeImage: IStoreUserImage = {

    userId: 0,
    userType: 0,
    webRootPath: '',
    imageFile: undefined,
    image: undefined
  }

  ngOnInit(): void {

    this.studentService.getStudentByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

      response => {
        this.student = response;
        this.getUserImage();
        console.log(this.student);
      },
      error => {
        console.error('Error fetching student', error);
      }
    );

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

  createImageFromBlob(image: Blob) {
    console.log('In createimage');
    console.log(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getUserImage() {

    console.log(this.student.studentId)

    this.userImageService.getUserImage(this.student.studentId).subscribe(

      response => {

        if (response != null && response != undefined) {

          this.createImageFromBlob(response);
          this.isImageLoading = false;
        }
      },
      error => {
        console.log(this.storeImage.userId);
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  onImageUpload(event) {

    if (event.target.files.length > 0) {

      this.storeImage.imageFile = event.target.files[0];
      this.storeImage.userId = this.student.studentId;
      this.storeImage.userType = 1;
      
      this.userImageService.storeUserImage(this.storeImage).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
          this.message = "Image uploaded successfully";
          this.getUserImage();
          this.router.navigate(['/edit-student']);
          //this.router.navigate(['/upload-files-image'], { queryParams: { userId: this.storeImage.userId, userType: this.storeImage.userType } });
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    }
  }

  onSubmit() {

    //this.router.navigate(['/upload-files-image'], { queryParams: { userId: 17, userType: 1 } });
    this.studentUpdate.linkedUserId = this.student.linkedUserId;
    this.studentUpdate.educationLevelId = this.student.educationLevelId;
    this.studentUpdate.studentSubjects = this.student.subjectIds;

    console.log(this.studentUpdate);

    this.studentService.updateStudent(this.studentUpdate).subscribe(
      response => {
        console.log('Student updated successfully', response);
        this.message = 'Update successful.';
        this.router.navigate(['/edit-student']);
        //this.router.navigate(['/upload-files-image'], { queryParams: { userId: response, userType: 1 } });
      },
      error => {
        console.error('Error updating student', error);
      }
    );
  }
}
