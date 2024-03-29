-- Create admin account
-- tk: test
-- mk: test
INSERT INTO `WDM`.`User`
(
    `id`,
    `isAdmin`,
    `display_name`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
)
VALUES
(
    'JIrWE1qRjTxBWzeFwIGGL',
    1,
    'canh pham',
    'test',
    '$2a$10$BQ3PJs7iCxr.UNFHVnAoBeP0.QKp04kzc7/YwpSB/gx0ygPeFG5NO',
    '2024-03-21 04:22:05.578',
    '2024-03-21 04:22:05.578'
); 


-- init lob type
INSERT INTO LobType (id, max_table_count, min_table_price, deposit_percent, created_at, updated_at, type_name) VALUES 
('1', 10, 1000000, 30, '2023-01-15 08:00:00', '2023-01-15 08:00:00', 'A'),
('2', 15, 1500000, 30, '2023-02-20 09:30:00', '2023-02-20 09:30:00', 'B'),
('3', 20, 2000000, 30, '2023-03-25 10:45:00', '2023-03-25 10:45:00', 'C'),
('4', 25, 2500000, 30, '2023-04-30 12:00:00', '2023-04-30 12:00:00', 'D'),
('5', 30, 3000000, 30, '2023-05-05 14:15:00', '2023-05-05 14:15:00', 'E');


