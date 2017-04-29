# Webpack onfigurációs lépések

> "Here be dragons"

A `webpack.config.common.js` fájlban a konfigurációs objektum főbb property-jei alapján megyünk végig.

**`entry`**: Ezek azok a fájlok, ahonnan elkezdődik a függőségek összegyűjtése. Az egyes belépési pontokból általában egy-egy chuck-ot (bundle-t) készítünk.
Sokszor szokott itt szerepelni egy `vendor.ts` is, ami most itt nem szerepel. Erről majd alább részletesen.

**`resolve.extensions`**: Hogy ne kelljen mindenhova kiterjesztést írni.

**`module.rules`**: Itt vannak a legfontosabb szabályok, amelyek a fordítási folyamatot vezérlik, amikor a Webpack elkezdi bejárni a függőségi fát a belépési pontokból indulóan.

- TS fájlok betöltése, fordítása
- HTML, Képek, fontok betöltése (külön szabályokkal)
- SCSS fájlok betöltése az `src/styles` mappából -- ezek alkalmazás szinten elérhetőek lesznek
- SCSS fájlok betöltése az `src/app` mappából -- ezeket komponens szinten leszűkíti, hogy csak egy komponensen belül működjenek

**`plugins`**: További globális működést befolyásoló pluginek. Pár fontos:

- `CommonsChunkPlugin`: Ez szabályozza, hogy milyen bundle kimenetek készülnek el, és hogy mi a sorrendjük:
	- `polyfills`: Ez a polyfill funkciók listája
	- `vendor`: Ez az `app` azon részeiből keletkezik, amelyek a `node_modules` mappában vannak (ergo külső függőségek), és onnan is csak azok, amelyeket a függőségi fából elérünk. Rád nézek, Tree Shaking!
	- `app`: Innen elkerül minden külső függőség a `vendor`-ba, marad az alkalmazásunk saját logikája
- `HtmlWebpackPlugin`:
	- Ez egyrészt átmásolja az `index.html` fájlt a `dist` mappába
	- Másrészt beleteszi az `index.html`-be az alkalmazásszintű stílus bundle-t és a JS bundle fájlokat, természetesen megfelelő sorrendben
		- Figyeld meg: Az `src/public/index.html` fájlban nincs semmi CSS vagy JS hivatkozás! De a böngészőben betöltött `index.html` fájlban már ott vannak


[Vissza](3-webpack.md)
