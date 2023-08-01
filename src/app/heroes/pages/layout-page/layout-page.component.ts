import { Component } from '@angular/core';

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
}
