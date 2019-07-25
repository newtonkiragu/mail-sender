import React from "react";
import EmailTemplate from "../emailTemplate";
import Button from "react-bootstrap/Button";
let emailTemplate = new EmailTemplate();
const url='http://127.0.0.1:3002/create/email';
let request = new XMLHttpRequest();

function CheckData(props) {
    let handleSendMail = (data) => {
        for(let i=0; i<data.length; i++){
            let emailBody = emailTemplate.createEmailTemplate(data[i]);
            let mailObj = {
                text: emailBody,
                to: data[i]["Email"],
                subject: emailTemplate.subject,
                cc: emailTemplate.cc
            };
            // const other_params = {
            //     headers : { "content-type" : "application/json; charset=UTF-8"},
            //     body : JSON.stringify(mailObj),
            //     method : "post",
            //     mode : "no-cors"
            // };
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            request.send(JSON.stringify(mailObj));
            // fetch(url, other_params)
            //     .then(function(response) {
            //         console.log("sending", response)
            //         console.log(other_params.body)
            //         if (response.ok) {
            //             console.log("ni kama imefika")
            //             console.log("donediddone");
            //             return response.json();
            //         } else {
            //             throw new Error("Could not reach the API: " + response.statusText);
            //         }
            //     }).then(function(data) {
            //     console.log("me", data);
            // }).catch(function(error) {
            //     console.log("rejected: ", data);
            // });
        }
    };

    const checkedData = props.checkedData;
    if (checkedData) {
        return <Button onClick={()=>handleSendMail(props.data.data)}>Send Mail</Button>;

    }
    return <p>upload a file to proceed</p>;
}

export default CheckData;