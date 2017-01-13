import React, { PropTypes, Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { Status } from '../collection.js';
import NovaForm from "meteor/nova:forms";
import Users from 'meteor/nova:users'

class StatusField extends Component {


  constructor(props) {
    super(props);
    this.state = {
      content: '',
      visible: '1'
    };
  }

  contentHandle(event) {
    this.setState({
      content: event.target.value
    })
  }

  changeSelect(event) {
    this.setState({
      visible: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.content.length) {
      data = {
        content: this.state.content,
        visible: this.state.visible,
      };
      
      Meteor.call('status.insert', data, (err, result) => {
        if(err){
          // ToDo: handle errors
        }

        this.state = {
          content: '',
          visible: '1'
        };
      });
    }
  }

  render(props, context) {

    return (
      <div className="statusField margin-bot-l clearfix">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="textBox">
            <textarea placeholder='Write your status' value={this.state.content} onChange={this.contentHandle.bind(this)} ></textarea>
          </div>

          <div className="buttonsBox row-fluid padding-top-sm">
          <label className="col-sm-3 no-padding txt-right"><small>Share with</small></label>
          <div className="col-sm-5">
              <div className="select-style">
                <select className='selectVisibility' onChange={this.changeSelect.bind(this)} value={this.state.visible}>
                  <option value='1'>All</option>
                  <option value='2'>Followers</option>
                  <option value='3'>Only Me</option>
                </select>            
              </div>
            </div>

            <button className={(() => this.state.content.length > 0 ? 'btn col-sm-4 btn-orange' : 'btn col-sm-4 btn-orange disabled')()} type='submit'>Post</button>
          </div>
        </form>
      </div>
    );

  }

}

module.exports = StatusField;
export default StatusField;