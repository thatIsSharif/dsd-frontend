import {useState} from 'react';
import './LoanCalculator.scss';

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number | ''>('');
  const [interestRate, setInterestRate] = useState<number | ''>('');
  const [loanTerm, setLoanTerm] = useState<number | ''>('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  function calculateMonthlyPayment(): void {
    if (loanAmount === '' || interestRate === '' || loanTerm === '') return;

    const principal = Number(loanAmount);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      return;
    }

    const payment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment);
  }

  function resetForm(): void {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment(null);
  }

  return (
    <div className="loan-calculator-container">
      <div className="loan-calculator-card">
        <h1 className="loan-calculator-title">Loan Calculator</h1>
        <p className="loan-calculator-subtitle">
          Calculate your monthly loan payments
        </p>

        <div className="loan-calculator-form">
          <div className="form-group">
            <label htmlFor="loanAmount">Loan Amount ($)</label>
            <input
              id="loanAmount"
              type="number"
              min="0"
              placeholder="e.g. 25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="interestRate">Annual Interest Rate (%)</label>
            <input
              id="interestRate"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g. 5.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="loanTerm">Loan Term (years)</label>
            <input
              id="loanTerm"
              type="number"
              min="1"
              max="30"
              placeholder="e.g. 5"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>

          <div className="button-group">
            <button className="btn btn-primary" onClick={calculateMonthlyPayment}>
              Calculate
            </button>
            <button className="btn btn-secondary" onClick={resetForm}>
              Reset
            </button>
          </div>
        </div>

        {monthlyPayment !== null && (
          <div className="result-card">
            <p className="result-label">Monthly Payment</p>
            <p className="result-value">
              ${monthlyPayment.toFixed(2)}
            </p>
            <p className="result-detail">
              Based on a {loanTerm}-year loan at {interestRate}% APR
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanCalculator;
