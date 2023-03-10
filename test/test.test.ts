import { GetData, ResultData } from "../src/index";
import findData from "../src/getData";
import fs from "fs";
import path from "path";
function WriteData(data: any) {
    fs.writeFileSync(path.join(__dirname, "res.json"), JSON.stringify(data));
}

describe("findData", () => {
    test("case 1", async () => {
        const url = "data";
        const data = await GetData(url);
        WriteData(data);
        expect(data.resVideos).not.toBeUndefined();
        expect(data.resVideos).not.toEqual([]);
        data.resVideos.forEach((video) => {
            expect(video.videoId).not.toBeUndefined();
            expect(video.thumbnails).toBeInstanceOf(Array);
            expect(video.time).not.toBeUndefined();
            expect(video.title).toBeInstanceOf(Array);
        });
        expect(data.refinements).not.toBeUndefined();
        expect(data.refinements).toBeInstanceOf(Array);
        
    });
});
describe("findData", () => {
    test("case 1", async () => {
        const url =
            "https://www.youtube.com/results?search_query=%D8%B0%D8%B0%D8%B0%D8%B0%D8%B0&sp=EgIIAQ%253D%253D";
        const { data } = await findData(url);
        // WriteData(data);
    });
});
