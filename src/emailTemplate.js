import * as settings from "./settings";

function EmailTemplate() {
    this.filePath="data.csv";
    this.subject="Status Email";
    this.from=settings.EMAIL_NAME;
}

EmailTemplate.prototype.createEmailTemplate = function (jsonObject) {
    console.log("hey");
    let isOnTrack,decision;
    if(jsonObject["First Recommendation"].toLowerCase()==="yes"){
        isOnTrack = `To give you an update on how you are doing in class, you are currently on track to move forward to the next module.`;
        decision= `we recommend that you spend the rest of the module working on keeping up with your attendance, IP submissions and quality, and your interpersonal dynamics. Your work has been good so far, and we want to encourage you to keep the momentum going`;
    }
    else{
        isOnTrack=`To give you an update on how you are doing in class, you are currently not on track to move forward to the next module but have an opportunity to improve before final decisions are made. 
    Please continue reading to understand why this is, and how you can improve.
    `;
        decision = `You will not be proceding to the next module because of ${jsonObject["reason (first recommendation)"]}`;
    }

    let name =  jsonObject["Student"].replace(","," ");
    let emailBody=`
  Hello ${name}

  ${isOnTrack}
      
  As you know, Moringa School looks at 3 major aspects of your learning in considering whether you proceed to the next module:
    Attendance and punctuality.
    Completion and quality of your IPs.
    Positive contributions to the classroom environment; are you working well with others, and interpersonal skills.
      
  As it stands:
    Your attendance out of 100 is ${jsonObject["Attendance"]}.
      
  As for your IPs:
    IP1 out of 31 you have ${jsonObject["IP1 /31"]}.
    IP2 out of 22 you have ${jsonObject["IP2 /22"]}.
    IP3 out of 22 you have ${jsonObject["IP3 /22"]}.
    IP4 out of 28 you have ${jsonObject["IP4 /28"]}.
      
  Based on the above scores.
  ${decision}
      
  Best,
  - Classroom Team.
  `
    return emailBody;

}

export default EmailTemplate;