# WebSocket alapú chat

Először átnézzük a WebSocket protokollt és az azt megvalósító SocketIO könyvtárat, majd utána megnézzük a chat komponenst.


## A WebSocket protokoll

A WebSocket szabvány lehetővé tesz valósidejű, valóban kétirányú (full-duplex) kommunikációt a szerver és a kliens között. Eredetileg a HTTP kommunikáció arra készült, hogy a kliens kéréseket küldjön, és a szerver azokat kiszolgálja. Viszont az utóbbi években sokat erősödött az az igény, hogy a szerverek is képesek legyenek visszaszólni a kliensnek. (Pl. chat alkalmazások.) Ez natív környezetben nem okozott nehézséget (TCP socket nyitása), viszont a webes világban eddig csak workaround-ok léteztek:

- Polling: x másodpercenként lekérjük az aktuális állapotot.
	- Egyszerű, könnyen használható
	- Jelentős szerveroldali terhelést jelent
	- Várható késleltetés: polling idő / 2
- Long polling: kliensoldalon indítunk egy státuszlekérést, és a szerver csak akkor válaszol, ha frissül a státusz. Ha nincs változás, akkor a lekérés előbb-utóbb timeout-ol, ekkor új lekérést indít a kliens.
	- Minimális késleltetés
	- Bonyolultabb, szerveroldali támogatás is kell hozzá
	- Kisebb szerveroldali terhelés, bár a nyitva tartott kapcsolatok és a timeout miatti rendszeres újraépítés így is pluszköltség
	- Ronda!

Ezeket a megoldásokat váltja le a WebSocket használata. A WebSocket egy TCP jellegű kapcsolatot biztosít szerver és kliens között, ahol bármelyik fél küldhet üzenetet. A Kapcsolat felépülése után egy-egy üzenet küldése minimális plusz terhelést jelent.

> **Megjegyzés** A webes technológiák egyértelműen realtime irányba haladnak. Az [5G](https://en.wikipedia.org/wiki/5G) által meghirdetett elképesztő sávszélesség (1 Gbit / sec) célja nem az, hogy a film 30 perc helyett fél perc alatt töltődjön le, hanem pl. hogy az autókban használt szenzorok minél kisebb késleltetéssel tudjanak a másik autó szenzorjaival kommunikálni.


## SocketIO

A [SocketIO](http://socket.io/) egy WebSocket technológiára épülő könyvtár, ami a natív WebSocket-nél kényelmesebb interfészt és több funkciót biztosít. A SocketIO Node.js szerveroldalhoz készült. Hasonló megoldást biztosít a [SignalR](https://www.asp.net/signalr) .NET-re.

> **Pro tipp**: A WebSocket használata nagyon kényelmes. De nem hatékony, elsősorban szerveroldalon igényel irreálisan nagy teljesítményt. Jelentős szerveroldali teljesítményigény esetén a következő könyvtárat javasoljuk: [uWebSockets](https://github.com/uWebSockets/uWebSockets).


## A chat komponens

A `ChatComponent` egy egyszerű SocketIO kapcsolatot valósít meg, `{ text: string }` típusú üzenetek küldésére és fogadására alkalmas.


### A chat szerver elindítása

A chat szerver függőségei a `package.json` fájlban vannak, a kód a `chat-server` mappában található. A TypeScript build-hez hívjuk meg az `npm run build:server` parancsot, a futtatáshoz pedig az `npm run start:server`

> **Pro tipp**: Nézd meg, hogy milyen parancsok futnak le a fenti hívásra! Miben más a kliensoldali TypeScript build és a chat szervernél használt TypeScript build?

> **Pro tipp**: Nézd meg a szerver kódját! Egy kicsit el van bonyolítva, próbálj rajta egyszerűsíteni!


### A chat komponens

A `ChatComponent` kódja rövid és jól dokumentált. Pár érdekesség:

- Figyeld meg a kódban, hogy hogyan figyelünk az életciklusra!
	- Át lehetne tenni az `ngOnInit` tartalmát a konstruktorba?
	- El lehet hagyni az `ngOnDestroy` tartalmát?
	- Válaszok alább a megjegyzésben
- Tanulmányozd az SCSS fájl működését!
	- Nézd a forráskódot, valamint böngészőben letöltött kódot is!
	- Hogyan alakul át a `chat-msg` CSS osztályokra vonatkozó kód?
	- Mi történne, ha a `ChatComponent`-en kívül létrehoznál egy elemet `chat-msg` CSS osztállyal? Miért?
		- Próbáld ki: az `AppComponent`-ben létre tudsz hozni, az úgyis mindig látszani fog
	- Ezért szeretjük a Webpack-et

Próbáld meg menet közben leállítani a szervert, majd újraindítani, miközben a chat oldal van megnyitva. Ezért szeretjük a SocketIO-t.

> **Megoldás**: igen, mert nem függ a DOM-tól a kód; és nem, mert a socket kapcsolatot le kell bontani, ha megsemmisül a komponens. Különben két kapcsolat fog létezni, amikor másodszor a chat oldalra navigálunk.
