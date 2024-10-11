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
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text NOT NULL,
    role character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_users_id_seq OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: product_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_ingredients (
    id integer,
    ingredient text[]
);


ALTER TABLE public.product_ingredients OWNER TO postgres;

--
-- Name: product_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_reviews (
    review_id integer NOT NULL,
    id integer,
    user_name character varying(255),
    comment text,
    likes integer,
    dislikes integer,
    rating integer
);


ALTER TABLE public.product_reviews OWNER TO postgres;

--
-- Name: product_reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_reviews_review_id_seq OWNER TO postgres;

--
-- Name: product_reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_reviews_review_id_seq OWNED BY public.product_reviews.review_id;


--
-- Name: product_sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_sales (
    sale_id integer NOT NULL,
    product_id integer,
    quantity_sold integer NOT NULL,
    sale_date date DEFAULT CURRENT_DATE,
    total_sale_value numeric(10,2),
    monthly_sale integer DEFAULT 0,
    total_sale integer DEFAULT 0
);


ALTER TABLE public.product_sales OWNER TO postgres;

--
-- Name: product_sales_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_sales_sale_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_sales_sale_id_seq OWNER TO postgres;

--
-- Name: product_sales_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_sales_sale_id_seq OWNED BY public.product_sales.sale_id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    info text,
    price numeric(10,2),
    image_url text,
    count integer,
    discount numeric(5,2),
    added_date date
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
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: product_reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_reviews ALTER COLUMN review_id SET DEFAULT nextval('public.product_reviews_review_id_seq'::regclass);


