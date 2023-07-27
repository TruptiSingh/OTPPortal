import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  primaryBackground: boolean;
  private _mobileQueryListener: () => void;
  navbarOpen = false;

  constructor(
    public authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      if (router.url === '/') {
        this.primaryBackground = true;
      } else {
        this.primaryBackground = false;
      }
    });
  }

  fillerNav = [
    {
      routeName: 'Home',
      route: '.'
    },
    {
      routeName: 'Account',
      route: '/account'
    }
  ];

  anonNav = [
    {
      routeName: 'Home',
      route: '.'
    }
  ];

  title = 'OTP Portal';

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
