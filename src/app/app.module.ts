import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule as NgBootstrapModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ContributorsComponent } from './contributors/contributors.component'
import { UserHasStarComponent } from './user-has-star/user-has-star.component'
import { DetailsComponent } from './details/details.component'

import { ChartsModule } from 'ng2-charts'

@NgModule({
    declarations: [AppComponent, DashboardComponent, ContributorsComponent, UserHasStarComponent, DetailsComponent],
    imports: [BrowserModule, AppRoutingModule, NgBootstrapModule, FormsModule, ReactiveFormsModule, HttpClientModule, ChartsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
