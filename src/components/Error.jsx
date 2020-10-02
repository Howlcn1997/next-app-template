import React, { useState } from 'react';

export default class Error extends React.Component {
  state = { count: 0 };
  componentDidMount() {
    console.log('Error 初次渲染');
  }
  componentDidUpdate() {
    console.log('Error 更新');
  }
  render() {
    if (this.state.count === 5) {
      throw new Error('噢！我裂开了');
    }
    return (
      <div>
        <button onClick={() => this.setState(state => ({ count: this.state.count + 1 }))}>Add</button>
        <span>{this.state.count}</span>
      </div>
    );
  }
}
