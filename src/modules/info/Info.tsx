import * as React from 'react';

import { Paper, Input, Button, Dialog } from '@material-ui/core';

// import { create } from '@api/user/user-client';


export class Info extends React.Component {
  constructor(props: any) {
    super(props);
  }

  state = {
    firstName: '',
    lastName: '',
  }

  handleTextChange = (key: string) => (event: any) => {
    this.setState({
      [key]: event.currentTarget.value
    });
  }

  /**
   * TESTING -- REMOVE LATER
   * Trying out the api for creating a user.
   */
  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // const user = {
    //   firstName: 'ROGER',
    //   lastName: 'BANISTER'
    // }

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    // const result = await create.apiCall(null, { user })


    // console.log('result is ', result);
  }

  public render() {

    return (
      <section className="about">
        <div className="container">
          <h2 className="heading-secondary">INFO SECTION</h2>
        </div>
        <Paper>

          <Dialog
            title="Dialog With Custom Width"
            open={true}
          >
            /*CREATE THE FORM UI HERE*/
            <form onSubmit={this.handleSubmit}>
              <Input
                placeholder="first name"
                onChange={this.handleTextChange('firstName')}
                value={this.state.firstName}
              />
              <Input
                placeholder="last name"
                onChange={this.handleTextChange('lastName')}
                value={this.state.lastName}
              />
              <Button variant="contained" type="submit"> Create user</Button>
            </form>
            <div>Field1</div>
            <div>Field2</div>
            <div>Field3</div>
          </Dialog>
        </Paper>
      </section>
    )
  }
} 
