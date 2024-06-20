import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET() {
    try {
        const currentMonth: any = moment().format('MM');
        const currentYear = moment().format('YYYY');

        const query = `
            SELECT 
                area,
                COUNT(*) as total
            FROM 
                booking 
            WHERE 
                MONTH(date) = ${currentMonth} AND YEAR(date) = ${currentYear}
            GROUP BY 
                area;
        `;

        const result: any = await excuteQuery(query, {});

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 404 });
    }
}
