import ClientMsgBuilder from "./csv-input/Models/ClientMsgBuilder.js";
import CSVFile from "./csv-input/CSVFile.js";
import MailJetAPI from "./api-output/MailJetAPI.js";
import MailJetResponseMsgBuilder from "./api-output/Models/MailJetResponseMsgBuilder.js";
import ClientMsg from "./csv-input/Models/ClientMsg.js";
import IClientMsg from "./csv-input/Models/IClientMsg.js";
import MailJetResponseMsg from "./api-output/Models/MailJetResponseMsg.js";

/**
 * Main direction service, co-ordinating interaction between parsing data from an input (currently .csv) and
 * sending this data to an output (currently the MailJetSMS API).
 */
export default class SMSDirector {

    public constructor(
        private readonly inputDirectory: string,
        private readonly inputFilename: string,
        private readonly outputDirectory: string,
        private readonly outputFilename: string
    ) {
    }

    /**
     * Entry-point for the emergecy contact procedure outlined in Challenge-Prompt.pdf. Handles processing input data
     * from a .csv and POSTing the data to an SMS API.
     */
    public async executeEmergencyProcedure() {
        // Open a .csv file with the following as the expected format [client name, state, mobile number, text message]
        const inputFile = new CSVFile(this.inputDirectory, this.inputFilename)

        // Parse the csv into ClientMsg
        const clientMsgs = await this.CSVToClientMsg(inputFile);

        // Send the ClientMsg to the SMSService
        const reply = await this.sendSMSBatch(clientMsgs);

        // Write successes/failures to a file
        const auditFile = new CSVFile(this.outputDirectory, this.outputFilename)

        console.log(`\nThere were [${reply.failedIndices.length}] failed sends, and [${reply.successfulIndices.length}] successful sends`)
        for(const index of reply.failedIndices) {
            auditFile.write(clientMsgs[index].toTimestampedCSV());
        }
    }

    /**
     * Parses a csv file, line by line, and attemps to process each line into a ClientMsg instance.
     * An error is logged if the csv is of an unexpected/incompatible format.
     */
    private async CSVToClientMsg(csvFile: CSVFile): Promise<ClientMsg[]>{
        const result = new Array<ClientMsg>();
        const builder = new ClientMsgBuilder();

        // split the csv line to access each value, and build a ClientMsg
        const lines = await csvFile.readLines();
        for (const [index, line] of lines.entries()) {
            const split = line.split(',');
            if (split.length != 4) {
                console.error(`Unexpected format on line ${index}: ${line}, skipping line`)
                continue;
            }
            result.push(
                builder
                    .clientName(split[0])
                    .state(split[1])
                    .mobile(split[2])
                    .message(split[3])
                    .build()
            )
            
            // clean-up
            builder.reset();
        }
        return result;
    }

    /**
     * Sends a batch of SMSs (ClientMsgs) to the MailJetAPI
     * @param batch
     */
    public async sendSMSBatch(batch: IClientMsg[]): Promise<MailJetResponseMsg> {
        const smsAPI = new MailJetAPI();
        const replyBuilder = new MailJetResponseMsgBuilder();

        // send each ClientMsg to the API, and track which indices succeed or fail
        for (const [index, msg] of batch.entries()) {
            const status = await smsAPI.send(msg.toWebJetString());
            console.log(`ClientMsg: ${msg.toWebJetString()} | POST Status: ${status}`)

            if(status == 200) replyBuilder.pushSuccessfulIndices(index)
            else replyBuilder.pushFailedIndices(index);
        }

        return replyBuilder.build();
    };
}

