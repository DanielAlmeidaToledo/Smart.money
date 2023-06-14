import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../../App';

export function useTransactions() {
  return useOutletContext<ContextType>();
}
