import React, { Component } from 'react';
import ChartRace from './ChartRace';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import IconButton from '@material-ui/core/IconButton';

interface ChartData {
  title: string;
  data: any[];
}
interface State {
  currentChart: ChartData;
  currentIndex: number;
}
interface Props {
  chartData: ChartData[];
  chartRaceWidth: number;
}

const CHART_INTERVAL_DELAY = 333;
export default class ChartRaceManager extends Component<Props, State> {
  private runningInterval: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentChart: {
        title: '',
        data: []
      },
      currentIndex: -1
    };
  }
  public componentDidMount() {
    this.handleChange();
    this.runningInterval = setInterval(() => {
      this.handleChange();
    }, CHART_INTERVAL_DELAY);
  }

  private handleChange = () => {
    const newIndex = this.state.currentIndex + 1;
    if (newIndex > this.props.chartData.length - 1) {
      clearInterval(this.runningInterval);
      this.runningInterval = null;
      this.setState(prevState => ({ currentIndex: prevState.currentIndex }));
      return;
    }
    const currentChart = this.props.chartData[newIndex];
    this.setState({ currentChart, currentIndex: newIndex });
  };

  private play = () => {
    this.runningInterval = setInterval(() => {
      this.handleChange();
    }, CHART_INTERVAL_DELAY);
  };

  private pause = () => {
    clearInterval(this.runningInterval);
    this.runningInterval = null;
    this.setState(prevState => ({ currentIndex: prevState.currentIndex }));
  };
  private restart = () => {
    clearInterval(this.runningInterval);
    this.runningInterval = null;
    const currentChart = this.props.chartData[0];
    this.setState({ currentChart, currentIndex: 0 }, () => {
      this.runningInterval = setInterval(() => {
        this.handleChange();
      }, CHART_INTERVAL_DELAY);
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ width: '100%', textAlign: 'center' }}>
          {this.state.currentChart.title}
        </div>
        <div style={{ width: '100%' }}>
          <ChartRace
            data={this.state.currentChart.data}
            width={this.props.chartRaceWidth}
            padding={12}
            itemHeight={20}
            gap={12}
            numberOfItems={8}
            titleStyle={{
              font: 'normal 400 13px Arial',
              color: '#222',
              width: 50,
              marginRight: 10
            }}
            valueStyle={{
              font: 'normal 400 11px Arial',
              color: '#222'
            }}
          />
        </div>
        <div style={{ width: '100%' }}>
          {this.runningInterval === null &&
            this.state.currentIndex !== this.props.chartData.length - 1 &&
            <IconButton color="inherit" onClick={this.play}>
              <PlayCircleOutlineIcon />
            </IconButton>}
          {this.runningInterval !== null &&
            <IconButton color="inherit" onClick={this.pause}>
              <PauseCircleOutlineIcon />
            </IconButton>}
          <IconButton color="inherit" onClick={this.restart}>
            <ReplayIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}
