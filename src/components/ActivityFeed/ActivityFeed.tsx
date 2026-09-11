import { useState } from 'react';
import './ActivityFeed.css';
import type { Transaction } from '../../types/transaction';
import { formatDate } from '../../common/format/dateFormat';
import { formatCurrency } from '../../common/format/currencyFormat';
import { StatusPill } from '../StatusPill/StatusPill';
import { TransactionDetailsDialog } from '../TransactionDetailsDialog/TransactionDetailsDialog';

type ActivityFeedProps = {
  transactions: Transaction[];
};

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <>
      <div className='activity-feed'>
        <h3>Activity</h3>

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='transaction-row'
            onClick={() => setSelectedTransaction(transaction)}
          >
            <div className='transaction-row__main'>
              <div className='transaction-row__merchant'>
                {transaction.merchant}
                <StatusPill status={transaction.status} />
              </div>
              <div className='transaction-row__category'>{transaction.category}</div>
            </div>

            <div className='transaction-row__aside'>
              <div className='transaction-row__date'>{formatDate(transaction.date)}</div>
              <div className='transaction-row__amount'>{formatCurrency(transaction.amount)}</div>
            </div>
          </div>
        ))}
      </div>

      <TransactionDetailsDialog
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
}
