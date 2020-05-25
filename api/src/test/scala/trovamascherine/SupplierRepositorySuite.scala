package trovamascherine.test

import trovamascherine.repository.SupplierRepository

class SupplierRepositorySuite extends PersistenceTest {

  val supplierRepo = SupplierRepository.create(db)

  case class BoundingBox(
    minLongitude: Double,
    minLatitude: Double,
    maxLongitude: Double,
    maxLatitude: Double,
  )

  val astiBoundingBox = BoundingBox(
    minLongitude = 8.185844,
    minLatitude = 44.892804,
    maxLongitude = 8.226721,
    maxLatitude = 44.907730,
  )

  val expectedSuppliersFromAsti =
    Set("5fb3d631-1a87-4c7a-a96a-0c1878cb8602", "97ef6344-62c1-4e08-b9d6-8c028158ccdc")

  val turinBoundingBox = BoundingBox(
    minLongitude = 7.518940,
    minLatitude = 45.008020,
    maxLongitude = 7.845955,
    maxLatitude = 45.127078,
  )

  val expectedSuppliersFromTurin = Set(
    "4ea7d1cb-d597-40cb-9b2a-b5e27ef1aa7f",
    "a986dea9-77a3-464b-9613-4ce702bebd25",
  )

  val milanBoundingBox =
    BoundingBox(
      minLongitude = 9.102548,
      minLatitude = 45.438558,
      maxLongitude = 9.266056,
      maxLatitude = 45.493276,
    )

  val expectedSuppliersFromMilan = Set.empty[String]

  test(
    "Search by bounding box on Asti should return only enabled suppliers within the bounding box coordinates",
  ) {
    supplierRepo
      .listInBoundingBox(
        astiBoundingBox.minLongitude,
        astiBoundingBox.minLatitude,
        astiBoundingBox.maxLongitude,
        astiBoundingBox.maxLatitude,
      )
      .map(result => {
        assert(result.isRight)
        val supplierIds = result.right.get.map(_.supplier.id.toString).toSet
        assertEquals(supplierIds, expectedSuppliersFromAsti)
      })
  }

  test(
    "Search by bounding box on Turin should return only enabled suppliers within the bounding box coordinates",
  ) {
    supplierRepo
      .listInBoundingBox(
        turinBoundingBox.minLongitude,
        turinBoundingBox.minLatitude,
        turinBoundingBox.maxLongitude,
        turinBoundingBox.maxLatitude,
      )
      .map(result => {
        assert(result.isRight)
        val supplierIds = result.right.get.map(_.supplier.id.toString).toSet
        assertEquals(supplierIds, expectedSuppliersFromTurin)
      })
  }

  test(
    "Search by bounding box on Milan should return an empty set",
  ) {
    supplierRepo
      .listInBoundingBox(
        milanBoundingBox.minLongitude,
        milanBoundingBox.minLatitude,
        milanBoundingBox.maxLongitude,
        milanBoundingBox.maxLatitude,
      )
      .map(result => {
        assert(result.isRight)
        val supplierIds = result.right.get.map(_.supplier.id.toString).toSet
        assertEquals(supplierIds, expectedSuppliersFromMilan)
      })
  }
}
