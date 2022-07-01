CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "due_date" DATE,
    "notes" VARCHAR(250)
    "complete" BOOLEAN DEFAULT FALSE,
);

INSERT INTO "tasks"(
    "name", "due_date", "notes", "complete"
)

VALUES
('Weekend Challenge - Week 9', '07/03/2022', 'Get this done by noon on Sunday', false),
('Code Challenge - Week 10', '07/03/2022', 'Get this done by noon on Sunday', false);

SELECT * FROM "tasks";
