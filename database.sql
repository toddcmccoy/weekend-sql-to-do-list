CREATE TABLE "weekend-to-do-app" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "due_date" DATE,
    "notes" VARCHAR(250)
    "complete" BOOLEAN DEFAULT FALSE,
);

INSERT INTO "weekend-to-do-app"(
    "name", "due_date", "notes", "complete"
)

VALUES
('Weekend Challenge - Week 9', '07/03/2022', 'Get this done by noon on Sunday', false),
('Code Challenge - Week 10', '07/03/2022', 'Get this done by noon on Sunday', false),
('Happy Hour', '07/07/2022', 'Last day on campus for Chris', false);

SELECT * FROM "weekend-to-do-app";
