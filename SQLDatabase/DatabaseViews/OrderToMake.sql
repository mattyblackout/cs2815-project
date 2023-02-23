CREATE VIEW OrderToMake AS
SELECT ResturauntOrder.order_id, Menu.item_name, ResturauntOrder.quantity, OverallOrder.time_placed
FROM ResturauntOrder, OverallOrder, Menu
WHERE ResturauntOrder.order_id = OverallOrder.order_id
	AND ResturauntOrder.item_id = Menu.item_id
ORDER BY OverallOrder.time_placed;