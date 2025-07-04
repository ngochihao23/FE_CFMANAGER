import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
  standalone: false
})
export class LocationPage implements OnInit {
  searchLocation: any;


  constructor() { }

  ngOnInit() {
  }

}
