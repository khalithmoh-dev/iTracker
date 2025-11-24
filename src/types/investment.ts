export type InvestmentType = 'gold' | 'stocks' | 'crypto' | 'cash';

export interface Investment {
  id: string;
  type: InvestmentType;
  name: string;
  symbol?: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  currentPrice?: number;
  currentValue?: number;
  profitLoss?: number;
  profitLossPercent?: number;
}

export interface PriceData {
  price: number;
  currency: string;
}

