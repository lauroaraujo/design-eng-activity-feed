import { useEffect, useRef } from 'react';
import './TransactionDetailsDialog.css';
import type { PaymentMethod, Transaction, TransactionAccount, TransactionType } from '../../types/transaction';
import { formatDate } from '../../common/format/dateFormat';
import { formatCurrency } from '../../common/format/currencyFormat';
import { StatusPill } from '../StatusPill/StatusPill';

type TransactionDetailsDialogProps = {
  transaction: Transaction | null;
  onClose: () => void;
};

const BULLET_CHAR = '\u2022';
const MULT_CHAR = '\u00D7';
const EM_DASH_CHAR = '\u2014';

const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  payment: 'Payment',
  transfer: 'Transfer',
  deposit: 'Deposit',
  withdrawal: 'Withdrawal',
  fee: 'Fee',
  refund: 'Refund',
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  ach: 'ACH',
  wire: 'Wire',
  card: 'Card',
  internal_transfer: 'Internal transfer',
  check: 'Check',
};

function formatAccount(account: TransactionAccount) {
  return `${account.name} ${BULLET_CHAR}${BULLET_CHAR}${account.lastFour}`;
}

function EmptyValue() {
  return <span className='transaction-details__empty'>{EM_DASH_CHAR}</span>;
}

export function TransactionDetailsDialog({ transaction, onClose }: TransactionDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (transaction && !dialog.open) {
      dialog.showModal();
    } else if (!transaction && dialog.open) {
      dialog.close();
    }
  }, [transaction]);

  const close = () => dialogRef.current?.close();

  console.log({transaction})

  return (
    <dialog
      ref={dialogRef}
      className='transaction-details'
      aria-labelledby='transaction-details-title'
      onClose={onClose}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      {transaction && (
        <div className='transaction-details__content'>
          <header className='transaction-details__header'>
            <div className='transaction-details__heading'>
              <h2 id='transaction-details-title' className='transaction-details__title'>
                {transaction.merchant}
                <StatusPill status={transaction.status} />
              </h2>
              <p className='transaction-details__amount'>{formatCurrency(transaction.amount)}</p>
            </div>

            <button type='button' className='transaction-details__close' aria-label='Close' onClick={close}>
              {MULT_CHAR}
            </button>
          </header>

          {transaction.failureReason && (
            <p className='transaction-details__failure'>{transaction.failureReason}</p>
          )}

          <div className='transaction-details__fields'>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Description</div>
              <div className='transaction-details__value'>{transaction.description}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Category</div>
              <div className='transaction-details__value'>{transaction.category || <EmptyValue />}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Type</div>
              <div className='transaction-details__value'>{TRANSACTION_TYPE_LABELS[transaction.type]}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Payment method</div>
              <div className='transaction-details__value'>{PAYMENT_METHOD_LABELS[transaction.paymentMethod]}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>From</div>
              <div className='transaction-details__value'>{formatAccount(transaction.sourceAccount)}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>To</div>
              <div className='transaction-details__value'>{formatAccount(transaction.destinationAccount)}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Initiated</div>
              <div className='transaction-details__value'>{formatDate(transaction.initiatedAt)}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Posted</div>
              <div className='transaction-details__value'>{transaction.postedAt ? formatDate(transaction.postedAt) : <EmptyValue />}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Reference number</div>
              <div className='transaction-details__value'>{transaction.referenceNumber}</div>
            </div>
            <div className='transaction-details__field'>
              <div className='transaction-details__label'>Memo</div>
              <div className='transaction-details__value'>{transaction.memo || <EmptyValue />}</div>
            </div>
          </div>

          <div className='transaction-details__actions'>
            <button
              type='button'
              className='transaction-details__dispute'
              onClick={() => alert(`Dispute: ${transaction.id}`)}
            >
              Dispute
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
