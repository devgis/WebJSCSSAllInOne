import { Component } from '@angular/core';
import { Site } from './site';

@Component({
  selector: 'my-app',
  //moduleId: module.id,
  //templateUrl: 'site-form.component.html',
  template: `

  <site-form></site-form>

  <!--
  <button (click)="onClickMe()">点我!</button>
    {{clickMessage}}
    <input (keyup)="onKey($event)">
    <p>{{values}}</p>

    <input #box (keyup)="0">
    <p>{{box.value}}</p>


    <input #box (keyup)="onKey2(box.value)">
    <p>{{values}}</p>
-->
    <input #box
      (keyup.enter)="values=box.value"
      (blur)="values=box.value">
 
    <p>{{values}}</p>

  <h1>{{title}}</h1>
  <h2>我喜欢的网站: {{mySite.name}}</h2>
  <p>网站列表:</p>
  <ul>
    <li *ngFor="let site of sites">
     {{ site.name }}
    </li>
  </ul>
  <p *ngIf="sites.length > 3">你有很多个喜欢的网站!</p>
    `
})
export class AppComponent { 
  title = '站点列表';
  clickMessage = '';

  values = '';
 
  /*
  // 非强类型
  onKey(event:any) {
    this.values += event.target.value + ' | ';
  }
  */
  // 强类型
  onKey(event: KeyboardEvent) {
    this.values += (<HTMLInputElement>event.target).value + ' | ';
  }

  onKey2(value: string) {
    this.values += value + ' | ';
  }
 
  onClickMe() {
    this.clickMessage = '菜鸟教程!';
  }
  sites = [
    new Site(1, '菜鸟教程',"cainiao",1),
    new Site(2, 'Google',"google",1),
    new Site(3, 'Taobao',"taobao",1),
    new Site(4, 'Facebook',"facebook",1)
  ];
  mySite = this.sites[0];


  //表单相关
  urls = ['www.runoob.com', 'www.google.com',
            'www.taobao.com', 'www.facebook.com'];
  model = new Site(1, '菜鸟教程', this.urls[0], 10000);
  submitted = false;
  onSubmit() { this.submitted = true; }
  // TODO: 完成后移除
  get diagnostic() { return JSON.stringify(this.model); }
}