//Circle.ts 文件代码：
/// <reference path = "IShape.ts" /> 
var Drawing;
(function (Drawing) {
    var Circle = /** @class */ (function () {
        function Circle() {
        }
        Circle.prototype.draw = function () {
            console.log("Circle is drawn");
        };
        return Circle;
    }());
    Drawing.Circle = Circle;
})(Drawing || (Drawing = {}));
//Triangle.ts 文件代码：
/// <reference path = "IShape.ts" /> 
(function (Drawing) {
    var Triangle = /** @class */ (function () {
        function Triangle() {
        }
        Triangle.prototype.draw = function () {
            console.log("Triangle is drawn");
        };
        return Triangle;
    }());
    Drawing.Triangle = Triangle;
})(Drawing || (Drawing = {}));
//TestShape.ts 文件代码：
/// <reference path = "IShape.ts" />   
/// <reference path = "Circle.ts" /> 
/// <reference path = "Triangle.ts" />  
function drawAllShapes(shape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
/*
使用 tsc 命令编译以上代码：

tsc --out app.js TestShape.ts
得到以下 JavaScript 代码：

JavaScript
/// <reference path = "IShape.ts" />
var Drawing;
(function (Drawing) {
    var Circle =  (function () {
        function Circle() {
        }
        Circle.prototype.draw = function () {
            console.log("Circle is drawn");
        };
        return Circle;
    }());
    Drawing.Circle = Circle;
})(Drawing || (Drawing = {}));
/// <reference path = "IShape.ts" />
var Drawing;
(function (Drawing) {
    var Triangle =  (function () {
        function Triangle() {
        }
        Triangle.prototype.draw = function () {
            console.log("Triangle is drawn");
        };
        return Triangle;
    }());
    Drawing.Triangle = Triangle;
})(Drawing || (Drawing = {}));
/// <reference path = "IShape.ts" />
/// <reference path = "Circle.ts" />
/// <reference path = "Triangle.ts" />
function drawAllShapes(shape) {
    shape.draw();
}
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
使用 node 命令查看输出结果为：

$ node app.js
Circle is drawn
Triangle is drawn
*/
/*
嵌套命名空间
命名空间支持嵌套，即你可以将命名空间定义在另外一个命名空间里头。
*/
var namespace_name1;
(function (namespace_name1) {
    var namespace_name2;
    (function (namespace_name2) {
        var class_name = /** @class */ (function () {
            function class_name() {
            }
            return class_name;
        }());
        namespace_name2.class_name = class_name;
    })(namespace_name2 = namespace_name1.namespace_name2 || (namespace_name1.namespace_name2 = {}));
})(namespace_name1 || (namespace_name1 = {}));
//成员的访问使用点号 . 来实现，如下实例：
//Invoice.ts 文件代码：
var Runoob;
(function (Runoob) {
    var invoiceApp;
    (function (invoiceApp) {
        var Invoice = /** @class */ (function () {
            function Invoice() {
            }
            Invoice.prototype.calculateDiscount = function (price) {
                return price * .40;
            };
            return Invoice;
        }());
        invoiceApp.Invoice = Invoice;
    })(invoiceApp = Runoob.invoiceApp || (Runoob.invoiceApp = {}));
})(Runoob || (Runoob = {}));
//InvoiceTest.ts 文件代码：
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500));
/*
使用 tsc 命令编译以上代码：

tsc --out app.js InvoiceTest.ts
得到以下 JavaScript 代码：

JavaScript
var Runoob;
(function (Runoob) {
    var invoiceApp;
    (function (invoiceApp) {
        var Invoice =  (function () {
            function Invoice() {
            }
            Invoice.prototype.calculateDiscount = function (price) {
                return price * .40;
            };
            return Invoice;
        }());
        invoiceApp.Invoice = Invoice;
    })(invoiceApp = Runoob.invoiceApp || (Runoob.invoiceApp = {}));
})(Runoob || (Runoob = {}));
/// <reference path = "Invoice.ts" />
var invoice = new Runoob.invoiceApp.Invoice();
console.log(invoice.calculateDiscount(500));
使用 node 命令查看输出结果为：

$ node app.js
200
*/ 
