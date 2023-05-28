import cn from 'classnames';

import './PaperHeader.scss';

type PaperHeaderProps = {
  children?: React.ReactNode;
};

const PaperHeader: React.FC<PaperHeaderProps> = ({ children }) => {
  return <div className={cn('__paper-header')}>{children}</div>;
};

export default PaperHeader;
