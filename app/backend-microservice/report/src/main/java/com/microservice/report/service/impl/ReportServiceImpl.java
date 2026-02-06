package com.microservice.report.service.impl;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.microservice.report.dto.ReportSummary;
import com.microservice.report.infrastructure.dto.TransactionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.report.infrastructure.dto.TransactionType;
import com.microservice.report.model.Report;
import com.microservice.report.repository.ReportRepository;
import com.microservice.report.service.ReportService;


@RequiredArgsConstructor
@Service
public class ReportServiceImpl implements ReportService {
    private final ReportRepository reportRepository;

    @Transactional
    @Override
    public void updateReport(TransactionMessage transactionMessage) {
        if (transactionMessage == null ||
                transactionMessage.getAmount() == null ||
                transactionMessage.getType() == null ||
                transactionMessage.getUserId() == null ||
                transactionMessage.getDate() == null) {
            return;
        }
        // Obtener o crear el reporte específico del usuario y período
        Report report = getOrCreateReport(transactionMessage);
        BigDecimal amount = transactionMessage.getAmount();
        // Actualizar según el tipo de transacción
        if (transactionMessage.getType() == TransactionType.INCOME) {
            report.setTotalIncome(report.getTotalIncome().add(amount));
        } else if (transactionMessage.getType() == TransactionType.EXPENSE) {
            report.setTotalExpense(report.getTotalExpense().add(amount));
        }
        // Calcular el balance
        report.setBalance(report.getTotalIncome().subtract(report.getTotalExpense()));
        reportRepository.save(report);
    }

    @Transactional
    @Override
    public Report getReport(String userId, String period) {
        return reportRepository.findByUserIdAndPeriod(userId, period)
                .orElse(null);
    }

    @Transactional
    @Override
    public List<Report> getReportsByUserId(String userId) {
        return reportRepository.findByUserId(userId);
    }

    private Report getOrCreateReport(TransactionMessage transactionMessage) {
        String userId = transactionMessage.getUserId();
        String period = transactionMessage.getDate()
                .format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return reportRepository.findByUserIdAndPeriod(userId, period)
                .orElseGet(() -> {
                    return reportRepository.save(
                            Report.builder()
                                    .userId(userId)
                                    .period(period)
                                    .totalIncome(BigDecimal.ZERO)
                                    .totalExpense(BigDecimal.ZERO)
                                    .balance(BigDecimal.ZERO)
                                    .build()
                    );
                });
    }

    @Transactional
    @Override
    public ReportSummary getReportsByPeriodRange(String userId, String startPeriod, String endPeriod) {
        List<Report> reports = reportRepository.findByUserIdAndPeriodBetweenOrderByPeriodAsc(
                userId, startPeriod, endPeriod
        );
        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpense = BigDecimal.ZERO;

        for (Report report : reports) {
            totalIncome = totalIncome.add(report.getTotalIncome());
            totalExpense = totalExpense.add(report.getTotalExpense());
        }
        return ReportSummary.builder()
                .userId(userId)
                .startPeriod(startPeriod)
                .endPeriod(endPeriod)
                .reports(reports)
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .balance(totalIncome.subtract(totalExpense))
                .build();
    }
}
