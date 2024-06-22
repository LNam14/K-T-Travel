import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function GET() {
    try {
        // Get today's date and the start date of the past 7 days
        const today = moment().startOf('day');
        const endDate = today.clone(); // Today
        const startDate = today.clone().subtract(6, 'days'); // 7 days ago from today

        // Prepare an array to hold results
        const results: any = [];

        // Loop through each day in the past 7 days (starting from today and going backwards)
        let currentDate = endDate.clone();
        while (currentDate >= startDate) {
            const formattedDate = currentDate.format('YYYY-MM-DD');

            // Determine the day of the week name (Monday, Tuesday, etc.)
            const dayName = currentDate.format('dddd');

            // SQL query to get the count of bookings for each day and area
            const query = `
                SELECT 
                    area,
                    COUNT(*) as total
                FROM 
                    booking 
                WHERE 
                    date = ?
                GROUP BY 
                    area
            `;

            const values = [formattedDate];
            const result: any = await excuteQuery(query, values);

            // Initialize a map to store areas and their totals
            const areaTotals: any = {};

            // Populate areaTotals from result
            if (Array.isArray(result)) {
                result.forEach((row: any) => {
                    areaTotals[row.area] = row.total;
                });
            } else {
                console.error("Result is not an array:", result);
                // Handle the error appropriately, e.g., return an error response
                return new Response("Error: Result is not an array", { status: 500 });
            }

            // Prepare the tour array for the current day
            const tour: any = [];

            // Example areas to include in the final result
            ['Miền Bắc', 'Miền Trung', 'Miền Nam', 'Nước Ngoài'].forEach(area => {
                tour.push({
                    area: area,
                    total: areaTotals[area] || 0 // Default to 0 if area not found
                });
            });

            // Push result to array with day name
            results.push({
                day: dayName,
                tour: tour
            });

            // Move to the previous day
            currentDate.subtract(1, 'day');
        }

        return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 404 });
    }
}
