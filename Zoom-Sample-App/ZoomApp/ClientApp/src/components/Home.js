import React, { Component,useState } from 'react';
import axios from 'axios';
import {ListMeetingData} from './comp/ListMeetingData';
import { Button, Col, Row } from 'reactstrap';
import { MeetingControl } from './comp/MeetingControl';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props){
    super(props);
    this.state = {
      userName:'',
      meetingData : '',
      loading:false,
      meetingDataLoaded:false
    };
  }
  componentDidMount() {
    this.loadUpcomingMeeting();
  }
  changeHandler =(e) =>{
    this.setState({[e.target.name]:e.target.value});
  }

  createMeeting =(e) =>{
    this.setState({loading:true});
    e.preventDefault();
    //alert("Create Meeting Called for: "+this.state.userName);
    const userDetails = {
      UserName : this.state.userName
    };
    axios.post("api/v1/Meeting/CreateMeeting",{...userDetails})
    .then((res)=>{
      
      console.log(res);
      if(res.status==200)
      {
        this.setState({meetingData:res.data,loading:false,meetingDataLoaded:true});
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went wrong!");
    })
  }
  loadUpcomingMeeting = (e) =>{
    axios.get("api/v1/Meeting/GetMeeting")
    .then((res)=>{
      console.log(res);
      if(res.status==200)
      {
        this.setState({meetingData:res.data.meetings,meetingDataLoaded:true});
      }
    })
  }
  render () {
    return (
      <div>
        <h3>Upcoming Meetings : </h3> 
        <Row xs="10">
        {this.state.meetingDataLoaded ? <ListMeetingData data={this.state.meetingData} />
        :'Loading...'}
        </Row>  
      </div>
    );
  }
}
