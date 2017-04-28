# Vékonykliens labor anyagai


## Előfeltételek

- Legyen feltelepítve a `node`
- `npm install`


## Futtatás

Nézzük meg az elérhető parancsokat a következő parancs futtatásával: `npm run`.


### A frontend futtatása

Fejlesztési módhoz futtassuk a következőt: `npm run dev-server`.
Ez a parancs elindít egy `webpack` build szervert, amit a `localhost:8080`-as porton tudunk megnyitni.
A megnyitott oldal automatikusan frissül, ha a kódban módosítást végzünk és azt elmentjük.

Éles környezetben a build-re a következő parancsot használhatjuk: `npm run build:client`.

Valamint a következő parancs fejlesztési módban indítja el a build-et és egyben figyeli a változtatásokat,
de fájlkiszolgáló szerverként nem működik: `npm run watch:client`.
Ilyenkor nekünk kell indítani egy külön szervert, ami a fájlokat kiszolgálja.


## A Chat alkalmazás futtatása

- Build: `npm run build:server`
- Indítás: `npm run start:server`
