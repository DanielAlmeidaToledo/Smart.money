import cn from 'classnames';

import './Dashboard.scss';

type DashboardProps = {
  className?: string;
  children?: React.ReactNode;
};

const Dashboard: React.FC<DashboardProps> = ({ className, children }) => {
  return (
    <div className={cn('__dashboard-container', className)}>Dashboard</div>
  );
};

export default Dashboard;
