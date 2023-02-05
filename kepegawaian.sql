--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 13.1

-- Started on 2022-12-12 11:50:10

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
-- TOC entry 608 (class 1247 OID 41024)
-- Name: hubungan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.hubungan AS ENUM (
    'suami/istri',
    'anak',
    'ayah',
    'ibu',
    'saudara laki-laki',
    'saudara perempuan'
);


ALTER TYPE public.hubungan OWNER TO postgres;

--
-- TOC entry 611 (class 1247 OID 41038)
-- Name: jenis_kelamin; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.jenis_kelamin AS ENUM (
    'L',
    'P'
);


ALTER TYPE public.jenis_kelamin OWNER TO postgres;

--
-- TOC entry 614 (class 1247 OID 41044)
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'admin',
    'pegawai'
);


ALTER TYPE public.role OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 41049)
-- Name: cuti; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cuti (
    id integer NOT NULL,
    jumlah integer,
    tanggal_awal date,
    tanggal_akhir date,
    status character(1),
    id_pegawai integer
);


ALTER TABLE public.cuti OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 41052)
-- Name: cuti_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cuti_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cuti_id_seq OWNER TO postgres;

--
-- TOC entry 2936 (class 0 OID 0)
-- Dependencies: 197
-- Name: cuti_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cuti_id_seq OWNED BY public.cuti.id;


--
-- TOC entry 198 (class 1259 OID 41054)
-- Name: jabatan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jabatan (
    id integer NOT NULL,
    nama character varying(100)
);


ALTER TABLE public.jabatan OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 41057)
-- Name: jabatan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jabatan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jabatan_id_seq OWNER TO postgres;

--
-- TOC entry 2937 (class 0 OID 0)
-- Dependencies: 199
-- Name: jabatan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jabatan_id_seq OWNED BY public.jabatan.id;


--
-- TOC entry 200 (class 1259 OID 41059)
-- Name: jenis_pegawai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jenis_pegawai (
    id integer NOT NULL,
    jenis character varying(100)
);


ALTER TABLE public.jenis_pegawai OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 41062)
-- Name: jenis_pegawai_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jenis_pegawai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jenis_pegawai_id_seq OWNER TO postgres;

--
-- TOC entry 2938 (class 0 OID 0)
-- Dependencies: 201
-- Name: jenis_pegawai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jenis_pegawai_id_seq OWNED BY public.jenis_pegawai.id;


--
-- TOC entry 202 (class 1259 OID 41064)
-- Name: keluarga; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keluarga (
    id integer NOT NULL,
    hubungan public.hubungan,
    nama character varying(100),
    id_pegawai integer
);


ALTER TABLE public.keluarga OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 41067)
-- Name: keluarga_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.keluarga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.keluarga_id_seq OWNER TO postgres;

--
-- TOC entry 2939 (class 0 OID 0)
-- Dependencies: 203
-- Name: keluarga_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.keluarga_id_seq OWNED BY public.keluarga.id;


--
-- TOC entry 213 (class 1259 OID 49342)
-- Name: mutasi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mutasi (
    id integer NOT NULL,
    jenis character varying(100),
    tanggal date,
    tujuan character varying(100),
    nomor_sk character varying(75),
    tanggal_sk date,
    file_sk character varying(255),
    id_pegawai integer
);


ALTER TABLE public.mutasi OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49340)
-- Name: mutasi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mutasi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mutasi_id_seq OWNER TO postgres;

--
-- TOC entry 2940 (class 0 OID 0)
-- Dependencies: 212
-- Name: mutasi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mutasi_id_seq OWNED BY public.mutasi.id;


--
-- TOC entry 204 (class 1259 OID 41069)
-- Name: pegawai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pegawai (
    id integer NOT NULL,
    nip character varying(20),
    nama character varying(100),
    tempat_lahir character varying(50),
    tanggal_lahir date,
    agama character varying(10),
    no_telpon character varying(13),
    email character varying(50),
    id_jabatan integer,
    id_jenis_pegawai integer,
    id_status_pegawai integer,
    jenis_kelamin public.jenis_kelamin,
    id_user integer
);


ALTER TABLE public.pegawai OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 41072)
-- Name: pegawai_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pegawai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pegawai_id_seq OWNER TO postgres;

