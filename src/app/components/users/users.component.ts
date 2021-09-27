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
  public generalScore: number = 0;

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.getUsers().subscribe((users) => {
      this.users = users;
    }));

    this.subscribes.add(this._chatService.getGeneralScore().subscribe((score) => {
      this.generalScore = score[0].generalScore;
    }));
  }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }
}
