BEGIN;
CREATE TABLE IF NOT EXISTS student_disciplines (
  id UUID PRIMARY KEY,
  card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  code TEXT,
  grade NUMERIC(6,2),
  grade_max NUMERIC(6,2),
  absences INTEGER,
  absence_limit INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT student_disciplines_grade_check CHECK (grade IS NULL OR (grade_max > 0 AND grade >= 0 AND grade <= grade_max)),
  CONSTRAINT student_disciplines_absence_check CHECK (absences IS NULL OR (absence_limit > 0 AND absences >= 0))
);
CREATE INDEX IF NOT EXISTS student_disciplines_card_idx ON student_disciplines(card_id);
COMMIT;
