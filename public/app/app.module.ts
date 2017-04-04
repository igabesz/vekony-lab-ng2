import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route }	from '@angular/router';
import { TooltipModule } from 'ng2-bootstrap';

import { AlertService } from './services/alert.service';
import { DownloadJokeService } from './services/download-joke.service';
import { StorageService } from './services/storage.service';

import { AppComponent }	from './app.component';
import { JokeListComponent } from './components/joke-list/joke-list.component';

const routes: Route[] = [{
	path: '',
	component: JokeListComponent,
}];


@NgModule({
	imports: [
		TooltipModule.forRoot(),
		RouterModule.forRoot(routes, { useHash: false }),
		HttpModule,
		BrowserModule,
		FormsModule,
		TooltipModule,
	],
	declarations: [
		AppComponent,
		JokeListComponent,
	],
	providers: [
		AlertService,
		DownloadJokeService,
		StorageService,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
