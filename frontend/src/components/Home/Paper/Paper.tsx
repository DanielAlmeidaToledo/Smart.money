import cn from 'classnames';

import './Paper.scss';

type PaperProps = {
  className?: string;
  children?: React.ReactNode;
};

const Paper: React.FC<PaperProps> = ({ children, className }) => {
  return <div className={cn('__paper-container', className)}>{children}</div>;
};

export default Paper;
