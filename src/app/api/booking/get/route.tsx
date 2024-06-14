import excuteQuery from "@/app/db/db";

export async function GET() {
    try {
        const result: any = await excuteQuery("SELECT * FROM booking ORDER BY status ASC", {});
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 404 });
    }
}
