import Builder from "../../common/Builder.js";
import ClientMsg from "./ClientMsg.js";
import IClientMsg from "./IClientMsg.js";

/**
 * Builder class for a ClientMsg, handles sanitisation and subsequent building of a ClientMsg
 */
export default class ClientMsgBuilder implements Builder<IClientMsg>{
    protected _clientName: string;
    protected _state: string;
    protected _mobile: string;
    protected _message: string;

    public constructor() {
        this._clientName = '';
        this._state = '';
        this._mobile = '';
        this._message = '';
        this.reset();
    }

    public build(): ClientMsg {
        return new ClientMsg(
            this._clientName,
            this._state,
            this._mobile,
            this._message
        )
    }

    public reset(): void {
        this._clientName = '';
        this._state = '';
        this._mobile = '';
        this._message = '';
    }

    /**
     * Set the client name for a ClientMsg
     * @param clientName
     */
    public clientName(clientName: string): ClientMsgBuilder {
        this._clientName = clientName.trim();
        return this;
    }

    /**
     * Set the state (e.g. QLD, NSW) for a ClientMsg
     * @param state
     */
    public state(state: string): ClientMsgBuilder {
        this._state = state.trim();
        return this;
    }

    /**
     * Set the mobile number for a ClientMsg
     * @param mobile
     */
    public mobile(mobile: string): ClientMsgBuilder {
        this._mobile = mobile.trim();
        return this;
    }

    /**
     * Set the text message for a ClientMsg
     * @param message
     */
    public message(message: string): ClientMsgBuilder {
        this._message = message.trim();
        return this;
    }


}