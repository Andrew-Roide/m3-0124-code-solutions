select "addresses"."line1",
       "addresses"."district",
       "cities"."name" AS "cityName",
       "countries"."name" AS "countryName"
  from "addresses"
  join "cities" using ("cityId")
  join "countries" using ("countryId");