--
-- Name: product_sales sale_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales ALTER COLUMN sale_id SET DEFAULT nextval('public.product_sales_sale_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_users (id, username, password, role, email, created_at) FROM stdin;
1	admin_user	admin123	admin	admin@example.com	2024-09-24 23:31:03.143406
2	superadmin_user	superadmin123	superadmin	superadmin@example.com	2024-09-24 23:31:03.669914
\.


--
-- Data for Name: product_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_ingredients (id, ingredient) FROM stdin;
1	{"Argan Oil","Vitamin E","Omega-6 Fatty Acids"}
2	{"Coconut Oil","Vitamin E","Capric Acid"}
3	{"Aloe Vera Extract",Glycerin,Water}
4	{"Jojoba Oil","Vitamin E","Fatty Acids"}
5	{"Tea Tree Oil","Eucalyptus Oil","Peppermint Oil"}
6	{"Rosemary Oil","Peppermint Oil","Castor Oil"}
7	{"Castor Oil","Vitamin E","Omega-9 Fatty Acids"}
8	{"Lavender Oil","Jojoba Oil","Coconut Oil"}
9	{"Hemp Seed Oil","Omega-3 Fatty Acids","Vitamin E"}
10	{"Vitamin E","Argan Oil","Aloe Vera Extract"}
11	{"Peppermint Oil","Tea Tree Oil","Coconut Oil"}
12	{"Chamomile Extract","Lavender Oil","Aloe Vera"}
13	{"Ginseng Extract","Aloe Vera",Water}
14	{"Hyaluronic Acid",Water,Glycerin}
15	{"Amla Oil","Vitamin C","Sesame Oil"}
16	{"Black Seed Oil","Jojoba Oil","Olive Oil"}
17	{Keratin,"Argan Oil","Aloe Vera"}
18	{"Argan Oil","Rose Oil","Vitamin E"}
19	{Biotin,"Vitamin B7","Coconut Oil"}
20	{"Jasmine Oil","Jojoba Oil","Vitamin E"}
\.


--
-- Data for Name: product_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_reviews (review_id, id, user_name, comment, likes, dislikes, rating) FROM stdin;
6	3	EveGardner	Decent product but too pricey	6	1	3
3	2	AliceWonder	Not satisfied didnt work as expected	5	6	2
5	3	MarkTwain	Loved it Great for hair growth	9	0	5
4	2	BobBuilder	The product smells great but I havent seen any results yet	4	3	3
32	\N	User1	Good	0	0	5
33	\N	User1	Good loved it	0	0	5
34	\N	User1	fine	0	0	5
35	\N	abc	Good Product! Loved it so much..	0	0	5
36	\N	User1	Good Product! Super	0	0	5
37	\N	abc	Good one	0	0	5
38	\N	User1	good	0	0	5
39	\N	User1	Good super	0	0	5
40	3	User1	Good Super	0	0	5
41	8	abcd	Good Product! Thanks 	0	0	5
\.


--
-- Data for Name: product_sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_sales (sale_id, product_id, quantity_sold, sale_date, total_sale_value, monthly_sale, total_sale) FROM stdin;
1	1	5	2024-09-21	99.95	0	0
2	1	5	2024-09-21	99.95	0	0
3	2	3	2024-09-21	44.97	0	0
4	3	8	2024-09-21	139.92	0	0
5	4	2	2024-09-21	43.98	0	0
6	5	7	2024-09-21	118.23	0	0
7	6	10	2024-09-21	185.90	0	0
8	7	4	2024-09-21	51.96	0	0
9	8	9	2024-09-21	202.41	0	0
10	9	6	2024-09-21	121.74	0	0
11	10	12	2024-09-21	191.88	0	0
12	11	7	2024-09-21	125.93	0	0
13	12	5	2024-09-21	67.45	0	0
14	13	4	2024-09-21	99.96	0	0
15	14	8	2024-09-21	155.92	0	0
16	15	2	2024-09-21	32.58	0	0
17	16	6	2024-09-21	143.94	0	0
18	17	10	2024-09-21	182.90	0	0
19	18	3	2024-09-21	61.47	0	0
20	19	9	2024-09-21	133.11	0	0
21	20	11	2024-09-21	241.89	0	0
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, info, price, image_url, count, discount, added_date) FROM stdin;
1	Organic Argan Oil	Rich in essential fatty acids and vitamin E. Moisturizes and revitalizes dry hair.	19.99	/assets/img1.jpg	50	14.38	2024-09-01
2	Coconut Oil Infusion	Deeply nourishes and strengthens hair with natural coconut oil.	14.99	/assets/img2.jfif	40	16.61	2024-09-02
3	Aloe Vera Hair Treatment	Soothes the scalp and promotes healthy hair growth with pure aloe vera extract.	17.49	/assets/img3.jpg	30	14.21	2024-09-03
4	Jojoba Oil	Hydrates and adds shine while balancing natural oils in the scalp.	21.99	/assets/img4.jpg	20	6.84	2024-09-04
5	Tea Tree Oil Blend	Purifies the scalp and helps to reduce dandruff with tea tree oil.	16.89	/assets/img5.jpg	15	18.25	2024-09-05
6	Rosemary Mint Hair Oil	Stimulates hair follicles and provides a refreshing minty scent.	18.59	/assets/img6.jpg	25	12.03	2024-09-06
7	Castor Oil Elixir	Strengthens and conditions hair, promoting faster growth with castor oil.	12.99	/assets/img7.webp	35	14.58	2024-09-07
8	Lavender Hair Oil	Calms and relaxes with lavender essential oil while improving hair texture.	22.49	/assets/img8.jfif	10	5.29	2024-09-08
22	Lice Remover Oil	This is good for remove lices	100.00	C:\\fakepath\\shin-chan-shinchan-nohara-shiro-tv-series-3840x2160-6865.jpg	2	20.00	2024-10-05
29	Jasmine R	hugffyufty	100.00	/assets/img15.jpg	5	10.00	2024-10-06
11	Peppermint Scalp Treatment	Invigorates the scalp with refreshing peppermint oil, promoting a revitalizing and cool sensation for healthier hair.	17.99	/assets/img11.jfif	45	17.80	2024-09-11
9	Hemp Seed Oil	Rich in omega fatty acids, nourishes and strengthens hair.	20.29	/assets/img9.png	18	18.02	2024-09-09
10	Vitamin E Hair Serum	Protects and repairs damaged hair with concentrated vitamin E.	15.99	/assets/img10.webp	28	11.45	2024-09-10
12	Chamomile Hair Soother	Calms and soothes the scalp with chamomile extract, perfect for reducing irritation and enhancing hair softness.	13.49	/assets/img12.jpg	50	19.74	2024-09-12
13	Ginseng Hair Tonic	Stimulates hair growth and revitalizes hair follicles with natural ginseng root extract for a stronger and healthier mane.	24.99	/assets/img13.jpg	22	9.03	2024-09-13
14	Hyaluronic Acid Serum	Deeply hydrates and plumps your hair with hyaluronic acid, offering intense moisture and a youthful look.	19.49	/assets/img14.jpg	12	12.97	2024-09-14
15	Amla Hair Oil	Strengthens hair from root to tip with vitamin C-rich amla oil, promoting shine and preventing premature graying.	16.29	/assets/img15.jpg	30	14.56	2024-09-15
16	Black Seed Oil	Nourishes and rejuvenates your hair with black seed oil, known for its rich nutrients and restorative properties.	23.99	/assets/img16.jpg	20	10.60	2024-08-30
17	Keratin Repair Treatment	Restores and fortifies damaged hair with keratin, providing essential repair and maintaining hair health and elasticity.	18.29	/assets/img17.jpg	25	19.84	2024-08-29
18	Argan & Rose Oil Blend	Combines the benefits of argan and rose oils to deeply condition and add shine, leaving hair silky and smooth.	20.49	/assets/img18.jpg	15	7.85	2024-08-28
19	Biotin Hair Supplement	Supports overall hair health with biotin and essential nutrients, aiding in stronger and thicker hair growth.	14.79	/assets/img19.jpg	40	18.55	2024-08-27
20	Jasmine Hair Elixir	Infuses hair with a calming jasmine scent while deeply conditioning, improving texture and adding a touch of luxury.	21.99	/assets/img20.jpg	18	15.64	2024-08-26
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, role) FROM stdin;
2	jas	jasminejasmine0582@gmail.com	$2b$10$T.Vp.XLRsT94fKooH44HSuexyXl57mpGwEu535iftDs4lIZvvEaXO	user
3	basa	jasminer1@student.tce.edu	$2b$10$wdy3.c2PEaFZKbKoamJI5eMoZ25zAxDKpmJ2pUyqvb.PAQpiXAGiS	user
4	amma	amma123@gmail.com	$2b$10$0nAgJrGebppD0Pb9WnAor.3T8PbPOhvaA0Cwe.2wn3cVWbcO5b/Ki	user
5	sample	sample@gmail.com	sample123	user
6	abc	abc@gmail.com	abc	user
7	abcd	abcd@gmail.com	abcd	user
9	admin	admin@gmail.com	admin123	admin
10	superadmin	superadmin@gmail.com	superadmin123	superadmin
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 2, true);


--
-- Name: product_reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_reviews_review_id_seq', 41, true);


--
-- Name: product_sales_sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_sales_sale_id_seq', 21, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 29, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: admin_users admin_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_email_key UNIQUE (email);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_key UNIQUE (username);


--
-- Name: product_reviews product_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_reviews_pkey PRIMARY KEY (review_id);


--
-- Name: product_sales product_sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales
    ADD CONSTRAINT product_sales_pkey PRIMARY KEY (sale_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: product_ingredients product_ingredients_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_ingredients
    ADD CONSTRAINT product_ingredients_id_fkey FOREIGN KEY (id) REFERENCES public.products(id);


--
-- Name: product_reviews product_reviews_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_reviews_id_fkey FOREIGN KEY (id) REFERENCES public.products(id);


--
-- Name: product_sales product_sales_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sales
    ADD CONSTRAINT product_sales_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

