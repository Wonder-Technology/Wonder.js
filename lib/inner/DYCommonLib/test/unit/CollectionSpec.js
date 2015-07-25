describe("Collection", function () {
    var collection = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        collection = new dyCb.Collection();
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("sort", function () {
        it("对容器元素进行排序", function () {
            collection.addChild(2);
            collection.addChild(1);

            collection.sort(function (a, b) {
                return a - b;
            });

            expect(collection.getChildren()).toEqual([1, 2]);
        });
    });


    describe("hasChild", function () {
        it("如果参数为func,则使用func进行遍历判断", function () {
            collection.addChild(1);
            collection.addChild("a");

            expect(collection.hasChild(function (c) {
                return c === 1;
            })).toBeTruthy();
            expect(collection.hasChild(function (c) {
                return c === "b";
            })).toBeFalsy();
        });

        it("判断容器中是否存在该数据", function () {
            var fake = {};
            fake2 = {
                a: 1
            };
            collection.addChild(fake);

            expect(collection.hasChild(fake)).toBeTruthy();
            expect(collection.hasChild(fake2)).toBeFalsy();
        });
        it("如果容器元素有uid，则根据uid判断", function () {
            var fake = {uid:1},
                fake2 = {uid:2},
                fake3 = {uid:1};
            collection.addChild(fake);

            expect(collection.hasChild(fake)).toBeTruthy();
            expect(collection.hasChild(fake3)).toBeTruthy();
            expect(collection.hasChild(fake2)).toBeFalsy();

        });
    });

    describe("getChildren", function () {
        it("获得容器", function () {
            var children = collection.getChildren();

            expect(children).toBeSameArray(collection._children);
        });
    });

    describe("getChild", function () {
        it("获得容器指定位置的数据", function () {
            collection._children = [1, 2];
            var child = collection.getChild(1);

            expect(child).toEqual(2);
        });
    });

    describe("addChild", function () {
        it("插入到容器的末尾", function () {
            var children = null;

            collection.addChild(1).addChild(2);

            children = collection.getChildren();

            expect(children).toEqual([1, 2]);
        });
    });

    describe("addChildren", function () {
        it("add array", function () {
            var fakeElement = [1, 2];

            collection.addChildren(fakeElement);

            expect(collection.getChildren()).toEqual(fakeElement);
        });
        it("add another Collection", function(){
            var col = dyCb.Collection.create([1, 2]);

            collection.addChildren(col);

            expect(collection.getChildren()).toEqual(col.getChildren());
        });
        it("add one element", function () {
            collection.addChildren(1);

            expect(collection.getChildren()).toEqual([1]);

        });
    });

    describe("getCount", function () {
        it("返回元素个数", function () {
            collection.addChildren([1, 2]);

            expect(collection.getCount()).toEqual(2);
        });
    });

    describe("removeChild", function () {
        it("return collection instance", function(){
            var arr = [1, 2];

            collection.addChildren(arr);

            expect(collection.removeChild(function (e) {
                return e === 1;
            })).toEqual(collection);
        });

        describe("如果第一个参数为function", function () {
            it("删除容器中调用func返回true的元素。", function () {
                var child = {
                    x: 1,
                    y: 1
                };
                collection.addChild(child);

                collection.removeChild(function (e) {
                    if (e.x === 1 && e.y === 1) {
                        return true;
                    }
                    return false;
                });

                expect(collection.getChildren().length).toEqual(0);
            });
            it("第二种调用方式", function () {
                var child = {
                    x: 1,
                    y: 1
                };
                var target = {
                    x: 1,
                    y: 1
                };
                collection.addChild(child);

                collection.removeChild(function (e) {
                    if (e.x === target.x && e.y === target.y) {
                        return true;
                    }
                    return false;
                });

                expect(collection.getChildren().length).toEqual(0);
            });
            //it("删除成功返回true，失败返回false", function () {
            //    var arr = [1, 2];
            //
            //    collection.addChildren(arr);
            //
            //    expect(collection.removeChild(function (e) {
            //        return e === 1;
            //    })).toBeTruthy();
            //    expect(collection.removeChild(function (e) {
            //        return e === 1;
            //    })).toBeFalsy();
            //});
        });

        describe("如果第一个参数为引擎实体类", function () {
            beforeEach(function () {
                sandbox.stub()
            });

            function buildObj(uid) {
                return {
                    //isInstanceOf: sandbox.stub().returns(true),
                    uid: uid
                }
            }

            it("删除匹配项（Uid匹配）", function () {
                var child = buildObj(1);
                collection.addChild(child);

                collection.removeChild(child);

                expect(collection.getChildren().length).toEqual(0);
            });
            //it("删除成功返回true，失败返回false", function () {
            //    var child = buildObj(1);
            //
            //    collection.addChild(child);
            //
            //    expect(collection.removeChild(child)).toBeTruthy();
            //    expect(collection.removeChild(child)).toBeFalsy();
            //});
        });

        describe("否则", function () {
            it("删除匹配项（===匹配）", function () {
                var child = {
                    x: 1,
                    y: 1
                };
                collection.addChild(child);
                collection.addChild(1);

                collection.removeChild(child);

                expect(collection.getChildren().length).toEqual(1);

                collection.removeChild(1);

                expect(collection.getChildren().length).toEqual(0);
            });
            //it("删除成功返回true，失败返回false", function () {
            //    var arr = [1, 2];
            //
            //    collection.addChildren(arr);
            //
            //    expect(collection.removeChild(1)).toBeTruthy();
            //    expect(collection.removeChild(1)).toBeFalsy();
            //});
        });

    });

    //describe("removeChildAt", function () {
    //    it("如果序号小于0，则报错", function () {
    //        expect(function () {
    //            collection.removeChildAt(-1);
    //        }).toThrow();
    //    });
    //    it("删除容器中指定位置的元素。", function () {
    //        collection.addChildren([1, 2, 3]);
    //
    //        collection.removeChildAt(1);
    //
    //        expect(collection.getChildren().length).toEqual(2);
    //        expect(collection.getChildAt(1)).toEqual(3);
    //    });
    //});

    describe("removeAllChildren", function () {
        it("清空容器", function () {
            collection.addChild(1).addChild(2);

            collection.removeAllChildren();

            expect(collection.getChildren().length).toEqual(0);
        });
//        it("重置cursor", function () {
//            collection.removeAllChildren();
//
//            expect(collection._cursor).toEqual(0);
//        });
    });
    //
    //describe("copy", function () {
    //    it("返回容器副本（深拷贝）", function () {
    //        var arr = [1, {a: 1}];
    //        collection.addChildren(arr);
    //
    //        var a = collection.copy();
    //        a[1].a = 100;
    //
    //        expect(a === arr).toBeFalsy();
    //        expect(a.length).toEqual(2);
    //        expect(arr[1].a).toEqual(1);
    //    });
    //});
//
//    describe("reverse", function () {
////        it("如果容器为空，则报错", function () {
////            collection.removeAllChildren();
////
////            expect(function () {
////                collection.reverse();
////            }).toThrow();
////        });
//        it("容器反序", function () {
//            var arr = [
//                {},
//                2,
//                3,
//                4
//            ];
//            collection.addChildren(arr);
//
//            collection.reverse();
//
//            expect(collection.getChildren()).toEqual([4, 3, 2, {}]);
//        });
//    });

    describe("forEach", function () {
        it("遍历容器", function () {
            var a = 0;
            var b = 0;
            collection.addChild(1);
            collection.addChild(2);

            collection.forEach(function (ele, index) {
                a += ele;
                b += index;
            });

            expect(a).toEqual(3);
            expect(b).toEqual(1);
        });
        it("如果返回$BREAK，则跳出遍历", function () {
            var a = 0;
            collection.addChild(1);
            collection.addChild(2);

            collection.forEach(function (ele, index) {
                a += ele;
                return dyCb.$BREAK;
            });

            expect(a).toEqual(1);
        });
        it("can set the context for this", function () {
            var t = [1, 2];
            var a = 0;
            collection.addChild(100);
            collection.addChild(200);

            collection.forEach(function (ele, index) {
                a += this[index];
            }, t);

            expect(a).toEqual(3);
        });
    });

    describe("map", function () {
        it("handle each value and return handled array", function(){
            collection.addChild(1);
            collection.addChild(2);

            var result = collection.map(function(val){
                return val * 2;
            });

            expect(result.getChildren()).toEqual([2, 4]);
            expect(collection.getChildren()).toEqual([1, 2]);
        });
        it("if handler return $REMOVE, then remove it from the result", function(){
            collection.addChild(1);
            collection.addChild(2);

            var result = collection.map(function(val){
                if(val === 2){
                    return dyCb.$REMOVE;
                }

                return val * 2;
            });

            expect(result.getChildren()).toEqual([2]);
            expect(collection.getChildren()).toEqual([1, 2]);
        });
    });

    describe("filter", function () {
        it("return filtered element", function () {
            var child1 = {a: 1},
                child2 = {a: 2},
                child3 = {a: 2};
            collection.addChildren([child1, child2, child3]);

            var result = collection.filter(function (e) {
                return e.a === 2;
            });

            expect(collection.getChildren()).toEqual([child1, child2, child3]);
            expect(result.getChildren()).toEqual([child2, child3]);
        });
        it("this is point to container", function(){
            var child1 = {a: 1},
                child2 = {a: 2},
                child3 = {a: 2};
            collection.addChildren([child1, child2, child3]);

            var result = collection.filter(function (value, index) {
                return this[index].a === 2;
            });

            expect(collection.getChildren()).toEqual([child1, child2, child3]);
            expect(result.getChildren()).toEqual([child2, child3]);
        });
    });
});