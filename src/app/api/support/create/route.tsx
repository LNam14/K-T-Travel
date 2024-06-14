import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
    const requestHeaders = new Headers(req.headers);

    try {
        // Xử lý yêu cầu JSON
        const body = await req.json();

        if (!body) {
            return new Response("Error", { status: 401 });
        }

        try {
            const tourResult: any = await excuteQuery("INSERT INTO support (phone, title_tour) VALUES (?,?);",
                [body["phone"], body["title_tour"]]);

            return new Response(JSON.stringify({ result: tourResult }), { status: 200 });
        } catch (error) {
            console.log(error);
            return new Response("Error", { status: 500 });
        }
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
}
