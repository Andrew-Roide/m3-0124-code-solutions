select "customers"."firstName",
       "customers"."lastName",
       sum("payments"."amount") as "totalPaid"
  from "customers"
  join "payments" on "customers"."customerId" = "payments"."customerId"
  group by "customers"."customerId", "customers"."firstName", "customers"."lastName"
  order by "totalPaid" desc;
