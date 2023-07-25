import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { IRoles } from "src/app/interfaces/Roles.interface";
import { environment } from "src/environments/environment";
import { AuthService } from "../../authentication/auth.service";
import { BaseService } from "../../base.service";

export class UsersApiService extends BaseService{

    constructor(private httpClient: HttpClient,
        private authService: AuthService) {
        super();
    }

    getUsers() {
        return this.httpClient
            .get(environment.apiUrl + '/Users',
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    getAdminUsers() {
        return this.httpClient
            .get(environment.authApiUrl + 'api/v1/Users',
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    setUserRole(user, setAccess, role) {
        return this.httpClient
            .put(environment.authApiUrl + 'api/v1/Users',
                {
                    userId: user.id,
                    roleName: role,
                    setAccess: setAccess
                },
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    setUserActiveStatus(user, isActive) {
        return this.httpClient
            .put(environment.authApiUrl + 'api/v1/Users/UserActiveStatus',
                {
                    userId: user.id,
                    isActive: isActive
                },
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    getUsersByRole(roles: IRoles) {

        return this.httpClient
            .post(environment.authApiUrl + 'api/v1/Users/UsersByRoles',
                {
                    roles: roles.roles
                },
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }

    getUserById(id: string) {
        return this.httpClient
            .get(environment.authApiUrl + 'api/v1/Users/' + id,
                {
                    headers: new HttpHeaders({ Authorization: this.authService.authorizationHeaderValue }),
                })
            .pipe(
                catchError(this.handleError.bind(this))
            );
    }
}