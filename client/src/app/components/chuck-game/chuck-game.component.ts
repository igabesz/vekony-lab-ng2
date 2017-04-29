import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { keyboard, KeyboardListener } from './keyboard';

/**
	Need to list images here so that Webpack will copy them to the output.
	A better Webpack config could copy everything from the img folder. You can experiment with it.
 */
import '../../../img/bg.png';
import '../../../img/chuck.png';
import '../../../img/bullet.png';
import '../../../img/terrorist.png';

/** Helper interface to extend a PIXI.Sprite with velocity (x) */
interface HasVX { vx?: number; }
/** Helper interface to extend a PIXI.Sprite with velocity (y) */
interface HasVY { vy?: number; }
/** Helper interface to extend a PIXI.Sprite with a killed flag */
interface CanBeKilled { isKilled?: boolean; }

/** PIXI positions, sizes, other settings */
const settings = {
	bg: {
		width: 640,
		height: 480,
	},
	chuck: {
		anchor: { x: 0.5, y: 0.5 },
		position: { x: 320, y: 440, }, // Start position
		width: 80,
		height: 80,
		vx: 0.3, // per ms
	},
	terrorist: {
		anchor: { x: 0.5, y: 0.5 },
		position: { y: -40 }, // x will be random
		width: 40,
		height: 80,
		spawnChance: 0.002, // per ms
		vy: 0.1, // per ms
	},
	bullet: {
		anchor: { x: 0.5, y: 0.5 },
		// position will be the same as Chuck's position
		width: 10,
		height: 30,
		vy: -0.5, // per ms
	},
}


@Component({
	templateUrl: './chuck-game.component.html',
})
export class ChuckGameComponent implements OnInit {
	/** requestAnimationFrame will be stopped if this gets true */
	private destroyed = false;
	private keyLeft: KeyboardListener;
	private keyRight: KeyboardListener;
	private keySpace: KeyboardListener;
	/** Helper to calculate the delta-T between frames */
	private prevTime = 0;

	/** This element is the container of the <canvas> */
	@ViewChild('gameContainer')
	private gameContainer: ElementRef;
	/** The renderer draws. Might be a CanvasRenderer or a WebGLRenderer */
	private renderer: PIXI.SystemRenderer;
	/** The stage is the root of rendering. All of its children will be rendered. */
	private stage: PIXI.Container;
	private chuckSprite: PIXI.Sprite & HasVX;
	private enemies: (PIXI.Sprite & HasVY & CanBeKilled)[] = [];
	private bullets: (PIXI.Sprite & HasVY & CanBeKilled)[] = [];

	ngOnInit() {
		this.renderer = PIXI.autoDetectRenderer(settings.bg.width, settings.bg.height);
		this.gameContainer.nativeElement.appendChild(this.renderer.view);
		// Adding images with names. We can refer to them by the 1st params
		PIXI.loader.reset()
		PIXI.loader.add('bg', '/img/bg.png');
		PIXI.loader.add('chuck', '/img/chuck.png');
		PIXI.loader.add('bullet', './img/bullet.png');
		PIXI.loader.add('terrorist', '/img/terrorist.png');
		// Start querying these files
		PIXI.loader.load(() => this.onLoaded());
	}

	ngOnDestroy() {
		// We don't want to get animationFrames anymore
		this.destroyed = true;
		// Remove listeners
		this.keyLeft && this.keyLeft.delete();
		this.keyRight && this.keyRight.delete();
		this.keySpace && this.keySpace.delete();
	}

	/** Helper function to set the most common properties */
	private setSpriteProperties(sprite: PIXI.Sprite, props: any) {
		if (props.position) {
			props.position.x && (sprite.position.x = props.position.x);
			props.position.y && (sprite.position.y = props.position.y);
		}
		if (props.anchor) {
			props.anchor.x && (sprite.anchor.x = props.anchor.x);
			props.anchor.y && (sprite.anchor.y = props.anchor.y);
		}
		props.width && (sprite.width = props.width);
		props.height && (sprite.height = props.height);
	}

