/***********************************************
 页面特效库YUI   v0.1

 作者：YYC
 日期：2013-09-04
 电子邮箱：395976266@qq.com
 QQ: 395976266
 博客：http://www.cnblogs.com/chaogex/

 ************************************************/
(function () {
    var ui = (function () {
        return {
            //向上滚动
            rollUp: function (outerID, innerID) {
                var preTop = 0;
                var currentTop = 0;
                var stoptime = 0;
                var stopscroll = false;
                var scrollElem = document.getElementById(outerID);
                var leftElem = document.getElementById(innerID);
                /* 此处outerHeight为180px，innerHeight为720px，
                 所以marqueesHeight为540px。
                 又因为td的高度为180px，即显示的一行产品的高度为180px，
                 所以总共可显示540/180 + 1 = 4行，即4* 5 = 20个产品
                 */
                var outerHeight = scrollElem.style.height.slice(0, 3);     //外层的高度，也是页面显示层的高度
                var innerHeight = leftElem.style.height.slice(0, 3);   //内层的高度
                var marqueesHeight = innerHeight - outerHeight;    //滚动最大高度（即为scrollTop的最大高度）为内层高度 - 外层高度

                //为scrollElem绑定鼠标事件
                scrollElem.onmouseover = new Function('stopscroll = true');
                scrollElem.onmouseout = new Function('stopscroll = false');

                function init_srolltext() {
                    scrollElem.scrollTop = 0;
                    setInterval('scrollUp()', 10);     //值越小，滚动速度越快
                }

                function scrollUp() {
                    if (stopscroll) return;
                    currentTop += 1;
                    if (currentTop == outerHeight) {
                        stoptime += 1;
                        currentTop -= 1;
                        if (stoptime == 300) { //滚到到marqueesHeight后，停止3秒
                            currentTop = 0;
                            stoptime = 0;
                        }
                    } else {
                        //             preTop = scrollElem.scrollTop;
                        scrollElem.scrollTop += 1;
                        if (scrollElem.scrollTop == marqueesHeight) {  //scrollElem.scrollTop的最大值为marqueesHeight
                            scrollElem.scrollTop = 0;
                            scrollElem.scrollTop += 1;
                        }
                    }

                }

                scrollElem.appendChild(leftElem.cloneNode(true));
                init_srolltext();
            }
        };
    }());

    window.YYC = window.YYC || {};
    YYC.YUI = ui;
}());
