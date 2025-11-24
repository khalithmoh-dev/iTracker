import { Investment } from '../types/investment';
import { getCryptoPrice, getStockPrice, getGoldPrice } from '../api/prices';

export const calculateProfitLoss = (investment: Investment): Investment => {
  if (!investment.currentPrice) {
    return investment;
  }

  const currentValue = investment.quantity * investment.currentPrice;
  const purchaseValue = investment.quantity * investment.purchasePrice;
  const profitLoss = currentValue - purchaseValue;
  const profitLossPercent = (profitLoss / purchaseValue) * 100;

  return {
    ...investment,
    currentValue,
    profitLoss,
    profitLossPercent,
  };
};

export const updateInvestmentPrices = async (investments: Investment[]): Promise<Investment[]> => {
  const updatedInvestments = await Promise.all(
    investments.map(async (investment) => {
      if (investment.type === 'cash') {
        return investment;
      }

      let currentPrice: number | undefined;

      switch (investment.type) {
        case 'crypto':
          if (investment.symbol) {
            const cryptoPrice = await getCryptoPrice(investment.symbol);
            currentPrice = cryptoPrice?.price;
          }
          break;
        case 'stocks':
          if (investment.symbol) {
            const stockPrice = await getStockPrice(investment.symbol);
            currentPrice = stockPrice?.price;
          }
          break;
        case 'gold':
          const goldPrice = await getGoldPrice();
          currentPrice = goldPrice?.price;
          break;
      }

      if (currentPrice !== undefined) {
        const updated = { ...investment, currentPrice };
        return calculateProfitLoss(updated);
      }

      return investment;
    })
  );

  return updatedInvestments;
};

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

