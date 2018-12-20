import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wkp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  backgroundStyle = {
    'background': 'initial'
  };
  
  constructor(private router: Router) { }

  ngOnInit() {
   
  }

  toggleMatMenu () {
    this.trigger.toggleMenu();
  }

  ngOnDestroy() {
    
  }
}
