import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit, OnDestroy {
  public typings: string[] = [];

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService) { }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.getTypings().subscribe((typings) => {
      this.typings = typings;
    }));
  }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }
}
