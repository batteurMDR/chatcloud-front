import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, User } from 'src/app/services/chat.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    public myUsername = '';
    public users: User[] = [];

    private subscribes = new Subscription();

    constructor(private _chatService: ChatService) {}

    ngOnInit(): void {
        this.subscribes.add(
            this._chatService.getUsers().subscribe((users) => {
                this.users = users;
            })
        );
        this.myUsername = this._chatService.me;
    }

    ngOnDestroy(): void {
        this.subscribes.unsubscribe();
    }
}
