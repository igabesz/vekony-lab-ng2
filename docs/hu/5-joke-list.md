# `JokeListComponent` és `DownloadJokeService`

A JokeListComponent funkciója az, hogy az [Internet Chuck Norris Database](http://icndb.com)-ből Chuck Norris vicceket töltsünk le. Ezzel együtt kiváló lehetőségünk akad a JavaScript aszinkronitás tanulmányozására, valamint vethetünk egy pillantást az Angular2 Http szolgáltatására is.


## JavaScript aszinkronitási megoldások

A JavaScript egyszálú, eseményvezérelt nyelv. Emiatt úgy vannak megírva a szolgáltatások, hogy ha valamire várakozni kell, akkor arra kizárólag aszinkron interfészt kapunk, mivel az egyetlen rendelkezésre álló szál addig is csinálhat esetleg valamit.

> **Pro kérdés**: A JavaScript-et hogyan lehet mégis valamiféleképp többszálúvá tenni? (Válasz az oldal alján.)

> **Pro tipp**: Érdekes szinkron kivételek az `alert`, `prompt` és `confirm` parancsok. Ezeknél a böngészőablak várakozik -- fontos tudni, hogy amíg fent van egy alert ablak, addig az oldalon más kód nem fog futni! Ezért is javasolt ezek helyett valami rendes modális ablakot használni.

> **Megjegyzés**: Szerveroldalon, NodeJS-ben is vannak várakozó szinkron hívások, de azok használata általában ellenjavallott.

Az aszinkronitás kezelésére a következő eszközök állnak a rendelkezésünkre. Ezeket részletesen a `JokeListComponent` és `DownloadJokeService` osztályokban össze tudod hasonlítani, javasoljuk, hogy nyisd meg, miközben olvasod ezt a leírást.


### Callback függvény

A legegyszerűbb megoldás, végső soron minden eseményre egy callback függvény segítségével iratkozunk fel. "Ha ez teljesül, akkor hívd meg ezt a függvényt".

- [+] Mindennek ez az alapja
- [+] Egyszerű
- [-] Nem alkalmas bonyolult feladatokra


### Promise

A `Promise` osztály sokkal átláthatóbbá teszi az aszinkronitást. Az ES2015 szabvány részeke, addig is, polyfill-elhető. Egy Promise-ra fel lehet iratkozni a `then` illetve a `catch` függvényekben egy-egy callback megadásával, előbbi sikeres teljesülés, utóbbi hiba esetén kerül meghívásra.

- [+] Szebb architektúra
- [+] Alkalmas komplex, több lépéses aszinkron folyamatok vezérlésére
- [-] Csak részben alkalmas komplex adatfolyamok kezelésére
- [-] Szokatlan a vezérlési logikája
- [-] Bőbeszédű, sok a kód

> **Megjegyzés**: A szokatlan vezérlési logika alatt azt értem, hogy a `Promise` konstruktorában megadott függvény kapja a `resolve` és `reject` callback függvényeket paraméterként; ezekkel nekünk kell valamit csinálnunk a függvényben. Így a konstruktorban megadott függvény a szinkron futás részének tekinthető. Ha neked nem szokatlan vagy már megszoktad, az jó.

### `async`-`await`

Ez egy Promise-ra épülő megoldás, ami látszólag szinkronná teszi a végrehajtást. Főbb pontjai:

- Egy `async function`-ben tudjuk használni az `await` kulcsszót
- Az `await` segítségével várakozhatunk egy másik `async` függvényre, vagy bármire, ami `Promise`-t ad vissza
	- A Promise teljesülésekor megkapjuk az eredményt (mint a `.then()`-ben megadott callback)
	- A Promise hibája esetén eldobja azt a hibát, amit amúgy a `.catch()`-ben kapnánk, ezt rendes `try`-`catch` blokkal tudjuk elkapni
- Egy `async` függvény **mindig** Promise-szal tér vissza
	- Kívülről tudjuk úgy kezelni, mintha egy nem `async` függvény lenne Promise visszatérési értékkel
	- Így lehet egy **nem** `async` függvényből meghívni egy `async` függvényt

Pro-kontra érvek:

- [+] Nagyon kényelmes használni
- [+] Átláthatóvá teszi a kódot
- [+] Nem rontja el a kompatibilitást
- [-] Komplex adatfolyamok kezelésére még mindig nem optimális
- [-] Ne felejtsük el, hogy a kód továbbra is aszinkron marad, bár szinkronnak látszik
- [-] Bonyolultabb, mint egy callback


### RxJs `Observable`

Az Angular2 csapata a belső aszinkron műveleteket RxJs alapokra helyezte. Ez egy elég magas szintű adatfolyam-vezérlő rendszer, amivel komplex feldolgozásokat lehet megadni. Éppen ezért komplexebb, mint a fenti módszerek, viszont ez mind közül a legerősebb.

- [+] Nagyon erős adatfolyam alapú megoldás
- [+] Az Angular2 szemléletmódjához jól illeszkedik
- [-] Ez a legbonyolultabb mind közül

> **Megjegyzés**: A [ReactiveX](http://reactivex.io) egy cross-platform megoldás, ami JavaScript alatt RxJs néven elérhető.

> **Megjegyzés**: Az RxJs az ECMAScript Observable javaslatot próbálja már most elérhetővé tenni. A javaslat (proposal) jelenleg [Stage 2](https://github.com/tc39/proposals) állapotban van, Stage 4 a kész. Szóval "- Törppapa, messze van még? - Igen, messze!"

Javasolt olvasmány: [RxMarbles](http://rxmarbles.com/).


### Generátorfüggvények és `yield`

Ezt csak azért említjük meg, hogy halljatok róla. Nagyon erős, de nagyon alacsonyszintű megoldások, nem foglalkozunk velük, mert általában nincs szükség rájuk. [Részletek itt](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/yield).



## Angular2 Http szolgáltatás

Az Angular2 célja többek közt az, hogy egy önálló keretrendszer legyen, nem csak egy csomag a sok közül, hanem az, ami önmagában lefedi az alkalmazás fejlesztése során az alapigények jelentős részét. Az egyik ilyen alapigény az XHR/AJAX kommunikáció, hogy az oldal betöltése után tudjunk kódból HTTP kéréseket indítani. Erre szolgál az `@angular/http` csomag.

Az Angular2 Http csomag rendelkezésünkre bocsátja a `Http` osztályt, ami igen magas szintű AJAX-kezelést tesz lehetővé, és remekül illeszkedik az Angular2 keretrendszerébe.

Érdemes elolvasni a hivatalos Angular2 tutorial [vonatkozó részét](https://angular.io/docs/ts/latest/tutorial/toh-pt6.html).


## `DownloadJokeService`

Ez a komponens valósítja meg a viccek lekérését. Kifelé 4 függvényt tesz elérhetővé, amik mind egy-egy viccet töltenek le és adnak vissza aszinkron módon, de mind egy kicsit másképp.

> **Megjegyzés**: A kód igen bőbeszédűen kommentelt, és a fentiekkel összevetve egyértelműnek kell lennie.

Egy dolgot emelünk itt ki. Két RxJs alapú megoldást csináltunk. Az egyik csak a hívó és a szolgáltatás magánügyeként működik, a másiknál viszont azt feltételezzük, hogy ennek a hívásnak az eredményére bizonyára más is igényt tart, ezért egy publikus `Observable` elemen keresztül tesszük majd elérhetővé az eredményt, amire lehet, hogy a hívón kívül más is feliratkozott. Nyilván tervezési kérdés, hogy mikor melyik megközelítést érdemes használni.


## `JokeListComponent`

Itt jelenítjük meg a vicceket. Az 5 gomb 5 különböző lekérési módszert valósít meg. Hasonlítsd össze az 5 megoldást!


> **Pro válasz** (a fenti kérdésre): Böngészőben WebWorker, ServiceWorker, illetve NodeJS-ben ChildProcess.

[Vissza](index.md)
