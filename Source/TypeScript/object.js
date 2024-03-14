/*
TypeScript 对象
对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等，如下实例：

var object_name = {
    key1: "value1", // 标量
    key2: "value",
    key3: function() {
        // 函数
    },
    key4:["content1", "content2"] //集合
}
以上对象包含了标量，函数，集合(数组或元组)。

对象实例
TypeScript
*/
var sites = {
    site1: "Runoob",
    site2: "Google"
};
// 访问对象的值
console.log(sites.site1);
console.log(sites.site2);
/*
编译以上代码，得到以下 JavaScript 代码：

JavaScript
var sites = {
   site1:"Runoob",
   site2:"Google"
};
// 访问对象的值
console.log(sites.site1)
console.log(sites.site2)
输出结果为：

Runoob
Google
*/
/*
TypeScript 类型模板
假如我们在 JavaScript 定义了一个对象：

var sites = {
   site1:"Runoob",
   site2:"Google"
};
这时如果我们想在对象中添加方法，可以做以下修改：

sites.sayHello = function(){ return "hello";}
如果在 TypeScript 中使用以上方式则会出现编译错误，因为Typescript 中的对象必须是特定类型的实例。

TypeScript
*/
var sites2 = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites2.sayHello = function () {
    console.log("hello " + sites2.site1);
};
sites2.sayHello();
/*
编译以上代码，得到以下 JavaScript 代码：

JavaScript
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
输出结果为：

hello Runoob
此外对象也可以作为一个参数传递给函数，如下实例：

TypeScript
*/
sites = {
    site1: "Runoob",
    site2: "Google"
};
var invokesites = function (obj) {
    console.log("site1 :" + obj.site1);
    console.log("site2 :" + obj.site2);
};
invokesites(sites);
function addPoints(p1, p2) {
    var x = p1.x + p2.x;
    var y = p1.y + p2.y;
    return { x: x, y: y };
}
// 正确
var newPoint = addPoints({ x: 3, y: 4 }, { x: 5, y: 1 });
// 错误 
//var newPoint2 = addPoints({x:1},{x:4,y:3})
