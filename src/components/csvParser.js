import { CSVReader } from 'react-papaparse';
import React, { Component } from 'react';
// import Mailer from '../handlers/mailer';
// import EmailTemplate from '../emailTemplate';
import {JsonTable} from "react-json-to-html";
import CheckData from "../handlers/checkData";

// let mailer = new Mailer();
// let emailTemplate = new EmailTemplate();

class CsvParser extends Component{
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.updateData = this.updateData.bind(this);
        this.state = {
            send_mail: false,
        }
    }

    updateData(result) {
        const data = result.data;
        console.log("done");
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
    }
    handleReadCSV = (data) => {
        // Here this is available and we can call this.setState (since it's binded in the constructor)
        this.setState({data: data, send_mail: true});
        // this.updateData(data);
        console.log(data);
        // for(let i=0; i<data.length; i++){
        //     let emailBody = emailTemplate.createEmailTemplate(data[i]);
        //     let mailObj = {
        //         body: emailBody, email: data[i]["Email"],
        //         subject: emailTemplate.subject,
        //         from: emailTemplate.from
        //     };
        //     mailer.sendMail(mailObj);
        // }
    };

    // handleSendMail = (data) => {
    //     for(let i=0; i<data.length; i++){
    //         let emailBody = emailTemplate.createEmailTemplate(data[i]);
    //         let mailObj = {
    //             body: emailBody, email: data[i]["Email"],
    //             subject: emailTemplate.subject,
    //             from: emailTemplate.from
    //         };
    //         mailer.sendMail(mailObj);
    //     }
    // }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
    };



    render() {
        return (
            <div>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                    configOptions={{skipEmptyLines: true, header: true}}
                />

                <div className="row">
                    <div className="col col-md-2">
                        <button onClick={this.handleImportOffer}>Import</button>
                    </div>
                    <div className="col col-md-10">
                        <JsonTable
                            json={this.state.data}
                        />
                        <CheckData data={this.state.data} checkedData={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CsvParser;