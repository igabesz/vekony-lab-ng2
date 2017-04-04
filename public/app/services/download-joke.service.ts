import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ChuckJoke from '../models/chuck-joke';


@Injectable()
export class DownloadJokeService {

	downloadJoke(): Observable<ChuckJoke> {
		// Get jokes from here:
		// http://api.icndb.com/jokes/random?exclude=[explicit]
		// Then format it to ChuckJoke and return it
		return null;
	}
}
