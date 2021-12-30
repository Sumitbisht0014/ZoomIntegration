import React, { Component,useState } from 'react';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import axios from 'axios';
let client = ZoomMtgEmbedded.createClient(); 

export class MeetingControl extends React.Component{
    constructor(props){
        super(props); 
        this.state  = {
            meetingId: '',
            password:'',
            userName:'',
            displayName:'',
            meetingRole:''
        }
        //initMeeting();                
    }

    initMeeting = ()=>{
        let meetingSDKElement = document.getElementById('meetingSDKElement');        
        client.init({
            debug: true,
            zoomAppRoot: meetingSDKElement,
            language: 'en-US',
            customize: {
              meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
              toolbar: {
                buttons: [
                  {
                    text: 'Custom Button',
                    className: 'CustomButton',
                    onClick: () => {
                      console.log('custom button');
                    }
                  }
                ]
              }
            }
          });
    }

    start_meeting = () =>{
        const signature ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Il9xRW02S1p4VEdxVlg5YWg4REZOUkEiLCJleHAiOjE2NDA3NTU1ODYsImlhdCI6MTY0MDY2OTE4N30.hTiOn5fk8Sfh0OLPRhvZfmouT46UT0mXTvm5fb0fWQk';
        const apiKey ='_qEm6KZxTGqVX9ah8DFNRA';
        const meetingNumber ='99040037253';
        const userName ='App User';
        const passWord ='d5TD6x';
        //this.initMeeting();
        client.join({
            signature: signature,
            apiKey: apiKey,
            meetingNumber: meetingNumber,
            userName: userName,
            passWord: passWord,
            success: (success) => {
                console.log(success)
            },
            error: (error) => {
                console.log(error)
            }
        });
        alert(this.state.meetingId);
    }
    join_meeting = () =>{
        //this.initMeeting();
        alert(this.state.meetingId);
    }
    getSignature = (meetingId, role) =>{
        const meetingRequest={
            MeetingId : meetingId,
            Role : role
        };
        axios.Post("api/v1/Meeting/GetStartMeetingData",{...meetingRequest})
        .then((res)=>{      
            console.log(res);
            if(res.status==200)
            {
                //this.setState({meetingData:res.data,loading:false,meetingCreated:true});
            }
            }).catch(err=>{
            console.log(err);
            alert("Something went wrong!");
            })
    }
    changeHandler =(e) =>{
        this.setState({[e.target.name]:e.target.value});
        alert(this.state.meetingRole);
    }
      
    render(){
        var options = [
            { value: '0', label: 'Attendee' },
            { value: '1', label: 'Host' },
            { value: '5', label: 'Assistant' }
            ];

        return(
            <div>
                <div id="meetingSDKElement">
                    Meeting Here
                </div>
                Data : {this.props.name}
               <div className='navbar'>
                <form className="navbar-form navbar-right" id="meeting_form">
                        <div className="form-group">
                            <input type="text" onChange={this.changeHandler} name="displayName" id="displayName" maxLength="100" placeholder="Name" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={this.changeHandler} name="meetingId" id="meetingId" maxLength="200" style={{width: '150px'}} placeholder="Meeting Number" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={this.changeHandler} name="password" id="password"  style={{width: '150px'}} maxLength="32" placeholder="Meeting Password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" onChange={this.changeHandler} name="userName" id="userName" style={{width: '150px'}} maxLength="32" placeholder="Email option" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <select name='meetingRole' value={this.state.meetingRole} onChange={this.changeHandler}>
                                <option value="0">Attendee</option>
                                <option value="1">Host</option>
                                <option value="5">Assistant</option>
                            </select>
                            {/* <select id="meeting_role" className="sdk-select">
                                <option value="0">Attendee</option>
                                <option value="1">Host</option>
                                <option value="5">Assistant</option>
                            </select> */}
                        </div>
                        <div className="form-group">
                            <select id="meeting_china" className="sdk-select">
                                <option value="0">Global</option>
                                <option value="1">China</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select id="meeting_lang" className="sdk-select">
                                <option value="en-US">English</option>
                                <option value="de-DE">German Deutsch</option>
                                <option value="es-ES">Spanish Español</option>
                                <option value="fr-FR">French Français</option>
                                <option value="jp-JP">Japanese 日本語</option>
                                <option value="pt-PT">Portuguese Portuguese</option>
                                <option value="ru-RU">Russian Русский</option>
                                <option value="zh-CN">Chinese 简体中文</option>
                                <option value="zh-TW">Chinese 繁体中文</option>
                                <option value="ko-KO">Korean 한국어</option>
                                <option value="vi-VN">Vietnamese Tiếng Việt</option>
                                <option value="it-IT">Italian italiano</option>
                            </select>
                        </div>
                        <input type="hidden" value="" id="copy_link_value"/>
                        <button onClick={this.start_meeting}>Start Meeting</button>
                        <button onClick={this.join_meeting}>Join Meeting</button>
                    </form>
               </div>
            </div>
        )
    }
}

// export const MeetingControl = (props) =>{
//     return(
//         <div>
//             Meeting Control Here
//             <div id="meetingSDKElement">
//                 Meeting Here
//             </div>
//             
//         </div>
//     )
// }
