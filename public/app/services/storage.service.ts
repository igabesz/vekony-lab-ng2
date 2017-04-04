import { Injectable } from '@angular/core';
import ChuckJoke from '../models/chuck-joke';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class StorageService {
	private static DB_NAME = 'SubjectDatabase';
	private static DB_VERSION = 1;
	private static SUBJECTS = 'subjects';

	private db: IDBDatabase = null;
	initialized = new BehaviorSubject<boolean>(false);

	initialize() {
		console.log('StorageService.initialize');
		// Opening database
		let request = indexedDB.open(StorageService.DB_NAME, StorageService.DB_VERSION);
		// Error handler
		request.onerror = (event) => {
			console.log('error', event);
			this.initialized.thrownError(event);
		};
		// Success handler
		request.onsuccess = (event: any) => {
			console.log('success', event);
			this.db = event.target.result;
			this.initialized.next(true);
		};
		// Upgrade handler
		request.onupgradeneeded = (event) => this.onUpgrade(event);
		return this.initialized;
	}

	private onUpgrade(upgradeEvent) {
		console.log('StorageService.onUpgrade');
		let db: IDBDatabase = upgradeEvent.target.result;
		// Here we create the database
		let store: IDBObjectStore = db.createObjectStore(StorageService.SUBJECTS, { keyPath: 'id' });
		// Adding further index fields
		store.createIndex('isNerdy', 'isNerdy', { unique: false });
	}

	private getObjectStore(mode: 'readonly' | 'readwrite' = 'readonly') {
		if (!this.db) throw new Error('StorageService is not initialized!');
		// Create a transaction and return SUBJECTS_TABLE
	}

	clear() {
		console.log('StorageService.clear');
		// Get store
		// Clear store
		// Returning promise
	}

	add(subject: ChuckJoke) {
		console.log('StorageService.upload');
		// Get store
		// Add item
		// Return promise
	}

	getAll() {
		console.log('StorageService.getAll');
		let results: ChuckJoke[] = [];
		// Get store
		// Get cursor
		// Return promise
	}

	getAllNerdy() {
		console.log('StorageService.getAllNerdy');
		// Tip: use the store.index() and set a KeyRange with IDBKeyRange.<???>
	}

}
