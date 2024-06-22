import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET() {
    try {
        const currentMonth = moment().format('MM');
        const currentYear = moment().format('YYYY');
        let previousMonth = moment().subtract(1, 'months').format('MM');
        let previousYear = moment().subtract(1, 'months').format('YYYY');

        if (currentMonth === '01') {
            previousMonth = '12';
            previousYear = moment().subtract(1, 'years').format('YYYY');
        }

        const query1 = `
            SELECT 
                area,
                COUNT(*) as total
            FROM 
                booking 
            WHERE 
                MONTH(date) = ? AND YEAR(date) = ?
            GROUP BY 
                area;
        `;

        const query2 = `
            SELECT 
                area,
                COUNT(*) as total
            FROM 
                booking 
            WHERE 
                MONTH(date) = ? AND YEAR(date) = ?
            GROUP BY 
                area;
        `;

        // Execute queries and handle potential errors
        const result1 = await excuteQuery(query1, [currentMonth, currentYear]);
        const result2 = await excuteQuery(query2, [previousMonth, previousYear]);

        // Check if results are not arrays as expected
        if (!Array.isArray(result1) || !Array.isArray(result2)) {
            console.error('Query did not return expected array.');
            console.error('Result 1:', result1);
            console.error('Result 2:', result2);
            return new Response("Internal Server Error", { status: 500 });
        }

        // Processing comparison data
        const comparisonData = result1.map((item1: any) => {
            const area = item1.area;
            const total_current = item1.total;
            const item2 = result2.find((item: any) => item.area === area);
            const total_previous = item2 ? item2.total : 0;
            const ratio = total_previous !== 0 ?
                ((total_current - total_previous) / total_previous) * 100 :
                (total_current > 0 ? 100 : 0);

            return {
                area,
                ratio
            };
        });

        return new Response(JSON.stringify(comparisonData), { status: 200 });
    } catch (error) {
        console.error('Error in GET function:', error);
        return new Response("Error", { status: 500 });
    }
}
