import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.router.navigateByUrl('/login');
  }
  title = 'BookAppCaseStudy';

  constructor(
    private router: Router) {}

}