# Build folyamat és Webpack

Az órán az első 3 laboron SystemJS alapú build-et használtunk, a 4. laboron viszont Webpack-et.
Itt az egész repót átírtam, hogy Webpack-et használjunk.


## Na de mi az a build?

A forráskódot TypeScript-ben írjuk, mert ez sokkal jobb, mint natív JS-t írni.
Viszont a böngészők nem tudnak TS-t futtatni, csak JS-t,
ezért a megírt kódokat le kell fordítani a böngésző által is emészthető formátumra.

Nézzük át, milyen főbb build feladatok vannak!


### JS build

Ne feledd: A böngésző **sosem** az általad írt TS kódot futtatja! A tényleges futás szempontjából a típusosság csak illúzió.
Hasznos, produktív, kényelmes illúzió, mert gyorsabban és jobban fejlesztünk típusosan, de a futásnál a típusosságból nem marad szinte semmi.

> **Pro kérdés**: Ha mégis látszik bármi a típusból a JS kódban, akkor mi az?
> Segítség: `experimentalDecorators`

- TS -> JS fordítás
- ES6+ -> ES5 fordítás. Mert ugye a régi böngészők ES6 (ES2015) funkciókat nem támogatnak
- Bundle: sok JS fájlból 1 JS fájl készítése.
	- 1 fájl gyorsabban letöltődik, gyorsabban elindul az alkalmazás
	- A gyorsabb letöltést segíti a HTTP/2 szabvány, ami egy kérésre több fájlt is le tud küldeni.
	Így a szerver előre el tudja küldeni azokat a fájlokat, amiről tudja, hogy szükségünk lesz rá.
	- A cache is gyorsíthat a folyamatokon, de az 1. letöltésnél ugye az nem játszik.
- Minification
- Uglification (Obfuscation), ha el akarjuk rejteni a forráskódot.

> **Pro tipp**: Azért ne hidd, hogy bármit is annyira el lehet rejteni JS kódban...


### CSS build

Itt megint hasonló a helyzet, mint a JS esetén.
Egyrészt annyira nem rajongunk a CSS-ért, inkább szeretnénk valami magasabb szintű nyelvet futtani, pl. LESS, SASS, SCSS.
Ezek CSS alapú nyelvek, de vannak bennük olyan "egzotikus" lehetőségek, mint például lehet változót definiálni (`$almostRed: #e80000`)
és azt utána máshol is újrafelhasználni (`.error-text { color: $almostRed; }`). Viszont ne feledd: a böngésző (általában) csak CSS-t eszik meg!

- LESS, SASS, SCSS -> CSS fordítás
- Böngészőkompatibilitás (jellemzően prefixelés, ld. alább)
- Bundle készítése
	- Tree Shaking: A külső függőségek általában sok olyan részt is tartalmaznak, amit a mi alkalmazásunk nem használ. Ha ES2015-ös importálással dolgozunk, akkor lehetővé válik az, hogy a végső bundle-ben csak azok a függőségek szerepeljenek, amelyeket ténylegesen használunk is. Azaz a fordítás során kikukázunk mindent, amit nem használunk. Ezzel sokszor jelentős méretcsökkenést lehet elérni.
- Minification

Prefix példa:
```
.page-wrap {
  display: -webkit-box;  /* iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox;  /* IE 10 */
  display: -webkit-flex; /* Safari 6.1+. iOS 7.1+, BB10 */
  display: flex;
}
```

> **Pro tipp**: Olvass utána a [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)-nak!


### HTML build

Külön a HTML fájloknál a minification a legjellemzőbb különálló build lépés.


### Egyebek

A build folyamatban képek felbontását és méretezését is szokás tekergetni.
Pl. nem akarunk böngészőkben nyomtatási minőségű fájlokat letölteni.
Rá lehet bízni a build rendszerre, hogy a képeken végezzen megfelelő méretcsökkentő transzformációkat.


## Webpack

A Webpack egy igen komplex build keretrendszer, amiben rengeteg részletkérdést lehet beállítani.
A rendszer erejét az adja, hogy számtalan plugin segítségével lehet különböző működéseket beállítani és finomhangolni.

> **Pro tipp**: Ha egy nagy projektnél Webpack-et kell tekergetned,
akkor készülj fel arra, hogy sok dokumentációt, StackOverflow-t és issue-t fogsz olvasgatni.
Könnyen elmehet vele az embernek 1-2 napja. De cserébe egy iszonyatosan erős eszközt tanulsz meg kezelni.


### NPM Szkriptek

Ebben a projektben NPM szkripteket használunk. Ezek a `package.json` fájlban, a `scripts` objektumban kerülnek definiálásra.
Futtatni őket az `npm run <script-name>` paranccsal lehet. Az elérhető parancsokat az `npm run` hívás kilistázza.

```
"dev-server": "cd client && webpack-dev-server --config webpack.config.dev.js --content-base dist",
"build:client": "cd client && webpack --config webpack.config.prod.js",
"watch:client": "cd client && webpack --config webpack.config.dev.js -w"
```

Ahogy azt az [1. részben](1-install.md) már leírtuk, az első paranccsal (`npm run dev-server`) elindítunk egy Webpack build szervert. Ez a következőket tudja:

- Lefordítja a projektet a megadott konfiguráció alapján
- A `dist` mappába teszi az eredmények egy részét (de nem mindent!)
- Ha változnak az érintett fájlok, akkor újrafordít
- Kiszolgálja a lefordított fájlokat `localhost:8080`-on
- A csatlakozott böngészőket frissíti, ha újrafordítás történt

A második parancs production verziót build-el.

A harmadik parancs build-el és utána watch-ol (újrabuild-el, ha változás történik), de nem szolgál ki fájlokat.


#### Szkriptek és útvonalak

Az NPM szkriptek látják a `webpack` és `webpack-dev-server` parancsokat, mivel a `node_modules/.bin` mappában vannak ilyen parancsok. (Nézd meg!)
Ez azért jó, mert így admin jogok nélkül is feltelepíthetünk futtatható szkripteket egy projekten belülre,
és NPM szkripteken keresztül rendesen el is érjük őket.


### Webpack konfig fájlok

A projekt 3 Webpack konfig fájlt tartalmaz az `src` mappában:

- `webpack.config.common.js`: alap konfiguráció, amire a másik kettő épül
- `webpack.config.dev.js`: fejlesztés közben használatos konfig
- `webpack.config.prod.js`: production build

Utóbbi kettő az elsőre épül, ezt érdemes forráskód szintjén is megnézni.


### Konfigurációs lépések

[Webpack konfiguráció](3-webpack-config.md): Ez nem tananyag, de érdemes átfutni, hogy az embernek legyen egy átfogó képe.


[Vissza](index.md)
