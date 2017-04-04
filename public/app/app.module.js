"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var alert_service_1 = require("./services/alert.service");
var download_joke_service_1 = require("./services/download-joke.service");
var storage_service_1 = require("./services/storage.service");
var app_component_1 = require("./app.component");
var joke_list_component_1 = require("./components/joke-list/joke-list.component");
var routes = [{
        path: '',
        component: joke_list_component_1.JokeListComponent,
    }];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            ng2_bootstrap_1.TooltipModule.forRoot(),
            router_1.RouterModule.forRoot(routes, { useHash: false }),
            http_1.HttpModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            ng2_bootstrap_1.TooltipModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            joke_list_component_1.JokeListComponent,
        ],
        providers: [
            alert_service_1.AlertService,
            download_joke_service_1.DownloadJokeService,
            storage_service_1.StorageService,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map