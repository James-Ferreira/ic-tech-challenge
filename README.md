# integratedCAPITAL SMS Challenge
Please find the challenge description in 'Challenge-Prompt.pdf'

The implemented solution identifies two main problems, the first being processing a csv file
and the second being sending this processed to an external API.

Within the time constraints, the chosen implementation focuses on simplicity and modularity.
This would facilitate future enhancement to easily extend the process into a generic API wrapper, capable
of reading input messages from a variety of formats (csv, JSON, XML) and outputting to a variety of
APIs.

Currently, an example.csv is read in from `/test/input.csv` and the audit logs are outputted to `/test/audit.csv`

Please note: I cannot locate a free testing API endpoint for MailJet, and despite having followed the guide on access tokens;
the WebJet service will only return STATUS 400 for no account.

### 
The project may be executed in ts-node or via the following:
`npm i;npm run build; npm run start`

### Assumptions & Notes
- 'a segment of customer data' refers to the 'text message' csv value
- a misformatted csv line is not processed, but raised in an error message.
  - These illegal values are *not* sent to the API, and thus is not outputted as a 'failed send'
- a timestamp of failed sends have been included in the formatting of the output.csv file


### Future Work
- integrate ts-jest testing framework
- integrate a formal logging library
- further sanitise inputs using regex to ensure compliance with API standards
