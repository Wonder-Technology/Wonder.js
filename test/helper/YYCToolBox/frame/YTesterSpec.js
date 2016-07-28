//测试有问题！

describe("YTester", function(){
    describe("Fake框架测试", function () {
        var Fake = YYC.Test.Fake;

        describe("createObj", function () {
            describe("如果createObj指定了对象（参数存在）", function () {
                describe("如果该对象存在", function () {
                    beforeEach(function () {
                        window.test = {
                            aaa: {
                                b: 1
                            },
                            bbb: {
                            }
                        }
                    });
                    afterEach(function () {
                        testTool.delete(window, "test");
                    });

//                    describe("检查参数", function () {
//                        it("如果参数指定的对象存在，但其类型却不是对象，则抛出异常", function () {
//                            window.test = {
//                                aaa: {
//                                    b: 1,
//                                    c: function () {
//                                    }
//                                }
//                            }
//
//                            expect(function () {
//                                Fake.createObj("test.aaa.b");
//                            }).toThrow();
//                            expect(function () {
//                                Fake.createObj("test.aaa.c");
//                            }).toThrow();
//                            expect(function () {
//                                Fake.createObj("test.aaa");
//                            }).not.toThrow();
//                        });
//                        it("检查它的命名空间。如果存在但不是命名空间，则抛出异常", function () {
//                            window.test = {
//                                a: 1
//                            }
//
//                            expect(function () {
//                                Fake.createObj("test.a.b");
//                            }).toThrow();
//                        });
//                    });
//
//                    describe("将该对象备份", function () {
//                        it("如果顶级命名空间存在，则备份顶级命名空间", function () {
//                            Fake.createObj("test.aaa");
//
//                            window.test.aaa = null;
//                            Fake.restore();
//
//                            expect(window.test.aaa.b).toEqual(1);
//                        });
//                        it("否则，在restore时删除顶级命名空间", function () {
//                            Fake.createObj("test2.h");
//
////                            window.test.aaa = null;
//                            Fake.restore();
//
//                            expect(window.test2).toBeUndefined();
//                        });
//                        it("如果该对象父对象为window，则备份该对象", function () {
//                            Fake.createObj("test");
//
//                            window.test = null;
//                            Fake.restore();
//
//                            expect(window.test.aaa.b).toEqual(1);
//                        });
//                    });
//
//                    describe("创建空对象", function () {
//                        it("如果该对象所在的命名空间没有定义，则定义该命名空间", function () {
//                            Fake.createObj("z.p");
//
//                            expect(window.z).toBeExist();
//                            expect(window.z).toEqual({
//                                p: {}
//                            });
//                            expect(window.z.p).toEqual({});
//                        });
//                        it("设置该对象为空对象", function () {
//                            Fake.createObj("test.aaa");
//
//                            expect(window.test.aaa).toEqual({});
//                        });
//                        it("该对象的上一级命名空间保持不变", function () {
//                            Fake.createObj("test.aaa");
//
//                            expect(window.test.bbb).toBeExist();
//                        });
//                    });
//
//                    it("内部指针指向要mock的对象", function () {
//                        Fake.createObj("test.aaa");
//
//                        Fake.getMockObj().c = 100;
//
//                        expect(Fake.getMockObj()).toEqual(window.test.aaa);
//                        expect(window.test.aaa.c).toEqual(100);
//
//                        Fake.createObj("test2");
//
//                        Fake.getMockObj().c = 100;
//
//                        expect(Fake.getMockObj()).toEqual(window.test2);
//                        expect(window.test2.c).toEqual(100);
//                    });
                });
            });

//            it("如果不输入参数，则处理的对象为window", function () {
//                Fake.createObj();
//
//                expect(Fake.getMockObj()).toEqual(window);
//            });
//
//            it("修正bug：现在在调用多次createObj后，不同的mock对象之前不会互相干扰了", function () {
//                //原因分析：_object干扰
//
//                var testMock1 = Fake.createObj("ttt");
//
//                testMock1.Fake("a");
//
//                var testMock2 = Fake.createObj();
//
//                testMock2.Fake("z");
//                testMock1.Fake("b");
//
//                expect(window.ttt.a).toBeFunction();
//                expect(window.ttt.b).toBeFunction();
//                expect(window.z).toBeFunction();
//                expect(window.b).not.toBeFunction();
//            });
//            it("返回一个对象，该对象有replace方法", function () {
////                expect(Fake.createObj().Fake).toBeFunction();
//                expect(Fake.createObj().replace).toBeFunction();
//            });
//
//            describe("测试返回的对象的replace方法", function () {
//                it("用新的对象替换mock的对象的值", function () {
//                    var testMock = Fake.createObj("test2.t");
//
//                    testMock.replace({
//                        q: 1
//                    });
//
//                    expect(window.test2.t.q).toEqual(1);
//                });
//            });
        });

//        describe("createClass", function () {
//
//
//            it("测试", function () {
//                function A(b) {
//                    this._b = b;
//                    this.num = 0;
//                }
//
//                A.prototype.run = function () {
//                    this.num = this._b.buildNum();
//                };
//
//                var B = Fake.createClass("B");
//
//                B.stub("buildNum").return(1);
//                Fake.expect(B.buildNum, Fake.any).return().times(1);
//
//                var a = new A(B);
//                a.run();
//
//                Fake.verify();  //验证是否传入期望的参数，是否调用了1次
//
//                expect(a.num).toEqual(1);
//
////            YTester.restore();
//
//                expect()
//            });
//        });


//        describe("getMockObj", function () {
//            it("获得mock的对象", function () {
//            });
//        });

        describe("restore", function () {
            //已在"将该对象备份"的测试中测试过了

            it("如果定义了假的命名空间，则将其删除", function () {
            });
            it("否则，恢复命名空间", function () {
            })
        });

        describe("dispose", function () {
        });
    });
})
