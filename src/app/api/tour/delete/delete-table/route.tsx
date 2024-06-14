import excuteQuery from "@/app/db/db";

export async function DELETE(req: any) {
    try {
        const body = await req.json();

        if (!body) {
            return new Response("Invalid request body", { status: 400 });
        }

        const tourId = body["id"];
        const nameTable = body["table"];
        try {
            const deleteTourData = async (id: string, tableName: string) => {
                const query = `DELETE FROM ${tableName} WHERE id = ?`;
                return await excuteQuery(query, [id]);
            };

            const tourResult = await deleteTourData(tourId, nameTable);

            return new Response(JSON.stringify({ result: tourResult }), { status: 200 });
        } catch (error) {
            console.error("Database operation failed", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    } catch (error) {
        console.error("Failed to parse request body", error);
        return new Response("Bad Request", { status: 400 });
    }
}
