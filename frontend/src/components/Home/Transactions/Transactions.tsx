import cn from 'classnames';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import './Transactions.scss';

import Paper from '../Paper/Paper';
import PaperHeader from '../Paper/PaperHeader';

type TransactionsProps = {
  className?: string;
  transactions?: {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    created_at: Date;
  }[];
};

const Transactions: React.FC<TransactionsProps> = ({ className, transactions }) => {
  if (!transactions) {
    transactions = [
      {
        id: 0,
        title: '',
        type: '',
        category: '',
        amount: 0,
        created_at: new Date()
      }
    ];
  }

  //React chart
  const options: ApexOptions = {
    chart: {
      type: 'area',
      stacked: false,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      fontFamily: 'Roboto, sans-serif'
    },
    stroke: {
      curve: 'straight'
    },
    labels: transactions.map((transaction) => {
      const [day, month, year] = transaction.created_at.toString().split('-');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }),
    xaxis: {
      type: 'datetime'
    },
    legend: {
      horizontalAlign: 'right',
      fontSize: '14px'
    },
    colors: ['#1CA477'],
    grid: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  const series = [
    {
      name: 'Transação',
      data: transactions?.map((transaction) => Number(transaction.amount))
    }
  ];

  return (
    <Paper className="__paper-container-full">
      <PaperHeader>
        <h1>Transações</h1>
        <a href="/extrato">
          <span className="material-symbols-outlined">query_stats</span>
        </a>
      </PaperHeader>
      <div className={cn('__transactions-content', className)}>
        <ReactApexChart
          className="ReactApexChart"
          options={options}
          series={series}
          type="area"
          height={260}
        />
      </div>
    </Paper>
  );
};

export default Transactions;
