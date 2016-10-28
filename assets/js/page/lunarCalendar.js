require("../../css/page/lunarCalendar.less");
var LunarCalendar = require("../widgets/lunarCalendar/lunarCalendar.js");
var $ = require("zepto");
var fuc = {
    config: {},
    init: function() {
        var lunar = new LunarCalendar({
            cyear: "2016",
            cmonth: "10"
        });
        //lunar.switchMode("lunar");
        //this.animate();
    },
    animate: function() {
        this.left();
        //this.right();
    },
    left: function() {
        $("table").eq(1).addClass("current2prev").addClass("prev");
        $("table").eq(2).addClass("next2current").addClass("current");
        setTimeout(function() {
            $("table").eq(1).removeClass("current").removeClass("current2prev");
            $("table").eq(2).removeClass("next").removeClass("next2current");
        },1200)
    },
    right: function()  {
        $("table").eq(0).addClass("prev2current").addClass("current");
        $("table").eq(1).addClass("current2next").addClass("next");
        setTimeout(function() {
            $("table").eq(0).removeClass("prev").removeClass("prev2current");
            $("table").eq(1).removeClass("current").removeClass("current2next");
        },1200)
    }
}

fuc.init();

