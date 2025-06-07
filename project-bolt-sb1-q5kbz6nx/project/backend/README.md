# Art School Backend

Spring Boot приложение для художественной школы с интеграцией ЮKassa для обработки платежей.

## Технологии

- Java 17
- Spring Boot 3.2.1
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- ЮKassa API

## Запуск

### С помощью Docker

1. Запустите PostgreSQL и приложение:
```bash
docker-compose up -d
```

### Локальный запуск

1. Установите PostgreSQL и создайте базу данных:
```sql
CREATE DATABASE artschool;
CREATE USER artschool_user WITH PASSWORD 'artschool_password';
GRANT ALL PRIVILEGES ON DATABASE artschool TO artschool_user;
```

2. Запустите приложение:
```bash
./mvnw spring-boot:run
```

## API Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/register` - Регистрация

### Курсы
- `GET /api/courses` - Получить все курсы
- `GET /api/courses/{id}` - Получить курс по ID
- `GET /api/courses/level/{level}` - Получить курсы по уровню

### Платежи
- `POST /api/payments/create` - Создать платеж
- `POST /api/payments/webhook` - Webhook для ЮKassa
- `GET /api/payments/user` - Получить платежи пользователя
- `GET /api/payments/{yookassaPaymentId}` - Получить платеж по ID

### Пользователи
- `GET /api/users/me` - Получить текущего пользователя

## Конфигурация

Настройте переменные окружения для ЮKassa:
- `YOOKASSA_SHOP_ID` - ID магазина в ЮKassa
- `YOOKASSA_SECRET_KEY` - Секретный ключ ЮKassa

## База данных

Приложение автоматически создает таблицы при запуске. Тестовые данные загружаются из `data.sql`.

### Структура таблиц:
- `users` - Пользователи (студенты, преподаватели, админы)
- `courses` - Курсы
- `course_features` - Особенности курсов
- `payments` - Платежи
- `enrollments` - Записи на курсы