let deleteValFromMap = [%bs.raw
  (key, map) => {|
    delete map[key];

    return map;
    |}
];