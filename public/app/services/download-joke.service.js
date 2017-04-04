"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DownloadJokeService = (function () {
    function DownloadJokeService() {
    }
    DownloadJokeService.prototype.downloadJoke = function () {
        // Get jokes from here:
        // http://api.icndb.com/jokes/random?exclude=[explicit]
        // Then format it to ChuckJoke and return it
        return null;
    };
    return DownloadJokeService;
}());
DownloadJokeService = __decorate([
    core_1.Injectable()
], DownloadJokeService);
exports.DownloadJokeService = DownloadJokeService;
//# sourceMappingURL=download-joke.service.js.map