--
-- TOC entry 2941 (class 0 OID 0)
-- Dependencies: 205
-- Name: pegawai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pegawai_id_seq OWNED BY public.pegawai.id;


--
-- TOC entry 211 (class 1259 OID 41150)
-- Name: pendidikan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pendidikan (
    id integer NOT NULL,
    universitas_sekolah character varying(50),
    jurusan character varying(50),
    tanggal_masuk date,
    tanggal_lulus date,
    gelar character varying(50),
    nilai character varying(4),
    id_pegawai integer,
    jenjang character varying(2)
);


ALTER TABLE public.pendidikan OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 41148)
-- Name: pendidikan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pendidikan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pendidikan_id_seq OWNER TO postgres;

--
-- TOC entry 2942 (class 0 OID 0)
-- Dependencies: 210
-- Name: pendidikan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pendidikan_id_seq OWNED BY public.pendidikan.id;


--
-- TOC entry 215 (class 1259 OID 49358)
-- Name: riwayat_jabatan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_jabatan (
    id integer NOT NULL,
    id_pegawai integer,
    id_jabatan integer
);


ALTER TABLE public.riwayat_jabatan OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 49356)
-- Name: riwayat_jabatan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.riwayat_jabatan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.riwayat_jabatan_id_seq OWNER TO postgres;

--
-- TOC entry 2943 (class 0 OID 0)
-- Dependencies: 214
-- Name: riwayat_jabatan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.riwayat_jabatan_id_seq OWNED BY public.riwayat_jabatan.id;


--
-- TOC entry 206 (class 1259 OID 41077)
-- Name: status_pegawai; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status_pegawai (
    id integer NOT NULL,
    status character varying(100)
);


ALTER TABLE public.status_pegawai OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 41080)
-- Name: status_pegawai_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_pegawai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_pegawai_id_seq OWNER TO postgres;

--
-- TOC entry 2944 (class 0 OID 0)
-- Dependencies: 207
-- Name: status_pegawai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_pegawai_id_seq OWNED BY public.status_pegawai.id;


--
-- TOC entry 208 (class 1259 OID 41082)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(100),
    password character varying(255),
    role public.role,
    token text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 41088)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2945 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2750 (class 2604 OID 41090)
-- Name: cuti id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuti ALTER COLUMN id SET DEFAULT nextval('public.cuti_id_seq'::regclass);


--
-- TOC entry 2751 (class 2604 OID 41091)
-- Name: jabatan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jabatan ALTER COLUMN id SET DEFAULT nextval('public.jabatan_id_seq'::regclass);


--
-- TOC entry 2752 (class 2604 OID 41092)
-- Name: jenis_pegawai id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenis_pegawai ALTER COLUMN id SET DEFAULT nextval('public.jenis_pegawai_id_seq'::regclass);


--
-- TOC entry 2753 (class 2604 OID 41093)
-- Name: keluarga id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keluarga ALTER COLUMN id SET DEFAULT nextval('public.keluarga_id_seq'::regclass);


--
-- TOC entry 2758 (class 2604 OID 49345)
-- Name: mutasi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mutasi ALTER COLUMN id SET DEFAULT nextval('public.mutasi_id_seq'::regclass);


--
-- TOC entry 2754 (class 2604 OID 41094)
-- Name: pegawai id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai ALTER COLUMN id SET DEFAULT nextval('public.pegawai_id_seq'::regclass);


--
-- TOC entry 2757 (class 2604 OID 41153)
-- Name: pendidikan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pendidikan ALTER COLUMN id SET DEFAULT nextval('public.pendidikan_id_seq'::regclass);


--
-- TOC entry 2759 (class 2604 OID 49361)
-- Name: riwayat_jabatan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_jabatan ALTER COLUMN id SET DEFAULT nextval('public.riwayat_jabatan_id_seq'::regclass);


--
-- TOC entry 2755 (class 2604 OID 41095)
-- Name: status_pegawai id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_pegawai ALTER COLUMN id SET DEFAULT nextval('public.status_pegawai_id_seq'::regclass);


--
-- TOC entry 2756 (class 2604 OID 41096)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2911 (class 0 OID 41049)
-- Dependencies: 196
-- Data for Name: cuti; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuti (id, jumlah, tanggal_awal, tanggal_akhir, status, id_pegawai) FROM stdin;
1	1	2022-12-11	2022-12-12	N	1
\.


