package trovamascherine.error

case class DBError(innerException: Throwable) extends Exception
