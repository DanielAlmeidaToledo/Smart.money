import React from 'react';
import cn from 'classnames';
import './CardsList.scss';

type CardsListProps = {
  className?: string;
};

const CardsList: React.FC<CardsListProps> = ({ className }) => {
  return (
    <div className={cn('__cardslist-container', className)}>
      <div className={cn('__development-page', 'bg')}>
        <h3 className="__title">Página em Desenvolvimento</h3>
        <div className="__clock-container">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default CardsList;
