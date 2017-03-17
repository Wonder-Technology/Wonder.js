import { Entity } from "./Entity";
import { Queue } from "wonder-commonlib/dist/es2015/Queue";
import { singleton } from "../definition/typescript/decorator/singleton";
import { registerClass } from "../definition/typescript/decorator/registerClass";

@singleton(false)
@registerClass("EntitySystem")
export class EntitySystem {
    public static getInstance(): any { };

    private _freeIndiceQueue: Queue<number> = Queue.create<number>();
    private _generationArr: Array<number> = [];

    public addEntity(entity: Entity) {
        const MINIMUM_FREE_INDICES = 1024;
        var index: number = null,
            generation: number = null,
            freeIndiceQueue = this._freeIndiceQueue,
            generationArr = this._generationArr;

        if (freeIndiceQueue.getCount() > MINIMUM_FREE_INDICES) {
            index = freeIndiceQueue.pop();

            generation = generationArr[index];
        }
        else {
            generation = 0;
            generationArr.push(generation);

            index = generationArr.length - 1;
        }

        entity.buildUID(index, generation);
    }

    public hasEntity(entity: Entity) {
        return this._generationArr[entity.index] === entity.generation;
    }

    public disposeEntity(entity: Entity) {
        var index = entity.index;

        this._generationArr[index] += 1;
        this._freeIndiceQueue.push(index);
    }
}