import excuteQuery from "@/app/db/db";

export async function DELETE(req: any) {
    try {
        const body = await req.json();

        if (!body || !body["id"]) {
            return new Response("Invalid request body", { status: 400 });
        }

        const tourId = body["id"];

        try {
            const tourResult = await excuteQuery("DELETE FROM booking WHERE id = ?", [tourId]);

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
