require("./timeSelect.less");
var $ = require("zepto");
var timeSelectHtml = require("./timeSelect.html");

var TimeSelect = function(ops) {
    this.ops = $.extend({
        dom: "timeSelect",
        width: '100%',
        hour: new Date().getHours(),
        minute: new Date().getMinutes()
    }, ops);
    this.init();
};

TimeSelect.prototype = {
    init: function() {
        this.initTimeSelect();
    },
    initTimeSelect: function() {
        $("#" + this.ops.dom).append(timeSelectHtml);
    }
}

module.exports = TimeSelect;