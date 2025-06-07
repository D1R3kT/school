-- Вставка тестовых данных

-- Преподаватели
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
('Елена Васильевна Смирнова', 'e.smirnova@artschool.ru', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TEACHER', NOW(), NOW()),
('Александр Петрович Волков', 'a.volkov@artschool.ru', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TEACHER', NOW(), NOW()),
('Мария Андреевна Новикова', 'm.novikova@artschool.ru', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TEACHER', NOW(), NOW());

-- Курсы
INSERT INTO courses (title, description, image_url, price, duration, level, teacher_id, is_active, created_at, updated_at) VALUES
('Акварельная живопись', 'Изучите основы акварельной техники, от простых упражнений до сложных композиций.', 'https://images.pexels.com/photos/1646311/pexels-photo-1646311.jpeg?auto=compress&cs=tinysrgb&w=500', 15000.00, '8 недель', 'BEGINNER', 1, true, NOW(), NOW()),
('Масляная живопись', 'Освойте классическую технику масляной живописи и создавайте настоящие шедевры.', 'https://images.pexels.com/photos/1332988/pexels-photo-1332988.jpeg?auto=compress&cs=tinysrgb&w=500', 22000.00, '12 недель', 'INTERMEDIATE', 2, true, NOW(), NOW()),
('Цифровая иллюстрация', 'Современное искусство в цифровом формате. Изучите Photoshop и создавайте цифровые шедевры.', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500', 18000.00, '10 недель', 'ALL_LEVELS', 3, true, NOW(), NOW()),
('Графика и рисунок', 'Основа всех видов изобразительного искусства. Изучите академический рисунок.', 'https://images.pexels.com/photos/1070981/pexels-photo-1070981.jpeg?auto=compress&cs=tinysrgb&w=500', 12000.00, '6 недель', 'BEGINNER', 1, true, NOW(), NOW()),
('Пастельная живопись', 'Мягкая и выразительная техника пастели для создания нежных и ярких работ.', 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=500', 16000.00, '8 недель', 'INTERMEDIATE', 2, true, NOW(), NOW()),
('Каллиграфия', 'Искусство красивого письма. Изучите различные каллиграфические стили.', 'https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&w=500', 10000.00, '6 недель', 'BEGINNER', 3, true, NOW(), NOW());

-- Особенности курсов
INSERT INTO course_features (course_id, feature) VALUES
(1, 'Основы цветоведения'),
(1, 'Техники наложения'),
(1, 'Пейзажная живопись'),
(1, 'Ботаническая иллюстрация'),
(2, 'История масляной живописи'),
(2, 'Подготовка холста'),
(2, 'Портретная живопись'),
(2, 'Натюрморт'),
(3, 'Основы Photoshop'),
(3, 'Концепт-арт'),
(3, 'Иллюстрация персонажей'),
(3, 'Цифровая живопись'),
(4, 'Построение композиции'),
(4, 'Штриховка и тонирование'),
(4, 'Портрет'),
(4, 'Анатомический рисунок'),
(5, 'Сухая пастель'),
(5, 'Масляная пастель'),
(5, 'Портретная техника'),
(5, 'Пейзажи пастелью'),
(6, 'Латинская каллиграфия'),
(6, 'Кириллица'),
(6, 'Современные стили'),
(6, 'Декоративные элементы');