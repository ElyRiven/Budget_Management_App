package com.microservice.transaction.service.impl;

import java.util.List;
import java.util.Optional;

import com.microservice.transaction.exception.EntityNotFoundException;
import org.springframework.stereotype.Service;

import com.microservice.transaction.model.Transaction;
import com.microservice.transaction.repository.TransactionRepository;
import com.microservice.transaction.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {
    private final TransactionRepository transactionRepository;

    @Override
    public Transaction create(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getById(Integer id) {
        Optional<Transaction> opt = transactionRepository.findById(id);
        return opt.orElseThrow(() -> new EntityNotFoundException("Transaction not found"));
    }

    @Override
    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction update(Integer id, Transaction transaction) {
        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Transaction not found with id " + id));
        existing.setAmount(transaction.getAmount());
        existing.setCategory(transaction.getCategory());
        existing.setDate(transaction.getDate());
        existing.setDescription(transaction.getDescription());
        existing.setType(transaction.getType());
        return transactionRepository.save(existing);
    }

    @Override
    public void delete(Integer id) {
        transactionRepository.deleteById(id);
    }
}
