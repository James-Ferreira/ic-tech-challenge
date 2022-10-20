import Builder from "../../common/Builder.js";
import IMailJetResponseMsg from "./IMailJetResponseMsg.js";
import MailJetResponseMsg from "./MailJetResponseMsg.js";

/**
 * Builder class for a MailJetResponseMsg
 */
export default class MailJetResponseMsgBuilder implements Builder<MailJetResponseMsg>{
    protected _successfulIndices: number[];
    protected _failedIndices: number[];

    public constructor() {
        this._successfulIndices = new Array<number>();
        this._failedIndices = new Array<number>();
        this.reset();
    }

    public build(): MailJetResponseMsg {
        return new MailJetResponseMsg(
            this._failedIndices,
            this._successfulIndices,
        )
    }

    public reset(): void {
        this._successfulIndices = new Array<number>();
        this._failedIndices = new Array<number>();
    }

    /**
     * Pushes an index to the 'successfulIndices' array
     * @param index
     */
    public pushSuccessfulIndices(index: number): MailJetResponseMsgBuilder {
        this._successfulIndices.push(index);
        return this;
    }

    /**
     * Pushes an index to the 'failedIndices' array
     * @param index
     */
    public pushFailedIndices(index: number): MailJetResponseMsgBuilder {
        this._failedIndices.push(index);
        return this;
    }
}
