import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  public message = new FormControl('');

  constructor(private _chatService: ChatService, private _loaderService: LoaderService) { }

  inputFocus() {
    this._chatService.typing();
  }

  inputBlur() {
    this._chatService.stopTyping();
  }

  send() {
    if (this.message.value !== '') {
      this._chatService.sendMessage(this.message.value);
      this._loaderService.showLoader();
      this.message.reset();
    }
  }

}
