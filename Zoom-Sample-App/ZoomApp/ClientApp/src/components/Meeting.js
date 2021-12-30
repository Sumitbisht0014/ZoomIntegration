import React, { Component } from 'react';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const rootElement = document.getElementById(
    "ZoomEmbeddedApp"
  ); 
export class Meeting extends Component {
  static displayName = Meeting.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.joinMeeting = this.joinMeeting.bind(this);
  }

  joinMeeting() {
    const meetingConfig = {
        lang : '',
        apiKey : '_qEm6KZxTGqVX9ah8DFNRA',
        signature : 'X3FFbTZLWnhUR3FWWDlhaDhERk5SQS45NDM1MTc2NDE4Ni4xNjQwNjgyMTkxMTk1LjAuZ080ak1LTWdxT0VsZXdMay83OTdaYXpIWmM3U1NsRzlrbFFiQWVERzZDST0=',
        meetingNumber : '94351764186',
        userName : 'Demo APP',
        password : '7AXC6g',
        userEmail : ''
    };
    const zmClient = ZoomMtgEmbedded.createClient();
    const tmpPort = window.location.port === "" ? "" : ":" + window.location.port;
    const avLibUrl = window.location.protocol +    "//" +
    window.location.hostname +    tmpPort +    "/lib";
    zmClient
    .init({
      debug: true,
      zoomAppRoot: rootElement,
      assetPath: avLibUrl,
      language: meetingConfig.lang
    })
    .then((e) => {
      console.log("init success", e);
    })
    .catch((e) => {
      console.log("init error", e);
    });

  // WebSDK Embedded join
  zmClient
    .join({
      apiKey: meetingConfig.apiKey,
      signature: meetingConfig.signature,
      meetingNumber: meetingConfig.meetingNumber,
      userName: meetingConfig.userName,
      password: meetingConfig.password,
      userEmail: meetingConfig.userEmail
    })
    .then((e) => {
      console.log("join success", e);
    })
    .catch((e) => {
      console.log("join error", e);
    });
  }

  render() {
    return (
      <div>
        <input type="text" name="meetingNumber" placeholder='Meeting Number'/>
        <input type="text" name="password" placeholder='Meeting Password'/>
        <input type="text" name="username" placeholder='Display Name'/>

        <button className="btn btn-primary" onClick={this.joinMeeting}>Increment</button>

        <div>
            Meeting Control Here
            {/* <div id="ZoomEmbeddedApp">

            </div> */}
        </div>
      </div>
    );
  }
}
