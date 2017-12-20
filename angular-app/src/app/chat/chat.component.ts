import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // messages = [];
  // connection;
  // message;

  chats: any = [];
  socket = io('http://localhost:4000');
  joinned: boolean = false;
  newUser = { 
    nickname: '', 
    room: '' };

  msgData = { 
    room: '', 
    nickname: '', 
    message: '' };

  constructor(private _router: Router, private _route: ActivatedRoute, private dataService: DataService) {}

    // sendMessage() {
    //   this.dataService.sendMessage(this.message);
    //   this.message = '';
    // }

    // ngOnInit() {
    //   this.connection = this.dataService.getMessages().subscribe(message => {
    //     this.messages.push(message);
    //   })
    // }

    // ngOnDestroy() {
    //   this.connection.unsubscribe();
    // }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      this.getChatByRoom(user.room); // function callback
      console.log('USER IS NOT NULL -- IN CHAT ROOM')
      this.msgData = 
      { room: user.room, 
        nickname: user.nickname, 
        message: '' }
      this.joinned = true; // user has joined
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if (data.message.room === JSON.parse(localStorage.getItem("user")).room) {
        console.log('SOCKET IS WORKING!')
        this.chats.push(data.message); // appending the message to chats 
        this.msgData = { 
          room: user.room, 
          nickname: user.nickname, 
          message: '' } // resetting
        this.scrollToBottom(); // function to scroll all messages
      }
    }.bind(this));

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

// function to get chat room
  getChatByRoom(room) {
    this.dataService.getChatByRoom(room).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.room);
    this.msgData = { 
      room: this.newUser.room, 
      nickname: this.newUser.nickname, 
      message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.dataService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }

}