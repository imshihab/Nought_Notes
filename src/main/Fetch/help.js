import fs from "fs";
import readline from "readline";

async function readFirstThreeLines(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    const lines = [];
    for await (const line of rl) {
        lines.push(line);
        if (lines.length === 3) {
            rl.close();
            fileStream.destroy();
            break;
        }
    }
    return lines;
}

export { readFirstThreeLines }
