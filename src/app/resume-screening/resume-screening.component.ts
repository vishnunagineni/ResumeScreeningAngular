import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ResumeService } from '../services/resume.service';

export interface ResumeData {
  'candidateName': string;
  'uploadedOn': Date;
  'keywordsMatch': Number;
  'humanReview': string;
  'actions': string;
  'resumePath': string;
}

@Component({
  selector: 'app-resume-screening',
  templateUrl: './resume-screening.component.html',
  styleUrls: ['./resume-screening.component.css']
})
export class ResumeScreeningComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private resumeService: ResumeService) { }

  shortlistedColumns: string[] = [ 'sno', 'candidateName', 'uploadedOn', 'keywordsMatch', 'humanReview','actions'];  
  shortlistedDataSource: MatTableDataSource<ResumeData>;

  rejectedColumns: string[] = [ 'sno', 'candidateName', 'uploadedOn', 'keywordsMatch', 'humanReview','actions'];  
  rejectedDataSource: MatTableDataSource<ResumeData>;

  @ViewChild('shortlistedPaginator', { read: MatPaginator }) shortlistedPaginator: MatPaginator;
  @ViewChild('shortlistedSort') shortlistedSort: MatSort;


  @ViewChild('rejectedPaginator', { read: MatPaginator }) rejectedPaginator: MatPaginator;
  @ViewChild('rejectedSort') rejectedSort: MatSort;

  isLoading: boolean = false;
  screeningResults: any;
  jobCode: string;
  getScreeningResults = (jobCode) => {
    this.resumeService.getScreeningResults(jobCode).subscribe((result) => {
      console.log(result);
      this.screeningResults = result;


      this.shortlistedDataSource = new MatTableDataSource(this.screeningResults.shortlisted);
      this.shortlistedDataSource.paginator = this.shortlistedPaginator;
      this.shortlistedDataSource.sort = this.shortlistedSort;

      this.rejectedDataSource= new MatTableDataSource(this.screeningResults.rejected);
      this.rejectedDataSource.paginator = this.rejectedPaginator;
      this.rejectedDataSource.sort = this.rejectedSort;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.jobCode = paramMap.get('jobCode');
      this.getScreeningResults(this.jobCode);
    })
    
    // this.getScreeningResults(this.route.snapshot.paramMap.get('jobCode'));
    console.log(this.screeningResults);

  }

  ngAfterViewInit() {
    console.log("After view init called")
  }

  applyShortlistedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.shortlistedDataSource.filter = filterValue.trim().toLowerCase();

    if (this.shortlistedDataSource.paginator) {
      this.shortlistedDataSource.paginator.firstPage();
    }
  }

  applyRejectedFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rejectedDataSource.filter = filterValue.trim().toLowerCase();

    if (this.rejectedDataSource.paginator) {
      this.rejectedDataSource.paginator.firstPage();
    }
  }

  doHumanReview(jobCode,resumeId,result) {
    this.resumeService.humanReview(this.jobCode,resumeId,result).subscribe((result) => {
      this.getScreeningResults(this.jobCode);
      this.screeningResults=result;
      
    });

    
  }

  openResume(path) {
    this.resumeService.openResume(path);
  }

  downloadResume(path) {
    this.resumeService.downloadResume(path);
  }
}
