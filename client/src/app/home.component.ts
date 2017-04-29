import { Component } from '@angular/core';

@Component({
	selector: 'home-component',
	template: `
<a class="btn btn-link" routerLink="joke-list">Joke List</a>
<a class="btn btn-link" routerLink="chat">Chat</a>
<a class="btn btn-link" routerLink="game">Chuck Game</a>
`,
})
export class HomeComponent {}
