CREATE VIEW Order_Nutritional_Information AS
SELECT OverallOrder.order_id, SUM(DISTINCT ResturauntOrder.quantity*Menu.calories), string_agg(DISTINCT ItemContains.ingredient, ', ')
FROM OverallOrder, ResturauntOrder, Menu, ItemContains
WHERE OverallOrder.order_id = ResturauntOrder.order_id
	AND ResturauntOrder.item_id = Menu.item_id
	AND Menu.item_id = ItemContains.item_id
GROUP BY OverallOrder.order_id;
