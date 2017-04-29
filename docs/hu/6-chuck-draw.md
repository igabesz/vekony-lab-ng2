# HTML5, canvas és ChuckDrawComponent

A `ChuckDrawComponent` bemutat egy egyszerű, "lábbalhajtós" megoldást a Canvas kezelésére. Mielőtt áttekintenénk ennek a részleteit, először egy kis background-ot vázolunk fel.


## A Flash siratója

Az Adobe Flash története a 90-es években kezdődött egy egyszerű animációs programként. A 2000-es évek elejére rendkívüli módon elterjedt, mivel olyan megoldásokat tett lehetővé a weben, amik JavaScript + HTML + CSS használatával megvalósíthatatlanok voltak. 10 évvel ezelőtt Flash segítségével lehetett a leglátványosabb, legjobb oldalakat összeállítani. Ezen egy darabig az sem változtatott, hogy a Flash sok gépen komoly teljesítményproblémákhoz vezetett, vagy hogy óriási biztonsági rései vannak.

Először az Apple ment neki a Flash-nek azzal, hogy nem engedélyezte a használatát sem az iPhone készülékeken, sem később az iPad-eken.
Úgy tűnik, az Apple [győztesen jött ki](https://techcrunch.com/2012/06/30/steve-jobs-war-against-flash/) a mobil-fronton megnyitott harcból.
2012 magasságában az Android eszközökön is [megszűnt a Flash támogatottsága](http://www.digitaltrends.com/android/adobe-flash-for-android-gone-with-barely-a-whimper/),
a YouTube 2015 elején állt át alapértelmezett Flash lejátszóról alapértelmezett [HTML5 lejátszóra](https://youtube-eng.googleblog.com/2015/01/youtube-now-defaults-to-html5_27.html),
2017-től pedig az AdWords hirdetések sem használhatnak Flash-t, [csak HTML5-öt](https://plus.google.com/+GoogleAds/posts/dYSJRrrgNjk).
A váltás okai:

- A Flash nem szabvány, hanem egy cég saját tulajdona
- Biztonsági rések
- Teljesítménykérdések, mobilokon akkumulátor
- Több platformon nem támogatott
- Kilóg a webes környezetből (pl. keresésoptimalizálás, együttműködés az oldal többi részével, egyéb webes megoldásokkal)
- Külön kell telepíteni
- És hát az üzlet: A Flash játékokat nem kell megvenni a Google Playben vagy az AppStore-ban

> **Megjegyzés**: Érdemes elolvasni [Steve Jobs írását](https://www.apple.com/hotnews/thoughts-on-flash/) a Flashről.

Az utóbbi években elértünk oda, hogy a webes szabványok felzárkóztak, sőt, megelőzték a Flash-t. A trónkövetelők:

- HTML5 `<video>` tag: A korábbi Flash videók helyett
- HTML5 `<audio>` tag: Hanglejátszás böngészőben
- HTML5 `<canvas>` és erre épülő grafikai keretrendszerek (pl. PIXI): Játékok és grafika-orientált feladatok megvalósítása
- CSS animation és transition

Mindezek szabványokon álló megoldások, amelyek mögött széles közösség és jelentős ipari szereplők is állnak.
Elmondható tehát, hogy a webes világ meghaladta a Flash-t. A Flash vagy még agonizál egy darabig a piacon, vagy hamar ki fog múlni, de a jövő egyértelműen az új megoldásoké.


## A `<canvas>`

Mielőtt részletesen belemegyünk a canvas ismertetésébe, röviden tekintsük át a canvas által nyújtott funkciókat! A legfontosabb tulajdonságok az alábbiakban láthatók – figyelem, sokat elhagytunk!

> **Megjegyzés**: Ezeket nem kell bemagolni.

```
interface HTMLCanvasElement extends HTMLElement {
	height: number;
	width: number;
	getContext(contextId: "2d"): CanvasRenderingContext2D;
	getContext(contextId: "experimental-webgl"): WebGLRenderingContext;
	toDataURL(type?: string, ...args: any[]): string;
	toBlob(): Blob;
	/* AND SOME MORE OMITTED */
}
interface CanvasRenderingContext2D extends Object, CanvasPathMethods {
	readonly canvas: HTMLCanvasElement;
	drawImage(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, offsetX: number, offsetY: number, width?: number, height?: number /*omitted*/): void;
	fillRect(x: number, y: number, w: number, h: number): void;
	fillText(text: string, x: number, y: number, maxWidth?: number): void;
	rotate(angle: number): void;
	scale(x: number, y: number): void;
	translate(x: number, y: number): void;
	/* AND MUCH-MUCH MORE OMITTED */
}
```

Canvas-re rajzolni lehet 2D-ben és WebGL segítségével. Utóbbi nagyon izgalmas kísérleti technológia, amivel jelen tárgy keretein belül nem tudunk foglalkozni. A 2D grafikai megoldások között szerepelnek a klasszikus alacsonyszintű műveletek (útvonal, téglalap, szöveg kirajzolása), transzformációk (rotate, scale, translate, stb.), valamint a gyakorlatban legerősebb funkció a képek (esetleg más canvas vagy videó) kirajzolása: `drawImage()`.

Gyakorlati alkalmazásokban a canvas-t rendszerint valamilyen keretrendszerrel használjuk, pl. [PIXI](http://www.pixijs.com/), [EaselJS](http://www.createjs.com/easeljs), vagy [Phaser](http://phaser.io/).


## A BLOB-ok

> **Kiegészítő anyag**

WIP


## Angular2 lifecycle

Még térjünk vissza egy kicsit az Angular2 vidékére!

Az Angular2-ben az életciklus fogalma a következőt takarja. A komponenseket normál esetben a keretrendszer hozza létre, és a keretrendszer köti össze a DOM megfelelő elemeivel. Ugyancsak a keretrendszer intézi az adatkötést, azaz a DOM változásai és eseményei következtében áthív a komponensbe, illetve a komponens bizonyos történései után módosításokat végez a DOM-ban.

Van lehetőségünk arra, hogy ezekre a történésekre reagáljunk a kódban. Ezt teszik lehetővé a *lifecycle hook*-ok, azaz megfelelő nevű függvények a komponensben. Ha létezik ilyen függvény, akkor a keretrendszer meghívja, ha nincs, akkor megy tovább. Ezek közül a legfontosabbak:

- `konstruktor`: Ez a példányosodásnál kerül meghívásra
	- Nem is igazi lifecycle hook, magából a programnyelvből következik
	- Ilyenkor még nincs kapcsolat a komponens és a DOM között
	- Azért tettem mégis ide, hogy együtt lássuk a folyamatot
- `ngOnInit`: Sikerült az adatkötés, valamint a komponens megkapta az `@Input` értékeket
- `ngAfterViewInit`: Sikerült a gyermek komponenseket és nézeteket betölteni
- `ngOnDestroy`: A komponens megsemmisítése előtt kerül meghívásra
	- Leiratkozások eseményekről, RxJs `Observable` elemekről
	- Itt kell figyelni a memóriafolyás elkerülésére

> **Tipp**: Nem kötelező, de érdemes használni az `OnInit`, `OnDestroy`, stb. interfészeket az `@angular/core` csomagból. Ez arra jó, hogy kikényszeríti tőlünk, hogy készítsük el az adott lifecycle hook-ot. Ez segít az elírások ellen.

A részletes dokumentáció [itt érhető el](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html).


## Angular2 `ViewChild`

Egy komponensben felmerülhet az igény arra, hogy elérjünk bizonyos DOM elemeket. Erre a `ViewChild` és `ViewChildren` direktívák használhatók:

- Név szerinti elérés
	- Template: `<div #myDiv></div>`
	- Komponens: `@ViewChild('myDiv') myDiv: ElementRef`)
- Típus szerinti elérés
	- Behivatkozandó komponens vagy direktíva: `ChildComponent`
	- Template: `<child-component></child-component>`
	- Komponens: `@ViewChild(ChildComponent) childComponent: ElementRef`

Ezt arra fogjuk használni, hogy elérjük a `<canvas>`-t, így fogunk tudni rajzolni rá.

> **Megjegyzés**: Erre használható lenne a jQuery-t is, de az architekturálisan nagyon csúnya lenne. A jQuery használata már Angular 1.x-ben is ellenjavalt volt (bár néha kicsit egyszerűbb volt), de Angular 2 felett már indokolatlan is. Just don't.

Figyelj arra, hogy a `ViewChild`, pontosabban azon belül a `nativeElement` változó a komponens konstruktorában még nem létezik! Csak `ngOnInit` vagy `ngAfterViewInit` hívásban (vagy ezek után) érjük el így a DOM-ot.

A `ViewChild`-ról egy tömör áttekintést [itt lehet olvasni](http://learnangular2.com/viewChild/).


## Rajzolás: `ChuckDrawComponent`

A kód jól dokumentált, remélhetőleg érthető. Néhány pontra hívjuk fel csak a figyelmet.

- 2D kontextussal dolgozunk
- A template-ben a `#chuckImg` és `#boomImg` képeket betöltjük, de elrejtjük őket
- A "boom" rajzolásának a pozíciója véletlenszerű


[Vissza](index.md)
