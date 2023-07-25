import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager = new UserManager(this.getClientSettings());
  private user: User | null = null;

  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });

    this.manager.events.addUserLoaded(newUser => {
        this.user = newUser;
    });
  }
  
  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
      this.user = await this.manager.signinRedirectCallback();

      if (!this.user.profile.role || this.user.profile.role.length == 0) {
        this.manager.signoutRedirect();
      }
  }

  public readonly administratorRole = 'administrator';
  public readonly tutorRole = 'tutor';
  public readonly studentRole = 'student';

  isAuthenticated(): boolean {
    if (this.user != null && !this.user.expired && !this.user.profile.role) {
      this.manager.signoutRedirect();
    }
    return true; //this.user != null && !this.user.expired && this.user.profile.role && this.user.profile.role.length > 0;
  }

  getAllRoles() {
    let roles = [
      {
        key: this.administratorRole,
        value: "Administrator"
      },
      {
        key: this.tutorRole,
        value: "Tutor"
      },
      {
        key: this.studentRole,
        value: "Student"
      },
    ];

    return roles;
  }

  isAdmin(): boolean {
    return this.isUserRole(this.administratorRole);
  }

  isTutor(): boolean {
    return this.isUserRole(this.tutorRole);
  }

  isStudent(): boolean {
    return this.isUserRole(this.studentRole);
  }

  private isUserRole(roleName: string): boolean {
    return this.user != null &&
      !this.user.expired &&
      ((Array.isArray(this.user.profile.role) &&
      this.user.profile.role.some(r => r === roleName)) ||
      this.user.profile.role === roleName);
  }

  get authorizationHeaderValue(): string {
      if (!this.isAuthenticated()) {
          return null;
      }
      return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.given_name : '';
  }

  logout() {
    this.manager.signoutRedirect();
  }

  public get currentUserValue(): User {
    return this.user;
  }

  getClientSettings(): UserManagerSettings {
    const url = environment.url;
    const authApiUrl = environment.authApiUrl;
    return {
        authority: authApiUrl,
        client_id: 'otp_portal',
        redirect_uri: url + '/auth-callback',
        post_logout_redirect_uri: url + '/',
        response_type: 'id_token token',
        scope: 'openid profile email otpportalapi IdentityServerApi',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: url + '/silent-refresh.html'
    };
  }
}
