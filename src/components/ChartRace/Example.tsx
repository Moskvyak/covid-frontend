import React, { Component } from 'react';
import ChartRace from './ChartRace';

interface Props {
  chartData: any[];
}

export default class Example extends Component<Props, any> {
  private runningInterval: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      currentIndex: -1
    };
  }
  public componentDidMount() {
    this.handleChange();
    this.runningInterval = setInterval(() => {
      this.handleChange();
    }, 200);
  }

  private handleChange = () => {
    const newIndex = this.state.currentIndex + 1;
    if (newIndex > this.props.chartData.length -1) {
      clearInterval(this.runningInterval);
      return;
    }
    const data = this.props.chartData[newIndex];
    this.setState({ data, currentIndex: newIndex });
  };

  render() {
    return (
      <div>
        <ChartRace
          data={this.state.data}
          backgroundColor="#000"
          width={760}
          padding={12}
          itemHeight={20}
          gap={12}
          titleStyle={{ font: 'normal 400 13px Arial', color: '#fff', width: 50, marginRight: 10 }}
          valueStyle={{
            font: 'normal 400 11px Arial',
            color: 'rgba(255,255,255, 0.42)'
          }}
        />
      </div>
    );
  }
}
