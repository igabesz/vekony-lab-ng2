# A PIXI és a `ChuckGameComponent`


## A PIXI rövid ismertetése

Itt néhány alapgondolatot ismertetünk a PIXI-ről.

**Inicializálás**: A PIXI számára kell egy canvas a rajzoláshoz. (Canvas és WebGL kontextus is megfelel számára.)

- A PIXI-nek adhatunk egy `<canvas>` elemet
- A PIXI-nek adhatunk egy DOM elemet, amiben ő létrehoz egy új `<canvas>`-t
- Ha más nincs, akkor automatikusan a body végére illeszt egy új `<canvas>`-t

**Erőforrások betöltése**: Webről lévén szó, előfordulhat, hogy a Pixiben egy HTTP kérés távolságra lévő képet vagy más fájlt szeretnénk használni. Ebben tud segíteni a PIXI Loader objektuma, ami aszinkron letölti ezeket, és visszaszól, ha minden megvan.

**Renderer**: Ez csomagolja be a Canvas kontextusát. Egy Container-t lehet neki megadni, hogy azt (és annak gyerekeit) rajzolja ki.

**Container**: Ilyenbe további elemeket rakhatunk. Számos osztály őse. Főbb tulajdonságai:

- `position: PIXI.Point`
- `width: number`
- `height: number`
- `visible: boolean`
- `parent: PIXI.Container`
- `children: PIXI.DisplayObject[]`

**Sprite**: A `Container` leszármazottja, egy kép kirajzolására alkalmas. Főbb tulajdonságai:

- `anchor`: Arány, hogy melyik pontjánál fogva pozícionáljuk a képet, pl. (0.5,0.5): a közepénél fogva
- `texture`: Kirajzolásra szánt textúra, jellemzően a Loaderrel töltjük be

**Rajzolási sorrend**: A PIXI-ben nincs z-index, az egyes elemeket olyan sorrendben rajzolja ki, ahogy azok szerepelnek a `renderer.render()` hívásnak adott Container-ben.

**Rajzolás módja**: Kérünk egy rajzolási callback-et a `requestAnimationFrame` segítségével. Ha folyamatos újrarajzolást szeretnénk, akkor minden rajzolás végén kérjünk egy újabb visszahívást. Az ilyen hívásokban megkapjuk az első hívás óta eltelt időt is.

> **Megjegyzés**: Ha a böngésző tab a háttérben van, akkor a böngésző sokszor nem ütemez abban a tabban `requestAnimationFrame`-et. Ez fura jelenségekhez tud vezetni.


## A PIXI használata

A kód nagyon szépen dokumentált. Néhány dolgot emelünk csak ki.

- A Webpack miatt a TS fájl elején behivatkozzuk a felhasználandó képeket.
	- Ez kizárólag arra kell, hogy jelezzük a Webpack build számára, hogy ezeket a képeket se hagyja ki a build folyamatból.
	- Jelen esetben ez azt jelenti, hogy másolja át a képeket az `src/images` mappából a `dist/images` mappába.
	- Megjegyzés: Megoldható, hogy a Webpack egy teljes mappát átmásoljon a build folyamán, csak a mostani konfig nem tartalmazza.
- A `components/chuck-game/keyboard.ts` fájlban a `keyboard` függvénnyel tudunk feliratkozni a billentyűnyomásra.
	- Erre is van jobb megoldás: Az Angular2-ben lehet `HostListener`-t létrehozni, amiben fel lehet iratkozni a billentyűnyomásra, de ez nem tananyag.
- A kódban van egy egyszerűen javítható bug.
	- Próbáld meg a következőt: Bal nyíl lenyomása (Chuck megy balra), jobb nyíl lenyomása (Chuck megy jobbra), bal nyíl felengedése (Chuck megáll)
	- Mi a hiba oka?
	- Próbáld meg javítani!

Innentől javasoljuk a kód részletes tanulmányozását, vagy a törlését és újraírását, vagy akár a továbbfejlesztését.

> **Pro tipp**: Néhány óra alatt össze tudtunk rakni egy olyan játékot, amivel egy percet vígan el lehet játszani. Még pár óra munkával ezt fel lehet nyomni olyan 5 percig (életerő, fokozatos nehezedés, pontszám, többféle ellenség), további pár nap munkával már kifejezetten élvezhető játékot lehet összehozni (több pálya, 1-2 vásárolható upgrade).


[Vissza](index.md)
