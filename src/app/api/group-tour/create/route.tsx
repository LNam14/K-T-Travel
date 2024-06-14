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
            const tourResult: any = await excuteQuery("INSERT INTO group_tour (name, email, company, start_date, phone, address, number_of_people, note, location) VALUES (?,?,?,?,?,?,?,?,?);",
                [body["name"], body["email"], body["company"], body["start_date"], body["phone"], body["address"], body["number_of_people"], body["note"], body["location"]]);


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
