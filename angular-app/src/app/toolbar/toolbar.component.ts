import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
user;
  constructor(private _router: Router, private _route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    // this.user = this.dataService.returnSession();
    this.user = this._router.navigateByUrl('/login');
  }

}
