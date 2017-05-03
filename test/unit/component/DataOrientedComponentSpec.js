// import * as sinon from "sinon";
// import { DataOrientedComponent } from "../../../dist/commonjs/component/DataOrientedComponent";
// import { EntityObject } from "../../../dist/commonjs/core/entityObject/EntityObject";

describe("DataOrientedComponent", function(){
    var sandbox = null;
    var DataOrientedComponent = wd.DataOrientedComponent;
    var EntityObject = wd.EntityObject;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
    });
    afterEach(function(){
        sandbox.restore();
    });

    describe("addToObject", function(){
        beforeEach(function(){

        });

        it("component should not already be added to one entityObject", function(){
            var component = new DataOrientedComponent();

            component.addToObject(new EntityObject());

            expect(function(){
                component.addToObject(new EntityObject());
            }).toThrow("should not already be added to one entityObject");
        });
    });
});

