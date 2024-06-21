import mysql from "serverless-mysql";
const dbDev = mysql({
  config: {
    host: "127.0.0.1",
    port: 3306,
    database: "k&t_travel",
    user: "root",
    password: "password",
  },
});

const dbProd = mysql({
  config: {
    host: "103.130.216.145",
    port: 3306,
    database: "viendaot_K-T-Travel",
    user: "viendaot_takatech",
    password: "Takatech@2024",
  },
});

// Main handler function
export default async function excuteQuery(query: any, values: any) {
  try {
    const results = await dbProd.query(query, values);
    await dbProd.end();
    return results;
  } catch (error: any) {
    return { status: false, error: error.message };
  }
}
