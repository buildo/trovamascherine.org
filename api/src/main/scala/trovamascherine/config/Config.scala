package trovamascherine.config

import wiro.{Config => WiroConfig}

import trovamascherine.persistence.config.DBConfig

case class Config(
  wiro: WiroConfig,
  db: DBConfig,
  notifications: NotificationsConfig,
)

case class NotificationsConfig(
  schedule: String,
  afternoonSchedule: String,
  welcomeSchedule: String,
  welcomeAttachmentPath: String,
  url: String,
  from: String,
  subject: String,
)
