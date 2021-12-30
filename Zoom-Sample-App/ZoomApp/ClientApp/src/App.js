import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Meeting } from './components/Meeting';
import { Counter } from './components/Counter';
import { CreateMeeting } from './components/CreateMeeting';

import './custom.css'
import { MeetingControl } from './components/comp/MeetingControl';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/meeting' component={Meeting} />
        <Route path='/create-meeting' component={CreateMeeting} />
        <Route path='/start-meeting' component={MeetingControl} />
      </Layout>
    );
  }
}
