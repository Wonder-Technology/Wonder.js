describe("YOOP", function () {
    it("静态方法的this是指向类的", function () {
        var A = YYC.Class({
            Static: {
                a: 100,
                method: function () {
                    this.b = 300;
                    return 200;
                }
            }
        });
        var result = A.method();

        expect(result).toEqual(200);
        expect(A.b).toEqual(300);    //300
    });

    describe("测试Class与AClass", function () {
        function testInheritFromOnlyOneClass(_class) {
            var A = YYC.AClass({});
            var B = YYC.AClass({});

            expect(function () {
                YYC[_class](A, B, {});
            }).toThrow();
            expect(function () {
                YYC[_class]({ Class: [A, B] }, {});
            }).toThrow();
        };

        describe("测试类Class", function () {
            it("可以继承多个接口。如果不实现会抛出异常", function () {
                var A = YYC.Interface("m1");
                var B = YYC.Interface("m2");

                expect(function () {
                    YYC.Class({ Interface: A }, {
                        Public: {
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class({ Interface: [A] }, {
                        Public: {
                        }
                    });
                }).toThrow();

                expect(function () {
                    YYC.Class({ Interface: [A, B] }, {
                        Public: {
                            m1: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class({ Interface: [A, B] }, {
                        Public: {
                            m2: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class({ Interface: [A, B] }, {
                        Public: {
                            m1: function () {
                            },
                            m2: function () {
                            }
                        }
                    });
                }).not.toThrow();
            });

            it("只能继承一个类（Class或AClass），否则抛出异常", function () {
                testInheritFromOnlyOneClass("Class");
            });
            it("创建实例时调用构造函数", function () {
                var A = YYC.Class({
                    Init: function () {
                        this.a = 10;
                    }
                });

                expect(new A().a).toEqual(10);
            });

            describe("获得公有成员", function () {
                it("如果父类不存在，能够正确获得公有方法", function () {
                    var Class = YYC.Class({
                        Public: {
                            a: function () {
                                this.b = 1;
                                return 0;
                            }
                        }
                    });

                    var cla = new Class();
                    var result = cla.a();

                    expect(result).toEqual(0);
                    expect(cla.b).toEqual(1);
                });
            });

            //it("不能定义虚方法，否则抛出异常", function () {
            //    expect(function () {
            //            YYC.Class({
            //                Public: {
            //                    Virtual: {
            //                        move: function () { }
            //                    }
            //                }
            //            })
            //        }).toThrow();
            //});
            it("不能定义抽象成员，否则抛出异常", function () {
                expect(function () {
                    YYC.Class({
                        Public: {
                            Abstract: {
                                move: function () {
                                }
                            }
                        }
                    })
                }).toThrow();
            });
            it("可以将虚方法定义在外面，表示公有虚方法", function () {
                var A = YYC.Class({
                    Virtual: {
                        move: function () {
                        }
                    }
                });

                expect(function () {
                    new A().move()
                }).not.toThrow();
            });
            it("验证是否实现了接口成员，如果没有实现会抛出异常", function () {
                var I = YYC.Interface(["move"], ["a"]);

                expect(function () {
                    YYC.Class({ Interface: I }, {
                        Public: {
                            a: 0
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class({ Interface: I }, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class({ Interface: I }, {
                        Public: {
                            a: 0,
                            move: function () {
                            }
                        }
                    });
                }).not.toThrow();
            });
            it("验证是否实现了父类抽象成员，如果没有实现会抛出异常", function () {
                var A = YYC.AClass({
                    Abstract: {
                        move: function () {
                        },
                        a: 0
                    }
                });

                expect(function () {
                    YYC.Class(A, {
                        Public: {
                            a: 0
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(A, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(A, {
                        Public: {
                            a: 0,
                            move: function () {
                            }
                        }
                    });
                }).not.toThrow();
            });
        });

        describe("测试抽象类AClass", function () {
            it("可以继承多个接口（在抽象类中不用实现，可以交给子类Class实现）", function () {
                var A = YYC.Interface("m1");
                var B = YYC.Interface(["m2"], ["a"]);
                var C = YYC.AClass({ Interface: [A, B] }, {});

                expect(function () {
                    YYC.Class(C, {
                        Public: {
                            m1: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(C, {
                        Public: {
                            m2: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(C, {
                        Public: {
                            m1: function () {
                            },
                            m2: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(C, {
                        Public: {
                            m1: function () {
                            },
                            m2: function () {
                            },
                            a: 1
                        }
                    });
                }).not.toThrow();
            });
            it("只能继承一个类（Class或AClass），否则抛出异常", function () {
                testInheritFromOnlyOneClass("AClass");
            });
            it("构造函数供子类调用", function () {
                var A = YYC.AClass({
                    Init: function () {
                        throw new Error();
                    }
                });
                var B = YYC.Class(A, {
                    Init: function () {
                        this.a = 10;
                    }
                });
                var C = YYC.Class(A, {
                    Init: function () {
                        this.a = 10;
                        this.base();
                    }
                });

                expect(function () {
                    new B();
                }).not.toThrow();
                expect(function () {
                    new C();
                }).toThrow();

            });
            it("抽象类如果继承实体类，会抛出异常", function () {
                var A = YYC.Class({});
                expect(function () {
                    YYC.AClass(A, {});
                }).toThrow();
            });
            //it("如果子类重写了父类密封的方法，会抛出异常", function () {
            //    var A = YYC.AClass({
            //        Public: {
            //            Sealed: {
            //                a: function () { }
            //            }
            //        }
            //    });
            //    expect(function () {
            //        YYC.Class(A, {
            //            Public: {
            //                a: function () { }
            //            }
            //        });
            //    }).toThrow();

            //});
            it("子类虚方法实现抽象父类的抽象方法时，不抛出异常", function () {
                var A = YYC.AClass({
                    Abstract: {
                        move: function () {
                        }
                    }
                });
                expect(function () {
                    YYC.Class(A, {
                        Public: {
                            Virtual: {
                                move: function () {
                                }
                            }
                        }
                    });
                }).not.toThrow();

                expect(function () {
                    YYC.Class(A, {
                        Public: {
                        }
                    });
                }).toThrow();
            });
            it("可以将虚方法定义在外面，表示公有虚方法", function () {
                var A = YYC.AClass({
                    Virtual: {
                        move: function () {
                        }
                    }
                });
                var B = YYC.Class(A, {});

                expect(function () {
                    new B().move()
                }).not.toThrow();
            });
            it("可以将抽象成员定义在外面，表示公有抽象成员", function () {
                var A = YYC.AClass({
                    Abstract: {
                        move: function () {
                        }
                    }
                });

                expect(function () {
                    YYC.Class(A, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).not.toThrow();
            });
            it("不验证是否实现父类的抽象成员（可以交给子类Class实现）", function () {
                var A = YYC.AClass({
                    Abstract: {
                        move: function () {
                        },
                        a: 0
                    }
                });
                var B = YYC.AClass(A, {});
                var C = YYC.AClass(B, {});

                expect(function () {
                    YYC.AClass(A, {
                        Public: {
                            a: 0
                        }
                    });
                }).not.toThrow();
                expect(function () {
                    YYC.AClass(A, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).not.toThrow();


                expect(function () {
                    YYC.Class(B, {
                        Public: {}
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(B, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).toThrow();
                expect(function () {
                    YYC.Class(B, {
                        Public: {
                            move: function () {
                            },
                            a: 1
                        }
                    });
                }).not.toThrow();


                expect(function () {
                    YYC.Class(C, {
                        Public: {
                            move: function () {
                            }
                        }
                    });
                }).toThrow();
            });
            it("子类没有全部实现抽象父类的抽象成员时，抛出异常", function () {
                var A = YYC.AClass({
                    Init: function (t) {
                        this.a = t;
                        this.b = 2;
                    },
                    Public: {
                        p: function () {
                            return 0;
                        }
                    },
                    Private: {
                        _m: 1
                    },
                    Protected: {
                        P_h: function () {
                            return this._m;
                        },
                        P_k: 3
                    },
                    Abstract: {
                        move: function () {
                        },
                        u: 0,
                        t: function () {
                        }
                    }
                });

                expect(function () {
                    YYC.Class(A, {
                        Init: function () {
                            this.b = 100;
                            this.base(200);
                        },
                        Public: {
                            u: 20
                        }
                    });
                }).toThrow();
            });
            it("子类全部实现抽象父类的抽象成员时，不抛出异常", function () {
                var A = YYC.AClass({
                    Init: function (t) {
                        this.a = t;
                        this.b = 2;
                    },
                    Public: {
                        p: function () {
                            return 0;
                        }
                    },
                    Private: {
                        _m: 1
                    },
                    Protected: {
                        P_h: function () {
                            return this._m;
                        },
                        P_k: 3
                    },
                    Abstract: {
                        move: function () {
                        },
                        u: 0,
                        t: function () {
                        }
                    }
                });
                var B = YYC.Class(A, {
                    Init: function () {
                        this.b = 100;
                        this.base(200);
                    },
                    Public: {
                        move: function () {
                            return this.P_h();
                        },
                        t: function () {
                        },
                        u: 20
                    }
                });
                var C = YYC.Class(B, {
                    Public: {
                        move: function () {
                            var baseResult = this.base();

                            return baseResult;
                        },
                        t: function () {
                        }
                    }
                });

                var b = new B();
                var c = new C();

                expect([b.a, b.b]).toEqual([200, 2]);
                expect([b.p(), b.move(), b.u]).toEqual([0, 1, 20]);
                expect(c.move()).toEqual(1);
            });
        });
    });


    describe("测试接口Interface", function () {
        it("可以继承多个接口", function () {
            var A = YYC.Interface("m1");
            var B = YYC.Interface("m2");
            var C = YYC.Interface([A, B], "m3");
            var D = YYC.Interface([A, B], ["m3"]);
            var E = YYC.Interface([A, B], ["m3"], ["a"]);
            var F = YYC.Interface(A, "m2");

            expect(C.prototype.Interface_m1).toBeExist();
            expect(C.prototype.Interface_m2).toBeExist();
            expect(C.prototype.Interface_m3).toBeExist();

            expect(D.prototype.Interface_m1).toBeExist();
            expect(D.prototype.Interface_m2).toBeExist();
            expect(D.prototype.Interface_m3).toBeExist();

            expect(E.prototype.Interface_m1).toBeExist();
            expect(E.prototype.Interface_m2).toBeExist();
            expect(E.prototype.Interface_m3).toBeExist();
            expect(E.prototype.Interface_a).toEqual(0);

            expect(F.prototype.Interface_m1).toBeExist();
            expect(F.prototype.Interface_m2).toBeExist();
        });
        it("测试接口问题", function(){
            var Animal = YYC.Interface(["eat","run"],["name"]);
            var People = YYC.Class({Interface:Animal},{
                Private:{
                },
                Public:{
                    name:"yh",
                    eat:function(){
                        console.log("eating");
                    },
                    run:function(){
                        console.log(this.name)
                    }
                }
            });

            expect(function(){
                var people = new People();
                people.eat();
                people.run();
            }).not.toThrow();
        });
        it("子类Class没有全部实现了接口方法和属性，抛出异常", function () {
            var Int = YYC.Interface("A", "B");

            expect(function () {
                YYC.Class({Interface: Int}, {
                    Public: {
                        //A: function () { },
                        B: function () { }
                    }
                });
            }).toThrow();

            var Int2 = YYC.Interface(Int, ["C"], ["a"]);

            expect(function () {
                YYC.Class({Interface: Int2}, {
                    Public: {
                        A: function () { },
                        B: function () { },
                        C: function () { }
                    }
                });
            }).toThrow();
            expect(function () {
                YYC.Class({Interface: Int2}, {
                    Public: {
                        B: function () { },
                        C: function () { },
                        a: 1
                    }
                });
            }).toThrow();
        });
        it("子类全部实现了接口方法和属性，不抛出异常", function () {
            var Int = YYC.Interface("A", "B");

            expect(function () {
                YYC.Class({ Interface: Int }, {
                    Public: {
                        A: function () { },
                        B: function () { }
                    }
                });
            }).not.toThrow();
        });
    });

    describe("解决发现的问题", function () {
        it("解决“实例之间不应该共享属性”", function () {
            var A = YYC.Class({
                Init: function () {
                },
                Public: {
                    a: []
                }
            });

            var t = new A();
            t.a.push("a");
            var m = new A();

            expect(t.a).toEqual(["a"]);
            expect(m.a).toEqual([]);
        });
        it("解决“继承于同一父类的子类实例之间不应该共享属性”", function () {
            var Parent = YYC.AClass({
                Init: function () {
                    console.log("Parent Init!");
                },
                Public: {
                    a: []
                }
            });
            var Sub1 = YYC.Class(Parent, {
                Init: function () {
                },
                Public: {
                }
            });
            var Sub2 = YYC.Class(Parent, {
                Init: function () {
                }
            });

            var t = new Sub1();
            t.a.push("a");
            var k = new Sub2();

            expect(t.a).toEqual(["a"]);
            expect(k.a).toEqual([]);
        });
        describe("解决“若A1为抽象类，A2（抽象类）继承于A1，B（类）继承于A2，A1、A2、B都有同名方法a，A2和B在a方法中都通过this.baseClass调用父类同名方法。则如果B的实例b调用a方法，则A2、B的a方法中的this.baseClass均指向A2（照理说A2的this.baseClass应该指向A1）！", function () {
            it("可以使用baseClass属性来访问父类：如baseClass如上一级父类，_baseClass调用上上一级父类，依次类推", function () {
                var A1 = YYC.AClass({
                    Public: {
                        arr: [],
                        a: function () {
                            this.arr.push(1);
                        }
                    }
                });
                var A2 = YYC.AClass(A1, {
                    Public: {
                        a: function () {
                            this.arr.push(2);
                            this.baseClass.a.call(this, null);  //调用A1.a
                        }
                    }
                });
                var B = YYC.Class(A2, {
                    Public: {
                        a: function () {
                            this.arr.push(3);
                            this._baseClass.a.call(this, null); //调用A2.a
                            this.baseClass.a.call(this, null);  //调用A1.a

                            return this.arr;
                        }
                    }
                });
                var b = new B();

                expect(b.a()).toEqual([3, 2, 1, 1]);
            });
        });
//        it("也可以用getBaseClass(index)来访问父类：如index为0或没有参数则访问上一级父类，index为1则访问上上一级父类，依次类推", function () {
//            var A1 = YYC.AClass({
//                Public: {
//                    arr: [],
//                    a: function () {
//                        this.arr.push(1);
//                    }
//                }
//            });
//            var A2 = YYC.AClass(A1, {
//                Public: {
//                    a: function () {
//                        this.arr.push(2);
//                        this.getBaseClass().a.call(this, null);
//                    }
//                }
//            });
//            var B = YYC.Class(A2, {
//                Public: {
//                    a: function () {
//                        this.arr.push(3);
//                        this.getBaseClass(0).a.call(this, null);
//                        this.getBaseClass(1).a.call(this, null);
//
//                        return this.arr;
//                    }
//                }
//            });
//            var b = new B();
//
//            expect(b.a()).toEqual([3, 2, 1, 1]);
//        });
    });

    describe("测试‘每个实例的类成员相互独立’", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("测试1", function () {
            var A = YYC.Class({
                Private: {
                    _a: []
                },
                Public: {
                    add: function (num) {
                        this._a.push(num);
                    },
                    getA: function () {
                        return this._a;
                    }
                }
            });

            new A().add(1);

            expect(new A().getA().length).toEqual(0);
        });
    });

    describe("isInstanceOf", function () {
        it("直接判断是否为Class的实例", function () {
            var A = YYC.Class({});

            expect(new A().isInstanceOf(A)).toBeTruthy();
        });
        describe("测试继承抽象类时的情况", function () {
            it("测试1", function () {
                var A = YYC.AClass({});
                var B = YYC.Class(A, {});

                expect(new B().isInstanceOf(B)).toBeTruthy();
                expect(new B().isInstanceOf(A)).toBeTruthy();
            });
            it("测试2", function () {
                var A = YYC.AClass({});
                var B = YYC.AClass(A, {});
                var C = YYC.Class(B, {});
                var D = YYC.Class(A, {});

                expect(new C().isInstanceOf(B)).toBeTruthy();
                expect(new C().isInstanceOf(A)).toBeTruthy();
                expect(new D().isInstanceOf(A)).toBeTruthy();
                expect(new D().isInstanceOf(B)).toBeFalsy();
            });
        });

        describe("测试继承接口时的情况", function () {
            it("测试1", function () {
                var A = YYC.Interface("a");
                var B = YYC.Class({Interface: A}, {
                    Public: {
                        a: function () {
                        }
                    }
                });

                expect(new B().isInstanceOf(B)).toBeTruthy();
                expect(new B().isInstanceOf(A)).toBeTruthy();
            });
            it("测试2", function () {
                var A = YYC.Interface("a");
                var B = YYC.Interface("b");
                var C = YYC.Interface([A, B], "c");
                var D = YYC.Class({Interface: C}, {
                    Public: {
                        a: function () {
                        },
                        b: function () {
                        },
                        c: function () {
                        }
                    }
                });

                expect(new D().isInstanceOf(C)).toBeTruthy();
                expect(new D().isInstanceOf(B)).toBeTruthy();
                expect(new D().isInstanceOf(A)).toBeTruthy();
            });
        });

        it("综合测试", function () {
            var A = YYC.Interface("a1");
            var B = YYC.Interface(A, "a2");
            var C = YYC.AClass({Interface: B}, {
                Public: {
                    a1: function () {
                    },
                    a2: function () {
                    }
                }
            });
            var D = YYC.AClass(C, {
                Public: {
                    a1: function () {
                    },
                    a2: function () {
                    }
                }
            });
            var E = YYC.Class(C, {
            });
            var F = YYC.Class(E, {
            });
            var G = YYC.Class({Interface: B, Class: D}, {
            });

            expect(new E().isInstanceOf(C)).toBeTruthy();
            expect(new E().isInstanceOf(B)).toBeTruthy();
            expect(new E().isInstanceOf(A)).toBeTruthy();

            expect(new F().isInstanceOf(E)).toBeTruthy();
            expect(new F().isInstanceOf(C)).toBeTruthy();
            expect(new F().isInstanceOf(B)).toBeTruthy();
            expect(new F().isInstanceOf(A)).toBeTruthy();

            expect(new G().isInstanceOf(B)).toBeTruthy();
            expect(new G().isInstanceOf(D)).toBeTruthy();

            expect(new G().isInstanceOf(E)).toBeFalsy();
        });
    });

    describe("测试this.base()", function () {
        it("protected方法也可以使用this.base来访问父类同名方法了", function () {
            var a = 0;
            var A = YYC.Class({
                Protected: {
                    test: function () {
                        a += 1;
                    }
                }
            });
            var B = YYC.Class(A, {
                Protected: {
                    test: function () {
                        this.base();
                        a += 1;
                    }
                }
            });

            new B().test();

            expect(a).toEqual(2);
        });

        describe("解决“若一个方法中调用其它方法，则它们的this.base会互相干扰”", function () {
            it("测试1", function () {
                var testNum = 0;
                var A = YYC.Class({
                    Public: {
                        attack: function (num) {
                            testNum -= num;
                        }
                    }
                });
                var B = YYC.Class(A, {
                    Public: {
                        attack: function () {
                            this.canNotAttack(1);

                            this.base(10);
                        },
                        canNotAttack: function (num) {
                            testNum = num;
                        }
                    }
                });
                var C = YYC.Class(B, {
                    Public: {
                        canNotAttack: function (num) {
                            testNum += num;
                        }
                    }
                });

                var c = new C();
                c.attack();

                expect(testNum).toEqual(-9);
            });
            it("测试2", function () {
                var testNum = 0;
                var A = YYC.Class({
                    Public: {
                        attack: function (num) {
                            testNum += num;
                        }
                    }
                });
                var B = YYC.Class(A, {
                    Protected: {
                        P_canNotAttack: function (num) {
                        }
                    },
                    Public: {
                        attack: function () {
                            this.P_canNotAttack(1);

                            this.t1();

                            this.base(10);

                            this.t2();
                        },
                        t1: function () {
                            testNum += 1;
                        },
                        t2: function () {
                            testNum += 1;
                        }
                    }
                });
                var C = YYC.Class(B, {
                    Protected: {
                        P_canNotAttack: function (num) {
                            testNum += num;
                        }
                    },
                    Public: {
                        attack: function () {
                            testNum += 100;
                            this.base();
                        },
                        t1: function () {
                            this.base();
                            testNum += 1;
                        },
                        t2: function () {
                            this.base();
                            testNum += 1;
                        }
                    }
                });

                var c = new C();
                c.attack();

                expect(testNum).toEqual(115);
            });
        });

    });

    describe("stubParentMethod", function () {
        var sandbox = null;
        var A = null,
            B = null,
            C = null,
            a = null,
            b = null,
            c = null;

        beforeEach(function () {
            A = YYC.Class({
                Public: {
                    done: function () {
                        throw new Error("");
                    }
                }
            });
            B = YYC.Class(A, {
                Public: {
                    done: function () {
                        this.baseClass.done.call(this, null);
                    }
                }
            });
            C = YYC.Class(B, {
                Public: {
                    a: 0,

                    done: function () {
                        this.base();

                        this.a = 100;
                    }
                }
            });
            a = new A();
            b = new B();
            c = new C();

            sandbox = sinon.sandbox.create();
        });
        afterEach(function () {
            sandbox.restore();
        });

        it("让父类指定方法不执行，用于Class的测试方法中调用了父类方法的情况", function () {
            expect(function () {
                b.done();
            }).toThrow();
            expect(function () {
                c.done();
            }).toThrow();

            b.stubParentMethod(sandbox, "done");
            c.stubParentMethod(sandbox, "done");

            expect(function () {
                b.done();
            }).not.toThrow();
            expect(function () {
                c.done();
            }).not.toThrow();
        });
        it("可将父类指定方法替换为假方法", function () {
            c.stubParentMethod(sandbox, "done", function () {
                this.val = 1;
            });

            c.done();

            expect(c.val).toEqual(1);
        });
        it("可按照sinon->stub API测试父类指定方法的调用情况", function () {
            c.stubParentMethod(sandbox, "done");

            c.done();

            expect(c.lastBaseClassForTest.done.calledOnce).toBeTruthy();
        });
    });

    describe("stubParentMethodByAClass", function () {
        var sandbox = null;
        var A = null,
            B = null,
            t = null;

        beforeEach(function () {
            A = YYC.AClass({
                Public: {
                    a: 0,
                    done: function () {
                        throw new Error("");
                    }
                }
            });
            B = YYC.AClass(A, {
                Public: {
                    done: function () {
                        this.base();
                    }
                }
            });

            //想要测试B的done方法，必须先建一个空子类继承B，然后测试空子类的done方法
            function getInstance() {
                var T = YYC.Class(B, {
                });

                return new T();
            }

            t = getInstance();

            sandbox = sinon.sandbox.create();
        });
        afterEach(function () {
            sandbox.restore();
        });

        it("让父类指定方法不执行，用于AClass的测试方法中调用了父类方法的情况", function () {
            expect(t.done).toThrow();

            t.stubParentMethodByAClass(sandbox, "done");

            expect(t.done).not.toThrow();
        });
        it("可将父类指定方法替换为假方法", function () {
            t.stubParentMethodByAClass(sandbox, "done", function () {
                this.val = 1;
            });

            t.done();

            expect(t.val).toEqual(1);
        });
        it("可按照sinon->stub API测试父类指定方法的调用情况", function () {
            t.stubParentMethodByAClass(sandbox, "done");

            t.done();

            expect(t.lastBaseClassForTest.done.calledOnce).toBeTruthy();
        });
    });

    it("获得当前版本号", function () {
        expect(YYC.YOOP.version).toBeString();
    });

    describe("测试命名前缀的问题", function () {
        it("为了区分不同层级中同名的私有成员，每个层级类的私有成员前缀不同。这样可解决“当子类调用父类成员时，可能会出现父类成员调用子类的私有成员”的问题", function () {
            var A = YYC.AClass({
                Private: {
                    _val: 100
                },
                Public: {
                    getVal: function () {
                        return this._val;
                    }
                }
            });

            var B = YYC.Class(A, {
                Private: {
                    __val: 200
                },
                Public: {
                    getVal: function () {
                        return this.base();
                    }
                }
            });

            expect(new B().getVal()).toEqual(100);
        });
        it("每个层级类的保护成员前缀都相同。" +
            "因为如果父类与子类的保护成员同名，则父类的该保护成员一般都是设计为虚成员，专门供子类覆写的。" +
            "因此当子类调用父类成员时，本来就期望父类成员调用子类覆写的保护成员。", function () {
            var A = YYC.AClass({
                Protected: {
                    Virtual: {
                        P_val: 100
                    }
                },
                Public: {
                    getVal: function () {
                        return this.P_val;
                    }
                }
            });

            var B = YYC.Class(A, {
                Protected: {
                    P_val: 200
                },
                Public: {
                    getVal: function () {
                        return this.base();
                    }
                }
            });

            expect(new B().getVal()).toEqual(200);
        });
    });

    /*
     describe("YOOP使用方式", function () {
     describe("支持AMD、CMD、CommonJS规范", function () {
     it("可在seajs、node.js中使用", function () {
     var yoop = require("./YOOP.js");

     yoop.Class({});
     ...
     });
     });

     it("支持通过script标签直接引用",function(){
     页面上引用<script src="./YOOP.js"></script>
     通过YYC命名空间使用
     YYC.Class({});
     ...
     });
     });
     */
});