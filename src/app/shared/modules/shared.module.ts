import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgbModule
];

const PIPES = [

];

const COMPONENTS = [

];

@NgModule({
  imports: [
    MODULES
  ],
  declarations: [
    PIPES,
    COMPONENTS
  ],
  providers: [

  ],
  exports: [
    MODULES,
    PIPES,
    COMPONENTS
  ]
})
export class SharedModule { }
