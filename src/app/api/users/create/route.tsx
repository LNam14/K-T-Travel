import excuteQuery from "@/app/db/db";
import bcrypt from 'bcrypt';
export async function POST(req: any) {
    const requestHeaders = new Headers(req.headers);

    try {
        // Xử lý yêu cầu JSON
        const body = await req.json();

        if (!body) {
            return new Response("Error", { status: 401 });
        }
        const hashedPassword = await bcrypt.hash(body["password"], 10);
        try {
            const tourResult: any = await excuteQuery("INSERT INTO users (name, phone, email, username, password) VALUES (?,?,?,?,?);",
                [body["name"], body["phone"], body["email"], body["username"], hashedPassword]);

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
