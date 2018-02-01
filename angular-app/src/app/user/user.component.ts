import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  newPerson = {
    email: '',
    fullname: '',
    displayname: '',
    password: ''
  }
  submitted;

  onSubmit() {
    console.log(this.newPerson);
    this._dataService.addUser(this.newPerson)
      .then(response => this.submitted = response)
    console.log("YAS", this.submitted);
    this._dataService.getUser()
  }

  ngOnInit() {
  }

}
