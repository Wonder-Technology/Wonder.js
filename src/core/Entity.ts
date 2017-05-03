import { EntitySystem } from "./EntitySystem";
import { requireCheck, it } from "../definition/typescript/decorator/contract";
import { virtual } from "../definition/typescript/decorator/virtual";
import { expect } from "wonder-expect.js";

const ENTITY_INDEX_BITS = 22,
    ENTITY_INDEX_MASK = (1 << ENTITY_INDEX_BITS) - 1,
    ENTITY_GENERATION_BITS = 8,
    ENTITY_GENERATION_MASK = (1 << ENTITY_GENERATION_BITS) - 1;

export abstract class Entity {
    constructor() {
        EntitySystem.getInstance().addEntity(this);
    }

    get index() {
        return this.uid & ENTITY_INDEX_MASK;
    }

    get generation() {
        return (this.uid >> ENTITY_INDEX_BITS) & ENTITY_GENERATION_MASK;
    }

    public uid: number = null;

    private _tagList: Array<string> = [];

    @requireCheck(function(index: number, generation: number) {
        it("index should in the range", () => {
            expect(index).lessThan(1 << ENTITY_INDEX_BITS);
        });
        it("generation should in the range", () => {
            expect(generation).lessThan(1 << ENTITY_GENERATION_BITS);
        });
    })
    //todo need test
    public buildUID(index: number, generation: number) {
        this.uid = (generation << ENTITY_INDEX_BITS) + index;
    }

    @virtual
    public dispose() {
        EntitySystem.getInstance().disposeEntity(this);
    }

    public addTag(tag: string) {
        this._tagList.push(tag);
    }

    public removeTag(tag: string) {
        this._tagList.splice(this._tagList.indexOf(tag), 1);
    }

    public getTagList() {
        return this._tagList;
    }

    public hasTag(targetTag: string) {
        return this._tagList.indexOf(targetTag) > -1;
    }

    public containTag(targetTag: string) {
        for (let tag of this._tagList) {
            if (tag.indexOf(targetTag) > -1) {
                return true;
            }
        }

        return false;
    }
}