--
-- TOC entry 2913 (class 0 OID 41054)
-- Dependencies: 198
-- Data for Name: jabatan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jabatan (id, nama) FROM stdin;
7	Manager
8	Supervisor
10	General Manager
9	Officer
\.


--
-- TOC entry 2915 (class 0 OID 41059)
-- Dependencies: 200
-- Data for Name: jenis_pegawai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jenis_pegawai (id, jenis) FROM stdin;
1	Tetap
2	Ojt/Magang
\.


--
-- TOC entry 2917 (class 0 OID 41064)
-- Dependencies: 202
-- Data for Name: keluarga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keluarga (id, hubungan, nama, id_pegawai) FROM stdin;
1	suami/istri	Rina Dwi Aryani	1
2	anak	Nurmawati	1
\.


--
-- TOC entry 2928 (class 0 OID 49342)
-- Dependencies: 213
-- Data for Name: mutasi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mutasi (id, jenis, tanggal, tujuan, nomor_sk, tanggal_sk, file_sk, id_pegawai) FROM stdin;
2	Pengangkatan Jabatan	2022-08-10		SK.17/M/I/8	2022-08-10	uploads/file_sk1670766539140.pdf	1
\.


--
-- TOC entry 2919 (class 0 OID 41069)
-- Dependencies: 204
-- Data for Name: pegawai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pegawai (id, nip, nama, tempat_lahir, tanggal_lahir, agama, no_telpon, email, id_jabatan, id_jenis_pegawai, id_status_pegawai, jenis_kelamin, id_user) FROM stdin;
1	2000000120005	Deri Setiawan	Lampung	1998-11-05	Islam	089712345678	deri@mail.com	10	1	1	L	1
\.


--
-- TOC entry 2926 (class 0 OID 41150)
-- Dependencies: 211
-- Data for Name: pendidikan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pendidikan (id, universitas_sekolah, jurusan, tanggal_masuk, tanggal_lulus, gelar, nilai, id_pegawai, jenjang) FROM stdin;
1	Universitas Lampung	Ekonomi	2015-07-20	2019-10-20	Sarjana Ekonomi	3.56	1	S1
2	Universitas Sriwijaya	Ekonomi dan Statiska	2019-11-10	2022-10-11	Magister Ekonomi	3.8	1	S2
\.


--
-- TOC entry 2930 (class 0 OID 49358)
-- Dependencies: 215
-- Data for Name: riwayat_jabatan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_jabatan (id, id_pegawai, id_jabatan) FROM stdin;
1	1	7
2	1	10
\.


--
-- TOC entry 2921 (class 0 OID 41077)
-- Dependencies: 206
-- Data for Name: status_pegawai; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status_pegawai (id, status) FROM stdin;
1	Aktif
2	Non Aktif
\.


--
-- TOC entry 2923 (class 0 OID 41082)
-- Dependencies: 208
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password, role, token) FROM stdin;
1	admin	$2a$12$.Gq7wO.EVSgrCT3cS5r0fev3lawHEC1ZaJBnbMecYqAg5ibJa1f1a	admin	\N
\.


--
-- TOC entry 2946 (class 0 OID 0)
-- Dependencies: 197
-- Name: cuti_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cuti_id_seq', 1, true);


--
-- TOC entry 2947 (class 0 OID 0)
-- Dependencies: 199
-- Name: jabatan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jabatan_id_seq', 10, true);


--
-- TOC entry 2948 (class 0 OID 0)
-- Dependencies: 201
-- Name: jenis_pegawai_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jenis_pegawai_id_seq', 2, true);


--
-- TOC entry 2949 (class 0 OID 0)
-- Dependencies: 203
-- Name: keluarga_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.keluarga_id_seq', 2, true);


--
-- TOC entry 2950 (class 0 OID 0)
-- Dependencies: 212
-- Name: mutasi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mutasi_id_seq', 2, true);


--
-- TOC entry 2951 (class 0 OID 0)
-- Dependencies: 205
-- Name: pegawai_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pegawai_id_seq', 1, true);


--
-- TOC entry 2952 (class 0 OID 0)
-- Dependencies: 210
-- Name: pendidikan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pendidikan_id_seq', 2, true);


