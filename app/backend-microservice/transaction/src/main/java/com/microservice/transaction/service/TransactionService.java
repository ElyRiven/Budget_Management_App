package com.microservice.transaction.service;

import java.util.List;

import com.microservice.transaction.model.Transaction;

public interface TransactionService {
    Transaction create(Transaction transaction);
    Transaction getById(Integer id);
    List<Transaction> getAll();
    Transaction update(Integer id, Transaction transaction);
    void delete(Integer id);
}