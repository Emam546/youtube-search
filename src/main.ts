import getData from "./getData";
import queryString from "querystring";
export type ReturnedSearch = {
    videoId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    title: string[];
    time?: string;
};
export type ResultData = {
    refinements: string[];
    resVideos: ReturnedSearch[];
};
export function parseData(data: any): ResultData {
    const searchVideos: any[] =
        data.contents.twoColumnSearchResultsRenderer.primaryContents
            .sectionListRenderer.contents[0].itemSectionRenderer.contents;
    const returnedData: ReturnedSearch[] = [];
    searchVideos.forEach((ele) => {
        if (!ele.videoRenderer) return;
        const videoId = ele.videoRenderer.videoId;
        const thumbnails = ele.videoRenderer.thumbnail.thumbnails;
        const title = (ele.videoRenderer.title.runs as any[]).map(
            ({ text }) => text
        );
        const time = ele.videoRenderer.lengthText?.simpleText;
        returnedData.push({
            videoId,
            thumbnails,
            title,
            time,
        });
    });
    return {
        resVideos: returnedData,
        refinements: data.refinements || [],
    };
}
export function MergeUrl(query: string) {
    return `https://www.youtube.com/results?${query}`;
}
export default async (search: string, options?: Record<string, string>) => {
    const str=queryString.stringify({
        search_query: search,
        ...options,
    });
    const { res, data } = await getData(MergeUrl(str));
    if (res.status != 200) throw new Error("Connection Error");
    return parseData(data);
};
