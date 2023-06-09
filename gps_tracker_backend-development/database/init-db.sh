#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER rekuuser WITH PASSWORD 'mCcbb(J*35P7>X(<';
    CREATE DATABASE rekuapp;
    GRANT ALL PRIVILEGES ON DATABASE rekuapp TO rekuuser;
EOSQL

psql -f /db-dumps/seed.dump.sql rekuapp