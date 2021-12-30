import axios from 'axios';
import React from 'react';
import { Button, Card, CardText, CardTitle, Col, Input, ListGroup, ListGroupItem, Row } from 'reactstrap';
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

const rootElement = document.getElementById(
    "ZoomEmbeddedApp"
  ); 


function serialiseData(obj){
    var keyOrderArr = ["name", "mn", "email", "pwd", "role", "lang", "signature", "china"];
    Array.intersect = function (){
        var result = new Array();
        var obj = {};
        for (var i = 0; i < arguments.length; i++){
            for (var j = 0; j < arguments[i].length; j++){
                var str = arguments[i][j];
                if (!obj[str]){
                    obj[str] = 1;
                }else{
                    obj[str]++;
                    if (obj[str] == arguments.length){
                        result.push(str);
                    }
                }
            }
        }
        return result;
    }
    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, "includes", {
          enumerable: false,
          value: function (obj) {
            var newArr = this.filter(function (el) {
              return el === obj;
            });
            return newArr.length > 0;
          },
        });
      }
    var tmpInterArr = Array.intersect(keyOrderArr, Object.keys(obj));
    var sortedObj = [];
    keyOrderArr.forEach(function (key) {
        if (tmpInterArr.includes(key)) {
            sortedObj.push([key, obj[key]]);
        }
    });
    Object.keys(obj)
      .sort()
      .forEach(function (key) {
        if (!tmpInterArr.includes(key)) {
          sortedObj.push([key, obj[key]]);
        }
      });
      var tmpSortResult = (function (sortedObj) {
        var str = [];
        for (var p in sortedObj) {
          if (typeof sortedObj[p][1] !== "undefined") {
            str.push(
              encodeURIComponent(sortedObj[p][0]) +
                "=" +
                encodeURIComponent(sortedObj[p][1])
            );
          }
        }
        return str.join("&");
      })(sortedObj);
      return tmpSortResult;
}
const joinMeeting = (meetingDetails,role,userName) =>{
    axios.get(`api/v1/Meeting/GetMeetingCreds?meetingId=${meetingDetails.id}&role=${role}`)
    .then((res)=>{
        const config ={...res.data};
        config["name"] = userName;
        config["lang"]="en-US";
        config["china"]="0";
        var joinUrl = "/cdn.html?" + serialiseData(config);
        console.log(joinUrl);
        window.open(joinUrl);
    });
}
export class MeetingCard extends React.Component{
    constructor(props){
        super(props); 
        this.state  = {
            cardData:props.data,
            userName:''
        }
        //initMeeting();                
    }
    changeHandler =(e) =>{
        this.setState({[e.target.name]:e.target.value});
      }

    joinINMeeting = (meetingDetails,role,userName) =>{
        if(userName=='')
        {
            alert('Username is required to start a meeting!');
            return null;
        }
        axios.get(`api/v1/Meeting/GetMeetingCreds?meetingId=${meetingDetails.id}&role=${role}`)
        .then((res)=>{
            const meetingConfig ={...res.data};
            meetingConfig["name"] = userName;
            meetingConfig["lang"]="en-US";
            meetingConfig["china"]="0";
            // var joinUrl = "/cdn.html?" + serialiseData(config);
            // console.log(joinUrl);
            // window.open(joinUrl);
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
            meetingNumber: meetingConfig.meetingId,
            userName: meetingConfig.name,
            password: meetingConfig.password,
            userEmail: meetingConfig.userEmail
            })
            .then((e) => {
            console.log("join success", e);
            })
            .catch((e) => {
            console.log("join error", e);
            });
        });
    }
    render(){
        return(
            <Card body
            inverse
            style={{
            backgroundColor: '#333',
            borderColor: '#333'
            }}>
            <CardTitle tag="h5">
                {this.state.cardData?.topic}
            </CardTitle>
            <div className="card-text">
                <Row>
                    <Col sm="8">Meeting Agenda : {this.state.cardData?.agenda}</Col>
                    <Col sm="4"><form><input type="text" name="userName" onChange={this.changeHandler} placeholder="Join as User" required/></form></Col>
                </Row>
            </div>
            <ListGroup>
                    {/* <ListGroupItem action href="#" tag="a" color="warning">
                        Meeting Id : {this.state.cardData.id}
                    </ListGroupItem> */}
                    <ListGroupItem action href="#" tag="a" color="warning">
                        Meeting Duration : {this.state.cardData.duration}
                    </ListGroupItem>                   
                    {/* <ListGroupItem action href="#" tag="a" color="warning">
                        Join URL : {this.state.cardData.join_url}
                    </ListGroupItem> */}
                    {/* <ListGroupItem action href="#" tag="a" color="warning">
                        Meeting Password : {this.state.cardData.password}
                    </ListGroupItem> */}
                    <ListGroupItem action href="#" tag="a" color="warning">
                        Start Time : {this.state.cardData.start_time}
                    </ListGroupItem>
                    <ListGroupItem action href="#" tag="a" color="warning">
                        Created At : {this.state.cardData.created_at}
                    </ListGroupItem>
                </ListGroup>
            <Row>
                <Col sm="2" className="offset-8" >
                <Button color="success" onClick={() => this.joinINMeeting(this.state.cardData,"1",this.state.userName)}>
                        Start Meeting
                    </Button>
                </Col>
                <Col sm="2" >
                    <Button color="success" onClick={() => this.joinINMeeting(this.state.cardData,"0",this.state.userName)}>
                        Join Meeting
                    </Button>
                </Col>
            </Row>
        </Card>
    )
    }
}
