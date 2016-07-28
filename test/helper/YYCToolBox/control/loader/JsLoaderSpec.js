describe("JsLoader.js", function () {
    var jsLoader = null,
        JsLoader = YYC.Control.JsLoader;

    //src1是SpecRunner.aspx中testJs1.js的url！
    var src1 = "../../Scripts/jasmine/spec/controlSpec/loader/testJs1.js",
        src2 = "../../Scripts/jasmine/spec/controlSpec/loader/testJs2.js";

    //参考yEngine->mainSpec中测试JsLoader的部分来修改本测试！
    //ToDo 使用YTool->path->getJsDir动态获得src路径
    //ToDo 测试onload钩子的调用（_loadNext中调用）
    //ToDo onload在require、preload加载完成后也要调用

    function loadSingleJs(func, obj) {
            //jsLoader = new JsLoader();

            var foo = {
                a: 1
            };


            jsLoader.add(src1, function (value) {
                this.a = value;
            }, [2], foo);
            func.call(obj, null);

            testTool.asynRun(function () {
                expect(foo.a).toEqual(2);
            }, 300);
    };
    
    beforeEach(function () {
        jsLoader = new JsLoader();
    });
    afterEach(function () {
        $("head script[src*=testJs1]").remove();
        $("head script[src*=testJs2]").remove();

        window.testJs1 = undefined;
    });

    it("JsLoader存在", function () {
        expect(JsLoader).toBeDefined();
    });

    describe("add", function () {
        beforeEach(function () {
        });
        afterEach(function () {
            //jsLoader = null;
        });

        it("参数为：js文件src1、回调函数、回调函数的参数、回调函数的this指向", function () {
            var func = {
                a: 1
            };

            jsLoader.add(src1, function () { }, ["a"], func);

            expect(jsLoader._container[0].src).toEqual(src1);
            expect(jsLoader._container[0].callback).toBeFunction();
            expect(jsLoader._container[0].args).toEqual(["a"]);
            expect(jsLoader._container[0].obj.a).toEqual(1);
        });
        it("参数中如果没有传递“回调函数的this指向”，则指向默认为window", function () {
            window.b = 1;

            jsLoader.add(src1, function () { this.b = 2; }, ["a"]);
            //因为已经测试了loadSync，所以可以直接调用loadSync
            jsLoader.loadSync();

            testTool.asynRun(function () {
                expect(window.b).toEqual(2);
            }, 300);
        });
        it("可以链式加入多个js文件", function () {
            jsLoader.add(src1, function () { }, []).add(src2, function () { }, []);

            expect(jsLoader._container[0].src).toEqual(src1);
            expect(jsLoader._container[1].src).toEqual(src2);
        });
    });

    describe("js非阻塞同步加载loadSync", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("能够正常加载单个js文件时", function () {
            //jsLoader = new JsLoader();
            
            //var func = {
            //        a: 1
            //    };


            //jsLoader.add(src1, function (value) {
            //    this.a = value;
            //}, [2], func);
            //jsLoader.loadSync();

            //testTool.asynRun(function () {
            //    expect(func.a).toEqual(2);
            //}, 300);
            loadSingleJs(jsLoader.loadSync, jsLoader);
        });
        it("加载多个js文件时，按照加入的顺序依次加载", function () {
            //jsLoader = new JsLoader();
            
            var foo = {
                flag1: 0,
                flag2: 0
            };

            jsLoader.add(src1, function A(flag1) {
                this.flag1 = flag1;
                }, [1], foo).add(src2, function B(flag1, flag2) {
                    this.flag1 = flag1;
                    this.flag2 = flag2;
                }, [2, 1], foo);

            jsLoader.loadSync();

            testTool.asynRun(function () {
                //验证先加载src1（加载完后调用A），再加载src2（加载完后调用B）
                expect(foo.flag1).toEqual(2);
                //验证加载了src2
                expect(foo.flag2).toEqual(1);
            }, 300);
        });
    });

    describe("js非阻塞异步加载loadAsync", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("能够正常加载单个js文件时", function () {
            //jsLoader = new JsLoader();

            //var func = {
            //    a: 1
            //};


            //jsLoader.add(src1, function (value) {
            //    this.a = value;
            //}, [2], func);
            //jsLoader.loadAsync();

            //testTool.asynRun(function () {
            //    expect(func.a).toEqual(2);
            //}, 300);
            loadSingleJs(jsLoader.loadAsync, jsLoader);
        });
        it("加载多个js文件时，加载顺序不定", function () {
            //jsLoader = new JsLoader();

            var foo = {
                flag1: 0,
                flag2: 0
            };

            jsLoader.add(src1, function A(flag1) {
                this.flag1 = flag1;
            }, [1], foo).add(src2, function B(flag2) {
                this.flag2 = flag2;
            }, [1], foo);

            jsLoader.loadAsync();

            testTool.asynRun(function () {
                expect(foo.flag1).toEqual(1);
                expect(foo.flag2).toEqual(1);
            }, 300);
        });
    });

    describe("js非阻塞延迟同步加载deferLoadSync", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("能够延迟加载单个js文件时", function () {
            //jsLoader = new JsLoader();

            var foo = {
                a: 1
            };

            jsLoader.add(src1, function (value) {
                this.a = value;
            }, [2], foo);
            jsLoader.deferLoadSync(0.5);

            testTool.asynRun(function () {
                expect(foo.a).toEqual(1);
            }, 400);
            testTool.asynRun(function () {
                expect(foo.a).toEqual(2);
            }, 150);
        });
        it("延迟加载多个js文件时，按照加入的顺序依次加载", function () {
            //jsLoader = new JsLoader();

            var foo = {
                flag1: 0,
                flag2: 0
            };

            jsLoader.add(src1, function A(flag1) {
                this.flag1 = flag1;
            }, [1], foo).add(src2, function B(flag1, flag2) {
                this.flag1 = flag1;
                this.flag2 = flag2;
            }, [2, 1], foo);

            jsLoader.deferLoadSync(0.5);

            testTool.asynRun(function () {
                //验证先加载src1（加载完后调用A），再加载src2（加载完后调用B）
                expect(foo.flag1).toEqual(0);
                //验证加载了src2
                expect(foo.flag2).toEqual(0);
            }, 400);
            testTool.asynRun(function () {
                //验证先加载src1（加载完后调用A），再加载src2（加载完后调用B）
                expect(foo.flag1).toEqual(2);
                //验证加载了src2
                expect(foo.flag2).toEqual(1);
            }, 150);
        });
    });

    describe("按需加载require", function () {
        it("指定加载js", function () {
            expect(window.testJs1).not.toBeDefined();

            jsLoader.require(src1, function () {
                window.testJs1 = window.testJs1 || 200;
            });

            testTool.asynRun(function () {
                expect(window.testJs1).toEqual(100);
            }, 400);
        });
        it("指定加载css", function () { });
        it("指定加载图片", function () { });
    });

    describe("预加载preload（下载脚本，但不解析和执行）", function () {
        it("预加载js", function () { });
        it("预加载css", function () { });
        it("预加载图片", function () { });
    });
});