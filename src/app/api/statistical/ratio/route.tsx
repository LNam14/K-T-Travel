import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET() {
    try {
        const currentMonth: any = moment().format('MM');
        const currentYear = moment().format('YYYY');

        const query1 = `
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

        const query2 = `
            SELECT 
                area,
                COUNT(*) as total
            FROM 
                booking 
            WHERE 
                MONTH(date) = ${currentMonth - 1} AND YEAR(date) = ${currentYear}
            GROUP BY 
                area;
        `;

        const result1: any = await excuteQuery(query1, {});
        const result2: any = await excuteQuery(query2, {});

        // Tính tỉ lệ tăng/giảm cho từng khu vực
        const comparisonData = result1.map((item1: any) => {
            const area = item1.area;
            const total_current = item1.total;
            const item2 = result2.find((item: any) => item.area === area);
            const total_previous = item2 ? item2.total : 0;
            const ratio = total_previous !== 0 ?
                ((total_current - total_previous) / total_previous) * 100 :
                (total_current > 0 ? 100 : 0); // Xử lý trường hợp chia cho 0

            return {
                area,
                ratio
            };
        });

        return new Response(JSON.stringify(comparisonData), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 404 });
    }
}
