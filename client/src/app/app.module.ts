import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route }	from '@angular/router';

import { AlertService } from './services/alert.service';
import { DownloadJokeService } from './services/download-joke.service';

import { AppComponent }	from './app.component';
import { HomeComponent } from './home.component';
import { ChatComponent } from './components/chat/chat.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';

import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const routes: Route[] = [{
	path: '',
	component: HomeComponent,
}, {
	path: 'joke-list',
	component: JokeListComponent,
}, {
	path: 'chat',
	component: ChatComponent,
}];


@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: false }),
		HttpModule,
		BrowserModule,
		FormsModule,
	],
	declarations: [
		AppComponent,
		HomeComponent,
		ChatComponent,
		JokeListComponent,
	],
	providers: [
		AlertService,
		DownloadJokeService,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
