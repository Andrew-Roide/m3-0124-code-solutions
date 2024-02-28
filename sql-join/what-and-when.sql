select "films"."releaseYear",
       "genres"."name"
  from "films"
  join "filmGenre" on "films"."filmId" = "filmGenre"."filmId"
  join "genres" on "filmGenre"."genreId" = "genres"."genreId"
  where "films"."title" = 'Boogie Amelie';
