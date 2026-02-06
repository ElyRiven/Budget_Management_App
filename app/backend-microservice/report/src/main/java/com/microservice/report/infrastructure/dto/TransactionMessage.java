package com.microservice.report.infrastructure.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionMessage {
    private Long transactionId;
    private String userId;
    private TransactionType type;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
}
