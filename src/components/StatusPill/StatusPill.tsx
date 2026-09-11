import './StatusPill.css';
import type { TransactionStatus } from '../../types/transaction';

type StatusPillProps = {
  status: TransactionStatus;
};

const STATUS_LABELS: Record<Exclude<TransactionStatus, 'posted'>, string> = {
  pending: 'Pending',
  failed: 'Failed',
};

export function StatusPill({ status }: StatusPillProps) {
  if (status === 'posted') {
    return null;
  }

  return <span className={`status-pill status-pill--${status}`}>{STATUS_LABELS[status]}</span>;
}
