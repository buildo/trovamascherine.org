package trovamascherine
package config

import wiro.{Config => WiroConfig}

case class Config(
  wiro: WiroConfig,
  db: DBConfig,
  notifications: NotificationsConfig,
)

case class DBConfig(
  url: String,
  driver: String,
  profile: String,
  user: String,
  password: String,
  schema: String,
  clean: Boolean,
  validate: Boolean,
  migrate: Boolean,
  locations: String,
  schemaVersionTableName: String,
  codeGen: CodeGen,
  numThreads: Int,
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

case class CodeGen(outputDir: String, `package`: String)
