import {Transform} from "./Transform";
import {updateLogicWorld, world} from "./LogicWorld";
import {getPosition} from "./TransformSystem";

//side effect
export var init = () => {
    var parent = Transform.of();
    parent.setPosition(1);

    var child = Transform.of();
    child.setPosition(2);


    var tra2 = Transform.of();
    tra2.setPosition(10);

// addChild(parent, child);
    parent.add(child);


    // var world = LogicWorld.of();

// var addTransformToWorld = addTransformTo(world);


    world.add(parent);
    world.add(tra2);


// addTransformToWorld(parent);
// addTransformToWorld(tra2);





// world.update(1);
    updateLogicWorld(world, 1);


    updateLogicWorld(world, 2);


// console.log(getPosition(parent), getPosition(child), getPosition(tra2));
    console.log(getPosition(parent.indexInArrayBuffer));
}
