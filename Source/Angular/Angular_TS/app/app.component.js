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
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = '站点列表';
        this.clickMessage = '';
        this.values = '';
        this.sites = [
            new site_1.Site(1, '菜鸟教程', "cainiao", 1),
            new site_1.Site(2, 'Google', "google", 1),
            new site_1.Site(3, 'Taobao', "taobao", 1),
            new site_1.Site(4, 'Facebook', "facebook", 1)
        ];
        this.mySite = this.sites[0];
        //表单相关
        this.urls = ['www.runoob.com', 'www.google.com',
            'www.taobao.com', 'www.facebook.com'];
        this.model = new site_1.Site(1, '菜鸟教程', this.urls[0], 10000);
        this.submitted = false;
    }
    /*
    // 非强类型
    onKey(event:any) {
      this.values += event.target.value + ' | ';
    }
    */
    // 强类型
    AppComponent.prototype.onKey = function (event) {
        this.values += event.target.value + ' | ';
    };
    AppComponent.prototype.onKey2 = function (value) {
        this.values += value + ' | ';
    };
    AppComponent.prototype.onClickMe = function () {
        this.clickMessage = '菜鸟教程!';
    };
    AppComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(AppComponent.prototype, "diagnostic", {
        // TODO: 完成后移除
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            //moduleId: module.id,
            //templateUrl: 'site-form.component.html',
            template: "\n\n  <site-form></site-form>\n\n  <!--\n  <button (click)=\"onClickMe()\">\u70B9\u6211!</button>\n    {{clickMessage}}\n    <input (keyup)=\"onKey($event)\">\n    <p>{{values}}</p>\n\n    <input #box (keyup)=\"0\">\n    <p>{{box.value}}</p>\n\n\n    <input #box (keyup)=\"onKey2(box.value)\">\n    <p>{{values}}</p>\n-->\n    <input #box\n      (keyup.enter)=\"values=box.value\"\n      (blur)=\"values=box.value\">\n \n    <p>{{values}}</p>\n\n  <h1>{{title}}</h1>\n  <h2>\u6211\u559C\u6B22\u7684\u7F51\u7AD9: {{mySite.name}}</h2>\n  <p>\u7F51\u7AD9\u5217\u8868:</p>\n  <ul>\n    <li *ngFor=\"let site of sites\">\n     {{ site.name }}\n    </li>\n  </ul>\n  <p *ngIf=\"sites.length > 3\">\u4F60\u6709\u5F88\u591A\u4E2A\u559C\u6B22\u7684\u7F51\u7AD9!</p>\n    "
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map