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

