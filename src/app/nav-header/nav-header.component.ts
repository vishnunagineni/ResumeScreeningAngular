import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResumeService } from '../services/resume.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {

  constructor(private service: ResumeService, private router: Router) { }
  userName: string;
  isLoggedIn$: Observable<boolean>;
  ngOnInit(): void {
    // localStorage.setItem('userName', 'Abhiroop')
    this.isLoggedIn$ = this.service.checkLoggedIn();
    this.userName = this.getUserName();
  }

  getUserName(): string {
    return localStorage.getItem("userName");
  }

  logOutSession():void {
    console.log("inside logOutSession");
    this.service.signOffService().subscribe((res) => {
      console.log("inside logOutSession subscribe ");
      localStorage.removeItem("userName");
      localStorage.setItem("isLoggedIn", "false");
    });
    this.router.navigate(["login"]);
  }
}
