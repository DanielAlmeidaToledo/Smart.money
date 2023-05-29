import cn from 'classnames';

import './CardsList.scss';

type CardsListProps = {
  className?: string;
};

const CardsList: React.FC<CardsListProps> = ({ className }) => {
  return <div className={cn('__cardslist-container', className)}></div>;
};

export default CardsList;
