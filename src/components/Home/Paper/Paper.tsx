import cn from 'classnames';

import './Paper.scss';

type PaperProps = {
  children?: React.ReactNode;
};

const Paper: React.FC<PaperProps> = ({ children }) => {
  return <div className={cn('__paper-container')}>{children}</div>;
};

export default Paper;
