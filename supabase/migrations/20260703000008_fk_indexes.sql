-- Unindexed foreign keys flagged by Performance Advisor. library_items and
-- playlist_tracks have composite PKs with track_id as the trailing column,
-- so they don't serve lookups by track_id alone -- needed for cascading
-- deletes (deleting a track has to find every referencing row here).

create index on comments (author_id);
create index on library_items (track_id);
create index on playlist_tracks (track_id);
