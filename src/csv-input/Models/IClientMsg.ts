export default interface IClientMsg {
    clientName: string,
    state: string,
    mobile: string,
    message: string,
    toWebJetString(): string;
    toTimestampedCSV(): string;
}