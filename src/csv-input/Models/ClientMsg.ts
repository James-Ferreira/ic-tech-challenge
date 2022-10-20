import IClientMsg from "./IClientMsg.js";

/**
 * Implementation of the IClientMSG. Provides formatting methods to convert ClientMsg's to the appropriate
 * API format.
 */
export default class ClientMsg implements IClientMsg {
    readonly clientName;
    readonly state;
    readonly mobile;
    readonly message;

    public constructor(clientName: string, state: string, mobile: string, message: string) {
        this.clientName = clientName;
        this.state = state;
        this.mobile = mobile;
        this.message = message;
    }

    public toWebJetString(): string {
        return JSON.stringify({
            From: "FERREIRA",
            To: this.mobile,
            Text: this.message,
        });
    }

    public toTimestampedCSV(): string {
        return `${Date.now()}, ${this.clientName}, ${this.state}, ${this.mobile}, ${this.message}\n`;
    }
}