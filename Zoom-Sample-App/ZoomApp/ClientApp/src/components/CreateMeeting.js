import React, { Component } from 'react';
import { Alert, Button, Form, FormGroup, FormText, Input, Label, Toast, ToastBody, ToastHeader } from 'reactstrap';
import axios from 'axios';

export class CreateMeeting extends Component {
  static displayName = CreateMeeting.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0,
      userName:'',
      meetingData : '',
      loading:false,
      meetingCreated:false,
      alertColor:'',
      Alertvisible:false,
      alertMessage:'',
      
      topic:'',
      agenda:'',
      type:'',
      duration:'',
      password:''
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }
  createMeeting =(e) =>{
    this.setState({loading:true});
    e.preventDefault();
    //alert("Create Meeting Called for: "+this.state.userName);
    const userDetails = {
      topic : this.state.topic,
      agenda : this.state.agenda,
      type : this.state.type,
      duration : this.state.duration,
      password : this.state.password
    };
    axios.post("api/v1/Meeting/CreateMeeting",{...userDetails})
    .then((res)=>{      
      console.log(res);
      if(res.status==200)
      {

        this.setState(
          {
            meetingData:res.data,
            loading:false,
            meetingCreated:true,
            Alertvisible:true,
            alertMessage:'Meeting Created!'            
          },
          () => {window.setTimeout( ()=>
            {
              this.setState({Alertvisible:false}) ;
              this.props.history.push('/');
            },2000  )}
          );
      }
    }).catch(err=>{
      console.log(err);
      alert("Something went wrong!");
    })
  }
  changeHandler =(e) =>{
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    return (
      <div>
        <Alert color={this.state.alertColor} isOpen={this.state.Alertvisible} 
            toggle={(e) => this.setState({Alertvisible: false})}> {this.state.alertMessage} 
        </Alert>
        <Form>
        <FormGroup>
          <Label for="topic">
            Topic
          </Label>
          <Input id="topic"
            name="topic"
            placeholder="Enter Meeting Topic"
            type="text"
            onChange={this.changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="agenda">
            Agenda
          </Label>
          <Input id="agenda"
            name="agenda"
            placeholder="Enter Meeting Agenda"
            type="text"
            onChange={this.changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="type">
            Meeting Type
          </Label>
          <Input
            id="type"
            name="type"
            type="select" value={this.state.type} onChange={this.changeHandler}
          >
            <option value="1">Instant Meeting</option>
            <option value="2">Scheduled Meeting</option>
            <option value="3">Recurring Meeting (no fixed time)</option>
            <option value="8">Recurring Meeting (with fixed time)</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="duration">
            Duration
          </Label>
          <Input id="duration"
            name="duration"
            placeholder="Enter Meeting Duration(min)"
            type="text"
            onChange={this.changeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password
          </Label>
          <Input id="password"
            name="password"
            placeholder="Enter Meeting Password(not mandatory)"
            type="text"
            onChange={this.changeHandler}
          />
        </FormGroup>
        
        <Button onClick={this.createMeeting}>
          Submit
        </Button>
      </Form>
      </div>
        
    );
  }
}
