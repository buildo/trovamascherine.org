import sbt._

object Dependencies {
  val commonResolvers = List(
    Resolver.bintrayRepo("buildo", "maven"),
  )

  val V = new {
    val wiro = "0.6.13"
    val circe = "0.10.1"
    val slick = "3.2.1"
    val log4j = "2.8.2"
    val enumero = "1.3.0"
    val slickPg = "0.19.0"
    val munit = "0.7.5"
  }

  val wiro = "io.buildo" %% "wiro-http-server" % V.wiro
  val circeCore = "io.circe" %% "circe-core" % V.circe
  val circeGeneric = "io.circe" %% "circe-generic" % V.circe
  val circeGenericExtras = "io.circe" %% "circe-generic-extras" % V.circe
  val circeJavaTime = "io.buildo" %% "java-time-circe-codecs" % "0.2.0"
  val pureconfig = "com.github.pureconfig" %% "pureconfig" % "0.9.2"
  val akkaHttp = "com.typesafe.akka" %% "akka-http" % "10.1.5"
  val akkaHttpCirce = "de.heikoseeberger" %% "akka-http-circe" % "1.22.0"
  val catsCore = "org.typelevel" %% "cats-core" % "1.4.0"
  val slick = "com.typesafe.slick" %% "slick" % V.slick
  val slickCodegen = "com.typesafe.slick" %% "slick-codegen" % V.slick
  val slickHikari = "com.typesafe.slick" %% "slick-hikaricp" % V.slick
  val postgresql = "org.postgresql" % "postgresql" % "42.1.4"
  val flyway = "org.flywaydb" % "flyway-core" % "6.4.0"
  val enumero = "io.buildo" %% "enumero" % V.enumero
  val enumeroCirceSupport = "io.buildo" %% "enumero-circe-support" % V.enumero
  val mailo = "io.buildo" %% "mailo" % "12927e20"
  val cronish = "com.frograms" %% "cronish" % "0.1.5-FROGRAMS"
  val slickPg = "com.github.tminglei" %% "slick-pg" % V.slickPg
  val slickPgJts = "com.github.tminglei" %% "slick-pg_jts" % V.slickPg
  val munit = "org.scalameta" %% "munit" % V.munit

  val log4jDependencies = Seq(
    "org.apache.logging.log4j" %% "log4j-api-scala" % "11.0",
    "org.apache.logging.log4j" % "log4j-slf4j-impl" % V.log4j,
    "org.apache.logging.log4j" % "log4j-api" % V.log4j,
    "org.apache.logging.log4j" % "log4j-core" % V.log4j % Runtime,
  )

  val rootDependencies =
    List(
      wiro,
      circeCore,
      circeGeneric,
      circeGenericExtras,
      circeJavaTime,
      pureconfig,
      akkaHttp,
      akkaHttpCirce,
      slick,
      slickCodegen,
      slickHikari,
      slickPg,
      slickPgJts,
      postgresql,
      flyway,
      enumero,
      enumeroCirceSupport,
      cronish,
      mailo,
    ) ++ log4jDependencies ++ List(
      munit,
    ).map(_ % Test)

  val persistenceDependencies = List(
    pureconfig,
    slick,
    slickCodegen,
    slickHikari,
    slickPg,
    slickPgJts,
    postgresql,
    flyway,
    enumero,
    enumeroCirceSupport,
  ) ++ log4jDependencies
}
