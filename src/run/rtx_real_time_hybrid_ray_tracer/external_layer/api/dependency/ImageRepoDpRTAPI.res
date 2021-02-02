

let set = ({getData}: ImageRepoDpRTType.imageRepo) =>
  ImageRepoDpRunAPI.set(
    (
      {
        getData: id => getData(id)->OptionSt.fromNullable,
      }: IImageRepoDp.imageRepo
    ),
  )
