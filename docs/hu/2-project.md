# A projekt

A projekt felépítése az alábbi:

- **chat-server/**: A chat komponenshez használt backend
- **client/**: A teljes frontend kód, ezen belül:
	- **dist/**: Ezt a mappát a build folyamán hozzuk létre, ide kerül a lefordított kód
	- **src/**: Frontend forráskódok, ld. alább
	- **tsconfig.json**: TS fordítási beállítások
	- Webpack config fájlok
- **docs/**: Ezek a leírások, amiket most olvasol
- **package.json**
- **README.md**
- **postcss.config.js**: A Webpack build-hez egy segédfájl. Nem fontos.
- Egyéb konfigfájlok. Olvass utána, hogy melyik mire jó!


## `client/src` felépítése

Itt a szokásos Angular2-es felépítést használjuk.

- **app/**: Itt van a forráskód legnagyobb része
	- **components/**: Komponensek
	- **shared/**: Megosztott modellek és szolgáltatások
	- **app.component.ts**: A fő komponens
	- **app.module.ts**: A fő modul
- **img/**: Képek, favicon
- **public/**
	- **index.html**: Ez az a HTML fájl, amit a kliens először megkap
- **styles/**
	- **styles.scss**: Projekt szintű stílusok
- **main.ts**: Ezzel kezdődik az Angular2 betöltése
- **polyfill.ts**: Ez az Angular2 előtt hívódik meg, hogy betömködje a böngésző hiányosságait

Elsősorban a `client/src/app` mappában fogunk dolgozni.


[Vissza](index.md)
