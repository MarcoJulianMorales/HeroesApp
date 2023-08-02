import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  sidebarItems = [
    {label: 'List', icon: 'label', url: './list'},
    {label: 'Add', icon: 'add', url: './add'},
    {label: 'Search', icon: 'search', url: './search'},
  ]

  constructor(private authService: AuthService, private router: Router){}

  get user(): User | undefined {
    return this.authService.currentuser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}