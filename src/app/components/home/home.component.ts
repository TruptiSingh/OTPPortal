import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/user-administration']);
      }
      else if (this.authService.isTutor()) {
        this.router.navigate(['/profile']);
      }
    }
    else {
      this.router.navigate(['/home']);
    }
  }

}
