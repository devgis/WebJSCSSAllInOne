var message = "Hello World";
console.log(message);
/*
//TypeScript 区分大小写
//TypeScript 区分大写和小写字符。
//
//分号是可选的
每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。
*/
//以下代码都是合法的：
console.log("Runoob");
console.log("Google");
//如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：
console.log("Runoob");
console.log("Google");
console.log("Runoob");
console.log("Google");
// 这是一个单行注释
/*
 这是一个多行注释
 这是一个多行注释
 这是一个多行注释
*/
//TypeScript 面向对象编程实例：
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site();
obj.name();
