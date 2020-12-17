let buildDirectionLightRepoWithOneDirectionLight = sandbox => {
  let light = 0->Obj.magic

  let color = (0.5, 1., 0.5)
  let intensity = 0.5
  let direction = (0.0, 0.5, 2.5)

  (
    SceneGraphRepoDependencyTool.buildDirectionLightRepo(
      ~sandbox,
      ~getAllLights=_ => [light],
      ~getColor=light => color,
      ~getIntensity=light => intensity,
      ~getDirection=light => direction,
      (),
    ),
    (light, (color, intensity, direction)),
  )
}

let buildDirectionLightRepoWithTwoDirectionLights = sandbox => {
  let light1 = 0->Obj.magic
  let light2 = 1->Obj.magic

  let color1 = (0.5, 1., 0.5)
  let intensity1 = 0.5
  let direction1 = (0.0, 0.5, 2.5)

  let color2 = (0.5, 1.5, 0.5)
  let intensity2 = 1.5
  let direction2 = (1.0, 2.5, 4.5)

  (
    SceneGraphRepoDependencyTool.buildDirectionLightRepo(
      ~sandbox,
      ~getAllLights=_ => [light1, light2],
      ~getColor=light =>
        switch light {
        | light when light == light1 => color1
        | light when light == light2 => color2
        },
      ~getIntensity=light =>
        switch light {
        | light when light == light1 => intensity1
        | light when light == light2 => intensity2
        },
      ~getDirection=light =>
        switch light {
        | light when light == light1 => direction1
        | light when light == light2 => direction2
        },
      (),
    ),
    ((light1, light2), ((color1, intensity1, direction1), (color2, intensity2, direction2))),
  )
}
