import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerComponent } from './+player/components/';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: PlayerComponent },

      { path: '**', redirectTo: '' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
