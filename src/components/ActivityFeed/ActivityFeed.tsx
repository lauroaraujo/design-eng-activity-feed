import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';
import { formatDate } from '../../common/format/dateFormat';
import { formatCurrency } from '../../common/format/currencyFormat';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  return (
    <div className='activity-feed'>
      <h3>Activity</h3>

      {transactions.map((transaction, index) => (
        <div
          key={index}
          className='transaction-row'
          onClick={() => alert(`Transaction: ${transaction.id}`)}
        >
          <div className='transaction-row__main'>
            <div className='transaction-row__merchant'>{transaction.merchant}</div>
            <div className='transaction-row__category'>{transaction.category}</div>
          </div>

          <div className='transaction-row__aside'>
            <div className='transaction-row__date'>{formatDate(transaction.date)}</div>
            <div className='transaction-row__amount'>{formatCurrency(transaction.amount)}</div>
          </div>

          {transaction.status === 'pending' && <span className='transaction-row__status'>pending</span>}
        </div>
      ))}
    </div>
  );
}
