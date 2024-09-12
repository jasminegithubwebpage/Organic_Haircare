--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    info text,
    price numeric(10,2),
    image_url text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, info, price, image_url) FROM stdin;
1	Organic Argan Oil	Rich in essential fatty acids and vitamin E. Moisturizes and revitalizes dry hair.	19.99	/assets/img1.jpg
3	Aloe Vera Hair Treatment	Soothes the scalp and promotes healthy hair growth with pure aloe vera extract.	17.49	/assets/img3.jpg
4	Jojoba Oil	Hydrates and adds shine while balancing natural oils in the scalp.	21.99	/assets/img4.jpg
5	Tea Tree Oil Blend	Purifies the scalp and helps to reduce dandruff with tea tree oil.	16.89	/assets/img5.jpg
6	Rosemary Mint Hair Oil	Stimulates hair follicles and provides a refreshing minty scent.	18.59	/assets/img6.jpg
2	Coconut Oil Infusion	Deeply nourishes and strengthens hair with natural coconut oil.	14.99	/assets/img2.jfif
7	Castor Oil Elixir	Strengthens and conditions hair, promoting faster growth with castor oil.	12.99	/assets/img7.webp
8	Lavender Hair Oil	Calms and relaxes with lavender essential oil while improving hair texture.	22.49	/assets/img8.jfif
9	Hemp Seed Oil	Rich in omega fatty acids, nourishes and strengthens hair.	20.29	/assets/img9.png
10	Vitamin E Hair Serum	Protects and repairs damaged hair with concentrated vitamin E.	15.99	/assets/img10.webp
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 11, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

