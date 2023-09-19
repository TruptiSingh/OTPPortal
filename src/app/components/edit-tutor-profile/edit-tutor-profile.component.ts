import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { TutorsApiService } from '../../services/api-services/tutors-api/tutors-api.service';
import { CodedListsService } from '../../services/api-services/coded-lists/coded-lists.service';
import { SubjectsApiService } from '../../services/api-services/subjects/subjects-api.service';
import { ICreateOrUpdateTutor } from '../../interfaces/ICreateOrUpdateTutor.interface';
import { UserImagesApiService } from '../../services/user-images-api/user-images-api.service';
import { IStoreUserImage } from '../../interfaces/IStoreUserImage.interface';
import { IGetTutor } from '../../interfaces/IGetTutor.interface';

@Component({
  selector: 'app-edit-tutor-profile',
  templateUrl: './edit-tutor-profile.component.html',
  styleUrls: ['./edit-tutor-profile.component.css']
})
export class EditTutorProfileComponent implements OnInit {

  constructor(public authService: AuthService,
    private router: Router,
    private tutorService: TutorsApiService,
    private codedListsService: CodedListsService,
    private subjectsService: SubjectsApiService,
    private userImageService: UserImagesApiService) {
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

  isImageLoading = true;
  imageToShow: any;
  message = "";

  tutor: IGetTutor = {

      tutorId: 0,
      linkedUserId: '',
      introduction: '',
      bio: '',
      pricePerHour: 0,
      rating: 0,
      educationLevelIds: [],
      subjectIds: [],
      teachingPreferenceIds: [],
      tutorAvailibilities: []
  }

  tutorToUpdate: ICreateOrUpdateTutor = {
    linkedUserId: '',
    bio: '',
    introduction: '',
    pricePerHour: 0,
    tutorEducationLevels: [],
    tutorSubjects: [],
    tutorTeachingPreferences: [],
    tutorAvailibilities: [],
  };

  storeImage: IStoreUserImage = {

    userId: 0,
    userType: 0,
    webRootPath: '',
    imageFile: undefined,
    image: undefined
  }

  ngOnInit(): void {

    this.tutorService.getTutorByLinkedUserId(this.authService.currentUserValue.profile.sub).subscribe(

      response => {
        this.tutor = response;
        this.getUserImage();
        this.setTutorAvailibility();
        console.log(this.tutor);
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

  setTutorAvailibility() {

    for (var i = 0; i < this.tutor.tutorAvailibilities.length; i++) {

      if (this.tutor.tutorAvailibilities[i].weekDayId == 1) {

        if (this.selectedTimeRanges1.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges1.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 2) {

        if (this.selectedTimeRanges2.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges2.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 3) {

        if (this.selectedTimeRanges3.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges3.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 4) {

        if (this.selectedTimeRanges4.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges4.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 5) {

        if (this.selectedTimeRanges5.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges5.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 6) {

        if (this.selectedTimeRanges6.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges6.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.tutor.tutorAvailibilities[i].weekDayId == 7) {

        if (this.selectedTimeRanges7.indexOf(this.tutor.tutorAvailibilities[i].timeRangeId) === -1) {

          this.selectedTimeRanges7.push(this.tutor.tutorAvailibilities[i].timeRangeId);
        }
      }

      if (this.selectedWeekDays.indexOf(this.tutor.tutorAvailibilities[i].weekDayId) === -1) {

        this.selectedWeekDays.push(this.tutor.tutorAvailibilities[i].weekDayId);
      }
      
    }
  }

  isChecked(day) {

    return this.selectedWeekDays.includes(day) ? true : null;
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

    console.log(this.tutor.tutorId)

    this.userImageService.getUserImage(this.tutor.tutorId).subscribe(

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
      this.storeImage.userId = this.tutor.tutorId;
      this.storeImage.userType = 2;

      this.userImageService.storeUserImage(this.storeImage).subscribe(
        response => {
          console.log('Image uploaded successfully', response);
          this.message = "Image uploaded successfully";
          this.getUserImage();
          this.router.navigate(['/edit-tutor-profile']);
          //this.router.navigate(['/upload-files-image'], { queryParams: { userId: this.storeImage.userId, userType: this.storeImage.userType } });
        },
        error => {
          console.error('Error uploading image', error);
        }
      );
    }
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

          if (this.tutorToUpdate.tutorAvailibilities.some(function (ta) { return (ta.timeRangeId !== this.selectedTimeRanges1[j] && ta.weekDayId !== this.selectedWeekDays[i] ) })) {

            this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges1[j] });
          }
        }

      }

      if (this.selectedTimeRanges2.length > 0 && this.selectedWeekDays[i] == 2) {

        for (let j = 0; j < this.selectedTimeRanges2.length; j++) {

          if (this.tutorToUpdate.tutorAvailibilities.some(function (ta) { return (ta.timeRangeId !== this.selectedTimeRanges2[j] && ta.weekDayId !== this.selectedWeekDays[i]) })) {

            this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges2[j] });
          }
        }

      }

      if (this.selectedTimeRanges3.length > 0 && this.selectedWeekDays[i] == 3) {

        for (let j = 0; j < this.selectedTimeRanges3.length; j++) {

          this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges3[j] });
        }

      }

      if (this.selectedTimeRanges4.length > 0 && this.selectedWeekDays[i] == 4) {

        for (let j = 0; j < this.selectedTimeRanges4.length; j++) {

          this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges4[j] });
        }

      }

      if (this.selectedTimeRanges5.length > 0 && this.selectedWeekDays[i] == 5) {

        for (let j = 0; j < this.selectedTimeRanges5.length; j++) {

          this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges5[j] });
        }

      }

      if (this.selectedTimeRanges6.length > 0 && this.selectedWeekDays[i] == 6) {

        for (let j = 0; j < this.selectedTimeRanges1.length; j++) {

          this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges6[j] });
        }

      }

      if (this.selectedTimeRanges7.length > 0 && this.selectedWeekDays[i] == 7) {

        for (let j = 0; j < this.selectedTimeRanges7.length; j++) {

          this.tutorToUpdate.tutorAvailibilities.push({ weekDayId: this.selectedWeekDays[i], timeRangeId: this.selectedTimeRanges1[j] });
        }

      }

    }

    /*console.log(this.tutor.tutorAvailibilities);*/

    this.tutorToUpdate.bio = this.tutor.bio;
    this.tutorToUpdate.linkedUserId = this.tutor.linkedUserId;
    this.tutorToUpdate.introduction = this.tutor.introduction;
    this.tutorToUpdate.pricePerHour = this.tutor.pricePerHour;
    this.tutorToUpdate.tutorEducationLevels = this.tutor.educationLevelIds;
    this.tutorToUpdate.tutorSubjects = this.tutor.subjectIds;
    this.tutorToUpdate.tutorTeachingPreferences = this.tutor.teachingPreferenceIds;

    this.tutorService.updateTutor(this.tutorToUpdate).subscribe(
      response => {
        console.log('Tutor updated successfully', response);
        this.message = 'Update successful.';
        this.router.navigate(['/edit-tutor-profile']);
        //this.router.navigate(['/upload-files-image'], { queryParams: { userId: response, userType: 2 } });
      },
      error => {
        console.error('Error updaing tutor', error);
      }
    );
  }
}
