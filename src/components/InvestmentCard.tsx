import { Investment } from '../types/investment';
import { formatCurrency, formatDate } from '../utils/calculations';

interface InvestmentCardProps {
  investment: Investment;
  onDelete: (id: string) => void;
  onEdit: (investment: Investment) => void;
}

export default function InvestmentCard({ investment, onDelete, onEdit }: InvestmentCardProps) {
  const profitLoss = investment.profitLoss ?? 0;
  const profitLossPercent = investment.profitLossPercent ?? 0;
  const isProfit = profitLoss >= 0;

  const typeColors = {
    crypto: 'bg-purple-100 border-purple-300',
    stocks: 'bg-blue-100 border-blue-300',
    gold: 'bg-yellow-100 border-yellow-300',
    cash: 'bg-green-100 border-green-300',
  };

  return (
    <div className={`border-2 rounded-lg p-4 ${typeColors[investment.type]}`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold">{investment.name}</h3>
          {investment.symbol && (
            <p className="text-sm text-gray-600">{investment.symbol}</p>
          )}
          <p className="text-xs text-gray-500 capitalize">{investment.type}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(investment)}
            className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(investment.id)}
            className="text-red-600 hover:text-red-800 text-xl"
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        {investment.type === 'cash' ? (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-lg">
                {formatCurrency(investment.purchasePrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{formatDate(investment.purchaseDate)}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">
                {investment.quantity} {investment.type === 'gold' ? 'grams' : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purchase Price:</span>
              <span className="font-medium">
                {formatCurrency(investment.purchasePrice)} {investment.type === 'gold' && '/ gram'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purchase Date:</span>
              <span className="font-medium">{formatDate(investment.purchaseDate)}</span>
            </div>
            {investment.currentPrice !== undefined && (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-800">Today's Value:</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(investment.currentValue ?? 0)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium">
                    {formatCurrency(investment.currentPrice)} {investment.type === 'gold' && '/ gram'}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Profit/Loss:</span>
                    <span className={`font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </>
            )}
            {investment.currentPrice === undefined && (
              <div className="text-xs text-gray-500 mt-2">Click "Update Prices" to see current value</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

