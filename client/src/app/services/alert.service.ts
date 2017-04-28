import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import * as swal from 'sweetalert';


export interface AlertParams {
	title?: string;
	text: string;
	/** Defaults to true */
	closeOnConfirm?: boolean;
};

export interface PromptParams {
	title: string;
	text: string;
	placeholder?: string;
	inputValue?: string | number;
	/** Defaults to true */
	closeOnConfirm?: boolean;
}


@Injectable()
export class AlertService {
	/**
		When you want to get a 2nd feedback from the user.
		Watch out, you have to close the popup manually or by a 2nd popup. Make sure you'll call it!
	*/
	warningConfirm(params: AlertParams) {
		return new Promise(res => swal(<any>{
			title: params.title || 'Warning',
			text: params.text,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#ff3684',
			cancelButtonColor: '#3bc2db',
			confirmButtonText: 'Yes',
			closeOnConfirm: params.closeOnConfirm,
		}, res));
	}

	successPopup(params: AlertParams) {
		return new Promise(res => swal({
			title: params.title || 'Success',
			text: params.text,
			type: 'success',
			closeOnConfirm: params.closeOnConfirm,
		}, res));
	}

	prompt(params: PromptParams) {
		return new Promise<string | false>(res => swal({
			title: params.title,
			text: params.text,
			type: 'input',
			showCancelButton: true,
			inputPlaceholder: params.placeholder,
			inputValue: <any>params.inputValue,
			closeOnConfirm: params.closeOnConfirm,
		}, swResult => res(<string | false>swResult)));
	}

	numberPrompt(params: PromptParams) {
		return new Promise<number | false | null>(res => swal({
			title: params.title,
			text: params.text,
			type: 'input',
			inputType: 'number',
			showCancelButton: true,
			inputPlaceholder: params.placeholder,
			inputValue: <any>params.inputValue,
			closeOnConfirm: params.closeOnConfirm,
		}, swResult => {
			if (typeof swResult === 'boolean') return res(false);
			if (swResult === '') return res(null);
			let result = parseFloat(swResult);
			if (isNaN(result)) return res(false);
			return res(result);
		}));

	}

	errorPopup(params: AlertParams) {
		return new Promise(res => swal({
			title: params.title || 'Error',
			text: params.text,
			type: 'error',
			closeOnConfirm: params.closeOnConfirm,
		}, swResult => res()));
	}

	defaultErrorPopup(err?, wait?: boolean) {
		console.error('Error', err);
		let title = 'Error';
		// Basic error message
		let text = 'Something went wrong. :(';
		if (err && err instanceof Response) {
			// Angular won't parse the response
			text = `Cannot complete the request.`;
			let status = err.status;
			if (status !== 0) {
				// Better: error based on status
				text = `Cannot complete the request: ${status} ${err.statusText}`;
			}
			try {
				// Best: error from response
				let res = err.json();
				if (res.errors && res.errors[0]) {
					text = res.errors[0].message;
				}
			}
			catch (err) {}
		}
		swal.close();
		let item = (window as any).$('.sweet-alert')[0];
		let waitTime = (item && item.style.opacity > 0) ? 200 : 0;
		return new Promise(res => {
			// need 200 ms timeout if there was a previous popup
			setTimeout(() => {
				swal({ title, text, type: 'error' } , res);
			}, waitTime);
		});
	}
}
