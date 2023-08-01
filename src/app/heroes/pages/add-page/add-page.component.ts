import { Component } from '@angular/core';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styles: [
  ]
})
export class AddPageComponent {
  public creators = [
    {
      id: 'DC Comics', desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics', desc: 'Marvel - Comics'
    }
  ];
}
