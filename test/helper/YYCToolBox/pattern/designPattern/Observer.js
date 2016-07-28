    (function () {
	/* 扩展Array，增加forEach和filter方法 */
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fn, thisObj) {
                var scope = thisObj || window;
                for (var i = 0, j = this.length; i < j; ++i) {
                    fn.call(scope, this[i], i, this);
                }
            };
        }

        if (!Array.prototype.filter) {
            Array.prototype.filter = function (fn, thisObj) {
                var scope = thisObj || window;
                var a = [];
                for (var i = 0, j = this.length; i < j; ++i) {
                    if (!fn.call(scope, this[i], i, this)) {
                        continue;
                    }
                    a.push(this[i]);
                }
                return a;
            };
        }



/*  
应用观察者模式，创建Observer类。

9-22

******************************************************************************************

调用方式：

var ob = new YYC.Pattern.Subject();
var f1 = function (data) { console.log('Robbin: ' + data + ', 赶紧干活了！'); };
var f2 = function (data) { console.log('Randall: ' + data + ', 找他加点工资去！'); };

ob.subscribe(f1);
ob.subscribe(f2);
ob.publishAll(null, "老板来了");
ob.unSubscribe(f1);
ob.publish(f2, null, "董事长来了");
ob.dispose();

******************************************************************************************

*/
	YYC.namespace("Pattern").Subject = function () {
            this._events = [];
        }

        YYC.Pattern.Subject.prototype = (function () {

            return {
                //订阅方法
                subscribe: function (context, fn) {
                    if (arguments.length == 2) {
                        this._events.push({ context: arguments[0], fn: arguments[1] });
                    }
                    else {
                        this._events.push(arguments[0]);
                    }
                },
                //发布指定方法
                publish: function (context, fn, args) {
                    var args = Array.prototype.slice.call(arguments, 2);    //获得函数参数
                    var _context = null;
                    var _fn = null;

                    this._events.filter(function (el) {
                        if (el.context) {
                            _context = el.context;
                            _fn = el.fn;
                        }
                        else {
                            _context = context;
                            _fn = el;
                        }

                        if (_fn === fn) {
                            return _fn;
                        }
                    }).forEach(function (el) {  //指定方法可能有多个
                                el.apply(_context, args);       //执行每个指定的方法
                            });
                },
                unSubscribe: function (fn) {
                    var _fn = null;
                    this._events = this._events.filter(function (el) {
                        if (el.fn) {
                            _fn = el.fn;
                        }
                        else {
                            _fn = el;
                        }

                        if (_fn !== fn) {
                            return el;
                        }
                    });
                },
                //全部发布
                publishAll: function (context, args) {
                    var args = Array.prototype.slice.call(arguments, 1);    //获得函数参数
                    var _context = null;
                    var _fn = null;

                    this._events.forEach(function (el) {
                        if (el.context) {
                            _context = el.context;
                            _fn = el.fn;
                        }
                        else {
                            _context = context;
                            _fn = el;
                        }

                        _fn.apply(_context, args);       //执行每个指定的方法
                    });
                },
                dispose: function () {
                    this._events = [];
                }
            }
        })();
    })();


