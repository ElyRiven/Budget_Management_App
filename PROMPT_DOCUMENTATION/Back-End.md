📌 Prompts – Microservicios con Spring Boot + RabbitMQ
1️⃣ Entidad Transaction (Microservicio Transaction)

Requisitos:

No debe tener relaciones entre tablas (no @ManyToOne, @OneToMany, etc.)

Comunicación entre microservicios mediante eventos (RabbitMQ)

Usar JPA solo para persistencia local

Usar Lombok (evitar @Data)

Campos:

id (UID)
type (ENUM: INCOME | EXPENSE)
amount
category
date
description
createdAt


Indicaciones:

La entidad debe ser simple.

Solo lo necesario para persistir la transacción.

No incluir referencias a otros microservicios ni entidades.

Lombok recomendado:

@Getter

@Setter

@NoArgsConstructor

@AllArgsConstructor

2️⃣ Entidad Report (Microservicio Report)

Contexto:

Este es otro microservicio.

Sigue el mismo patrón: entidad JPA sin relaciones.

userId llega desde un evento de RabbitMQ.

El reportId es autogenerado por la base de datos.

No existe relación con Transaction.

Campos:

reportId (autogenerado por DB)
userId
period (YYYY-MM)
totalIncome (decimal)
totalExpense (decimal)
balance (decimal)
createdAt
updatedAt


Indicaciones:

Colocar la entidad dentro de la carpeta model.

Usar Lombok.

No usar @Data.

3️⃣ Estructura de carpetas – Arquitectura por capas

Ruta base:

src/main/java/com/microservice/report/


Carpetas requeridas:

controller     → controladores REST
service        → lógica de negocio
repository     → acceso a datos
infrastructure → RabbitMQ, mensajería, seguridad, etc.


⚠️ La carpeta model ya existe.

Requisitos:

Cada carpeta debe tener al menos una clase vacía de ejemplo:

ReportController

ReportService

ReportRepository

RabbitMQConfig

Cada clase debe incluir comentarios explicando su responsabilidad.

No incluir lógica real, solo estructura y comentarios.

4️⃣ Configuración de Base de Datos (MySQL + JPA Code-First)

Archivo: application.properties (o application.yml)

Configuración mínima requerida:

spring.datasource.url=jdbc:mysql://localhost:3306/midatabase
spring.datasource.username=root
spring.datasource.password=tu_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


Objetivo:

Enfoque code-first: las tablas se generan desde las entidades JPA.

5️⃣ Microservicio Report – Consumo de eventos RabbitMQ
🎯 Objetivo General

El microservicio Report debe:

Consumir eventos del microservicio Transaction vía RabbitMQ.

Calcular:

Total de ingresos

Total de gastos

Balance

Exponer un endpoint REST para consultar el reporte.

5.1️⃣ Entidad Report

Requisitos:

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_income", nullable = false, precision = 19, scale = 2)
    private BigDecimal totalIncome;

    @Column(name = "total_expense", nullable = false, precision = 19, scale = 2)
    private BigDecimal totalExpense;

    @Column(name = "balance", nullable = false, precision = 19, scale = 2)
    private BigDecimal balance;
}


Condiciones:

Inicializar todos los valores en cero al crear el reporte.

5.2️⃣ Configuración RabbitMQ (infrastructure)

Clase: RabbitMQConfig

Debe incluir:

Cola: report-queue

Exchange: transaction-exchange

Binding con routing key:

transaction.*

5.3️⃣ Consumer de eventos (TransactionConsumer)

Ubicación: paquete infrastructure

Requisitos:

Anotado con:

@RabbitListener(queues = "report-queue")


Recibe objetos Transaction publicados por el microservicio Transaction.

Lógica:

Si type == INCOME → sumar a totalIncome

Si type == EXPENSE → sumar a totalExpense

Calcular:

balance = totalIncome - totalExpense


Guardar el Report actualizado en la base de datos.

5.4️⃣ Repositorio

Paquete: repository

public interface ReportRepository extends JpaRepository<Report, Long> {
}

5.5️⃣ Servicio

Paquete: service

Clase: ReportService

Métodos requeridos:

updateReport(Transaction transaction)
getReport()


Responsabilidad:

Encapsular la lógica de negocio de cálculo del reporte.

5.6️⃣ Controlador REST

Paquete: controller

Clase: ReportController

Endpoint:

GET /api/v1/reports


Debe retornar:

totalIncome

totalExpense

balance

✅ Resultado esperado

El microservicio Report:

Consume eventos de Transaction vía RabbitMQ.

Calcula totales de ingresos, gastos y balance.

Persiste los resultados en MySQL.

Expone un endpoint REST para consultar el reporte financiero consolidado.
