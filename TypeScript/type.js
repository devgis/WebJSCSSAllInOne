//基础类型----------------------------------------------------------------------------------------------------
//任意类型	any	声明为 any 的变量可以赋予任意类型的值。
//数字类型	number	双精度 64 位浮点值。它可以用来表示整数和分数。
var binaryLiteral = 10; // 二进制
var octalLiteral = 484; // 八进制
var decLiteral = 6; // 十进制
var hexLiteral = 0xf00d; // 十六进制
//字符串类型	string	一个字符系列，使用单引号（'）或双引号（"）来表示字符串类型。反引号（`）来定义多行文本和内嵌表达式。
//变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名。
var name1 = "Runoob";
var years = 5;
var words = "\u60A8\u597D\uFF0C\u4ECA\u5E74\u662F ".concat(name1, " \u53D1\u5E03 ").concat(years + 1, " \u5468\u5E74");
//布尔类型	boolean	表示逻辑值：true 和 false。
var flag = true;
//数组类型	无	声明变量为数组。
// 在元素类型后面加上[]
var arr1 = [1, 2];
// 或者使用数组泛型
var arr2 = [1, 2];
//元组	无	元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
var x1;
x1 = ['Runoob', 1]; // 运行正常
//x = [1, 'Runoob'];    // 报错
console.log(x1[0]); // 输出 Runoob
//枚举	enum	枚举类型用于定义数值集合。
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Blue;
console.log(c); // 输出 2
//void	void	
//用于标识方法返回值的类型，表示该方法没有返回值。
function hello() {
    alert("Hello Runoob");
}
//null	null	
//表示对象值缺失。
//undefined	undefined	
//用于初始化变量为一个未定义的值
//never	never	
//never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
/*
Any 类型
任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：
*/
var x2 = 1; // 数字类型
x2 = 'I am who I am'; // 字符串类型
x2 = false; // 布尔类型
//改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：
var x3 = 4;
//x3.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查 
x3.toFixed(); // 正确
//定义存储各种类型数据的数组时，示例代码如下：
var arrayList = [1, false, 'fine'];
arrayList[1] = 100;
/*
Null 和 Undefined
null
在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

undefined
在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：
*/
// 启用 --strictNullChecks
var x4;
x4 = 1; // 运行正确
x4 = undefined; // 运行错误
x4 = null; // 运行错误
//上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：
// 启用 --strictNullChecks
var x5;
x5 = 1; // 运行正确
x5 = undefined; // 运行正确
x5 = null; // 运行正确
/*
更多内容可以查看：JavaScript typeof, null, 和 undefined

never 类型
never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：
*/
var x6;
var y;
// 运行错误，数字类型不能转为 never 类型
//x6 = 123;
// 运行正确，never 类型可以赋值给 never类型
//x6 = (()=>{ throw new Error('exception')})(); //出错
// 运行正确，never 类型可以赋值给 数字类型
//y = (()=>{ throw new Error('exception')})(); //出错
// 返回值为 never 的函数可以是抛出异常的情况
function error(message) {
    throw new Error(message);
}
// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop() {
    while (true) { }
}