	/** PIXI resources loaded */
	private onLoaded() {
		const resources = PIXI.loader.resources;
		// Stage
		this.stage = new PIXI.Container();
		this.stage.width = settings.bg.width;
		this.stage.height = settings.bg.height;
		// BG
		const bg = new PIXI.Sprite(resources['bg'].texture);
		bg.width = settings.bg.width;
		bg.height = settings.bg.height;
		this.stage.addChild(bg);
		// Chuck
		const chuck: PIXI.Sprite & HasVX = new PIXI.Sprite(resources['chuck'].texture);
		this.setSpriteProperties(chuck, settings.chuck);
		chuck.vx = 0;
		this.chuckSprite = chuck;
		this.stage.addChild(this.chuckSprite);

		// Keyboard listeners
		this.keyLeft = keyboard(37);
		this.keyLeft.press = () => this.chuckSprite.vx = -1 * settings.chuck.vx;
		this.keyLeft.release = () => this.chuckSprite.vx = 0;
		this.keyRight = keyboard(39);
		this.keyRight.press = () => this.chuckSprite.vx = settings.chuck.vx;
		this.keyRight.release = () => this.chuckSprite.vx = 0;
		this.keySpace = keyboard(32);
		this.keySpace.press = () => this.createBullet();

		// Request 1st animation frame
		requestAnimationFrame(t => this.render(t));
	}

	private createTerrorist() {
		const resources = PIXI.loader.resources;
		const terrorist: (PIXI.Sprite & HasVY) = new PIXI.Sprite(resources['terrorist'].texture);
		this.setSpriteProperties(terrorist, settings.terrorist);
		const posX = 40 + Math.random() * (settings.bg.width - 80);
		terrorist.position.x = posX;
		terrorist.vy = settings.terrorist.vy;
		this.enemies.push(terrorist);
		this.stage.addChild(terrorist);
	}

	private createBullet() {
		const resources = PIXI.loader.resources;
		const bullet: (PIXI.Sprite & HasVY) = new PIXI.Sprite(resources['bullet'].texture);
		this.setSpriteProperties(bullet, settings.bullet);
		bullet.position.x = this.chuckSprite.position.x;
		bullet.position.y = this.chuckSprite.position.y;
		bullet.vy = settings.bullet.vy;
		this.bullets.push(bullet);
		// Bullet should be above the BG and below Chuck
		this.stage.addChildAt(bullet, 1);
	}

	render(time: number) {
		const dt = time - this.prevTime;
		this.prevTime = time;

		// Add new enemy
		if (Math.random() < settings.terrorist.spawnChance * dt) {
			this.createTerrorist();
		}

		// Move Chuck
		this.chuckSprite.position.x += this.chuckSprite.vx * dt;

		// Move enemies & bullets
		for (let enemy of this.enemies) {
			enemy.position.y += enemy.vy * dt;
			// Out of the map
			if (enemy.position.y > settings.bg.height + 40) enemy.isKilled = true;
		}
		for (let bullet of this.bullets) {
			bullet.position.y += bullet.vy * dt;
			// Out of the map
			if (bullet.position.y < -40) {
				bullet.isKilled = true;
				continue;
			}
			// Collisions -- very primitive algorithm but hey, it works!
			for (let e of this.enemies) {
				if (e.isKilled) continue;
				let dx = bullet.position.x - e.position.x;
				let dy = bullet.position.y - e.position.y;
				if (dx * dx + dy * dy < 20 * 20) {
					e.isKilled = true;
					bullet.isKilled = true;
					break;
				}
			}
		}

		// Killed enemies and bullets
		let killedEnemy = this.enemies.filter(e => e.isKilled);
		for (let enemy of killedEnemy) {
			enemy.destroy();
			this.enemies.splice(this.enemies.indexOf(enemy), 1);
		}
		let killedBullet = this.bullets.filter(e => e.isKilled);
		for (let bullet of killedBullet) {
			bullet.destroy();
			this.bullets.splice(this.bullets.indexOf(bullet), 1);
		}

		// Render
		this.renderer.render(this.stage);
		// Requesting next animation frame
		(!this.destroyed) && requestAnimationFrame(t => this.render(t));
	}
}
