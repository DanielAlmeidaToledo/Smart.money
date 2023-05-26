import cn from 'classnames';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import './Goal.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type GoalProps = {
  className?: string;
  goal: {
    id: number;
    title: string;
    type: string;
    amount: number;
    balance: number;
  };
};

const Goal: React.FC<GoalProps> = ({ className, goal }) => {
  //React chart
  const options: ApexOptions = {
    chart: {
      height: 330,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front'
        },
        track: {
          background: 'transparent',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
        dataLabels: {
          show: true,
          value: {
            color: '#fff',
            fontSize: '32px',
            offsetY: -5,
            show: true
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: ['#fff']
    },
    stroke: {
      lineCap: 'square'
    },
    labels: ['']
  };
  const series: number[] = [Math.round(100 / (goal.amount / goal.balance))];

  return (
    <Paper>
      <PaperHeader>
        <h1>Meta Atual</h1>
        <a href="/metas">
          <span className="material-symbols-outlined">query_stats</span>
        </a>
      </PaperHeader>
      <div className={cn('__goal-content', className)}>
        <div className={cn('__goal-chart')}>
          <ReactApexChart options={options} series={series} type="radialBar" height={185} />
        </div>
      </div>
    </Paper>
  );
};

export default Goal;