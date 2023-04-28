import cn from 'classnames';

import './Dashboard.scss';

type DashboardProps = {
  className?: string;
};

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return <div className={cn('__dashboard-container', className)}>Dashboard</div>;
};

export default Dashboard;
