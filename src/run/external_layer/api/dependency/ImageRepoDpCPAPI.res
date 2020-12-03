let set = ({getData}: ImageRepoDpCPType.imageRepo) =>
  ImageRepoDpRunAPI.set(
    (
      {
        getData: id => getData(id)->OptionSt.fromNullable,
      }: IImageRepoDp.imageRepo
    ),
  )
