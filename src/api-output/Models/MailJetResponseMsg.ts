import IMailJetResponseMsg from "./IMailJetResponseMsg.js";

/**
 * Implementation of IMailJetResponseMsg
 */
export default class MailJetResponseMsg implements IMailJetResponseMsg {
    public constructor(
        readonly failedIndices: number[],
        readonly successfulIndices: number[]
    ) {
    }
}