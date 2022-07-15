import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ResumeService } from '../services/resume.service';

export interface jobDescription {
  title: string;
  role: string;
  experience: string; 
  id: string;
  job_type: string;
  location: string;
  responsibilities: any;
}

@Component({
  selector: 'app-job-desc',
  templateUrl: './job-desc.component.html',
  styleUrls: ['./job-desc.component.css']
})
export class JobDescComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private resumeService: ResumeService) { }
  isLoading: boolean = false;
  jobDescription$: Observable<any>;
  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('jobCode');
    // this.resumeService.getjobDescription(id).subscribe((jobDescription) => {
    //   this.jobDescription = jobDescription;
    // });

    this.isLoading = true;
    this.jobDescription$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.resumeService.getjobDescription(params.get('jobCode')))
    )
    this.isLoading = false;
    // this.jobDescription = this.jobDescription$;
    // this.jobDescription = {
    //   id: 'JD101',
    //   title: 'ITSM SME/CONSULTANT-(0063138_2)',
    //   role: 'Solution Consultant',
    //   experience: '4-8 Years',
    //   job_type: 'Permanent',
    //   location: 'Pune',
    //   responsibilities: [
    //     "Lead requirement gathering workshops to identify use cases and value-based accepatance criteria",
    //     "Creation and delivery of solutions",
    //     "Completing, developing and improving required documentation",
    //     "Ensure technical deliverables and customer delivery",
    //   ]
    // }
  }

}
