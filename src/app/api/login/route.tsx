import excuteQuery from "../../db/db";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
    const requestHeaders = new Headers(req.headers);
    // const apiKey = requestHeaders.get("x-api-key");

    // if (apiKey !== API_KEY) {
    //   return new Response("Not found", { status: 404 });
    // }

    const { searchParams } = new URL(req.url);

    try {
        let body = null;
        const requestBody = await req.json().then((requestBody: any) => {
            body = requestBody;
        });

        if (body) {
            const user: unknown = await excuteQuery(
                "SELECT id, username, password FROM users WHERE username = ?",
                [body["username"]]
            );

            if (!user || (user as any).length === 0) {
                return new Response("Tài khoản không tồn tại", {
                    status: 401,
                });
            }

            const userObj: { [key: string]: any } = (user as any)[0];
            if (body["password"] !== userObj["password"]) {
                return new Response("Sai mật khẩu", {
                    status: 401,
                });
            }

            const userId = userObj["ID"];
            const token = jwt.sign(
                { userId },
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJjaGVjayI6dHJ1ZSwiYXV0aG9yaXphdGlvbiI6ImFkbWluIiwiaWF0IjoxNTk3NTQ2MzQyLCJleHAiOjE1OTc1NDc3ODJ9.Dqq0EEgF1xOYlnY8tVU31h9jkInztJVt8NEPEavG1ZU",
                {}
            );

            return new Response(JSON.stringify({ token }), { status: 200 });
        } else {
            return new Response("Error", { status: 401 });
        }
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
}