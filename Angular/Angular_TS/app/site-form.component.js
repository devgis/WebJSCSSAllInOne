"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var site_1 = require("./site");
var SiteFormComponent = /** @class */ (function () {
    function SiteFormComponent() {
        this.urls = ['www.runoob.com', 'www.google.com',
            'www.taobao.com', 'www.facebook.com'];
        this.model = new site_1.Site(1, '菜鸟教程', this.urls[0], 10000);
        this.submitted = false;
        this.active = true;
    }
    SiteFormComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(SiteFormComponent.prototype, "diagnostic", {
        // TODO: 完成后移除
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    SiteFormComponent.prototype.newSite = function () {
        var _this = this;
        this.model = new site_1.Site(5, '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
    };
    SiteFormComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'site-form',
            templateUrl: 'app/site-form.component.html'
        })
    ], SiteFormComponent);
    return SiteFormComponent;
}());
exports.SiteFormComponent = SiteFormComponent;
//# sourceMappingURL=site-form.component.js.map