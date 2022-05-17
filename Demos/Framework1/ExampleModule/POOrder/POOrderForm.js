/// <reference path="../../CommonModule/Employee/EmployeeList.html" />
/// <reference path="../../CommonModule/Employee/EmployeeList.html" />
/// <reference path="MyPOOrder_List.html" />
//初始化

$(function () {
    divresize_From(50);
    SupplierAutocomplete();
    CurrencyAutocomplete();
    SalesmanAutocomplete();
    var Tablewidth = $("#tb_POOrderEntry thead").width();
    var key = GetQuery('key');
    if (!IsNullOrEmpty(key)) {
        add_ColumnName("");
    } else {
        add_ColumnName(key);//赋值
        TotalTotal();
    }
    FixedTableHeader("#tb_POOrderEntry", $(window).height() - 275, Tablewidth);
    var motionType = GetQuery('motionType');//动作类型，0:查看订单,1:新增订单，2：修改订单
    if (motionType == '0' || GetQuery('Location') != "") {
        $("#button_Commit_Save").attr({ "disabled": "disabled" }).attr('onclick', '');
        $('input,select,textarea').attr({ "readonly": "readonly" });
    }
})
/*=================================================采购订单主表（begin）====================================================================*/
var VALUEADDRATE = "0.00";//增值税率%
//供应商自动补全
function SupplierAutocomplete() {
    $("#Supplier_Name").bind("keyup", function (e) {
        if (e.which != 13 && e.which != 40 && e.which != 38) {
            var parm = "action=autocomplete&search=" + escape($(this).val());
            Load_Supplier(parm);
        }
    }).focus(function () {
        var parm = "action=autocomplete&search=" + escape($(this).val());
        Load_Supplier(parm);
        $(this).select();
    });
    function Load_Supplier(parm) {
        getAjax('../../WMSBase/SysSupplier/Supplier_List.html', parm, function (data) {
            var json = eval("(" + data + ")");
            var html = "";
            for (var i = 0; i < json.JSON.length; i++) {
                var list = json.JSON[i];
                html += "<tr>";
                html += '<td style="display: none;">' + list.SUPPLIER_ID + '</td>';
                html += '<td style="width: 100px;">' + list.CODE + '</td>';
                html += '<td style="width: 200px;">' + list.SHORTNAME + '</td>';
                html += '<td style="display: none;">' + list.VALUEADDRATE + '</td>';
                html += "</tr>";
            }
            //点击事件回调
            autocomplete("Supplier_Name", "300px", "300px", html, function (r) {
                var array = new Array();
                array = r.split('≌');
                $("#Supplier_ID").val(array[0]);
                $("#Supplier_Name").val(array[2]);
                VALUEADDRATE = array[3];
            });
        });
    }
    //上，下键盘回调
    autocompletekeydown("Supplier_Name", function (r) {
        var array = new Array();
        array = r.split('≌');
        $("#Supplier_ID").val(array[0]);
        $("#Supplier_Name").val(array[2]);
        VALUEADDRATE = array[3];
    });
}
//币别自动补全
function CurrencyAutocomplete() {
    $("#Currency_Name").bind("keyup", function (e) {
        if (e.which != 13 && e.which != 40 && e.which != 38) {
            var parm = "action=autocomplete&search=" + escape($(this).val());
            CurrencyAutocomplete_LoadList(parm);
        }
    }).focus(function () {
        var parm = "action=autocomplete&search=" + escape($(this).val());
        CurrencyAutocomplete_LoadList(parm);
        $(this).select();
    });
    //加载数据
    function CurrencyAutocomplete_LoadList(parm) {
        getAjax('../../WMSBase/SysCurrency/Currency_List.html', parm, function (data) {
            var json = eval("(" + data + ")");
            var html = "";
            for (var i = 0; i < json.JSON.length; i++) {
                var list = json.JSON[i];
                html += "<tr>";
                html += '<td style="display: none;">' + list.CURRENCY_ID + '</td>';
                html += '<td style="width: 100px;">' + list.CODE + '</td>';
                html += '<td style="width: 100px;">' + list.FULLNAME + '</td>';
                html += '<td style="width: 100px;">' + list.EXCHANGERATE + '</td>';
                html += "</tr>";
            }
            //点击事件回调
            autocomplete("Currency_Name", "300px", "200px", html, function (r) {
                var array = new Array();
                array = r.split('≌');
                $("#Currency_ID").val(array[0]);
                $("#Currency_Name").val(array[2]);
                $("#ExchangeRate").val(array[3]);
            });
        });
    }
    //上，下键盘回调
    autocompletekeydown("Currency_Name", function (r) {
        var array = new Array();
        array = r.split('≌');
        $("#Currency_ID").val(array[0]);
        $("#Currency_Name").val(array[2]);
        $("#ExchangeRate").val(array[3]);
    });
}
//采购人员自动补全
function SalesmanAutocomplete() {
    $("#Salesman").bind("keyup", function (e) {
        if (e.which != 13 && e.which != 40 && e.which != 38) {
            var parm = "action=autocomplete&search=" + escape($(this).val());
            LoadManager(parm);
        }
    }).focus(function () {
        var parm = "action=autocomplete&search=" + escape($(this).val());
        LoadManager(parm);
        $(this).select();
    });
    function LoadManager(parm) {
        getAjax('../../CommonModule/Employee/EmployeeList.html', parm, function (data) {
            var json = eval("(" + data + ")");
            var html = "";
            for (var i = 0; i < json.JSON.length; i++) {
                var list = json.JSON[i];
                html += "<tr>";
                html += '<td style="width: 80px;">' + list.Code + '</td>';
                html += '<td style="width: 130px;">' + list.RealName + '</td>';
                html += "</tr>";
            }
            //点击事件回调
            autocomplete("Salesman", "200px", "220px", html, function (r) {
                var array = new Array();
                array = r.split('≌');
                $("#Salesman").val(array[1]);
            });
        });
    }
    //上，下键盘回调
    autocompletekeydown("Salesman", function (r) {
        var array = new Array();
        array = r.split('≌');
        $("#Salesman").val(array[1]);
    });
}
/*=================================================采购订单主表（end）====================================================================*/

