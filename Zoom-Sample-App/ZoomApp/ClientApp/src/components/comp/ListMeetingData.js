import React from 'react';
import { Button, Card, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { MeetingCard } from './MeetingCard';


// const startHandler = (data) =>{
//     let meetingSDKElement = document.getElementById('meetingSDKElement');        
//     client.init({
//         debug: true,
//         zoomAppRoot: meetingSDKElement,
//         language: 'en-US',
//         customize: {
//             meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
//             toolbar: {
//             buttons: [
//                 {
//                 text: 'Custom Button',
//                 className: 'CustomButton',
//                 onClick: () => {
//                     console.log('custom button');
//                 }
//                 }
//             ]
//             }
//         }
//     });
//     let signature = getSignature(data.id,"1");  
// }

// const joinHandler = (data) =>{
//     let meetingSDKElement = document.getElementById('meetingSDKElement');        
//     client.init({
//         debug: true,
//         zoomAppRoot: meetingSDKElement,
//         language: 'en-US',
//         customize: {
//             meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
//             toolbar: {
//             buttons: [
//                 {
//                 text: 'Custom Button',
//                 className: 'CustomButton',
//                 onClick: () => {
//                     console.log('custom button');
//                 }
//                 }
//             ]
//             }
//         }
//     });
//     let signature = getSignature(data.id,"0");    
// }

// const getSignature = (meetingId, role) =>{
//     let signature="";
//     let password='7AXC6g';
//     //meetingId='99497634862';
//     const startMeeting = {
//         meetingId : meetingId,
//         role : role
//     };
//     axios.post(`api/v1/Meeting/GetStartMeetingData?meetingId=${meetingId}&role=${role}` )
//     .then((res)=>{      
//         console.log(res);
//         if(res.status==200)
//         {
//             signature = 'X3FFbTZLWnhUR3FWWDlhaDhERk5SQS45NDM1MTc2NDE4Ni4xNjQwNjgyMTkxMTk1LjAuZ080ak1LTWdxT0VsZXdMay83OTdaYXpIWmM3U1NsRzlrbFFiQWVERzZDST0=';//res.data;
//             const apiKey ='_qEm6KZxTGqVX9ah8DFNRA';
//             const meetingNumber = meetingId;
//             const userName ='App User';
//             const passWord =password;

//             const config = {
//                 apiKey : apiKey,
//                 meetingNumber : meetingNumber,
//                 userName : userName,
//                 passWord : passWord,
//                 signature : signature
//             };
//             initMeeting(config);
            
//         }
//         }).catch(err=>{
//         console.log(err);
//         alert("Something went wrong!");
//         });

//     return signature;
// }

// const initMeeting = (config)=>{
//     let meetingSDKElement = document.getElementById('meetingSDKElement');        
//     client.init({
//         debug: true,
//         zoomAppRoot: meetingSDKElement,
//         language: 'en-US',
//         customize: {
//           meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
//           toolbar: {
//             buttons: [
//               {
//                 text: 'Custom Button',
//                 className: 'CustomButton',
//                 onClick: () => {
//                   console.log('custom button');
//                 }
//               }
//             ]
//           }
//         }
//       });
//       client.join({
//         signature: config.signature,
//         apiKey: config.apiKey,
//         meetingNumber: config.meetingNumber,
//         userName: config.userName,
//         passWord: config.password,
//         success: (success) => {
//             console.log(success)
//         },
//         error: (error) => {
//             console.log(error)
//         }
//     });
// }

export const ListMeetingData = (props) =>{
    console.log(JSON.stringify(props.data)); 
    return(
        
            <Col>
            {props?.data?.length==0 ? <h4>No Meeting</h4>: ""}
            {props.data?.map((meeting,index)=>{
            return  <MeetingCard data={meeting} />
            })}
        </Col>   
    )
}
