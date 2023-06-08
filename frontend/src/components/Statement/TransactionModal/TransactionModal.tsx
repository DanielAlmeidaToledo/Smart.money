import cn from 'classnames';

import './TransactionModal.scss';

type TransactionModalProps = {
  className?: string;
  onClose: () => void;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ className, onClose }) => {
  return (
    <div className={cn('__transaction-modal-container', className)}>
      <div className={cn('__transaction-modal-content')}>
        <div className={cn('__transaction-modal-header')}>
          <h2>Adicionar transação</h2>
          <button className={cn(className, 'button-close', 'Button')} onClick={onClose}>
            x
          </button>
        </div>
        <div className={cn('__transaction-modal-body')}>
          <form>
            <div className={cn('__transaction-modal-body-input')}>
              <label htmlFor="title">Nome</label>
              <input type="text" name="title" id="title" />
            </div>
            <div className={cn('__transaction-modal-body-div')}>
              <div className={cn('__transaction-modal-body-input')}>
                <label htmlFor="amount">Valor</label>
                <input type="number" name="amount" id="amount" />
              </div>
              <div className={cn('__transaction-modal-body-input')}>
                <label htmlFor="date">Data</label>
                <input type="date" name="date" id="date" />
              </div>
            </div>
            <div className={cn('__transaction-modal-body-div')}>
              <div
                className={cn('__transaction-modal-body-input', '__transaction-modal-body-select')}
              >
                <label htmlFor="type">Tipo</label>
                <select name="type" id="type">
                  <option value="all">Selecione</option>
                  <option value="gasto">Gasto</option>
                  <option value="receita">Receita</option>
                </select>
              </div>
              <div
                className={cn('__transaction-modal-body-input', '__transaction-modal-body-select')}
              >
                <label htmlFor="category">Categoria</label>
                <select name="category" id="category">
                  <option value="all">Selecione</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="educacao">Educação</option>
                  <option value="lazer">Lazer</option>
                  <option value="moradia">Moradia</option>
                  <option value="saude">Saúde</option>
                  <option value="transporte">Transporte</option>
                  <option value="trabalho">Trabalho</option>
                </select>
              </div>
            </div>
            <div className={cn('__transaction-modal-body-buttons')}>
              <button className={cn(className, 'button-cancel', 'Button')} onClick={onClose}>
                Cancelar
              </button>
              <button className={cn(className, 'button-save', 'Button')} type="submit">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
