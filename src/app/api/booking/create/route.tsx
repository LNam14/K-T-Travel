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
            const tourResult: any = await excuteQuery("INSERT INTO booking (name, email, phone, address, adult, children, baby, newborn, note, id_tour) VALUES (?,?,?,?,?,?,?,?,?,?);",
                [body["name"], body["email"], body["phone"], body["address"], body["adult"], body["children"], body["baby"], body["newborn"], body["note"], body["id_tour"]]);

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
