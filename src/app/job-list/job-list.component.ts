import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';


export interface JobData {
  jobCode: string;
  designationTitle: string;
  location: string;
  actions: string;
  totalUploadedResumes: Number;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {


  displayedColumns: string[] = ['jobCode', 'designationTitle', 'location','totalUploadedResumes', 'actions'];
  dataSource: MatTableDataSource<JobData>;
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  jobs: any;
  showInfoMsg:boolean = false;

  constructor(public dialog: MatDialog,private router: Router, private resumeService: ResumeService) {
  }

  ngOnInit(): void {
    this.getjobList();
  }

  ngAfterViewInit() {
    
  }

  getjobList(){
    this.resumeService.getJobOpenings().subscribe((result) => {

      console.log(result);
      this.jobs = result;
      this.dataSource = new MatTableDataSource(this.jobs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*openDialog(code) {
    this.dialog.open(UploadResumeComponent, {
      data: {
        jobCode: code
      },
      height: '500px',
      width: '700px',
    });
  }*/

  screenResumes(jobCode){
    //code to call screening api and on success navigate user to resume-screening view
    this.router.navigate(['./resume-screening', jobCode]);

  }

  uploadFile(files, jobCode) {
    this.isLoading = true;
    console.log(jobCode);
    console.log(files);
    for (let file of files) {
      this.resumeService.uploadFiles(file, jobCode).subscribe((result) => {
        console.log("Uploaded files..");
      });
    }
    this.getjobList();
    alert("files uploaded successfully!");

    this.isLoading = false;
  }
}




