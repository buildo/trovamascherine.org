import Dependencies._

inThisBuild(
  List(
    version := "1.0.0",
    scalaVersion := "2.12.11",
    resolvers ++= commonResolvers,
    testFrameworks += new TestFramework("munit.Framework"),
  ),
)

lazy val mergeStrategy = assemblyMergeStrategy in assembly := {
  case "log4j2.xml" =>
    MergeStrategy.first
  case PathList("application.conf") => MergeStrategy.concat
  case x =>
    val defaultStrategy = (assemblyMergeStrategy in assembly).value
    defaultStrategy(x)
}

lazy val core = project
  .settings(
    libraryDependencies ++= Seq(
      catsCore,
    ),
  )

lazy val persistence = project
  .settings(
    libraryDependencies ++= persistenceDependencies,
  )

lazy val fixtures = project
  .settings(
    libraryDependencies ++= Seq(
      pureconfig,
      postgresql,
      flyway,
    ),
    mergeStrategy,
  )
  .dependsOn(persistence)

lazy val root = project
  .in(file("."))
  .settings(
    libraryDependencies ++= rootDependencies,
    mergeStrategy,
  )
  .dependsOn(persistence)
  .dependsOn(fixtures % "test->test")
