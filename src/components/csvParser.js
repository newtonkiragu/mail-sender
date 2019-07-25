import { CSVReader } from 'react-papaparse';
import React, { Component } from 'react';
import {JsonTable} from "react-json-to-html";
import CheckData from "../handlers/checkData";
import EmailForm from "./emailForm";
import Button from "react-bootstrap/Button";

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
        // Here this is available and we can call this.setState (since it's bound in the constructor)
        this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
    }
    handleReadCSV = (data) => {
        // Here this is available and we can call this.setState (since it's bound in the constructor)
        this.setState({data: data, send_mail: true});
        // this.updateData(data);
        console.log(data);
    };

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err);
    };

    handleImportOffer = () => {
        this.fileInput.current.click();
    };



    render() {
        return (
            <div className="container-fluid">
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                    configOptions={{skipEmptyLines: true, header: true}}
                />
                <div className="row container-fluid">
                    <div className="col-md-6">
                        <EmailForm/>
                    </div>
                </div>
                <hr></hr>
                <div className="row container-fluid">
                    <div className="col col-md-6">
                        <Button onClick={this.handleImportOffer}>Import</Button>
                    </div>
                    <div className="col col-md-6">
                        <CheckData data={this.state.data} checkedData={true} />
                    </div>
                </div>
                <div className="container-fluid">
                    <JsonTable
                        json={this.state.data}
                    />
                </div>
            </div>
        );
    }
}

export default CsvParser;