select "customers"."firstName",
       "customers"."lastName"
  from "customers"
  join "payments" using ("customerId")
  where "amount" > 10.99
  limit 10;
