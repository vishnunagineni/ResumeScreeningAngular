import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  humanReview(jobId,resumeId,result) {
    console.log(jobId);
    console.log(resumeId);
    return this.httpClient.get("http://localhost:5000/humanreview?jobId="+jobId+"&resumeId="+resumeId+"humanreview="+result);
  }

  downloadResume(path: any) {
    // throw new Error('Method not implemented.');
    console.log(path);
    window.open('http://localhost:5000/' + path);
  }
  openResume(path: any) {
    // throw new Error('Method not implemented.');
    return this.httpClient.get(path, { responseType: 'blob'}).subscribe( (res) => {
      return new Blob([res], { type: 'application/pdf' })
    })
  }
  
  getScreeningResults(jobId: string): any {
    // throw new Error('Method not implemented.');
    return this.httpClient.get("http://localhost:5000/screenresumes/"+jobId);
  }
  getJobOpenings() {
    // throw new Error('Method not implemented.');
    return this.httpClient.get("http://localhost:5000/getlistofjobs");
  }
  uploadFiles(files: any, jobId: string) {
    // throw new Error('Method not implemented.');
    // return this.httpClient.post("http://localhost:5000/uploadresumes/"+jobId, files);
    const formData: FormData = new FormData();
    formData.append('file', files);
    console.log("form data is: ", formData);
    console.log(formData.get('file'));
    return this.httpClient.post("http://localhost:5000/uploadresumes/"+jobId, formData, {headers: {'enctype': 'multipart/form-data'},responseType: 'text'});
  }
  getjobDescription(jobId: string): Observable<any> {
    return this.httpClient.get("http://localhost:5000/getjobdetails/"+jobId);
  }

  link = "http://localhost:8080/ResumeScreening";
  constructor(private httpClient : HttpClient ) { }

  signOffService(): Observable<any> {
    return this.httpClient.get(this.link+"/rest/loginController/doLogout");
  }
  resumeScreeningLoginService(userName: any, password: any){

    var body = "username=" + userName + "&password=" + password ;
    return this.httpClient.post(this.link+"/rest/loginController/doAuthentication",body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  checkLoggedIn(): Observable<boolean> {
    if(localStorage.getItem("isLoggedIn") === "true") {
      return of(true);
    }else {
      return of(false);
    }
  }

}
