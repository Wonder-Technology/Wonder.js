let deleteValFromMap = [%bs.raw
  (key, map) => {|
    delete map[key];

    return map;
    |}
];

let fastGet = (key, map) => {
  let value = WonderCommonlib.MutableHashMapService.unsafeGet(key, map);

  (NullService.isInMap(value), value);
};