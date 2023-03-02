CREATE VIEW OrderToMake AS
SELECT RestaurauntOrder.order_id, Menu.name, RestaurauntOrder.quantity, OverallOrder.time_placed
FROM RestaurauntOrder, OverallOrder, Menu
WHERE RestaurauntOrder.order_id = OverallOrder.order_id
	AND RestaurauntOrder.item_id = Menu.id
ORDER BY OverallOrder.time_placed;