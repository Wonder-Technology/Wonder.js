import { Hash } from "wonder-commonlib/dist/es2015/Hash";

export class AssetDatabaseData {
    public static container: Hash<any> = null;
    public static totalAssertCount: number = null;
    public static currentLoadedCount: number = null;
}
