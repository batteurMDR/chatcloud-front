import { AfterViewChecked, OnInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesElement', {static: false}) messagesElement: ElementRef<HTMLDivElement>;

  public messages: Message[] = [];

  private subscribes = new Subscription();

  constructor(private _chatService: ChatService) { }

  ngAfterViewChecked(): void {
    if (this.messagesElement) {
      this.messagesElement.nativeElement.scroll({
        top: this.messagesElement.nativeElement.scrollHeight
      })
    }
  }

  ngOnInit(): void {
    this.subscribes.add(this._chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    }));
  }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }
}
