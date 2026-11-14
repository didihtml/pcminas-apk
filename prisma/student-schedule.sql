BEGIN;
CREATE TABLE IF NOT EXISTS student_schedule (
  id UUID PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 1 AND 5),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (end_time > start_time),
  subject TEXT NOT NULL CHECK (length(trim(subject)) > 0),
  code TEXT,
  location TEXT,
  professor TEXT
);
CREATE INDEX IF NOT EXISTS student_schedule_card_day_idx ON student_schedule(card_id, weekday, start_time);
COMMIT;
