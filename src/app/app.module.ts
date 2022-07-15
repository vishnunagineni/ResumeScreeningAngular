import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule,Route} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDescComponent } from './job-desc/job-desc.component';
import { ResumeScreeningComponent } from './resume-screening/resume-screening.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuardService } from './auth-guard.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';



const appRoute: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent} ,//canActivate: [AuthGuardService] 
  { path: 'job-list', component: JobListComponent },
  { path: 'job-desc/:jobCode', component: JobDescComponent },
  { path: 'resume-screening/:jobCode', component: ResumeScreeningComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JobListComponent,
    JobDescComponent,
    ResumeScreeningComponent,
    NavHeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute, { useHash: true }),
    HttpClientModule,
    // NoopAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
