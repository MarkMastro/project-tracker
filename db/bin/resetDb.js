// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const dbConfig = require("../dbConfig");
const {Client} = require("pg");

const db = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync("../schema");

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`../schema/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const seedFileNames = fs.readdirSync("../seeds");

  for (const fn of seedFileNames) {
    const sql = fs.readFileSync(`../seeds/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
console.log("dbconfig", dbConfig)

    console.log(`-> Connecting to PG on ${dbConfig.host} as ${dbConfig.user}...`);
    await db.connect();
    await runSchemaFiles();
    await runSeedFiles();
    db.end();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    db.end();
  }
};
runResetDB();