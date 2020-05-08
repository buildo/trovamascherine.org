package trovamascherine

import trovamascherine.config.NotificationsConfig

import java.util.Base64
import mailo.Attachment
import akka.http.scaladsl.model.MediaTypes._
import java.nio.file.{Files, Paths}

class Attachments(
  config: NotificationsConfig,
) {
  val welcomeFile = Files.readAllBytes(Paths.get(config.welcomeAttachmentPath));
  val encodedWelcomeFile = Base64.getEncoder.encodeToString(welcomeFile);

  val welcome = Attachment(
    name = "trovamascherine.pdf",
    content = encodedWelcomeFile,
    `type` = `application/pdf`,
    transferEncoding = Some("base64"),
  )
}
