import Dependencies._

inThisBuild(
  List(
    version := "1.0.0",
    scalaVersion := "2.12.11",
    resolvers ++= commonResolvers,
  ),
)

lazy val root = project
  .in(file("."))
  .settings(
    libraryDependencies ++= dependencies,
    assemblyMergeStrategy in assembly := {
      case PathList("application.conf") => MergeStrategy.concat
      case x =>
        val defaultStrategy = (assemblyMergeStrategy in assembly).value
        defaultStrategy(x)
    },
  )

lazy val core = project
  .settings(
    libraryDependencies ++= Seq(
      catsCore,
    ),
  )

lazy val fixtures = project
  .settings(
    libraryDependencies ++= Seq(
      pureconfig,
      postgresql,
      flyway,
    ),
  )
  .dependsOn(root)
