import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, LandingComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
