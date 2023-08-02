import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-edit-tutor-profile',
  templateUrl: './edit-tutor-profile.component.html',
  styleUrls: ['./edit-tutor-profile.component.css']
})
export class EditTutorProfileComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  tutor: any = {
    name: 'John Doe',
    photo: '',       // Will store the URL of the uploaded photo
    pricePerHour: 0, // Will store the price set by the tutor
    documents: [],   // Will store the uploaded documents
    availability: {
      monday: { from: '', to: '' }, // Time range for Monday
      tuesday: { from: '', to: '' }, // Time range for Tuesday
      wednesday: { from: '', to: '' }, // Time range for Wednesday
      thursday: { from: '', to: '' }, // Time range for Thursday
      friday: { from: '', to: '' }, // Time range for Friday
      saturday: { from: '', to: '' }, // Time range for Saturday
      sunday: { from: '', to: '' }, // Time range for Sunday
    }
  };

  // Function to handle photo upload
  onPhotoUpload(event: any) {
    // Add code to handle photo upload and set the 'photo' property
  }

  // Function to handle document upload
  onDocumentUpload(event: any) {
    // Add code to handle document upload and update the 'documents' property
  }

  // Function to handle password change
  onChangePassword() {
    // Add code to handle password change
  }

  // Function to handle logout
  onLogout() {
    // Add code to handle logout
  }
}
