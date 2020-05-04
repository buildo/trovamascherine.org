package trovamascherine

import controller._

class HelloWorldSpec extends SpecStyle {
  "The controller" should "return \"Hello world!\" when the helloworld method is invoked" in {
    val apiImpl = new HelloWorldControllerImpl()
    apiImpl
      .helloworld()
      .map(
        _.fold(
          error => fail(error.toString),
          result => result should ===("Hello world!"),
        ),
      )
  }
}
