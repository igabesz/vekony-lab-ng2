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
var swal = require("sweetalert");
;
var AlertService = (function () {
    function AlertService() {
    }
    /**
        When you want to get a 2nd feedback from the user.
        Watch out, you have to close the popup manually or by a 2nd popup. Make sure you'll call it!
    */
    AlertService.prototype.warningConfirm = function (params) {
        return new Promise(function (res) { return swal({
            title: params.title || 'Warning',
            text: params.text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff3684',
            cancelButtonColor: '#3bc2db',
            confirmButtonText: 'Yes',
            closeOnConfirm: params.closeOnConfirm,
        }, res); });
    };
    AlertService.prototype.successPopup = function (params) {
        return new Promise(function (res) { return swal({
            title: params.title || 'Success',
            text: params.text,
            type: 'success',
            closeOnConfirm: params.closeOnConfirm,
        }, res); });
    };
    AlertService.prototype.prompt = function (params) {
        return new Promise(function (res) { return swal({
            title: params.title,
            text: params.text,
            type: 'input',
            showCancelButton: true,
            inputPlaceholder: params.placeholder,
            inputValue: params.inputValue,
            closeOnConfirm: params.closeOnConfirm,
        }, function (swResult) { return res(swResult); }); });
    };
    AlertService.prototype.numberPrompt = function (params) {
        return new Promise(function (res) { return swal({
            title: params.title,
            text: params.text,
            type: 'input',
            inputType: 'number',
            showCancelButton: true,
            inputPlaceholder: params.placeholder,
            inputValue: params.inputValue,
            closeOnConfirm: params.closeOnConfirm,
        }, function (swResult) {
            if (typeof swResult === 'boolean')
                return res(false);
            if (swResult === '')
                return res(null);
            var result = parseFloat(swResult);
            if (isNaN(result))
                return res(false);
            return res(result);
        }); });
    };
    AlertService.prototype.errorPopup = function (params) {
        return new Promise(function (res) { return swal({
            title: params.title || 'Error',
            text: params.text,
            type: 'error',
            closeOnConfirm: params.closeOnConfirm,
        }, function (swResult) { return res(); }); });
    };
    AlertService.prototype.defaultErrorPopup = function (err, wait) {
        console.error('Error', err);
        var title = 'Error';
        // Basic error message
        var text = 'Something went wrong. :(';
        if (err && err instanceof http_1.Response) {
            // Angular won't parse the response
            text = "Cannot complete the request.";
            var status_1 = err.status;
            if (status_1 !== 0) {
                // Better: error based on status
                text = "Cannot complete the request: " + status_1 + " " + err.statusText;
            }
            try {
                // Best: error from response
                var res = err.json();
                if (res.errors && res.errors[0]) {
                    text = res.errors[0].message;
                }
            }
            catch (err) { }
        }
        swal.close();
        var item = window.$('.sweet-alert')[0];
        var waitTime = (item && item.style.opacity > 0) ? 200 : 0;
        return new Promise(function (res) {
            // need 200 ms timeout if there was a previous popup
            setTimeout(function () {
                swal({ title: title, text: text, type: 'error' }, res);
            }, waitTime);
        });
    };
    return AlertService;
}());
AlertService = __decorate([
    core_1.Injectable()
], AlertService);
exports.AlertService = AlertService;
//# sourceMappingURL=alert.service.js.map