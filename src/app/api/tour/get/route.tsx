import excuteQuery from "@/app/db/db";

export async function GET(req: any) {
    try {
        const tourResult: any = await excuteQuery("SELECT * FROM tour ORDER BY id DESC", []);

        if (!tourResult || tourResult.length === 0) {
            return new Response("No tours found", { status: 404 });
        }

        for (let i = 0; i < tourResult.length; i++) {
            const tour = tourResult[i];
            const highlightResult: any = await excuteQuery("SELECT * FROM highlight WHERE id_tour = ?", [tour.id]);
            tourResult[i].highlights = highlightResult;
        }
        for (let i = 0; i < tourResult.length; i++) {
            const tour = tourResult[i];
            const highlightResult: any = await excuteQuery("SELECT * FROM services_exclusions WHERE id_tour = ?", [tour.id]);
            tourResult[i].services_exclusions = highlightResult;
        }
        for (let i = 0; i < tourResult.length; i++) {
            const tour = tourResult[i];
            const highlightResult: any = await excuteQuery("SELECT * FROM services_included WHERE id_tour = ?", [tour.id]);
            tourResult[i].services_included = highlightResult;
        }
        for (let i = 0; i < tourResult.length; i++) {
            const tour = tourResult[i];
            const highlightResult: any = await excuteQuery("SELECT * FROM image WHERE id_tour = ?", [tour.id]);
            tourResult[i].image = highlightResult;
        }

        return new Response(JSON.stringify(tourResult), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
}
