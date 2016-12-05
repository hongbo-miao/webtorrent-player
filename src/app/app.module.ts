import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { compose } from '@ngrx/core/compose';
import { StoreModule, combineReducers } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { playerReducer } from './+player/reducers/';

import { PlayerModule } from './+player/modules/player.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),

    PlayerModule,
    AppRoutingModule,

    StoreModule.provideStore(
      compose(
        storeFreeze,
        storeLogger({
          collapsed: true,
          duration: false,
          timestamp: false
        }),
        combineReducers
      )({
        router: routerReducer,

        player: playerReducer
      })
    ),

    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()   // note that this must instrument after importing StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
