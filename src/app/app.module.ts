import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { MessagesComponent } from './components/messages/messages.component';
import { InputComponent } from './components/input/input.component';
import { TypingComponent } from './components/typing/typing.component';
import { ChatComponent } from './chat/chat.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './services/config.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MessagesComponent,
    InputComponent,
    TypingComponent,
    ChatComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.init(),
      deps: [ConfigService],
      multi: true
    },
    ConfigService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
