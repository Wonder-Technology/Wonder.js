/**
 * Created with yangyuanchao
 * Date: 2014-07-25
 */
describe("Menu", function () {
    var menu = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        menu = new YYC.Control.Menu();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("addItem", function () {
        it("在一级子菜单的指定位置插入新项", function () {
//            var item1 = {items: [
//                    {text: "a"}
//                ]},
//                item2 = {items: [
//                    {text: "b"}
//                ]},
//                item3 = {items: [
//                    {text: "c"}
//                ]};
//
//            menu.addItem([0], item1);
////            menu.addItem([0, 0], item2);
////            menu.addItem([1], item3);
//
//            var menus = menu.getMenus();
//            expect(menus[0].getText()).toEqual("");
////            expect(menus[1]).toBeFunction();
        });
        it("可在多级子菜单的指定位置插入新项", function () {
        });
        it("如果指定位置有误，则在指定级别的末尾处加入新项", function () {
        });
    });
});
