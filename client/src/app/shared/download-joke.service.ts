import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import ChuckJoke from './chuck-joke';


/** The format of the server, see here:
	http://www.icndb.com/api/
*/
interface JokeFromServer {
	type: 'success';
	value: {
		id: number;
		joke: string;
		categories: string[];
	}
}


@Injectable()
export class DownloadJokeService {
	/** Shared Subject, anyone can subscribe for it */
	newJokes = new Subject<ChuckJoke>();

	constructor(
		private http: Http, // Dependency Injection
	) { }

	/** Internal helper to actually do the querying
		NOTE: Some error checking would be nice too...
	*/
	private getJoke(): Observable<ChuckJoke> {
		return this.http.get('http://api.icndb.com/jokes/random?exclude=[explicit]')
		.map(res => <JokeFromServer>res.json())
		.map(res => <ChuckJoke>({
			id: res.value.id,
			joke: res.value.joke,
			isNerdy: res.value.categories.indexOf('nerdy') !== -1,
		}));
	}

	/** Return with Node-style callback: 1st parameter is error (if any), 2nd is the result */
	downloadJokeByCb(cb: (error: any, joke?: ChuckJoke) => any) {
		this.getJoke().subscribe(
			result => cb(null, result),
			err => cb(err),
		);
	}

	/** Return results using a query */
	downloadJokeByPromise(): Promise<ChuckJoke> {
		return new Promise((resolve, reject) => {
			this.getJoke().subscribe(
				result => resolve(result),
				err => reject(err),
			);
		});
	}

	/** The Angular2 way: return an Observable, one can subscribe */
	downloadJokeAsSeparateObservable(): Observable<ChuckJoke> {
		return this.getJoke();
	}

	/** Another Angular2 solution:
		everyone subscribes for the 'newJokes' observable,
		then anyone gets the result if one calls this function.
	*/
	downloadJokeWithSharedObservable(): void {
		this.getJoke().subscribe(
			result => this.newJokes.next(result),
			err => this.newJokes.error(err),
		);
	}

}
