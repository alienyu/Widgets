var $ = require("zepto");
var Lunar = require("./lunar.js");
var _ = require("../vendor/underscore.js");

var LunarCalendar = function(ops) {
    this.ops = $.extend({
        dom: "calendar",
        width: '100%', //日历宽度
        mode: "solar", //渲染模式 solar公历;lunar农历,默认公历
        cyear: new Date().getFullYear(), //渲染年份
        cmonth: new Date().getMonth() + 1, //渲染月份
        cday: new Date().getDay(), // 渲染日
        cacheData: {}, //缓存已经过计算的年月数据
        currentData: {} //包含当前月,以及前后两月的数据
    });
    this.init();
}

LunarCalendar.prototype = {
    init: function() {
        this.initCalendar();
        this.bindEvent();
    },
    initCalendar: function() {
        var date = this.calculateRenderYM() //计算需要渲染的年月份
        this.calculateYMData(date); //计算需要渲染的年月份的详细数据
    },
    calculateRenderYM: function() {
        var currentYM = [];
        currentYM.push({date: this.ops.cyear + "-" + this.ops.cmonth,type:"current"});
        var prevYM = parseInt(this.ops.cmonth, 10) - 1 > 0 ? this.ops.cyear + "-" + (parseInt(this.ops.cmonth, 10) - 1) : (parseInt(this.ops.cyear, 10) - 1) + "-12";
        currentYM.unshift({date: prevYM, type:"prev"});
        var nextYM = parseInt(this.ops.cmonth, 10) + 1 < 13 ? this.ops.cyear + "-" + (parseInt(this.ops.cmonth, 10) + 1) : (parseInt(this.ops.cyear, 10) + 1) + "-1";
        currentYM.push({date: nextYM, type: "next"});
        return currentYM;
    },
    calculateYMData: function(date) {
        var that = this;
        $(date).each(function(i,e) {
            if(that.ops.cacheData[e.date]) {
                that.currentData[e.date]['date'] = that.ops.cacheData[e.date];
                that.currentData['type'] = e.type;
            } else {
                that.calculateDetailDate(e, e.type);
            }
        });
    },
    //计算当月每一天的详细数据
    calculateDetailDate: function(date, type) {
        var year = parseInt(date.split("-")[0], 10);
        var month = parseInt(date.split("-")[1], 10);
        var dayNum = Lunar.solarMonth[month-1]; //获取当月多少天
        var dateArr = []; //指定月份的详细数据
        //闰月的二月加一天
        if(year % 4 == 0 && month == 2) {
            dayNum += 1;
        }
        for(var i=0;i<dayNum;i++) {
            var dayData = Lunar.solar2lunar(year, month);
            dateArr.push(dayData);
        }
        this.cacheData[date] = dateArr;
        this.currentData[date] = {
            date: dateArr,
            type: type
        }
    },
    bindEvent: function() {

    }
}

module.exports = lunarCalendar;