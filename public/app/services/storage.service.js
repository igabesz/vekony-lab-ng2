"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var StorageService = StorageService_1 = (function () {
    function StorageService() {
        this.db = null;
        this.initialized = new BehaviorSubject_1.BehaviorSubject(false);
    }
    StorageService.prototype.initialize = function () {
        var _this = this;
        console.log('StorageService.initialize');
        // Opening database
        var request = indexedDB.open(StorageService_1.DB_NAME, StorageService_1.DB_VERSION);
        // Error handler
        request.onerror = function (event) {
            console.log('error', event);
            _this.initialized.thrownError(event);
        };
        // Success handler
        request.onsuccess = function (event) {
            console.log('success', event);
            _this.db = event.target.result;
            _this.initialized.next(true);
        };
        // Upgrade handler
        request.onupgradeneeded = function (event) { return _this.onUpgrade(event); };
        return this.initialized;
    };
    StorageService.prototype.onUpgrade = function (upgradeEvent) {
        console.log('StorageService.onUpgrade');
        var db = upgradeEvent.target.result;
        // Here we create the database
        var store = db.createObjectStore(StorageService_1.SUBJECTS, { keyPath: 'id' });
        // Adding further index fields
        store.createIndex('isNerdy', 'isNerdy', { unique: false });
    };
    StorageService.prototype.getObjectStore = function (mode) {
        if (mode === void 0) { mode = 'readonly'; }
        if (!this.db)
            throw new Error('StorageService is not initialized!');
        // Create a transaction and return SUBJECTS_TABLE
    };
    StorageService.prototype.clear = function () {
        console.log('StorageService.clear');
        // Get store
        // Clear store
        // Returning promise
    };
    StorageService.prototype.add = function (subject) {
        console.log('StorageService.upload');
        // Get store
        // Add item
        // Return promise
    };
    StorageService.prototype.getAll = function () {
        console.log('StorageService.getAll');
        var results = [];
        // Get store
        // Get cursor
        // Return promise
    };
    StorageService.prototype.getAllNerdy = function () {
        console.log('StorageService.getAllNerdy');
        // Tip: use the store.index() and set a KeyRange with IDBKeyRange.<???>
    };
    return StorageService;
}());
StorageService.DB_NAME = 'SubjectDatabase';
StorageService.DB_VERSION = 1;
StorageService.SUBJECTS = 'subjects';
StorageService = StorageService_1 = __decorate([
    core_1.Injectable()
], StorageService);
exports.StorageService = StorageService;
var StorageService_1;
//# sourceMappingURL=storage.service.js.map