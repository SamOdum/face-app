--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg16.04+1)
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-16 12:34:08

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

ALTER TABLE IF EXISTS ONLY public.gifs DROP CONSTRAINT IF EXISTS gifs_userid_fkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_userid_fkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_gifid_fkey;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_articleid_fkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_userid_fkey;
ALTER TABLE IF EXISTS ONLY public.gifs DROP CONSTRAINT IF EXISTS gifs_pkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_pkey;
ALTER TABLE IF EXISTS ONLY public.employees DROP CONSTRAINT IF EXISTS employees_email_key;
ALTER TABLE IF EXISTS ONLY public.comments DROP CONSTRAINT IF EXISTS comments_pkey;
ALTER TABLE IF EXISTS ONLY public.articles DROP CONSTRAINT IF EXISTS articles_pkey;
ALTER TABLE IF EXISTS public.gifs ALTER COLUMN gifid DROP DEFAULT;
ALTER TABLE IF EXISTS public.employees ALTER COLUMN userid DROP DEFAULT;
ALTER TABLE IF EXISTS public.comments ALTER COLUMN commentid DROP DEFAULT;
ALTER TABLE IF EXISTS public.articles ALTER COLUMN articleid DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.gifs_gifid_seq;
DROP TABLE IF EXISTS public.gifs;
DROP SEQUENCE IF EXISTS public.employees_userid_seq;
DROP TABLE IF EXISTS public.employees;
DROP SEQUENCE IF EXISTS public.comments_commentid_seq;
DROP TABLE IF EXISTS public.comments;
DROP SEQUENCE IF EXISTS public.articles_articleid_seq;
DROP TABLE IF EXISTS public.articles;
SET default_tablespace = '';

--
-- TOC entry 201 (class 1259 OID 5893048)
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    articleid integer NOT NULL,
    title text NOT NULL,
    article text NOT NULL,
    createdon timestamp without time zone DEFAULT now(),
    userid integer NOT NULL,
    publicid character varying(225)
);


--
-- TOC entry 200 (class 1259 OID 5893046)
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 200
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- TOC entry 203 (class 1259 OID 5893094)
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    commentid integer NOT NULL,
    comment text NOT NULL,
    createdon timestamp without time zone DEFAULT now(),
    userid integer NOT NULL,
    articleid integer,
    gifid integer
);


--
-- TOC entry 202 (class 1259 OID 5893092)
-- Name: comments_commentid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3872 (class 0 OID 0)
-- Dependencies: 202
-- Name: comments_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_commentid_seq OWNED BY public.comments.commentid;


--
-- TOC entry 197 (class 1259 OID 5892949)
-- Name: employees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employees (
    userid integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(225) NOT NULL,
    email character varying(225) NOT NULL,
    password character varying(225) NOT NULL,
    gender character varying(225) NOT NULL,
    jobrole character varying(225) NOT NULL,
    department character varying(225) NOT NULL,
    address character varying(225) NOT NULL,
    role character varying(225) NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 5892947)
-- Name: employees_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employees_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3873 (class 0 OID 0)
-- Dependencies: 196
-- Name: employees_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employees_userid_seq OWNED BY public.employees.userid;


--
-- TOC entry 199 (class 1259 OID 5893023)
-- Name: gifs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gifs (
    gifid integer NOT NULL,
    title text NOT NULL,
    imageurl text NOT NULL,
    createdon timestamp without time zone DEFAULT now(),
    userid integer NOT NULL,
    publicid character varying(225)
);


--
-- TOC entry 198 (class 1259 OID 5893021)
-- Name: gifs_gifid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gifs_gifid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3874 (class 0 OID 0)
-- Dependencies: 198
-- Name: gifs_gifid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gifs_gifid_seq OWNED BY public.gifs.gifid;


--
-- TOC entry 3726 (class 2604 OID 5893051)
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- TOC entry 3728 (class 2604 OID 5893097)
-- Name: comments commentid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN commentid SET DEFAULT nextval('public.comments_commentid_seq'::regclass);


--
-- TOC entry 3723 (class 2604 OID 5892952)
-- Name: employees userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees ALTER COLUMN userid SET DEFAULT nextval('public.employees_userid_seq'::regclass);


--
-- TOC entry 3724 (class 2604 OID 5893026)
-- Name: gifs gifid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gifs ALTER COLUMN gifid SET DEFAULT nextval('public.gifs_gifid_seq'::regclass);


--
-- TOC entry 3737 (class 2606 OID 5893057)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- TOC entry 3739 (class 2606 OID 5893103)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (commentid);


--
-- TOC entry 3731 (class 2606 OID 5892959)
-- Name: employees employees_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- TOC entry 3733 (class 2606 OID 5892957)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (userid);


--
-- TOC entry 3735 (class 2606 OID 5893032)
-- Name: gifs gifs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_pkey PRIMARY KEY (gifid);


--
-- TOC entry 3741 (class 2606 OID 5893058)
-- Name: articles articles_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_userid_fkey FOREIGN KEY (userid) REFERENCES public.employees(userid) ON DELETE CASCADE;


--
-- TOC entry 3743 (class 2606 OID 5893109)
-- Name: comments comments_articleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_articleid_fkey FOREIGN KEY (articleid) REFERENCES public.articles(articleid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3744 (class 2606 OID 5893114)
-- Name: comments comments_gifid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_gifid_fkey FOREIGN KEY (gifid) REFERENCES public.gifs(gifid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3742 (class 2606 OID 5893104)
-- Name: comments comments_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_userid_fkey FOREIGN KEY (userid) REFERENCES public.employees(userid) ON DELETE CASCADE;


--
-- TOC entry 3740 (class 2606 OID 5893033)
-- Name: gifs gifs_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gifs
    ADD CONSTRAINT gifs_userid_fkey FOREIGN KEY (userid) REFERENCES public.employees(userid) ON DELETE CASCADE;


-- Completed on 2019-11-16 12:34:56

--
-- PostgreSQL database dump complete
--

