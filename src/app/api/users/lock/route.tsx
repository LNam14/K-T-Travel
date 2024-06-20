import executeQuery from "@/app/db/db";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
    try {
        const body = await req.json();

        if (!body || !body.id || !body.status) {
            return new Response("Error: Invalid request body", { status: 400 });
        }

        let newStatus = body.status === 'lock' ? 'active' : 'lock';

        const result: any = await executeQuery(
            "UPDATE users SET status = ? WHERE id = ?",
            [newStatus, body.id]
        );

        const userId = body.id;

        const token = generateToken(userId, newStatus);

        return new Response(JSON.stringify({ result: result, token }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Error processing request", { status: 500 });
    }
}

function generateToken(userId: number, status: string) {
    const secretKey: any = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
        { userId, status },
        secretKey,
        { expiresIn: "1h" }
    );
    return token;
}
