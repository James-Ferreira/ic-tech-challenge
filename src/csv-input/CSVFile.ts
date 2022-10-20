import * as fs from "fs";
import * as readline from "readline";

/**
 * Instance for opening and interacting with a specific file, expecting csv format.
 */
export default class CSVFile {
    public constructor(private readonly filepath: string, private readonly filename: string) {
    }

    /**
     * Read the associated file and return it as an unformatted string[], delimited by new lines.
     * ref: https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
     */
    public async readLines(): Promise<string[]> {
        // set-up file stream
        const fileStream = fs.createReadStream(`${this.filepath}/${this.filename}`);
        const fileInterface = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        })

        // read each line into the result array
        const result = new Array<string>();
        for await (const line of fileInterface) {
            result.push(line);
        }

        // clean up
        fileInterface.close();
        fileStream.close();
        return result;
    }

    /**
     * Write to the associated file
     * @param text text to write
     */
    public write(text: string) {
        const outputPath = `${this.filepath}/${this.filename}`;

        fs.appendFile(outputPath, text, (err) => {
            if (err) {
                console.warn('Error writing to file');
                throw err;
            }
        });
    }
}
