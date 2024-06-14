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
            const tourResult: any = await excuteQuery("INSERT INTO tour (title, tour_option, area ,slot, start_date, end_date, start_location, end_location, itinerary) VALUES (?,?,?,?,?,?,?,?,?);",
                [body["title"], body["tour_option"], body["area"], body["slot"], body["start_date"], body["end_date"], body["start_location"], body["end_location"], body["itinerary"]]);

            const newTourId = tourResult.insertId;

            if (Array.isArray(body["highlight"])) {
                for (const contentItem of body["highlight"]) {
                    await excuteQuery("INSERT INTO highlight (id_tour, content) VALUES (?,?);",
                        [newTourId, contentItem]);
                }
            } else {
                await excuteQuery("INSERT INTO highlight (id_tour, content) VALUES (?,?);",
                    [newTourId, body["highlight"]]);
            }
            if (Array.isArray(body["service_included"])) {
                for (const contentItem of body["service_included"]) {
                    await excuteQuery("INSERT INTO services_included (id_tour, content) VALUES (?,?);",
                        [newTourId, contentItem]);
                }
            } else {
                await excuteQuery("INSERT INTO services_included (id_tour, content) VALUES (?,?);",
                    [newTourId, body["service_included"]]);
            }
            if (Array.isArray(body["service_exclusions"])) {
                for (const contentItem of body["service_exclusions"]) {
                    await excuteQuery("INSERT INTO services_exclusions (id_tour, content) VALUES (?,?);",
                        [newTourId, contentItem]);
                }
            } else {
                await excuteQuery("INSERT INTO services_exclusions (id_tour, content) VALUES (?,?);",
                    [newTourId, body["service_exclusions"]]);
            }
            if (Array.isArray(body["images"])) {
                for (const imageItem of body["images"]) {
                    await excuteQuery("INSERT INTO image (id_tour, image_url) VALUES (?,?);",
                        [newTourId, imageItem]);
                }
            } else {
                await excuteQuery("INSERT INTO image (id_tour, image_url) VALUES (?,?);",
                    [newTourId, body["images"]]);
            }

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
