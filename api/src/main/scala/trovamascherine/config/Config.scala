package trovamascherine.config

import wiro.{Config => WiroConfig}

import trovamascherine.persistence.config.DBConfig

case class Config(
  wiro: WiroConfig,
  db: DBConfig,
  notifications: NotificationsConfig,
)

case class NotificationsConfig(
  twicePerDayMorningSchedule: String,
  twicePerDayAfternoonSchedule: String,
  thricePerWeekSchedule: String,
  oncePerWeekSchedule: String,
  welcomeSchedule: String,
  welcomeAttachmentPath: String,
  baseUrl: String,
  updateBaseUrl: String,
  settingsBaseUrl: String,
  from: String,
  subject: String,
)
