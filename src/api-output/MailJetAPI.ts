import fetch from 'node-fetch';

/**
 * A class providing POST functionality to the MailJET SMS API.
 */
export default class MailJetAPI {
    private readonly API_TOKEN = '9d140afb7a4244668d7488fd5b429666';
    private readonly API_TOKEN_2 = '3a95b5ea01884149a8c42549856ff7ae';
    private readonly url = 'https://api.mailjet.com/v4/sms-send'

    public constructor() {
    }

    public async send(body: string): Promise<number> {
        const response = await fetch(this.url, {
            headers: {
                'authorization': `Bearer ${this.API_TOKEN_2}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: body,
        })
        const data = await response.json()
        console.log(data);
        return response.status;
    }
}
