DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_user_enum') THEN
    CREATE TYPE "public"."role_user_enum" AS ENUM ('admin', 'manager', 'moderator', 'uploader', 'author', 'reader');
  END IF;
END
$$;

CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role_user_enum" DEFAULT 'reader' NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);