import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';

export interface Message {
  username: string;
  message: string;
  score: number;
}

export interface User {
  id: number;
  username: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _url = 'localhost:3000'; // default value
  private _socket: io.Socket;

  private _messages = new BehaviorSubject<Message[]>([]);
  private _users = new BehaviorSubject<User[]>([]);
  private _typings = new BehaviorSubject<string[]>([]);

  public loggedIn = new BehaviorSubject<boolean>(false);
  public me = null;

  constructor(private configService: ConfigService) {
    this._url = configService.config.socketUrl;
    this._socket = io.io(this._url);
    this._listen();
  }

  public getMessages() {
    return this._messages;
  }

  public getUsers() {
    return this._users;
  }

  public getTypings() {
    return this._typings;
  }

  public login(username: string): void {
    this.me = username;
    this._socket.emit('add user', username);
  }

  public sendMessage(message: string): void {
    this._socket.emit('new message', message);
  }

  public typing(): void {
    this._socket.emit('typing');
  }

  public stopTyping(): void {
    this._socket.emit('stop typing');
  }

  private _listen(): void {
    this._socket.on('new message', (message: Message) => {
      this._messages.next([...this._messages.value, message]);
    });
    this._socket.on('login', (users: User[]) => {
      this._users.next(users);
      this.loggedIn.next(true);
    });
    this._socket.on('user joined', (user: User) => {
      this._users.next([...this._users.value, user]);
    });
    this._socket.on('previous messages', (messages: Message[]) => {
      this._messages.next(messages);
    });
    this._socket.on('typing', (username: string) => {
      this._typings.next([...this._typings.value, username]);
    });
    this._socket.on('stop typing', (username: string) => {
      this._typings.next([...this._typings.value.filter((t) => t !== username)]);
    });
    this._socket.on('user left', (username: string) => {
      this._users.next([...this._users.value.filter((u) => u.username !== username)]);
    });
    this._socket.on('update user score', (user: User) => {
      this._users.next([
        ...this._users.value.map((u) => u.username !== user.username ? u : {...u, score: user.score})
      ]);
    })
  }

}
