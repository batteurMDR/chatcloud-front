import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: string[] = [];

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.getUsers().subscribe((users) => {
      this.users = users;
    }));
  }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }
}
