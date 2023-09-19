import { Component, OnInit } from '@angular/core';
import { IStoreUserFile } from '../../interfaces/IStoreUserFile.interface';
import { IStoreUserImage } from '../../interfaces/IStoreUserImage.interface';
import { Router } from '@angular/router';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { AuthService } from '../../services/authentication/auth.service';
import { UserFilesApiService } from '../../services/api-services/user-files-api/user-files-api.service';
import { UserImagesApiService } from '../../services/user-images-api/user-images-api.service';
import { StudentApiService } from '../../services/students-api/student-api.service';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';

@Component({
  selector: 'app-upload-files-and-image',
  templateUrl: './upload-files-and-image.component.html',
  styleUrls: ['./upload-files-and-image.component.css']
})
export class UploadFilesAndImageComponent implements OnInit {

  storeUserFile: IStoreUserFile = {

      userId: 0,
      userType: 0,
      documentType: 0,
      webRootPath: '',
      userDocumentFile: undefined,
      documentFile: undefined
  }

  storeImage: IStoreUserImage = {

      userId: 0,
      userType: 0,
      webRootPath: '',
      imageFile: undefined,
      image: undefined
  }

  userTypes: any = []
  documentTypes: any = []
  queryParams = undefined;
  userTypeId = 0;
  documentTypeId = 0;

  filesArray: any = [];
  userImage: any;

  message = "";
  isImageLoading = true;
  imageToShow: any;
  subjectIds: any = [];
  student: any;
  tutor: any;

  constructor(public authService: AuthService,
    private router: Router,
    private codedListsService: CodedListsService,
    private userFilesService: UserFilesApiService,
    private userImageService: UserImagesApiService,
    private studentService: StudentApiService,
    private tutorService: TutorsApiService) {

    //this.queryParams = this.router.getCurrentNavigation().extras.queryParams

    //this.storeImage.userId = this.queryParams.userId;
    //this.storeImage.userType = this.queryParams.userType;

    //this.storeUserFile.userId = this.queryParams.userId;
    //this.storeUserFile.userType = this.queryParams.userType;

    //this.userTypeId = this.queryParams.userType;
  }

  ngOnInit(): void {

    if (this.authService.isStudent()) {

      this.storeImage.userType = 1;
      this.storeUserFile.userType = 1;
      this.userTypeId = 1;

      this.codedListsService.getDocumentTypesForStudent().subscribe(
        (documentTypes) => {

          this.documentTypes = documentTypes;
        },
        (error) => {
          console.error(error);
        }
      );

      this.studentService.getStudentByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

        response => {
          console.log(response.studentId);
          this.student = response;
          this.storeImage.userId = response.studentId;
          this.storeUserFile.userId = response.studentId;
        },
        error => {
          console.error('Error fetching student', error);
        }
      );
    }
    else if (this.authService.isTutor()) {

      this.storeImage.userType = 2;
      this.storeUserFile.userType = 2;
      this.userTypeId = 2;

      this.codedListsService.getDocumentTypes().subscribe(

        (documentTypes) => {

          this.documentTypes = documentTypes;
        },
        (error) => {
          console.error(error);
        }
      );

      this.tutorService.getTutorByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

        response => {
          console.log(response);
          this.tutor = response;
          this.storeImage.userId = response.tutorId;
          this.storeUserFile.userId = response.tutorId;
        },
        error => {
          console.error('Error fetching student', error);
        }
      );
    }

    this.getUserImage();
    
    this.codedListsService.getUserTypes().subscribe(
      (userTypes) => {
        this.userTypes = userTypes;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getUserImage() {

    this.userImageService.getUserImage(this.storeImage.userId).subscribe(

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

  onSubmit() {

    if (this.userTypeId == 1) {

      this.router.navigate(['/edit-student'])
    }
    else if (this.userTypeId == 2) {

      this.router.navigate(['/edit-tutor-profile'])
    }
  }

  onFileUpload(event) {

    if (event.target.files.length > 0) {

      this.storeUserFile.userDocumentFile = event.target.files[0];
      this.storeUserFile.documentType = this.documentTypeId;

      this.userFilesService.storeUserDocument(this.storeUserFile).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          this.message = "File uploaded successfully";
          this.router.navigate(['/upload-files-image'])
          //this.router.navigate(['/upload-files-image'], { queryParams: { userId: this.storeUserFile.userId, userType: this.storeUserFile.userType } });
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }

  onImageUpload(event) {

    if (event.target.files.length > 0) {

      this.storeImage.imageFile = event.target.files[0];

      this.userImageService.storeUserImage(this.storeImage).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
          this.message = "Image uploaded successfully";
          this.getUserImage();
          this.router.navigate(['/upload-files-image'])
          //this.router.navigate(['/upload-files-image'], { queryParams: { userId: this.storeImage.userId, userType: this.storeImage.userType } });
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    }
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
}

