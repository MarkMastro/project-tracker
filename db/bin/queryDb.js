const { Client } = require('pg');
const dbConfig = require("../dbConfig")



const queryDb = async (query) => {
    try{
        const client = new Client({dbConfig});
        console.log("querying...")
        await client.connect();
        const results = await client.query(query);
        console.log("results....", results.rows);
        await client.end();
        return results.rows;
    } catch (err) {
        console.error(`Failed due to error: ${err}`);
        await client.end();
    }
    
}

export default queryDb;

