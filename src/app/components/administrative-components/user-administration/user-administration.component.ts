import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../../directives/sortable.directive';
import { IUserAdmin } from '../../../interfaces/UserAdmin.iterface';
import { UsersApiService } from '../../../services/api-services/users-api/users-api.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { UsersService } from '../../../services/user-services/users.service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
	selector: 'app-user-administration',
	templateUrl: './user-administration.component.html',
	styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {

	users: Observable<IUserAdmin[]>;
	total: Observable<number>;
	pageLoading = true;

	@ViewChild(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	constructor(private modalService: NgbModal,
		public usersService: UsersService,
		public authService: AuthService,
		public usersApiService: UsersApiService) {

		this.users = usersService.users$;
		this.total = usersService.total$;
	}

	ngOnInit() {
		if (!this.authService.isAdmin()) {

			this.authService.login();
		}
		else {

			this.pageLoading = false;
			this.usersService.InitialiseUsers();
		}
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach(header => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.usersService.sortColumn = column;
		this.usersService.sortDirection = direction;
	}

	setAdmin(user, isAdmin) {
		this.usersApiService.setUserRole(user, isAdmin, this.authService.administratorRole)
			.subscribe(() => {
				user.isAdmin = isAdmin;
			},
				error => {
					const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'sm', centered: true, scrollable: true });
					modalRef.componentInstance.message = error;
				});
	}

	setTutor(user, isTutor) {
		this.usersApiService.setUserRole(user, isTutor, this.authService.tutorRole)
			.subscribe(() => {
				user.isTutor = isTutor;
			},
				error => {
					const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'sm', centered: true, scrollable: true });
					modalRef.componentInstance.message = error;
				});
	}

	setStudent(user, isStudent) {
		this.usersApiService.setUserRole(user, isStudent, this.authService.studentRole)
			.subscribe(() => {
				user.isStudent = isStudent;
			},
				error => {
					const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'sm', centered: true, scrollable: true });
					modalRef.componentInstance.message = error;
				});
  }

  setUserActiveStatus(user, isActive) {
    this.usersApiService.setUserActiveStatus(user, isActive)
      .subscribe(() => {
        user.isActive = isActive;
      },
        error => {
          const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'sm', centered: true, scrollable: true });
          modalRef.componentInstance.message = error;
        });
  }

	public pageDescription(total: number) {
		let pageStart = Math.min((this.usersService.pageSize * (this.usersService.page - 1)) + 1, total);
		let pageEnd = Math.min(this.usersService.pageSize * this.usersService.page, total);
		let pageDesc = "(" + pageStart
			+ " - " + pageEnd
			+ " of " + total + ")";
		return pageDesc;
	}
}
