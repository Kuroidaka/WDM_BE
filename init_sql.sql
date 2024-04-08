use WDM;

-- ============================
-- INIT PERMISSION
-- ============================
INSERT INTO Permission (id, name, description, page, created_at, updated_at)
VALUES
  ('perm1', 'View Report', 'Allows viewing reports', 'report', NOW(), NOW()),
  ('perm2', 'Edit User', 'Allows editing users', 'user', NOW(), NOW()),
  ('perm3', 'Access Lobby', 'Allows access to lobby', 'lobby', NOW(), NOW()),
  ('perm4', 'Process Orders', 'Allows processing orders', 'order', NOW(), NOW()),
  ('perm5', 'Manage Food Service', 'Allows managing food service', 'food_service', NOW(), NOW())
;

-- ============================
-- INIT ROLES
-- ============================
INSERT INTO Role (id, name, created_at, updated_at)
VALUES
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'Admin', NOW(), NOW()),
  ('64007797-029d-4339-b78b-d51e2d2f3e1a', 'Staff', NOW(), NOW())
;

-- ============================
-- INIT PERMISSION FOR ROLE
-- ============================
INSERT INTO RolePermission (role_id, permission_id, created_at, updated_at)
VALUES
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'perm1', NOW(), NOW()),
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'perm2', NOW(), NOW()),
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'perm3', NOW(), NOW()),
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'perm4', NOW(), NOW()),
  ('c5a5b477-73f5-4a97-b657-b2fd7a8efaae', 'perm5', NOW(), NOW())
;

-- ============================
-- Create admin account
-- tk: test
-- mk: test
-- ============================
INSERT INTO `WDM`.`User`
(
    `id`,
    `display_name`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
)
VALUES
(
    'JIrWE1qRjTxBWzeFwIGGL',
    'canh pham',
    'test',
    '$2a$10$BQ3PJs7iCxr.UNFHVnAoBeP0.QKp04kzc7/YwpSB/gx0ygPeFG5NO',
    NOW(),
    NOW()
);

-- ============================
-- SET ROLE ADMIN FOR USER "test"
-- ============================

INSERT INTO `UserRole`
(
    `user_id`,
    `role_id`,
    `created_at`,
    `updated_at`
)
VALUES
(
    'JIrWE1qRjTxBWzeFwIGGL',
    'c5a5b477-73f5-4a97-b657-b2fd7a8efaae',
    '2024-03-21 04:22:05.578',
    '2024-03-21 04:22:05.578'
);

-- ============================
-- INIT LOBBY TYPE
-- ============================
INSERT INTO LobType (id, max_table_count, min_table_price, deposit_percent, created_at, updated_at, type_name) VALUES 
('1', 10, 1000000, 30, '2023-01-15 08:00:00', '2023-01-15 08:00:00', 'A'),
('2', 15, 1500000, 30, '2023-02-20 09:30:00', '2023-02-20 09:30:00', 'B'),
('3', 20, 2000000, 30, '2023-03-25 10:45:00', '2023-03-25 10:45:00', 'C'),
('4', 25, 2500000, 30, '2023-04-30 12:00:00', '2023-04-30 12:00:00', 'D'),
('5', 30, 3000000, 30, '2023-05-05 14:15:00', '2023-05-05 14:15:00', 'E');

-- ============================
-- INIT LOBBY
-- ============================
INSERT INTO Lobby (id, name, lob_type_id) VALUES
('YghjKl9N-1kjL-3kHl8-2jHg', 'Grand Ballroom', '1'),
('2jkLmnO-3PqR-4sTuv-1wXyz', 'Skyline Terrace', '2'),
('AbCdEf0-2GhI-3JkL-4MnOpQ', 'Ocean View Hall', '3'),
('R5StUv6-WxYz-7XyZ-0aBcDe', 'Garden Pavilion', '4'),
('FgHiJk1-LmNo-2PqRs-3TuVw', 'Royal Suite', '5');

