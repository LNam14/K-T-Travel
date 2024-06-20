import excuteQuery from "../../db/db";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
export async function POST(req: any) {
    const requestHeaders = new Headers(req.headers);
    const { searchParams } = new URL(req.url);
    const secretKey: any = process.env.JWT_SECRET_KEY;

    try {
        let body = await req.json();

        if (body) {
            const user: unknown = await excuteQuery(
                "SELECT id, username, password, status FROM users WHERE username = ?",
                [body["username"]]
            );

            if (!user || (user as any).length === 0) {
                return new Response("Tài khoản không tồn tại", {
                    status: 401,
                });
            }

            const userObj: { [key: string]: any } = (user as any)[0];

            if (userObj["status"] !== 'active') {
                return new Response(userObj["status"] === 'lock' ? "Tài khoản bị khóa" : "Tài khoản không hoạt động", {
                    status: 403,
                });
            }

            const passwordMatch = await bcrypt.compare(body["password"], userObj["password"]);

            if (!passwordMatch) {
                return new Response("Sai mật khẩu", {
                    status: 401,
                });
            }

            const userId = userObj["id"];
            const token = jwt.sign(
                { userId, status: userObj["status"] },
                secretKey,
                { expiresIn: "1h" }
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
