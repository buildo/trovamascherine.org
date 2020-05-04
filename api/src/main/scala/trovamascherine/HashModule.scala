package trovamascherine

import java.security.MessageDigest

trait HashModule {
  private lazy val random =
    new scala.util.Random(new java.security.SecureRandom())
  private def sha1 = MessageDigest.getInstance("SHA-1")
  private def sha512 = MessageDigest.getInstance("SHA-512")
  private def md5 = MessageDigest.getInstance("MD5")

  private def randomString(alphabet: String)(n: Int): String =
    Stream
      .continually(random.nextInt(alphabet.size))
      .map(alphabet)
      .take(n)
      .mkString

  def randomAlphanumericString(n: Int) =
    randomString(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    )(n)

  def randomToken =
    randomAlphanumericString(32)

  def randomUrl =
    randomAlphanumericString(42)

  def saltAndHash(password: String, salt: String) =
    sha512.digest((password + salt).getBytes).map("%02x".format(_)).mkString

  def saltAndHashSHA1(password: String, salt: String) = // deprecated
    sha1.digest((password + salt).getBytes).map("%02x".format(_)).mkString

  def hash(s: String) =
    sha512.digest(s.getBytes).map("%02x".format(_)).mkString

  def hashWithSha1(s: String) =
    sha1.digest(s.getBytes).map("%02x".format(_)).mkString

  def hashWithMd5(s: String) =
    md5.digest(s.getBytes).map("%02x".format(_)).mkString

}
