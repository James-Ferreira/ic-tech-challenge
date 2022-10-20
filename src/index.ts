import SMSDirector from "./SMSDirector.js";
import CSVFile from "./csv-input/CSVFile.js";

// set-up
const inputDirectory ='./example';
const inputFileName ='input.csv';
const outputDirectory ='./example';
const outputFilename ='audit.csv';

// entry point
const director = new SMSDirector(inputDirectory, inputFileName, outputDirectory, outputFilename);
await director.executeEmergencyProcedure();