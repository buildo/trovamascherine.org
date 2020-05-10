package trovamascherine.persistence.config

case class CodeGen(outputDir: String, `package`: String)

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
