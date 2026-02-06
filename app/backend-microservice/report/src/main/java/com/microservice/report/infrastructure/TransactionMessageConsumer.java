package com.microservice.report.infrastructure;

import com.microservice.report.infrastructure.dto.TransactionMessage;
import com.microservice.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TransactionMessageConsumer {
    private final ReportService reportService;

    @RabbitListener(queues = RabbitMQConfiguration.TRANSACTION_CREATED_QUEUE)
    public void consumeCreated(TransactionMessage transactionMessage) {
        reportService.updateReport(transactionMessage);
    }

    @RabbitListener(queues = RabbitMQConfiguration.TRANSACTION_UPDATED_QUEUE)
    public void consumeUpdated(TransactionMessage transactionMessage) {
        reportService.updateReport(transactionMessage);
    }
}
