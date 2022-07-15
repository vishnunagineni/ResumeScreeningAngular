import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeScreeningComponent } from './resume-screening.component';

describe('ResumeScreeningComponent', () => {
  let component: ResumeScreeningComponent;
  let fixture: ComponentFixture<ResumeScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeScreeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
