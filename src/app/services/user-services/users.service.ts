import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '../../directives/sortable.directive';
import { UsersApiService } from '../api-services/users-api/users-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserAdminSearchResult } from 'src/app/interfaces/IUserAdminSearchResult.interface';
import { IUserAdmin } from 'src/app/interfaces/UserAdmin.iterface';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog/error-dialog.component';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(users: IUserAdmin[], column: string, direction: string): IUserAdmin[] {
  if (direction === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: IUserAdmin, term: string) {
  return user.id.toString().toLowerCase().includes(term.toLowerCase())
    || user.username.toLowerCase().includes(term.toLowerCase())
    || user.firstName.toLowerCase().includes(term.toLowerCase())
    || user.lastName.toLowerCase().includes(term.toLowerCase());
}

let SourceUsers: IUserAdmin[] = [];

@Injectable({providedIn: 'root'})
export class UsersService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<IUserAdmin[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private usersApiService: UsersApiService,
              private modalService: NgbModal) { }

  InitialiseUsers() {
    this.usersApiService.getAdminUsers()
      .subscribe(users => {
        SourceUsers = users;

        this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
          ).subscribe(result => {        
              this._users$.next(result.users);
              this._total$.next(result.total);
          });
  
          this._search$.next();
        },
        error => {
          this._loading$.next(false);
          const modalRef = this.modalService.open(ErrorDialogComponent, { size: 'sm', centered: true, scrollable: true });
          modalRef.componentInstance.message = error;
      });
  }
  
  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<IUserAdminSearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let users = sort(SourceUsers, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }
}
