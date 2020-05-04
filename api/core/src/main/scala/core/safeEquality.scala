package trovamascherine.core
import java.time.{Duration, Instant, LocalDate, LocalDateTime, LocalTime, Period}

object safeEquality extends cats.syntax.EqSyntax {

  // Eq instances for basic types (forwarded from cats.kernel)
  import cats.kernel.{instances, Eq, Order}

  implicit val intEq: Eq[Int] = instances.int.catsKernelStdOrderForInt
  implicit val floatEq: Eq[Float] = instances.float.catsKernelStdOrderForFloat
  implicit val doubleEq: Eq[Double] =
    instances.double.catsKernelStdOrderForDouble
  implicit val bigDecimalEq: Eq[BigDecimal] =
    instances.bigDecimal.catsKernelStdOrderForBigDecimal
  implicit val stringEq: Eq[String] =
    instances.string.catsKernelStdOrderForString
  implicit val charEq: Eq[Char] = instances.char.catsKernelStdOrderForChar
  implicit val booleanEq: Eq[Boolean] =
    instances.boolean.catsKernelStdOrderForBoolean
  implicit def listEq[A: Order]: Eq[List[A]] =
    instances.list.catsKernelStdOrderForList
  implicit def optionEq[A: Order]: Eq[Option[A]] =
    instances.option.catsKernelStdOrderForOption
  implicit def setEq[A]: Eq[Set[A]] =
    instances.set.catsKernelStdPartialOrderForSet
  implicit def mapEq[K, V: Eq]: Eq[Map[K, V]] =
    instances.map.catsKernelStdEqForMap
  implicit def localTimeEq: Eq[LocalTime] = Eq.fromUniversalEquals
  implicit def localDateEq: Eq[LocalDate] = Eq.fromUniversalEquals
  implicit def localDateTimeEq: Eq[LocalDateTime] = Eq.fromUniversalEquals
  implicit def instantEq: Eq[Instant] = Eq.fromUniversalEquals
  implicit def durationEq: Eq[Duration] = Eq.fromUniversalEquals
  implicit def periodEq: Eq[Period] = Eq.fromUniversalEquals

  // Eq instance for product types
  implicit def productEq[A <: Product]: Eq[A] = Eq.fromUniversalEquals
}
