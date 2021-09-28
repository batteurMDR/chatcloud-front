import { AfterViewChecked, OnInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, Message } from 'src/app/services/chat.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('messagesElement', {static: false}) messagesElement: ElementRef<HTMLDivElement>;

  public myUsername = '';
  public messages: Message[] = [];
  private subscribes = new Subscription();

  constructor(private _chatService: ChatService, private _loaderService: LoaderService) { }

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
      this._loaderService.hideLoader();
    }));
    this.myUsername = this._chatService.me;
  }

  ngOnDestroy(): void {
    this.subscribes.unsubscribe();
  }
}
