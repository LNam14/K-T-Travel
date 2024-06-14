import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
    try {
        const body = await req.json();

        if (!body) {
            return new Response("Error: Invalid body", { status: 401 });
        }

        try {

            const result: any = await excuteQuery("UPDATE tour SET title = ?, slot = ?, start_location = ?, end_location = ?, start_date = ?, end_date = ?, itinerary = ? WHERE id = ?",
                [body["title"], body["slot"], body["start_location"], body["end_location"], body["start_date"], body["end_date"], body["itinerary"], body["id"]]);


            return new Response(JSON.stringify({ result: result }), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Error executing query", { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Error processing request", { status: 500 });
    }
}
