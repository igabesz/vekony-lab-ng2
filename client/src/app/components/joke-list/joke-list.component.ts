import { Component, OnDestroy } from '@angular/core';
import { DownloadJokeService } from '../../shared/download-joke.service';
import { AlertService } from '../../shared/alert.service';
import ChuckJoke from '../../shared/chuck-joke';
import { Subscription } from 'rxjs';


@Component({
	selector: 'joke-list',
	templateUrl: 'joke-list.component.html',
	styles: [],
})
export class JokeListComponent implements OnDestroy {
	private subscription: Subscription;
	jokes: ChuckJoke[] = [];

	constructor(
		private downloadJoke: DownloadJokeService,
		private alert: AlertService,
	) {
		// Subscription for 'downloadJokeBySharedObservable' only
		this.subscription = this.downloadJoke.newJokes.subscribe(
			joke => this.jokes.push(joke),
			err => this.alert.defaultErrorPopup(err),
		);
	}

	ngOnDestroy() {
		// Must unsubscribe, otherwise the component will get updates and stay in memory without DOM
		this.subscription.unsubscribe();
		this.subscription = undefined;
	}

	/** The easiest way: callback.
		NOTE: We use Node style callbacks: 1st parameter is the error (if any), 2nd parameter is the result
	*/
	downloadJokeByCb() {
		this.downloadJoke.downloadJokeByCb((err, joke) => {
			if (err) {
				return this.alert.defaultErrorPopup(err);
			}
			this.jokes.push(joke);
		});
	}

	// Promise with then and catch callbacks
	downloadJokeByPromise() {
		this.downloadJoke.downloadJokeByPromise()
		.then(joke => this.jokes.push(joke))
		.catch(err => this.alert.defaultErrorPopup(err));
	}

	/** Async function with actual try-catch block and seemingly synchronous execution */
	async downloadJokeAsync() {
		try {
			let joke = await this.downloadJoke.downloadJokeByPromise();
			this.jokes.push(joke);
		}
		catch (err) {
			this.alert.defaultErrorPopup(err);
		}
	}

	/** Angular2 style: Observables */
	downloadJokeByObservalbe() {
		this.downloadJoke.downloadJokeAsSeparateObservable()
		.subscribe(
			joke => this.jokes.push(joke),
			err => this.alert.defaultErrorPopup(err),
		);
	}

	/** Angular2 style: A single observable possibly shared by many components */
	downloadJokeBySharedObservable() {
		this.downloadJoke.downloadJokeWithSharedObservable();
		// The rest will be done by the subscription in ctor
	}
}
