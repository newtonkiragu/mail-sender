import React from "react";
import Mailer from "./mailer";
import EmailTemplate from "../emailTemplate";
// import CsvParser from "../components/csvParser";
let mailer = new Mailer();
let emailTemplate = new EmailTemplate();


function CheckData(props) {
    let handleSendMail = (data) => {
        for(let i=1; i<data.length; i++){
            let emailBody = emailTemplate.createEmailTemplate(data[i]);
            let mailObj = {
                body: emailBody, email: data[i]["Email"],
                subject: emailTemplate.subject,
                from: emailTemplate.from
            };
            mailer.sendMail(mailObj);
        }
    };

    const checkedData = props.checkedData;
    if (checkedData) {
        return <button onClick={()=>handleSendMail(props.data.data)}>Send Mail</button>;

    }
    return <p>upload a file to proceed</p>;
}

export default CheckData;