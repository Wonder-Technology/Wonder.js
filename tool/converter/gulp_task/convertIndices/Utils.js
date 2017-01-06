"use strict";
module.exports = (function () {
    function Utils() {
    }
    Utils.hasData = function (data) {
        return data && data.length && data.length > 0;
    };
    return Utils;
}());
