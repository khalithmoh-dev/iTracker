import { useState, useEffect } from 'react';
import { Investment, InvestmentType } from '../types/investment';

interface InvestmentFormProps {
  onSave: (investment: Investment) => void;
  onCancel: () => void;
  investment?: Investment;
}

export default function InvestmentForm({ onSave, onCancel, investment }: InvestmentFormProps) {
  const [type, setType] = useState<InvestmentType>(investment?.type || 'crypto');
  const [name, setName] = useState(investment?.name || '');
  const [symbol, setSymbol] = useState(investment?.symbol || '');
  const [quantity, setQuantity] = useState(investment?.quantity.toString() || '');
  const [purchasePrice, setPurchasePrice] = useState(investment?.purchasePrice.toString() || '');
  const [purchaseDate, setPurchaseDate] = useState(
    investment?.purchaseDate || new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    if (investment) {
      setType(investment.type);
      setName(investment.name);
      setSymbol(investment.symbol || '');
      setQuantity(investment.quantity.toString());
      setPurchasePrice(investment.purchasePrice.toString());
      setPurchaseDate(investment.purchaseDate);
    }
  }, [investment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalQuantity = type === 'cash' ? 1 : parseFloat(quantity);
    const finalPurchasePrice = type === 'cash' ? parseFloat(purchasePrice) : parseFloat(purchasePrice);
    
    const updatedInvestment: Investment = {
      id: investment?.id || Date.now().toString(),
      type,
      name,
      symbol: (type !== 'cash' && type !== 'gold' && symbol) ? symbol : undefined,
      quantity: finalQuantity,
      purchasePrice: finalPurchasePrice,
      purchaseDate,
      currentPrice: investment?.currentPrice,
      currentValue: investment?.currentValue,
      profitLoss: investment?.profitLoss,
      profitLossPercent: investment?.profitLossPercent,
    };

    onSave(updatedInvestment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {investment ? 'Edit Investment' : 'Add Investment'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as InvestmentType)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="crypto">Crypto</option>
              <option value="stocks">Stocks</option>
              <option value="gold">Gold</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="e.g., Bitcoin, Reliance Industries, TCS, Gold"
              required
            />
          </div>

          {type !== 'cash' && type !== 'gold' && (
            <div>
              <label className="block text-sm font-medium mb-1">Symbol</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full p-2 border rounded"
                placeholder="e.g., BTC, RELIANCE, TCS (NSE symbols)"
                required
              />
            </div>
          )}

          {type === 'cash' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                value={purchasePrice}
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                  setQuantity('1');
                }}
                className="w-full p-2 border rounded"
                placeholder="Total cash amount in ₹"
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity {type === 'gold' && '(in grams)'}
                </label>
                <input
                  type="number"
                  step={type === 'gold' ? '0.01' : '0.00000001'}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={type === 'gold' ? 'Grams' : 'Amount'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Purchase Price {type === 'gold' && '(₹ per gram)'} {type !== 'gold' && '(₹ per unit)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={type === 'gold' ? 'Price per gram in ₹' : 'Price per unit in ₹'}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Purchase Date</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

