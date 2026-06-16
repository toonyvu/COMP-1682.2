export const searchableFields: Record<string, string> = {
  orderId: "o.cus_order_id",
  username: "u.username",
  firstName: "u.first_name",
  lastName: "u.last_name",
  phone: "u.phone",
};

export const allowedSorts: Record<string, string> = {
  created_at: "o.created_at",
  amount_total: "o.amount_total",
  status: "o.status",
};
