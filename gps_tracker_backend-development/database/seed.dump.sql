--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: tracking; Type: SCHEMA; Schema: -; Owner: guillermo
--

CREATE SCHEMA tracking;


ALTER SCHEMA tracking OWNER TO rekuuser;

--
-- Name: SCHEMA tracking; Type: COMMENT; Schema: -; Owner: guillermo
--

COMMENT ON SCHEMA tracking IS 'Esquema para tracking';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: geofence; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.geofence (
    id integer NOT NULL,
    id_owner bigint,
    geom public.geometry(Polygon,4326),
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.geofence OWNER TO rekuuser;

--
-- Name: geofence_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

CREATE SEQUENCE tracking.geofence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tracking.geofence_id_seq OWNER TO rekuuser;

--
-- Name: geofence_id_seq; Type: SEQUENCE OWNED BY; Schema: tracking; Owner: guillermo
--

ALTER SEQUENCE tracking.geofence_id_seq OWNED BY tracking.geofence.id;


--
-- Name: gps_device; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.gps_device (
    id bigint NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone,
    name character varying(50),
    phone character varying(50),
    ready boolean,
    imei character varying(50)
);


ALTER TABLE tracking.gps_device OWNER TO rekuuser;

--
-- Name: gps_device_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.gps_device ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.gps_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: gps_device_track; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.gps_device_track (
    id bigint NOT NULL,
    id_gps_device bigint,
    lat numeric(13,10) NOT NULL,
    lon numeric(13,10) NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone,
    speed numeric(13,10),
    "timestamp" timestamp without time zone
);


ALTER TABLE tracking.gps_device_track OWNER TO rekuuser;

--
-- Name: gps_device_track_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.gps_device_track ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.gps_device_track_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ibeacon_device; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.ibeacon_device (
    id bigint NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone,
    name character varying(50)
);


ALTER TABLE tracking.ibeacon_device OWNER TO rekuuser;

--
-- Name: ibeacon_device_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.ibeacon_device ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.ibeacon_device_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ibeacon_device_track; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.ibeacon_device_track (
    id bigint NOT NULL,
    id_ibeacon_device bigint,
    id_ibeacon_gateway bigint,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.ibeacon_device_track OWNER TO rekuuser;

--
-- Name: ibeacon_device_track_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.ibeacon_device_track ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.ibeacon_device_track_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ibeacon_gateway; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.ibeacon_gateway (
    id bigint NOT NULL,
    lat numeric(13,10) NOT NULL,
    lon numeric(13,10) NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.ibeacon_gateway OWNER TO rekuuser;

--
-- Name: ibeacon_gateway_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.ibeacon_gateway ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.ibeacon_gateway_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: ibeacon_gps_owner_rel; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.ibeacon_gps_owner_rel (
    id bigint NOT NULL,
    id_ibeacon_device bigint,
    id_gps_device bigint,
    id_owner bigint,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.ibeacon_gps_owner_rel OWNER TO rekuuser;

--
-- Name: ibeacon_gps_owner_rel_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.ibeacon_gps_owner_rel ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.ibeacon_gps_owner_rel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: owner; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.owner (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.owner OWNER TO rekuuser;

--
-- Name: owner_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.owner ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.owner_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: role; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.role (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.role OWNER TO rekuuser;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.role ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_owner_rel; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.user_owner_rel (
    id bigint NOT NULL,
    id_owner bigint,
    id_users bigint,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.user_owner_rel OWNER TO rekuuser;

--
-- Name: user_owner_rel_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.user_owner_rel ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.user_owner_rel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: tracking; Owner: guillermo
--

CREATE TABLE tracking.users (
    id bigint NOT NULL,
    id_role bigint,
    name character varying(255) NOT NULL,
    email text NOT NULL,
    pass text NOT NULL,
    createdat timestamp without time zone,
    updatedat timestamp without time zone,
    deletedat timestamp without time zone
);


ALTER TABLE tracking.users OWNER TO rekuuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: tracking; Owner: guillermo
--

ALTER TABLE tracking.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME tracking.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: geofence id; Type: DEFAULT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.geofence ALTER COLUMN id SET DEFAULT nextval('tracking.geofence_id_seq'::regclass);


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: guillermo
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: geofence; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.geofence (id, id_owner, geom, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: gps_device; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.gps_device (id, createdat, updatedat, deletedat, name, phone, ready, imei) FROM stdin;
\.


--
-- Data for Name: gps_device_track; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.gps_device_track (id, id_gps_device, lat, lon, createdat, updatedat, deletedat, speed, "timestamp") FROM stdin;
\.


--
-- Data for Name: ibeacon_device; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.ibeacon_device (id, createdat, updatedat, deletedat, name) FROM stdin;
\.


--
-- Data for Name: ibeacon_device_track; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.ibeacon_device_track (id, id_ibeacon_device, id_ibeacon_gateway, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: ibeacon_gateway; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.ibeacon_gateway (id, lat, lon, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: ibeacon_gps_owner_rel; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.ibeacon_gps_owner_rel (id, id_ibeacon_device, id_gps_device, id_owner, name, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: owner; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.owner (id, name, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.role (id, name, createdat, updatedat, deletedat) FROM stdin;
2	Usuario	2022-06-03 06:43:09.289	2022-06-03 06:43:09.289	2022-06-03 06:43:15.861
1	Administrador	2022-05-29 04:44:26.732	2022-06-03 06:50:49.605	\N
\.


--
-- Data for Name: user_owner_rel; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.user_owner_rel (id, id_owner, id_users, createdat, updatedat, deletedat) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: tracking; Owner: guillermo
--

COPY tracking.users (id, id_role, name, email, pass, createdat, updatedat, deletedat) FROM stdin;
1	1	Administrador	guillermojgvc@gmail.com	U2FsdGVkX196g04REMb5ZtAgAW59mU5kDUESyYkSGeo=	2022-05-29 04:44:00.018	2022-05-29 05:02:39.261	\N
\.


--
-- Name: geofence_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.geofence_id_seq', 1, false);


--
-- Name: gps_device_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.gps_device_id_seq', 1, true);


--
-- Name: gps_device_track_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.gps_device_track_id_seq', 1, true);


--
-- Name: ibeacon_device_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.ibeacon_device_id_seq', 1, false);


--
-- Name: ibeacon_device_track_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.ibeacon_device_track_id_seq', 1, false);


--
-- Name: ibeacon_gateway_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.ibeacon_gateway_id_seq', 1, false);


--
-- Name: ibeacon_gps_owner_rel_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.ibeacon_gps_owner_rel_id_seq', 1, true);


--
-- Name: owner_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.owner_id_seq', 1, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.role_id_seq', 2, true);


--
-- Name: user_owner_rel_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.user_owner_rel_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: tracking; Owner: guillermo
--

SELECT pg_catalog.setval('tracking.users_id_seq', 2, true);


--
-- Name: geofence geofence_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.geofence
    ADD CONSTRAINT geofence_pk PRIMARY KEY (id);


--
-- Name: gps_device gps_device_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.gps_device
    ADD CONSTRAINT gps_device_pk PRIMARY KEY (id);


--
-- Name: gps_device_track gps_device_track_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.gps_device_track
    ADD CONSTRAINT gps_device_track_pk PRIMARY KEY (id);


--
-- Name: ibeacon_device ibeacon_device_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_device
    ADD CONSTRAINT ibeacon_device_pk PRIMARY KEY (id);


--
-- Name: ibeacon_device_track ibeacon_device_track_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_device_track
    ADD CONSTRAINT ibeacon_device_track_pk PRIMARY KEY (id);


--
-- Name: ibeacon_gateway ibeacon_gateway_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_gateway
    ADD CONSTRAINT ibeacon_gateway_pk PRIMARY KEY (id);


--
-- Name: ibeacon_gps_owner_rel ibeacon_gps_owner_rel_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_gps_owner_rel
    ADD CONSTRAINT ibeacon_gps_owner_rel_pk PRIMARY KEY (id);


--
-- Name: owner owner_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.owner
    ADD CONSTRAINT owner_pk PRIMARY KEY (id);


--
-- Name: role role_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.role
    ADD CONSTRAINT role_pk PRIMARY KEY (id);


--
-- Name: user_owner_rel user_owner_rel_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.user_owner_rel
    ADD CONSTRAINT user_owner_rel_pk PRIMARY KEY (id);


--
-- Name: users user_pk; Type: CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.users
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- Name: ibeacon_gps_owner_rel gps_device_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_gps_owner_rel
    ADD CONSTRAINT gps_device_fk FOREIGN KEY (id_gps_device) REFERENCES tracking.gps_device(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: gps_device_track gps_device_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.gps_device_track
    ADD CONSTRAINT gps_device_fk FOREIGN KEY (id_gps_device) REFERENCES tracking.gps_device(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ibeacon_gps_owner_rel ibeacon_device_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_gps_owner_rel
    ADD CONSTRAINT ibeacon_device_fk FOREIGN KEY (id_ibeacon_device) REFERENCES tracking.ibeacon_device(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ibeacon_device_track ibeacon_device_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_device_track
    ADD CONSTRAINT ibeacon_device_fk FOREIGN KEY (id_ibeacon_device) REFERENCES tracking.ibeacon_device(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ibeacon_device_track ibeacon_gateway_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_device_track
    ADD CONSTRAINT ibeacon_gateway_fk FOREIGN KEY (id_ibeacon_gateway) REFERENCES tracking.ibeacon_gateway(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ibeacon_gps_owner_rel owner_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.ibeacon_gps_owner_rel
    ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner) REFERENCES tracking.owner(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_owner_rel owner_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.user_owner_rel
    ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner) REFERENCES tracking.owner(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: geofence owner_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.geofence
    ADD CONSTRAINT owner_fk FOREIGN KEY (id_owner) REFERENCES tracking.owner(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users role_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.users
    ADD CONSTRAINT role_fk FOREIGN KEY (id_role) REFERENCES tracking.role(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_owner_rel users_fk; Type: FK CONSTRAINT; Schema: tracking; Owner: guillermo
--

ALTER TABLE ONLY tracking.user_owner_rel
    ADD CONSTRAINT users_fk FOREIGN KEY (id_users) REFERENCES tracking.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

