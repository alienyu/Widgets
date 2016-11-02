require("../../css/page/lunarCalendar.less");
var LunarCalendar = require("../widgets/lunarCalendar/lunarCalendar.js");
var timeSelect = require("../widgets/timeSelect/timeSelect.js");
var $ = require("zepto");
var fuc = {
    config: {},
    init: function() {
        var that = this;
        this.lunar = new LunarCalendar({
            initOver: function(date) {
                that.config.currentDate = date;
                var solarText = date.cYear + "年" + date.cMonth + "月" + date.cDay + "日";
                var lunarText = date.cYear + "年" + date.IMonthCn + date.IDayCn;
                if($('.lunar input').get(0).checked) {
                    $(".calendar .date").text(lunarText);
                } else {
                    $(".calendar .date").text(solarText);
                }
                that.addCalendarTextHiddenDate(date.cYear, date.cMonth, date.cDay);
            },
            dateClickCallback: function(date) {
                that.switchCalendarText(date);
            },
            switchNextMonthCallback: function(date) {
                that.switchCalendarText(date);
            },
            switchPrevMonthCallback: function(date) {
                that.switchCalendarText(date);
            }
        });
        this.timeSelect = new timeSelect();
        this.bindEvent();
    },
    switchCalendarText: function(date) {
        this.config.currentDate = date;
        var calendarText = "";
        if($('.lunar input').get(0).checked) {
            this.lunar.switchMode("lunar");
            calendarText = date.cYear + "年" + date.IMonthCn + date.IDayCn;
        } else {
            this.lunar.switchMode("solar");
            calendarText = date.cYear + "年" + date.cMonth + "月" + date.cDay + "日";
        }
        $(".calendar .date").text(calendarText);
        this.addCalendarTextHiddenDate(date.cYear, date.cMonth, date.cDay);;
    },
    addCalendarTextHiddenDate: function(year, month ,day) {
        $(".calendar .date").attr("date-year", year).attr("date-month", month).attr("date-day", day);
    },
    bindEvent: function() {
        var that = this;
        $('.lunar input').change(function(e) {
            var calendarText = "";
            if(e.target.checked) {
                that.lunar.switchMode("lunar");
                calendarText = that.config.currentDate.cYear + "年" + that.config.currentDate.IMonthCn + that.config.currentDate.IDayCn;
            } else {
                that.lunar.switchMode("solar");
                calendarText = that.config.currentDate.cYear + "年" + that.config.currentDate.cMonth + "月" + that.config.currentDate.cDay + "日";
            }
            $(".calendar .date").text(calendarText);
            that.addCalendarTextHiddenDate(that.config.currentDate.cYear, that.config.currentDate.cMonth, that.config.currentDate.cDay);
        });
        $("#toToday").click(function(e) {
            that.lunar.toToday();
        });
    }
}

fuc.init();

