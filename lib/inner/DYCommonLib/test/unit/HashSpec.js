describe("Hash", function () {
    var hash = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        hash = new dyCb.Hash();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("getChildren", function () {
        it("获得容器", function () {
            hash.addChild("a1", 1);
            var children = hash.getChildren();

            expect(children).toBeSameArray(hash._children);
            expect(children.a1).toEqual(1);
        });
    });

    describe("getChild", function () {
        it("根据key获得value", function () {
            hash._children = {"a1": 1};
            var value = hash.getChild("a1");

            expect(value).toEqual(1);
        });
    });

    describe("getKeys", function(){
        it("get all keys", function(){
            hash.addChild("a1", 1);
            hash.addChild("a2", 1);

            expect(hash.getKeys()).toBeInstanceOf(dyCb.Collection);
            expect(hash.getKeys().getChildren()).toEqual(["a1", "a2"]);
        });
    });
    
    describe("getCount", function(){
        it("empty container's count is zero", function(){
            expect(hash.getCount()).toEqual(0);
        });
        it("get the count of the container", function(){
            hash.addChild("a1", 1);
            hash.addChild("a2", 1);

            expect(hash.getCount()).toEqual(2);
        });
    });

    describe("addChild", function () {
        it("加入到容器中，参数为：key，value", function () {
            var value1 = null,
                value2 = null;

            hash.addChild("a1", "1").addChild("a2", 2);
            value1 = hash.getChild("a1");
            value2 = hash.getChild("a2");

            expect([value1, value2]).toEqual(["1", 2]);
        });
        it("如果容器中已有键为key的值了，则覆盖该key", function () {
            var value1 = null;

            hash.addChild("a1", "1");
            hash.addChild("a1", 2);
            value = hash.getChild("a1");

            expect(value).toEqual(2);
        });
    });

    describe("appendChild", function () {
        it("如果容器中没有键为key的值，则将该key的值设为Collection并加入", function () {
            var value = null;

            hash.appendChild("a1", "1");
            value = hash.getChild("a1");

            expect(value).toBeInstanceOf(dyCb.Collection);
            expect(value.getChildren()).toEqual(["1"]);
        });
        it("否则，则将该key的值加入到Collection最后", function () {
            var value = null;

            hash.appendChild("a1", "1");
            hash.appendChild("a1", "2");
            value = hash.getChild("a1");

            expect(value).toBeInstanceOf(dyCb.Collection);
            expect(value.getChildren()).toEqual(["1", "2"]);
        });
    });

    describe("hasChild", function(){
        beforeEach(function(){
            hash.addChild("a1", "1");
            hash.addChild("a2", "2");
        });
        it("if arg is function, use it as iterator to judge", function () {
            expect(hash.hasChild(function (val, key) {
                return val === "1";
            })).toBeTruthy();
            expect(hash.hasChild(function (val, key) {
                return key === "a1";
            })).toBeTruthy();
            expect(hash.hasChild(function (val, key) {
                return key === "a3";
            })).toBeFalsy();
        });
        it("else, arg is as the key to judge", function(){
            expect(hash.hasChild("a1")).toBeTruthy();
            expect(hash.hasChild("b")).toBeFalsy();
        });
    });

    describe("removeChild", function () {
        it("从容器中删除元素", function () {
            hash.addChild("a", {});

            hash.removeChild("a");

            expect(hash.getChild("a")).toBeUndefined();
        });
    });

    describe("forEach", function () {
        it("遍历容器", function () {
            var a = 0;
            var b = "";

            hash.addChild("a",1);
            hash.addChild("b",2);

            hash.forEach(function (val, key) {
                a += val;
                b += key;
            });

            expect(a).toEqual(3);
            expect(b).toEqual("ab");
        });
        it("如果返回$BREAK，则跳出遍历", function () {
            var a = 0;
            hash.addChild("a",1);
            hash.addChild("b",2);

            hash.forEach(function (val, key) {
                a += val;
                return dyCb.$BREAK;
            });

            expect(a).toEqual(1);
        });
        it("可设置this", function () {
            var t = [1, 2];
            var a = 0;
            hash.addChild("0",100);
            hash.addChild("1",200);

            hash.forEach(function (val, key) {
                a += this[key];
            }, t);

            expect(a).toEqual(3);
        });
    });

    describe("map", function () {
        it("handle each value and return handled result", function(){
            hash.addChild("a1", 1);
            hash.addChild("a2", 2);

            var result = hash.map(function(val, key){
                return [key, val * 2];
            });

            expect(result.getChildren()).toEqual({
                "a1": 2,
                "a2": 4
            });
            expect(hash.getChildren()).toEqual({
                "a1": 1,
                "a2": 2
            });
        });
        it("if handler return $REMOVE, then remove it from the result", function(){
            hash.addChild("a1", 1);
            hash.addChild("a2", 2);

            var result = hash.map(function(val, key){
                if(val === 2){
                    return dyCb.$REMOVE;
                }

                return [key, val * 2];
            });

            expect(result.getChildren()).toEqual({
                "a1": 2
            });
            expect(hash.getChildren()).toEqual({
                "a1": 1,
                "a2": 2
            });
        });
    });

    describe("filter", function(){
        it("return filtered element", function(){
            var child1 = {a: 1},
                child2 = {a: 2},
                child3 = {a: 2};
            hash.addChild("1", child1);
            hash.addChild("2", child2);
            hash.addChild("3", child3);

            var result = hash.filter(function (val, key) {
                return val.a === 2;
            });

            expect(hash.getChildren()).toEqual({
                "1": child1,
                "2": child2,
                "3": child3
            });
            expect(result.getChildren()).toEqual({
                "2": child2,
                "3": child3
            });
        });
        it("this is point to container", function(){
            var child1 = {a: 1},
                child2 = {a: 2},
                child3 = {a: 2};
            hash.addChild("1", child1);
            hash.addChild("2", child2);
            hash.addChild("3", child3);

            var result = hash.filter(function (val, key) {
                return this[key].a === 2;
            });

            expect(hash.getChildren()).toEqual({
                "1": child1,
                "2": child2,
                "3": child3
            });
            expect(result.getChildren()).toEqual({
                "2": child2,
                "3": child3
            });
        });
    });

    //describe("map", function () {
    //    it("遍历容器", function () {
    //        var sprite1 = sandbox.createSpyObj("clear"),
    //            sprite2 = sandbox.createSpyObj("clear");
    //        hash.addChild("a",sprite1);
    //        hash.addChild("b",sprite2);
    //
    //        hash.map("clear", [1, 2]);
    //
    //        expect(sprite1.clear).toCalledWith(1, 2);
    //        expect(sprite2.clear).toCalledWith(1, 2);
    //    });
    //    it("方法的this指向元素", function () {
    //        var fakeElement1 = {
    //            a: 1,
    //            judge: function () {
    //                this.a = 2;
    //            }
    //        };
    //        hash.addChild("a",fakeElement1);
    //
    //        hash.map("judge", null);
    //
    //        expect(fakeElement1.a).toEqual(2);
    //    });
    //});
});