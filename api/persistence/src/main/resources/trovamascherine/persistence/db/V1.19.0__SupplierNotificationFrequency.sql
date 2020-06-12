ALTER TABLE supplier
ADD COLUMN notification_frequency VARCHAR(255) NOT NULL
DEFAULT 'TwicePerDay';

ALTER TABLE supplier
ALTER COLUMN notification_frequency
DROP DEFAULT;

UPDATE supplier
SET notification_frequency = 'ThricePerWeek'
WHERE enabled = false;
