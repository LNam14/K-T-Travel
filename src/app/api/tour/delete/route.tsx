import excuteQuery from "@/app/db/db";

export async function DELETE(req: any) {
    try {
        const body = await req.json();

        if (!body || !body["id"]) {
            return new Response("Invalid request body", { status: 400 });
        }

        const tourId = body["id"];

        try {
            const deleteTourData = async (id: string) => {
                await excuteQuery("DELETE FROM highlight WHERE id_tour = ?", [id]);
                await excuteQuery("DELETE FROM services_included WHERE id_tour = ?", [id]);
                await excuteQuery("DELETE FROM services_exclusions WHERE id_tour = ?", [id]);
                await excuteQuery("DELETE FROM image WHERE id_tour = ?", [id]);
                return await excuteQuery("DELETE FROM tour WHERE id = ?", [id]);
            };

            const tourResult = await deleteTourData(tourId);

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
