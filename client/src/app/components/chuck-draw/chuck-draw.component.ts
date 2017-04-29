import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
	templateUrl: './chuck-draw.component.html'
})
export class ChuckDrawComponent {
	width = 640;
	height = 480;

	@ViewChild('canvas')
	private canvasRef: ElementRef
	private ctx: CanvasRenderingContext2D;

	@ViewChild('chuckImg')
	private chuckImgRef: ElementRef;

	@ViewChild('boomImg')
	private boomImgRef: ElementRef;

	ngOnInit() {
		let canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
		this.ctx = canvas.getContext('2d');
	}

	drawChuck() {
		this.ctx.drawImage(this.chuckImgRef.nativeElement as HTMLImageElement, 0, 0, this.width, this.height);
	}

	drawBoom() {
		let width = 100;
		let height = 50;
		let x = Math.random() * (this.width - width);
		let y = Math.random() * (this.height - height);
		this.ctx.drawImage(this.boomImgRef.nativeElement as HTMLImageElement, x, y, width, height);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}
