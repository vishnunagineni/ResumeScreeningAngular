import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName : any;
  password : any;
  msg : string;
  data : any;
  hide:boolean = true;
  error:boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router, private service: ResumeService) { }

  ngOnInit(): void {
  }

  clientOrgLogin()
  { 
      this.isLoading = true;
      this.service.resumeScreeningLoginService(this.userName,this.password).subscribe((res)=>{
        console.log("inside get ws..");
        this.data=res;
        if(this.data.status == "Failure")
        {
          this.error = true;
          this.msg='Please check the userId and password you have entered';
          localStorage.setItem("isLoggedIn", "false")
        }
        else if(this.data.status == "Success"){
          this.msg='';
          localStorage.setItem("userName",this.data.data[0]+" "+this.data.data[1]);
          localStorage.setItem("isLoggedIn","true");
          console.log("userName of logged in user "+this.userName);
          this.router.navigate(['./dashboard']);
        }
        this.isLoading = false;
       });
 }
}
