import path from "path"
import fs from "fs"
import { readFirstThreeLines } from "./help";

export default async function FetchNotes(NotesFolderPath, folderName, uid) {
    const FolderNotesFolderPath = path.join(NotesFolderPath, folderName);
    const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);
    const PinnedNotesFolderPath = path.join(FolderNotesFolderPath, "PinnedNotes");

    if (!fs.existsSync(uidFolderPath)) {
        return {
            status: "fail",
            message: `${folderName} with id:[${uid}] folder not found`,
        };
    }

    if (!fs.existsSync(PinnedNotesFolderPath)) {
        fs.mkdirSync(PinnedNotesFolderPath);
    }

    try {
        const files = await fs.promises.readdir(FolderNotesFolderPath);
        const notes = files.filter((file) => file.endsWith(".md"));
        const noteDetails = await Promise.all(
            notes.map(async (note) => {
                const filePath = path.join(FolderNotesFolderPath, note);
                const firstLines = await readFirstThreeLines(filePath);
                const title =
                    firstLines[0].split("title:")[1].trim() || "Untitled";
                const body = firstLines[2]?.trim() || "No additional text";

                const stats = fs.statSync(filePath);
                const created = stats.birthtime.toISOString();
                const edited = stats.mtime.toISOString();

                const isPinned = fs.existsSync(path.join(PinnedNotesFolderPath, note));


                return {
                    noteID: note.replace(".md", ""),
                    folder: folderName,
                    uid: uid,
                    title: title,
                    body: body,
                    created: created,
                    edited: edited,
                    Pinned: isPinned
                };
            })
        );
        return {
            status: "success",
            type: "Notes",
            message: "Notes fetched successfully",
            data: noteDetails
        };
    } catch (error) {
        return {
            status: "fail",
            message: `Error fetching notes from ${folderName}: ${error.message}`
        };
    }
}
