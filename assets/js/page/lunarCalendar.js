require("../../css/page/lunarCalendar.less");
var LunarCalendar = require("../widgets/lunarCalendar/lunarCalendar.js");
var $ = require("zepto");
var fuc = {
    config: {},
    init: function() {
        this.lunar = new LunarCalendar({
            dateClickCallback: function(data) {
                console.log(data);
            }
        });
        this.bindEvent();
    },
    bindEvent: function() {
        var that = this;
        $('.lunar input').change(function(e) {
            if(e.target.checked) {
                that.lunar.switchMode("lunar");
            } else {
                that.lunar.switchMode("solar");
            }
        });
        $("#toToday").click(function(e) {
            that.lunar.toToday();
        });
    }
}

fuc.init();

