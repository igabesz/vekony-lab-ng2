import { Component } from '@angular/core';

@Component({
	selector: 'home-component',
	template: `
<a class="btn btn-link" routerLink="joke-list">Joke List</a>
<a class="btn btn-link" routerLink="draw">Chuck Draw</a>
<a class="btn btn-link" routerLink="game">Chuck Game</a>
<a class="btn btn-link" routerLink="chat">Chat</a>
`,
})
export class HomeComponent {}