--
-- TOC entry 2953 (class 0 OID 0)
-- Dependencies: 214
-- Name: riwayat_jabatan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.riwayat_jabatan_id_seq', 2, true);


--
-- TOC entry 2954 (class 0 OID 0)
-- Dependencies: 207
-- Name: status_pegawai_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_pegawai_id_seq', 2, true);


--
-- TOC entry 2955 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- TOC entry 2761 (class 2606 OID 41098)
-- Name: cuti cuti_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuti
    ADD CONSTRAINT cuti_pkey PRIMARY KEY (id);


--
-- TOC entry 2763 (class 2606 OID 41100)
-- Name: jabatan jabatan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jabatan
    ADD CONSTRAINT jabatan_pkey PRIMARY KEY (id);


--
-- TOC entry 2765 (class 2606 OID 41102)
-- Name: jenis_pegawai jenis_pegawai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jenis_pegawai
    ADD CONSTRAINT jenis_pegawai_pkey PRIMARY KEY (id);


--
-- TOC entry 2767 (class 2606 OID 41104)
-- Name: keluarga keluarga_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keluarga
    ADD CONSTRAINT keluarga_pkey PRIMARY KEY (id);


--
-- TOC entry 2777 (class 2606 OID 49350)
-- Name: mutasi mutasi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mutasi
    ADD CONSTRAINT mutasi_pkey PRIMARY KEY (id);


--
-- TOC entry 2769 (class 2606 OID 41106)
-- Name: pegawai pegawai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT pegawai_pkey PRIMARY KEY (id) INCLUDE (nip);


--
-- TOC entry 2775 (class 2606 OID 41155)
-- Name: pendidikan pendidikan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pendidikan
    ADD CONSTRAINT pendidikan_pkey PRIMARY KEY (id);


--
-- TOC entry 2779 (class 2606 OID 49363)
-- Name: riwayat_jabatan riwayat_jabatan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_jabatan
    ADD CONSTRAINT riwayat_jabatan_pkey PRIMARY KEY (id);


--
-- TOC entry 2771 (class 2606 OID 41110)
-- Name: status_pegawai status_pegawai_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_pegawai
    ADD CONSTRAINT status_pegawai_pkey PRIMARY KEY (id);


--
-- TOC entry 2773 (class 2606 OID 41112)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2782 (class 2606 OID 41113)
-- Name: pegawai fkey_jabatan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT fkey_jabatan FOREIGN KEY (id_jabatan) REFERENCES public.jabatan(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 2789 (class 2606 OID 49369)
-- Name: riwayat_jabatan fkey_jabatan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_jabatan
    ADD CONSTRAINT fkey_jabatan FOREIGN KEY (id_jabatan) REFERENCES public.jabatan(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2783 (class 2606 OID 41118)
-- Name: pegawai fkey_jenis_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT fkey_jenis_pegawai FOREIGN KEY (id_jenis_pegawai) REFERENCES public.jenis_pegawai(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 2780 (class 2606 OID 41128)
-- Name: cuti fkey_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuti
    ADD CONSTRAINT fkey_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2781 (class 2606 OID 41133)
-- Name: keluarga fkey_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keluarga
    ADD CONSTRAINT fkey_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2786 (class 2606 OID 41156)
-- Name: pendidikan fkey_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pendidikan
    ADD CONSTRAINT fkey_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2787 (class 2606 OID 49351)
-- Name: mutasi fkey_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mutasi
    ADD CONSTRAINT fkey_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2788 (class 2606 OID 49364)
-- Name: riwayat_jabatan fkey_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_jabatan
    ADD CONSTRAINT fkey_pegawai FOREIGN KEY (id_pegawai) REFERENCES public.pegawai(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2784 (class 2606 OID 41138)
-- Name: pegawai fkey_status_pegawai; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT fkey_status_pegawai FOREIGN KEY (id_status_pegawai) REFERENCES public.status_pegawai(id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;


--
-- TOC entry 2785 (class 2606 OID 41143)
-- Name: pegawai fkey_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pegawai
    ADD CONSTRAINT fkey_user FOREIGN KEY (id_user) REFERENCES public."user"(id) NOT VALID;


-- Completed on 2022-12-12 11:50:17

--
-- PostgreSQL database dump complete
--

