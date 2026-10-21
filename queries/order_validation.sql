-- GreenLeaf Grocers: confirm the most recent persisted guest order.
-- Executed against the SQLite database in the Coursera lab.
SELECT orders.*, users.email
FROM orders
JOIN users ON orders.user_id = users.id
WHERE users.email = 'capstone.guest@example.test'
ORDER BY orders.created_at DESC
LIMIT 1;
