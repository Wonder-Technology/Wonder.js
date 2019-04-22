type abRelativePath = string;

type abDataArr = array((abRelativePath, Js.Typed_array.ArrayBuffer.t));

type manifest = {
  hashId: string,
  dependencyRelation:
    WonderCommonlib.ImmutableHashMapService.t(array(abRelativePath)),
};