/*=================================================采购订单明细表（begin）====================================================================*/
//初始化单据分录
function add_ColumnName(key) {
    var rowindex = 1;
    if (key != "") {
        var BarCode, FullName, Item_ID, Model, MeasureUnit_Name, MeasureUnit_ID, Qty, Price, Sum, UnitPrice, CESS, CESSAmount, TotalAmount, AdviceConsignDate, Remark = "";
        var parm = "action=SetInitControl&key=" + key;
        getAjax('POOrder_Form.html', parm, function (data) {
            var json = eval("(" + data + ")");
            for (var i = 0; i < json.JSON.length; i++) {
                var list = json.JSON[i];
                BarCode = list.BARCODE;                                         //物料编号
                FullName = list.FULLNAME;                                       //物料名称
                Item_ID = list.ITEM_ID;                                         //物料主键
                Model = list.MODEL;                                             //规格型号
                MeasureUnit_Name = list.MEASUREUNIT_NAME;                       //单位名称
                MeasureUnit_ID = list.MEASUREUNIT_ID;                           //单位主键
                Qty = list.QTY;                                                 //数量
                Price = list.PRICE;                                             //单价
                Sum = list.SUM;                                                 //金额
                UnitPrice = list.UNITPRICE;                                     //含税单价
                CESS = list.CESS;                                               //税率
                CESSAmount = list.CESSAMOUNT;                                   //税额
                TotalAmount = list.TOTALAMOUNT;                                 //价税合计 
                AdviceConsignDate = new Date(list.ADVICECONSIGNDATE).pattern("yyyy-MM-dd");//交货日期
                Remark = list.REMARK;                                           //备注
                var tr = '<tr>';
                tr += '<td class="td-div" title="双击清空一行" ondblClick="Empty_Obj(' + rowindex + ')" style="width: 50px; text-align: center;">' + rowindex + '</td>'
                tr += '<td style="width: 100px; text-align: center;"><input dbfield="true" value="' + BarCode + '" id="BarCode➩' + rowindex + '" onfocus="Goods_Index(' + rowindex + ');" type="text" IsExist="No" datacol="No" err="该物料编号已存在,不能重复" checkexpession="IsExist" class="txt" /></td>'
                tr += '<td style="width: 150px;text-align: left;"><input disabled value="' + FullName + '" id="FullName➩' + rowindex + '" type="text" class="txt disabled" /><input dbfield="true" value="' + Item_ID + '" id="Item_ID➩' + rowindex + '" type="hidden" /></td>'
                tr += '<td style="width: 80px; text-align: center;"><input disabled value="' + Model + '" id="Model➩' + rowindex + '" type="text" class="txt disabled" /></td>'
                tr += '<td style="width: 80px; text-align: center;"><input disabled value="' + MeasureUnit_Name + '" id="MeasureUnit_Name➩' + rowindex + '" type="text" style="text-align: center;" class="txt disabled" /><input dbfield="true" value="' + MeasureUnit_ID + '" id="MeasureUnit_ID➩' + rowindex + '" type="hidden" /></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + Qty + '" id="Qty➩' + rowindex + '" onfocus="IsNumberbox(this.id)" onkeyup="Conversion(' + rowindex + ')" type="text" style="text-align: center;" class="txt" datacol="No" err="数量" checkexpession="Double" /></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + Price + '" id="Price➩' + rowindex + '" onfocus="IsNumberbox(this.id)" onkeyup="Conversion(' + rowindex + ')" type="text" style="text-align: center;" class="txt" datacol="No" err="单价" checkexpession="Double"/></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + UnitPrice + '" id="UnitPrice➩' + rowindex + '" onfocus="IsNumberbox(this.id)" type="text"onkeyup="Conversion(' + rowindex + ')" style="text-align: center;" class="txt" datacol="No" err="含税单价" checkexpession="Double"/></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + Sum + '" id="Sum➩' + rowindex + '" onfocus="IsNumberbox(this.id)" type="text" style="text-align: center;" class="txt" datacol="No" err="金额" checkexpession="Double"/></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + CESS + '" id="CESS➩' + rowindex + '" onfocus="IsNumberbox(this.id)" type="text" onkeyup="Conversion(' + rowindex + ')" style="text-align: center;"  class="txt" datacol="No" err="税率" checkexpession="Double"/></td>'
                tr += '<td style="width: 80px; text-align: center;"><input disabled dbfield="true" value="' + CESSAmount + '" id="CESSAmount➩' + rowindex + '" type="text"  style="text-align: center;" class="txt disabled" /></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + TotalAmount + '" id="TotalAmount➩' + rowindex + '" onfocus="IsNumberbox(this.id)" type="text" style="text-align: center;" class="txt" datacol="No" err="价税合计" checkexpession="Double"/></td>'
                tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" value="' + AdviceConsignDate + '" id="AdviceConsignDate➩' + rowindex + '" type="text" style="text-align: center;" onclick="WdatePicker()" datacol="No" err="交货日期" checkexpession="NotNull" class="txt" /></td>'
                tr += '<td style="width: 100px;"><input dbfield="true" value="' + Remark + '" id="Remark➩' + rowindex + '" type="text" class="txt" /></td>'
                tr += '</tr>';
                $(tr).appendTo("#add_Table");
                rowindex++;
            }
        });
    }
    for (var i = rowindex; i < 50; i++) {
        var tr = '<tr>';
        var IsDisabled = "disabled";
        if (i == rowindex) {
            IsDisabled = "";
        }
        tr += '<td class="td-div" title="双击清空一行" ondblClick="Empty_Obj(' + i + ')" style="width: 50px; text-align: center;">' + i + '</td>'
        tr += '<td style="width: 100px; text-align: center;"><input dbfield="true" ' + IsDisabled + ' id="BarCode➩' + i + '" onfocus="Goods_Index(' + i + ');" type="text" IsExist="No" datacol="No" err="该物料编号已存在,不能重复" checkexpession="IsExist" class="txt" /></td>'
        tr += '<td style="width: 150px;text-align: left;"><input disabled id="FullName➩' + i + '" type="text" class="txt disabled" /><input dbfield="true" id="Item_ID➩' + i + '" type="hidden" /></td>'
        tr += '<td style="width: 80px; text-align: center;"><input disabled id="Model➩' + i + '" type="text" class="txt disabled" /></td>'
        tr += '<td style="width: 80px; text-align: center;"><input disabled id="MeasureUnit_Name➩' + i + '" type="text" style="text-align: center;" class="txt disabled" /><input dbfield="true" id="MeasureUnit_ID➩' + i + '" type="hidden" /></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="Qty➩' + i + '" onfocus="IsNumberbox(this.id)" onkeyup="Conversion(' + i + ')" type="text" style="text-align: center;" class="txt" datacol="No" err="数量" checkexpession="Double" /></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="Price➩' + i + '" onfocus="IsNumberbox(this.id)" onkeyup="Conversion(' + i + ')" type="text" style="text-align: center;" class="txt" datacol="No" err="单价" checkexpession="Double"/></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="UnitPrice➩' + i + '" onfocus="IsNumberbox(this.id)" type="text"onkeyup="Conversion(' + i + ')" style="text-align: center;" class="txt" datacol="No" err="含税单价" checkexpession="Double"/></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="Sum➩' + i + '" onfocus="IsNumberbox(this.id)" type="text" style="text-align: center;" class="txt" datacol="No" err="金额" checkexpession="Double"/></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="CESS➩' + i + '" onfocus="IsNumberbox(this.id)" type="text" onkeyup="Conversion(' + i + ')" style="text-align: center;"  class="txt" datacol="No" err="税率" checkexpession="Double"/></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="CESSAmount➩' + i + '" type="text"  style="text-align: center;" class="txt disabled" /></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="TotalAmount➩' + i + '" onfocus="IsNumberbox(this.id)" type="text" style="text-align: center;" class="txt" datacol="No" err="价税合计" checkexpession="Double"/></td>'
        tr += '<td style="width: 80px; text-align: center;"><input dbfield="true" disabled id="AdviceConsignDate➩' + i + '" type="text" style="text-align: center;" onclick="WdatePicker()" datacol="No" err="交货日期" checkexpession="NotNull" class="txt" /></td>'
        tr += '<td style="width: 100px;"><input dbfield="true" disabled id="Remark➩' + i + '" type="text" class="txt" /></td>'
        tr += '</tr>';
        $(tr).appendTo("#add_Table");
    }
}
//物料自动补全
function Goods_Index(obj) {
    GoodsAutocomplete_Index = obj;
    GoodsAutocomplete(obj);
}
function GoodsAutocomplete(obj) {
    $("#BarCode➩" + obj).bind("keyup", function (e) {
        CheckingPOOrderEntry(obj);
        if (e.which != 13 && e.which != 40 && e.which != 38) {
            var parm = "action=autocomplete&search=" + escape($("#BarCode➩" + obj).val());
            getAjax('POOrderForm.html', parm, function (data) {
                var json = eval("(" + data + ")");
                var html = "";
                for (var i = 0; i < json.JSON.length; i++) {
                    var list = json.JSON[i];
                    html += "<tr>";
                    html += '<td style="display: none;">' + list.ITEM_ID + '</td>';
                    html += '<td style="width: 150px;">' + list.BARCODE + '</td>';
                    html += '<td style="width: 150px;">' + list.PARENTNAME + '</td>';
                    html += '<td style="width: 200px;">' + list.FULLNAME + '</td>';
                    html += '<td style="display: none;">' + list.MODEL + '</td>';
                    html += '<td style="display: none;">' + list.MEASUREUNIT_ID + '</td>';
                    html += '<td style="display: none;">' + list.MEASUREUNIT_NAME + '</td>';
                    html += "</tr>";
                }
                //点击事件回调
                autocomplete("BarCode➩" + obj, "500px", "300px", html, function (r) {
                    var array = new Array();
                    array = r.split('≌');
                    $("#Item_ID➩" + obj).val(array[0]);
                    $("#BarCode➩" + obj).val(array[1]).attr('title', array[1]);
                    $("#FullName➩" + obj).val(array[3]).attr('title', array[3]);
                    $("#Model➩" + obj).val(array[4]).attr('title', array[4]);
                    $("#MeasureUnit_ID➩" + obj).val(array[5]);
                    $("#MeasureUnit_Name➩" + obj).val(array[6]).attr('title', array[5]);
                    $("#CESS➩" + obj).val(VALUEADDRATE);
                    empty(obj);
                });
            });
        }
    }).focus(function () {
        $(this).select();
    });
    autocompletekeydown("BarCode➩" + obj, function (r) {
        var array = new Array();
        array = r.split('≌');
        $("#Item_ID➩" + obj).val(array[0]);
        $("#BarCode➩" + obj).val(array[1]).attr('title', array[1]);
        $("#FullName➩" + obj).val(array[3]).attr('title', array[3]);
        $("#Model➩" + obj).val(array[4]).attr('title', array[4]);
        $("#MeasureUnit_ID➩" + obj).val(array[5]);
        $("#MeasureUnit_Name➩" + obj).val(array[6]).attr('title', array[5]);
        $("#CESS➩" + obj).val(VALUEADDRATE);
        empty(obj);
    });
    function empty(No) {
        $("#Qty➩" + No).val("0.00")
        $("#Price➩" + No).val("0.00");
        $("#Sum➩" + No).val("0.00");
        $("#UnitPrice➩" + No).val("0.00");
        $("#CESSAmount➩" + No).val("0.00");
        $("#TotalAmount➩" + No).val("0.00");
    }
}
//验证明细表单信息
function CheckingPOOrderEntry(No) {
    var index = Number(No) + 1;
    if (IsNullOrEmpty($("#BarCode➩" + No).val())) {
        $("#BarCode➩" + index).removeAttr("disabled");//物料编号
        $("#BarCode➩" + No).removeAttr("disabled").attr("IsExist", "yes").attr("datacol", "yes");//物料编号
        $("#Qty➩" + No).removeAttr("disabled").attr("datacol", "yes");              //数量
        $("#Price➩" + No).removeAttr("disabled").attr("datacol", "yes");            //单价
        $("#Sum➩" + No).removeAttr("disabled").attr("datacol", "yes");              //金额
        $("#UnitPrice➩" + No).removeAttr("disabled").attr("datacol", "yes");        //含税单价
        $("#CESS➩" + No).removeAttr("disabled").attr("datacol", "yes");             //税率
        $("#TotalAmount➩" + No).removeAttr("disabled").attr("datacol", "yes");      //价税合计 
        $("#AdviceConsignDate➩" + No).removeAttr("disabled").attr("datacol", "yes");//交货日期
        $("#Remark➩" + No).removeAttr("disabled");                                  //备注
        if (!IsExist_BarCode()) {
            ChangeCss("#BarCode➩" + No, "该物料编号已存在,不能重复");
            $("#BarCode➩" + No).attr("datacol", "yes");                             //物料编号
        } else {
            $("#BarCode➩" + No).attr("datacol", "No");                             //物料编号
        }
    }
}
//清空一行数据
function Empty_Obj(No) {
    top.showConfirmMsg('注：您确定要清空当前第【' + No + '】行数据吗？', function (r) {
        if (r) {
            $("#BarCode➩" + No).val("").attr("IsExist", "No").attr("datacol", "No");//物料编号
            $("#FullName➩" + No).val("");                                //物料名称
            $("#Model➩" + No).val("");                                   //规格型号
            $("#MeasureUnit_Name➩" + No).val("");                        //单位名称
            $("#Qty➩" + No).val("").attr("datacol", "No");               //数量
            $("#Price➩" + No).val("").attr("datacol", "No");             //单价
            $("#Sum➩" + No).val("").attr("datacol", "No");               //金额
            $("#UnitPrice➩" + No).val("").attr("datacol", "No");         //含税单价
            $("#CESS➩" + No).val("").attr("datacol", "No");              //税率
            $("#CESSAmount➩" + No).val("");                              //税额
            $("#TotalAmount➩" + No).val("").attr("datacol", "No");       //价税合计 
            $("#AdviceConsignDate➩" + No).val("").attr("datacol", "No"); //交货日期
            $("#Remark➩" + No).val("");                                  //备注
            TotalTotal();
        }
    });
}
//采购订单明细换算
function Conversion(No) {
    var variable_Qty = $("#Qty➩" + No).val();                                //数量
    var variable_Price = $("#Price➩" + No).val();                            //单价
    var variable_Sum = $("#Sum➩" + No).val();                                //金额
    var variable_UnitPrice = $("#UnitPrice➩" + No).val();                    //含税单价
    var variable_CESS = $("#CESS➩" + No).val();                              //税率
    var variable_CESSAmount = $("#CESSAmount➩" + No).val();                  //税额
    var variable_TotalAmount = $("#TotalAmount➩" + No).val();                //价税合计 
    //数量*单价=金额
    $("#Sum➩" + No).val(FormatCurrency(variable_Qty * variable_Price));
    //单价 * (1 + (税率 / 100))=含税单价
    $("#UnitPrice➩" + No).val(FormatCurrency(variable_Price * (1 + (variable_CESS / 100))));
    //含税单价-单价=税额
    $("#CESSAmount➩" + No).val(FormatCurrency($("#UnitPrice➩" + No).val() - variable_Price));
    //数量*含税单价=价税合计
    $("#TotalAmount➩" + No).val(FormatCurrency(variable_Qty * $("#UnitPrice➩" + No).val()));
    TotalTotal();
}
//底部合计
function TotalTotal() {
    var lbl_TotalSum = 0.00;
    var lbl_TotalCESSAmount = 0.00;
    var lbl_TotalTotalAmount = 0.00;
    var index = 1;
    $("#tb_POOrderEntry #add_Table tr").each(function () {
        var IsNull_Code = $("#BarCode➩" + index).val();
        if (IsNull_Code != "" && IsNull_Code != undefined && $("#BarCode➩" + index).attr("disabled") != 'disabled') {
            $(this).find('td').find('input,select,textarea').each(function () {
                var pk_id = $(this).attr('id');
                var pk_value = $("#" + pk_id).val();
                if (pk_value != "" && pk_value != undefined) {
                    var array = new Array();
                    array = pk_id.split("➩"); //字符分割
                    if (array[0] == "Qty") {
                        lbl_TotalSum = lbl_TotalSum + Number(pk_value);
                    }
                    if (array[0] == "CESSAmount") {
                        lbl_TotalCESSAmount = lbl_TotalCESSAmount + Number(pk_value);
                    }
                    if (array[0] == "TotalAmount") {
                        lbl_TotalTotalAmount = lbl_TotalTotalAmount + Number(pk_value);
                    }
                }
            })
        }
        index++;
    });
    $("#lbl_TotalSum").text(lbl_TotalSum);
    $("#lbl_TotalCESSAmount").text(FormatCurrency(lbl_TotalCESSAmount));
    $("#lbl_TotalTotalAmount").text(FormatCurrency(lbl_TotalTotalAmount));
}
//验证同一笔物品编号不能重复新增
function IsExist_BarCode() {
    var isOK = true;
    var obj = {}
    $("#tb_POOrderEntry #add_Table tr").each(function () {
        $(this).find('td').find('[IsExist=yes]').each(function () {
            var item = $(this).val();
            if (obj[item] == null)
                obj[item] = 1;
            else
                obj[item] = obj[item] + 1;
        })
    });
    for (a in obj) {
        var item = obj[a]
        if (item > 1) {
            isOK = false;
            return false;
        }
    }
    return isOK;
}