-- ============================
-- INIT FOODS
-- ============================
INSERT INTO WDM.Food (id, name, price, inventory) VALUES
('n1x2c3v4b5n6m7l8k9j0', 'Gỏi cuốn', 50000, 100),
('q1w2e3r4t5y6u7i8o9p0', 'Bánh mì thịt nướng', 30000, 150),
('a1s2d3f4g5h6j7k8l9z0', 'Phở bò', 45000, 200),
('x1c2v3b4n5m6l7k8j9h0', 'Cá hồi nướng', 120000, 50),
('z1x2c3v4b5n6m7l8k9j1', 'Tôm hấp bia', 70000, 80),
('q1a2z3w4s5x6e7d8c9r0', 'Chả giò', 35000, 120),
('v1b2n3m4l5k6j7h8g9f0', 'Salad rau trộn', 25000, 100),
('p1o2i3u4y5t6r7e8w9q0', 'Bánh xèo', 40000, 90),
('l1k2j3h4g5f6d7s8a9m0', 'Mì quảng', 50000, 110),
('y1u2i3o4p5q6w7e8r9t0', 'Bún bò Huế', 55000, 130),
('d1f2g3h4j5k6l7z8x9c0', 'Cơm tấm', 60000, 140),
('v1b2n3m4q5w6e7r8t9y0', 'Sườn xào chua ngọt', 70000, 110),
('z1x2c3v4b5n6m7q8w9e0', 'Cá kho tộ', 65000, 120),
('r1t2y3u4i5o6p7a8s9d0', 'Gà nướng sả', 75000, 95),
('f1g2h3j4k5l6z7x8c9v0', 'Bánh cưới truyền thống', 50000, 150),
('b1n2m3q4w5e6r7t8y9u0', 'Canh chua cá lóc', 55000, 130),
('i1o2p3a4s5d6f7g8h9j0', 'Xôi vò', 25000, 200),
('k1l2z3x4c5v6b7n8m9q0', 'Bún riêu cua', 60000, 90),
('w1e2r3t4y5u6i7o8p9a0', 'Hủ tiếu Nam Vang', 50000, 85),
('s1d2f3g4h5j6k7l8z9x0', 'Bánh bột lọc', 20000, 180),
('u1i2o3p4a5s6d7f8g9h0', 'Nem nướng Nha Trang', 65000, 160),
('j1k2l3z4x5c6v7b8n9m0', 'Bánh ướt thịt nướng', 30000, 140),
('y1t2r3e4w5q6u7i8o9p0', 'Bánh khọt', 35000, 130),
('f1g2h3j4k5l6z7x8c9v1', 'Lẩu Thái', 120000, 70),
('b1n2m3q4w5e6r7t8y9u1', 'Bò bía', 20000, 120),
('i1o2p3a4s5d6f7g8h9j1', 'Đu đủ bò khô', 30000, 160),
('k1l2z3x4c5v6b7n8m9q1', 'Salad măng cụt', 40000, 85),
('w1e2r3t4y5u6i7o8p9a1', 'Bò lúc lắc', 100000, 50),
('s1d2f3g4h5j6k7l8z9x1', 'Cá lóc nướng trui', 80000, 60),
('u1i2o3p4a5s6d7f8g9h1', 'Gỏi đu đủ', 45000, 100)
;

-- ============================
-- INIT SERVICES
-- ============================
INSERT INTO Service (id, name, price, status) VALUES
('e4R5t6Y7u8I9o0P1q2w', 'Trang trí tiệc cưới', 20000000, true),
('r4T5y6U7i8O9p0A1s2d', 'Quay phim, chụp ảnh', 15000000, true),
('f6G7h8J9k0L1z2X3c4v', 'Nhóm nhạc, DJ', 12000000, true),
('b5N6m7B8v9C0x1Z2l3k', 'Dịch vụ tổ chức lễ cưới', 50000000, true),
('q8W9e0R1t2Y3u4I5o6p', 'Catering tiệc cưới', 30000000, true),
('a7S8d9F0g1H2j3K4l5n', 'Dịch vụ trang điểm cô dâu', 4000000, true),
('z8X9c0V1b2N3m4Q5w6e', 'Thuê xe hoa', 7000000, true),
('x7C8v9B0n1M2q3W4e5r', 'Lễ dân sự tại nhà', 10000000, true),
('y6U7i8O9p0A1s2D3f4g', 'MC đám cưới', 8000000, true),
('t5R6y7U8i9O0p1A2s3d', 'Bánh cưới', 5000000, true);


