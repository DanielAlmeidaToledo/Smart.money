import cn from 'classnames';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import './GoalCard.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type GoalCardProps = {
  className?: string;
  goal?: {
    id: number;
    title: string;
    type: string;
    amount: number;
    balance: number;
  };
};

const GoalCard: React.FC<GoalCardProps> = ({ className, goal }) => {
  if (!goal) {
    goal = {
      id: 0,
      title: '',
      type: '',
      amount: 0,
      balance: 0
    };
  }

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
          margin: 0,
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

  const series: number[] = [goal.title !== '' ? Math.round((goal.balance / goal.amount) * 100) : 0];

  return (
    <Paper>
      <PaperHeader>
        <h1>Meta Atual</h1>
        <a href="/metas">
          <span className="material-symbols-outlined">query_stats</span>
        </a>
      </PaperHeader>
      <div className={cn('__goalcard-content', className)}>
        <div className={cn('__goalcard-chart')}>
          <ReactApexChart options={options} series={series} type="radialBar" height={185} />
        </div>
      </div>
    </Paper>
  );
};

export default GoalCard;