/*=================================================采购订单明细表（end）====================================================================*/
//获取采购订单信息
function GetPOOrderFrom() {
    var item_Key_Value = "";
    $("#tb_POOrderFrom tr td").find('[DBField=true]').each(function () {
        var pk_id = $(this).attr('id');
        var pk_value = $("#" + pk_id).val();
        if (pk_value != "" && pk_value != undefined) {
            item_Key_Value += pk_id + "☻" + pk_value + "≌";
        }
    });
    return item_Key_Value;
}
//获取采购订单明细信息
function GetPOOrderEntryFrom() {
    var item_Key_Value = "";
    var index = 1;
    $("#tb_POOrderEntry #add_Table tr").each(function () {
        var IsNull_Code = $("#BarCode➩" + index).val();
        if (IsNull_Code != "" && IsNull_Code != undefined && $("#BarCode➩" + index).attr("disabled") != 'disabled') {
            $(this).find('td').find('[DBField=true]').each(function () {
                var pk_id = $(this).attr('id');
                var pk_value = $("#" + pk_id).val();
                if (pk_value != "" && pk_value != undefined) {
                    var array = new Array();
                    array = pk_id.split("➩"); //字符分割
                    item_Key_Value += array[0] + "☻" + pk_value + "☺";
                }
            })
            item_Key_Value += "≌";
        }
        index++;
    });
    return item_Key_Value;
}
//保存事件
function Commit_Save() {
    alert('该功能就是参考模型，您请联系开发商演示！');
    return false;
    if (!CheckDataValid('#form1')) {
        return false;
    }
    if ($("#Supplier_ID").val() == "") {
        ChangeCss("#Supplier_Name", "供应商不能为空");
        return false;
    }
    if ($("#Currency_ID").val() == "") {
        ChangeCss("#Currency_Name", "币别不能为空");
        return false;
    }
    if ($("#Salesman_ID").val() == "") {
        ChangeCss("#Salesman", "采购人员不能为空");
        return false;
    }
    top.showConfirmMsg('注：您确认要保存此操作吗？', function (r) {
        if (r) {
            var key = GetQuery('key');
            var parm = 'action=AddOrEdit&POOrderFrom=' + escape(GetPOOrderFrom()) + '&POOrderEntryFrom=' + escape(GetPOOrderEntryFrom()) + '&key=' + key;
            getAjax('POOrder_Form.html', parm, function (rs) {
                if (parseInt(rs) > 0) {
                    Replace();
                    showTipsMsg("恭喜您，操作成功", 3000, 4);
                } else {
                    showTipsMsg("操作失败，请稍后重试", 4000, 5);
                }
            });
        }
    });
}