import excuteQuery from "@/app/db/db";
import moment from "moment";

export async function POST(req: any) {
    const requestHeaders = new Headers(req.headers);

    try {
        // Xử lý yêu cầu JSON
        const body = await req.json();

        if (!body) {
            return new Response("Error", { status: 401 });
        }
        const date = moment().format('YYYY-MM-DD');
        try {
            const tourResult: any = await excuteQuery("INSERT INTO booking (name, email, phone, address, adult, children, baby, newborn, note, id_tour, date, area) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);",
                [body["name"], body["email"], body["phone"], body["address"], body["adult"], body["children"], body["baby"], body["newborn"], body["note"], body["id_tour"], date, body["area"]]);

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
