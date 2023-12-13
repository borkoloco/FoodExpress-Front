
export const organizeOrders = (orders, userId = null) => {
  const userOrders = {};

  orders.forEach((order) => {
    if (!userId || order.idUser === userId) {
      const key = `${order.idUser}-${order.fecha_de_compra}`;

      if (!userOrders[key]) {
        userOrders[key] = {
          ...order,
          orderItems: [{ idMenu: order.idMenu, cantidad: order.cantidad }],
          subtotal: parseFloat(order.subtotal),
        };
      } else {
        const existingOrder = userOrders[key];
        const existingMenuItem = existingOrder.orderItems.find(
          (item) => item.idMenu === order.idMenu
        );

        if (existingMenuItem) {
          existingMenuItem.cantidad += order.cantidad;
        } else {
          existingOrder.orderItems.push({
            idMenu: order.idMenu,
            cantidad: order.cantidad,
          });
        }

        existingOrder.subtotal += parseFloat(order.subtotal);
      }
    }
  });

  const organizedOrders = Object.values(userOrders);
  return organizedOrders;
};