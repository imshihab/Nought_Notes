import path from "path";
import fs from "fs";
import { readFirstThreeLines } from "./help";

export default async function FetchArchives(ArchivesFolderPath) {
    const folderNames = fs.readdirSync(ArchivesFolderPath).filter((folder) => {
        const folderPath = path.join(ArchivesFolderPath, folder);
        return fs.statSync(folderPath).isDirectory();
    });

    try {
        const result = await Promise.all(
            folderNames.map(async (folder) => {
                const folderPath = path.join(ArchivesFolderPath, folder);
                const files = fs.readdirSync(folderPath);

                let icon = null;
                let uid = null;
                const archives = [];

                files.forEach((file) => {
                    if (file.startsWith("icon_")) {
                        icon = file.replace("icon_", "");
                    }
                    if (file.startsWith("uid_")) {
                        uid = file.replace("uid_", "");
                    }
                });

                const mdFiles = files.filter((file) => file.endsWith(".md"));

                for (const note of mdFiles) {
                    const filePath = path.join(folderPath, note);
                    const firstLines = await readFirstThreeLines(filePath);
                    const title =
                        firstLines[0]?.split("title:")[1]?.trim() || "Untitled";
                    const body = firstLines[2]?.trim() || "";
                    const stats = fs.statSync(filePath);

                    archives.push({
                        folderName: folder,
                        icon,
                        uid,
                        title,
                        body,
                        created: stats.birthtime.toISOString(),
                        edited: stats.mtime.toISOString(),
                        noteID: note.replace(".md", ""),
                    });
                }

                return archives;
            })
        );

        return {
            status: "success",
            type: "Archives",
            message: "Archives fetched successfully",
            data: result.flat()
        };
    } catch (error) {
        return {
            status: "fail",
            message: `Error fetching Archives: ${error.message}`
        };
    }
}
