import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="my-2"></div>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {

}
