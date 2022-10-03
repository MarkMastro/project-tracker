// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const dbConfig = require("../dbConfig");
const {Client} = require("pg");

const client = new Client({dbConfig});

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const schemaFilenames = fs.readdirSync(`${__dirname}/../schema`);
  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`${__dirname}/../schema/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql);
  }
};

const runSeedFiles = async () => {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const seedFileNames = fs.readdirSync(`${__dirname}/../seeds`);

  for (const fn of seedFileNames) {
    const sql = fs.readFileSync(`${__dirname}/../seeds/${fn}`, "utf8");
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await client.query(sql);
  }
};

const runResetDB = async () => {
  try {
    console.log(`-> Connecting to PG on ${dbConfig.host} as ${dbConfig.user}...`);
    await client.connect();
    await runSchemaFiles();
    await runSeedFiles();
    client.end();
  } catch (err) {
    console.error(chalk.red(`Failed due to error: ${err}`));
    client.end();
  }
};
runResetDB();