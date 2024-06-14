import excuteQuery from "@/app/db/db";

export async function POST(req: any) {
    try {
        const body = await req.json();

        if (!body) {
            return new Response("Error: Invalid body", { status: 401 });
        }

        try {

            const result: any = await excuteQuery("UPDATE tour SET title = ?, slot = ?, start_location = ?, end_location = ?, start_date = ?, end_date = ?, itinerary = ? WHERE id = ?",
                [body["title"], body["slot"], body["start_location"], body["end_location"], body["start_date"], body["end_date"], body["itinerary"], body["id"]]);


            if (Array.isArray(body["highlight"])) {
                for (const contentItem of body["highlight"]) {
                    if (contentItem) {
                        await excuteQuery("INSERT INTO highlight (id_tour, content) VALUES (?,?);",
                            [body["id_tour"], contentItem]);
                    }
                }
            } else if (body["highlight"]) {
                await excuteQuery("INSERT INTO highlight (id_tour, content) VALUES (?,?);",
                    [body["id_tour"], body["highlight"]]);
            }

            if (Array.isArray(body["service_included"])) {
                for (const contentItem of body["service_included"]) {
                    if (contentItem) {
                        await excuteQuery("INSERT INTO services_included (id_tour, content) VALUES (?,?);",
                            [body["id_tour"], contentItem]);
                    }
                }
            } else if (body["service_included"]) {
                await excuteQuery("INSERT INTO services_included (id_tour, content) VALUES (?,?);",
                    [body["id_tour"], body["service_included"]]);
            }

            if (Array.isArray(body["service_exclusions"])) {
                for (const contentItem of body["service_exclusions"]) {
                    if (contentItem) {
                        await excuteQuery("INSERT INTO services_exclusions (id_tour, content) VALUES (?,?);",
                            [body["id_tour"], contentItem]);
                    }
                }
            } else if (body["service_exclusions"]) {
                await excuteQuery("INSERT INTO services_exclusions (id_tour, content) VALUES (?,?);",
                    [body["id_tour"], body["service_exclusions"]]);
            }
            if (Array.isArray(body["image"])) {
                for (const contentItem of body["image"]) {
                    if (contentItem) {
                        await excuteQuery("INSERT INTO image (id_tour, image_url) VALUES (?,?);",
                            [body["id_tour"], contentItem]);
                    }
                }
            } else if (body["image"]) {
                await excuteQuery("INSERT INTO image (id_tour, image_url) VALUES (?,?);",
                    [body["id_tour"], body["image"]]);
            }

            return new Response(JSON.stringify({ result: result }), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Error executing query", { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Error processing request", { status: 500 });
    }
}
