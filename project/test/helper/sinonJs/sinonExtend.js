/**对SinonJs的扩展
 * author：YYC
 * date：2013-12-21
 * email：395976266@qq.com
 * qq: 395976266
 * blog：http://www.cnblogs.com/chaogex/
 */

/**
 * 创建空的类
 * @param args  方法名
 * @returns {Function}
 */
this.sinon.createClass = function (args) {
    var args = Array.prototype.slice.call(arguments, 0),
        len = 0,
        i = 0;

    function A() {
    }

    for (i = 0, len = args.length; i < len; i++) {
        A.prototype[args[i]] = function () {
        };
    }

    return A;
};
/**
 * 创建空的object实例
 * @param args  方法名
 * @returns {Function}
 */
this.sinon.createObj = function (args) {
    var args = Array.prototype.slice.call(arguments, 0),
        len = 0,
        i = 0;

    var a = {};

    for (i = 0, len = args.length; i < len; i++) {
        a[args[i]] = function () {
        };
    }

    return a;
};

this.sinon.createSpyObj = function (args) {
    var args = Array.prototype.slice.call(arguments, 0),
        len = 0,
        i = 0;

    var a = {};

    for (i = 0, len = args.length; i < len; i++) {
        a[args[i]] = sinon.spy();
    }

    return a;
};

this.sinon.createStubObj = function (args) {
    var args = Array.prototype.slice.call(arguments, 0),
        len = 0,
        i = 0;

    var a = {};

    for (i = 0, len = args.length; i < len; i++) {
        a[args[i]] = sinon.stub();
    }

    return a;
};


this.sinon.sandbox.createClass = this.sinon.createClass;
this.sinon.sandbox.createObj = this.sinon.createObj;
this.sinon.sandbox.createSpyObj = this.sinon.createSpyObj;
this.sinon.sandbox.createStubObj = this.sinon.createStubObj;


////增加YTester的Fake组件
//this.sinon.fake = YYC.Test.Fake;