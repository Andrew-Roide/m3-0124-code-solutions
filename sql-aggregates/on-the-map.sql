select "countries"."countryId",
       "countries"."name",
       count(*) as "allCountries"
  from "countries"
  join "cities" using ("countryId")
  group by "countryId"
  order by "countryId" asc;
