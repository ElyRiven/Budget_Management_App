import type { TransactionModel, TransactionFormData } from '../types/transaction.types';
import { transactionAdapter } from '../adapters/transaction.adapter';
import httpClient from '../../../core/api/httpClient';
import type { TransactionItemResponse } from '../types/transaction.types';

export const getTransactionsByUser = async (userId: string, period?: string): Promise<TransactionModel[]> => {
    const endpoint = period ? `/transactions?period=${period}` : `/transactions/user/${userId}`;
    const response = await httpClient.get<TransactionItemResponse[]>(endpoint);
    return response.data.map(transactionAdapter);
};

export const createTransaction = async (data: TransactionFormData): Promise<TransactionModel> => {
    const response = await httpClient.post<TransactionItemResponse>('/transactions', data);
    return transactionAdapter(response.data);
};