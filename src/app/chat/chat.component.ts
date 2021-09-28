import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public loader: boolean = false;
  public isLoggedIn = false;
  public username = new FormControl('');

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.loggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    }));
    this.subscribes.add(this.loaderService.loader$.subscribe((load) => {
      this.loader = load;
    }));
  }

  login() {
    this._chatService.login(this.username.value);
  }

  ngOnDestroy() {
    this.subscribes.unsubscribe();
  }

}
