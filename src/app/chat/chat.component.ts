import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public isLoggedIn = false;
  public username = new FormControl('');

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.loggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    }));
  }

  login() {
    this._chatService.login(this.username.value);
  }

  ngOnDestroy() {
    this.subscribes.unsubscribe();
  }

}
