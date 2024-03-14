

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<!-- Mirrored from 223.86.105.239:802/Frame/HomeIndex.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Nov 2013 03:12:13 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" /><title>

</title><link href="../Themes/Styles/Style.css" rel="stylesheet" type="text/css" />
    <script src="../Themes/Scripts/Highcharts/jquery-1.5.2.min.js"></script>
    <script src="../Themes/Scripts/Highcharts/highcharts.js"></script>
    <script src="../Themes/Scripts/Highcharts/theme/grid.js"></script>
    <script src="../Themes/Scripts/FunctionJS.js" type="text/javascript"></script>
    <script type="text/javascript">
        var index = 0;
        $(document).ready(function () {
            Loadpie();
            LodaChartData('line');
            //点击切换图表
            $("#SeriesType").click(function(){
                var type = ['areaspline', 'column','pie' , 'scatter'];
                for (var i = 0; i < type.length; i++) {
                    if (index ==i) {
                        LodaChartData(type[index]);
                        index++;
                        if (index == 4) {
                            index=0;
                        }
                        return false;
                    }
                }
            });
        });
        function LodaChartData(SeriesType) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',          //放置图表的容器
                    plotBackgroundColor: "#fff",
                    plotBorderWidth: null,
                    defaultSeriesType: SeriesType   //图表类型line, spline, area, areaspline, column, bar, pie , scatter 
                },
                title: {
                    text: '曲线图演示'
                },
                xAxis: {//X轴数据
                    categories: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
                    labels: {
                        rotation: -45, //字体倾斜
                        align: 'right',
                        style: { font: 'normal 13px 宋体' }
                    }
                },
                yAxis: {//Y轴显示文字
                    title: {
                        text: '产量/百万'
                    }
                },
                tooltip: {
                    enabled: true,
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 1);
                    }
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true//是否显示title
                    }
                },
                series: [{
                    name: '杭州',
                    data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: '江西',
                    data: [4.0, 2.9, 5.5, 24.5, 18.4, 11.5, 35.2, 36.5, 23.3, 38.3, 23.9, 3.6]
                }, {
                    name: '北京',
                    data: [14.0, 12.9, 15.5, 14.5, 28.4, 21.5, 15.2, 16.5, 13.3, 28.3, 13.9, 13.6]
                }, {
                    name: '湖南',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
            });
        }
        //JQuery饼图演示
        function Loadpie(){
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'piecontainer',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    defaultSeriesType: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true, //点击切换
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: Highcharts.theme.textColor || '#000000',
                            connectorColor: Highcharts.theme.textColor || '#000000',
                            formatter: function() {
                                return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    data: [
                        ['停运', 20],
                        ['正常', 20],
                        ['故障', 60],
                    ]
                }]
            });
        }
    </script>
    <style>
        a:link {
            color: #222;
            text-decoration: none;
        }

        a:visited {
            color: #222;
            text-decoration: none;
        }

        a:hover {
            color: #222;
            text-decoration: underline;
            cursor: pointer;
        }

        a:active {
            color: #222;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <form method="post" action="http://223.86.105.239:802/Frame/HomeIndex.html" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTg3NDY5MDgyNmRknZOXzksScZwWJAbRGd4WV5dmVhZ7XRCwvB1lrV0d8EQ=" />
</div>

        <table style="width: 100%;">
            <tr>
                <td colspan="2" style="width: 80%">
                    <div class="box">
                        <div class="box-title">
                            <div style="float: left">
                                <img src="../Themes/Images/32/chart_bar.png" alt="" width="20" height="20" />
                                数据统计
                            </div>
                            <div id="SeriesType" title="点击切换图表" style="float: right; padding-right: 10px; cursor: pointer;">更多图表</div>
                        </div>
                        <div class="box-content" style="height: 300px;">
                            <div id="container" style="height: 300px;">
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box">
                        <div class="box-title">
                            <div style="float: left">
                                <img src="../Themes/Images/32/sound.png" alt="" width="20" height="20" />
                                通知公告
                            </div>
                            <div style="float: right; padding-right: 10px;">更多</div>
                        </div>
                        <div class="box-content" style="height: 300px;">
                            
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">1、热烈庆祝通用权限管理系统框架上线 （2013-11-06） </a>
                            <br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">2、关于报账业务类型和预算业务活动 报表，请下载（2013-11-05） </a>
                            <br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">3、星巴克与客户谈合同 （2013-10-31） </a>
                            <br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">4、韵达项目上线测试 （2013-10-31） </a>
                            <br />
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="box">
                        <div class="box-title">
                            <div style="float: left">
                                <img src="../Themes/Images/32/hourglass_go.png" alt="" width="20" height="20" />
                                待办任务
                            </div>
                            <div style="float: right; padding-right: 10px;">更多</div>
                        </div>
                        <div class="box-content" style="height: 250px; width: 450px">
                            <div id="piecontainer" style="height: 250px; width: 107%"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box">
                        <div class="box-title">
                            <div style="float: left">
                                <img src="../Themes/Images/32/tag_blue.png" alt="" width="20" height="20" />
                                知识库最新文章
                            </div>
                            <div style="float: right; padding-right: 10px;">更多</div>
                        </div>
                        <div class="box-content" style="height: 250px; width: 450px">
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">1、程序员最头疼的事：命名</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">2、工程师文化</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">3、Serif和Sans-serif字体的区别</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">4、如何学习Javascript</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">5、软件开发启示录——迟到的领悟</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">6、《黑客帝国》里的锡安是不是虚拟世界</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">7、深入理解Linux中内存管理</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">8、工程师文化引出的组织行为话题</a><br />
                        </div>
                    </div>
                </td>
                <td>
                    <div class="box">
                        <div class="box-title">
                            <div style="float: left">
                                <img src="../Themes/Images/32/lightbulb_off.png" alt="" width="20" height="20" />
                                讨论话题
                            </div>
                            <div style="float: right; padding-right: 10px;">更多</div>
                        </div>
                        <div class="box-content" style="height: 250px;">
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">1、如何建培训课程库</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">2、人力资源管理评估方法</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">3、什么是人力资源</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">4、现代化人力资源管理的重要意义</a><br />
                            <a href="http://223.86.105.239:804/Framework.html" target="_blank">5、HR更关注应聘者跳槽思维</a><br />
                        </div>
                    </div>
                </td>
            </tr>
        </table>

    </form>
</body>

<!-- Mirrored from 223.86.105.239:802/Frame/HomeIndex.html by HTTrack Website Copier/3.x [XR&CO'2013], Fri, 22 Nov 2013 03:12:20 GMT -->
</html>
