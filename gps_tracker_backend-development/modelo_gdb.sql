-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 0.9.4
-- PostgreSQL version: 13.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- object: tracking_rol | type: ROLE --
-- DROP ROLE IF EXISTS tracking_rol;



-- object: tracking | type: SCHEMA --
-- DROP SCHEMA IF EXISTS tracking CASCADE;
CREATE SCHEMA tracking;
-- ddl-end --
ALTER SCHEMA tracking OWNER TO guillermo;
-- ddl-end --
COMMENT ON SCHEMA tracking IS E'Esquema para tracking';
-- ddl-end --

-- object: tracking_cp | type: SCHEMA --
-- DROP SCHEMA IF EXISTS tracking_cp CASCADE;
CREATE SCHEMA tracking_cp;
-- ddl-end --
ALTER SCHEMA tracking_cp OWNER TO guillermo;
-- ddl-end --
COMMENT ON SCHEMA tracking_cp IS E'Esquema para tracking';
-- ddl-end --

SET search_path TO pg_catalog,public,tracking,tracking_cp;
-- ddl-end --

-- object: tracking.ibeacon_device | type: TABLE --
-- DROP TABLE IF EXISTS tracking.ibeacon_device CASCADE;
CREATE TABLE tracking.ibeacon_device (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT ibeacon_device_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.ibeacon_device OWNER TO guillermo;
-- ddl-end --

-- object: tracking.gps_device | type: TABLE --
-- DROP TABLE IF EXISTS tracking.gps_device CASCADE;
CREATE TABLE tracking.gps_device (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT gps_device_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.gps_device OWNER TO guillermo;
-- ddl-end --

-- object: tracking.ibeacon_gps_owner_rel | type: TABLE --
-- DROP TABLE IF EXISTS tracking.ibeacon_gps_owner_rel CASCADE;
CREATE TABLE tracking.ibeacon_gps_owner_rel (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_ibeacon_device bigint,
	id_gps_device bigint,
	id_owner bigint,
	name varchar(255) NOT NULL,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT ibeacon_gps_owner_rel_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.ibeacon_gps_owner_rel OWNER TO guillermo;
-- ddl-end --

-- object: tracking.ibeacon_device_track | type: TABLE --
-- DROP TABLE IF EXISTS tracking.ibeacon_device_track CASCADE;
CREATE TABLE tracking.ibeacon_device_track (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_ibeacon_device bigint,
	id_ibeacon_gateway bigint,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT ibeacon_device_track_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.ibeacon_device_track OWNER TO guillermo;
-- ddl-end --

-- object: tracking.gps_device_track | type: TABLE --
-- DROP TABLE IF EXISTS tracking.gps_device_track CASCADE;
CREATE TABLE tracking.gps_device_track (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_gps_device bigint,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	lat numeric(13,10) NOT NULL,
	lon numeric(13,10) NOT NULL,
	CONSTRAINT gps_device_track_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.gps_device_track OWNER TO guillermo;
-- ddl-end --

-- object: tracking.owner | type: TABLE --
-- DROP TABLE IF EXISTS tracking.owner CASCADE;
CREATE TABLE tracking.owner (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255) NOT NULL,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT owner_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.owner OWNER TO guillermo;
-- ddl-end --

-- object: tracking.users | type: TABLE --
-- DROP TABLE IF EXISTS tracking.users CASCADE;
CREATE TABLE tracking.users (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_role bigint,
	name varchar(255) NOT NULL,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	email text NOT NULL,
	pass text NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT uk_email UNIQUE (email)
);
-- ddl-end --
ALTER TABLE tracking.users OWNER TO guillermo;
-- ddl-end --

-- object: tracking.role | type: TABLE --
-- DROP TABLE IF EXISTS tracking.role CASCADE;
CREATE TABLE tracking.role (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(255) NOT NULL,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT role_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.role OWNER TO guillermo;
-- ddl-end --

-- object: tracking.user_owner_rel | type: TABLE --
-- DROP TABLE IF EXISTS tracking.user_owner_rel CASCADE;
CREATE TABLE tracking.user_owner_rel (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	id_owner bigint,
	id_users bigint,
	CONSTRAINT user_owner_rel_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.user_owner_rel OWNER TO guillermo;
-- ddl-end --

-- object: ibeacon_device_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.ibeacon_gps_owner_rel DROP CONSTRAINT IF EXISTS ibeacon_device_fk CASCADE;
ALTER TABLE tracking.ibeacon_gps_owner_rel ADD CONSTRAINT ibeacon_device_fk FOREIGN KEY (id_ibeacon_device)
REFERENCES tracking.ibeacon_device (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: gps_device_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.ibeacon_gps_owner_rel DROP CONSTRAINT IF EXISTS gps_device_fk CASCADE;
ALTER TABLE tracking.ibeacon_gps_owner_rel ADD CONSTRAINT gps_device_fk FOREIGN KEY (id_gps_device)
REFERENCES tracking.gps_device (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: owner_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.ibeacon_gps_owner_rel DROP CONSTRAINT IF EXISTS owner_fk CASCADE;
ALTER TABLE tracking.ibeacon_gps_owner_rel ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner)
REFERENCES tracking.owner (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: gps_device_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.gps_device_track DROP CONSTRAINT IF EXISTS gps_device_fk CASCADE;
ALTER TABLE tracking.gps_device_track ADD CONSTRAINT gps_device_fk FOREIGN KEY (id_gps_device)
REFERENCES tracking.gps_device (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: ibeacon_device_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.ibeacon_device_track DROP CONSTRAINT IF EXISTS ibeacon_device_fk CASCADE;
ALTER TABLE tracking.ibeacon_device_track ADD CONSTRAINT ibeacon_device_fk FOREIGN KEY (id_ibeacon_device)
REFERENCES tracking.ibeacon_device (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: role_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.users DROP CONSTRAINT IF EXISTS role_fk CASCADE;
ALTER TABLE tracking.users ADD CONSTRAINT role_fk FOREIGN KEY (id_role)
REFERENCES tracking.role (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.user_owner_rel DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE tracking.user_owner_rel ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES tracking.users (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: owner_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.user_owner_rel DROP CONSTRAINT IF EXISTS owner_fk CASCADE;
ALTER TABLE tracking.user_owner_rel ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner)
REFERENCES tracking.owner (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: tracking.ibeacon_gateway | type: TABLE --
-- DROP TABLE IF EXISTS tracking.ibeacon_gateway CASCADE;
CREATE TABLE tracking.ibeacon_gateway (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	creation_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	lat numeric(13,10) NOT NULL,
	lon numeric(13,10) NOT NULL,
	CONSTRAINT ibeacon_gateway_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.ibeacon_gateway OWNER TO guillermo;
-- ddl-end --

-- object: ibeacon_gateway_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.ibeacon_device_track DROP CONSTRAINT IF EXISTS ibeacon_gateway_fk CASCADE;
ALTER TABLE tracking.ibeacon_device_track ADD CONSTRAINT ibeacon_gateway_fk FOREIGN KEY (id_ibeacon_gateway)
REFERENCES tracking.ibeacon_gateway (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: tracking.geofence | type: TABLE --
-- DROP TABLE IF EXISTS tracking.geofence CASCADE;
CREATE TABLE tracking.geofence (
	id serial NOT NULL,
	id_owner bigint,
	geom geometry(POLYGON, 4326),
	CONSTRAINT geofence_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE tracking.geofence OWNER TO guillermo;
-- ddl-end --

-- object: owner_fk | type: CONSTRAINT --
-- ALTER TABLE tracking.geofence DROP CONSTRAINT IF EXISTS owner_fk CASCADE;
ALTER TABLE tracking.geofence ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner)
REFERENCES tracking.owner (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


