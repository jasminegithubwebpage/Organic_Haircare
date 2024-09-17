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
-- Name: product_reviews review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_reviews ALTER COLUMN review_id SET DEFAULT nextval('public.product_reviews_review_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: product_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_ingredients VALUES (1, '{"Argan Oil","Vitamin E","Omega-6 Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (2, '{"Coconut Oil","Vitamin E","Capric Acid"}');
INSERT INTO public.product_ingredients VALUES (3, '{"Aloe Vera Extract",Glycerin,Water}');
INSERT INTO public.product_ingredients VALUES (4, '{"Jojoba Oil","Vitamin E","Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (5, '{"Tea Tree Oil","Eucalyptus Oil","Peppermint Oil"}');
INSERT INTO public.product_ingredients VALUES (6, '{"Rosemary Oil","Peppermint Oil","Castor Oil"}');
INSERT INTO public.product_ingredients VALUES (7, '{"Castor Oil","Vitamin E","Omega-9 Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (8, '{"Lavender Oil","Jojoba Oil","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (9, '{"Hemp Seed Oil","Omega-3 Fatty Acids","Vitamin E"}');
INSERT INTO public.product_ingredients VALUES (10, '{"Vitamin E","Argan Oil","Aloe Vera Extract"}');
INSERT INTO public.product_ingredients VALUES (11, '{"Peppermint Oil","Tea Tree Oil","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (12, '{"Chamomile Extract","Lavender Oil","Aloe Vera"}');
INSERT INTO public.product_ingredients VALUES (13, '{"Ginseng Extract","Aloe Vera",Water}');
INSERT INTO public.product_ingredients VALUES (14, '{"Hyaluronic Acid",Water,Glycerin}');
INSERT INTO public.product_ingredients VALUES (15, '{"Amla Oil","Vitamin C","Sesame Oil"}');
INSERT INTO public.product_ingredients VALUES (16, '{"Black Seed Oil","Jojoba Oil","Olive Oil"}');
INSERT INTO public.product_ingredients VALUES (17, '{Keratin,"Argan Oil","Aloe Vera"}');
INSERT INTO public.product_ingredients VALUES (18, '{"Argan Oil","Rose Oil","Vitamin E"}');
INSERT INTO public.product_ingredients VALUES (19, '{Biotin,"Vitamin B7","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (20, '{"Jasmine Oil","Jojoba Oil","Vitamin E"}');
INSERT INTO public.product_ingredients VALUES (1, '{"Argan Oil","Vitamin E","Omega-6 Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (2, '{"Coconut Oil","Vitamin E","Capric Acid"}');
INSERT INTO public.product_ingredients VALUES (3, '{"Aloe Vera Extract",Glycerin,Water}');
INSERT INTO public.product_ingredients VALUES (4, '{"Jojoba Oil","Vitamin E","Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (5, '{"Tea Tree Oil","Eucalyptus Oil","Peppermint Oil"}');
INSERT INTO public.product_ingredients VALUES (6, '{"Rosemary Oil","Peppermint Oil","Castor Oil"}');
INSERT INTO public.product_ingredients VALUES (7, '{"Castor Oil","Vitamin E","Omega-9 Fatty Acids"}');
INSERT INTO public.product_ingredients VALUES (8, '{"Lavender Oil","Jojoba Oil","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (9, '{"Hemp Seed Oil","Omega-3 Fatty Acids","Vitamin E"}');
INSERT INTO public.product_ingredients VALUES (10, '{"Vitamin E","Argan Oil","Aloe Vera Extract"}');
INSERT INTO public.product_ingredients VALUES (11, '{"Peppermint Oil","Tea Tree Oil","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (12, '{"Chamomile Extract","Lavender Oil","Aloe Vera"}');
INSERT INTO public.product_ingredients VALUES (13, '{"Ginseng Extract","Aloe Vera",Water}');
INSERT INTO public.product_ingredients VALUES (14, '{"Hyaluronic Acid",Water,Glycerin}');
INSERT INTO public.product_ingredients VALUES (15, '{"Amla Oil","Vitamin C","Sesame Oil"}');
INSERT INTO public.product_ingredients VALUES (16, '{"Black Seed Oil","Jojoba Oil","Olive Oil"}');
INSERT INTO public.product_ingredients VALUES (17, '{Keratin,"Argan Oil","Aloe Vera"}');
INSERT INTO public.product_ingredients VALUES (18, '{"Argan Oil","Rose Oil","Vitamin E"}');
INSERT INTO public.product_ingredients VALUES (19, '{Biotin,"Vitamin B7","Coconut Oil"}');
INSERT INTO public.product_ingredients VALUES (20, '{"Jasmine Oil","Jojoba Oil","Vitamin E"}');


--
-- Data for Name: product_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_reviews VALUES (1, 1, 'JohnDoe', 'This is an excellent product Highly recommend', 10, 1, 5);
INSERT INTO public.product_reviews VALUES (2, 1, 'JaneSmith', 'Worked well for me but could be cheaper', 5, 2, 4);
INSERT INTO public.product_reviews VALUES (3, 2, 'AliceWonder', 'Not satisfied didnt work as expected', 2, 5, 2);
INSERT INTO public.product_reviews VALUES (4, 2, 'BobBuilder', 'The product smells great but I havent seen any results yet', 3, 3, 3);
INSERT INTO public.product_reviews VALUES (5, 3, 'MarkTwain', 'Loved it Great for hair growth', 8, 0, 5);
INSERT INTO public.product_reviews VALUES (6, 3, 'EveGardner', 'Decent product but too pricey', 6, 1, 3);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (1, 'Organic Argan Oil', 'Rich in essential fatty acids and vitamin E. Moisturizes and revitalizes dry hair.', 19.99, '/assets/img1.jpg', 50, 14.38, '2024-09-01');
INSERT INTO public.products VALUES (2, 'Coconut Oil Infusion', 'Deeply nourishes and strengthens hair with natural coconut oil.', 14.99, '/assets/img2.jfif', 40, 16.61, '2024-09-02');
INSERT INTO public.products VALUES (3, 'Aloe Vera Hair Treatment', 'Soothes the scalp and promotes healthy hair growth with pure aloe vera extract.', 17.49, '/assets/img3.jpg', 30, 14.21, '2024-09-03');
INSERT INTO public.products VALUES (4, 'Jojoba Oil', 'Hydrates and adds shine while balancing natural oils in the scalp.', 21.99, '/assets/img4.jpg', 20, 6.84, '2024-09-04');
INSERT INTO public.products VALUES (5, 'Tea Tree Oil Blend', 'Purifies the scalp and helps to reduce dandruff with tea tree oil.', 16.89, '/assets/img5.jpg', 15, 18.25, '2024-09-05');
INSERT INTO public.products VALUES (6, 'Rosemary Mint Hair Oil', 'Stimulates hair follicles and provides a refreshing minty scent.', 18.59, '/assets/img6.jpg', 25, 12.03, '2024-09-06');
INSERT INTO public.products VALUES (7, 'Castor Oil Elixir', 'Strengthens and conditions hair, promoting faster growth with castor oil.', 12.99, '/assets/img7.webp', 35, 14.58, '2024-09-07');
INSERT INTO public.products VALUES (8, 'Lavender Hair Oil', 'Calms and relaxes with lavender essential oil while improving hair texture.', 22.49, '/assets/img8.jfif', 10, 5.29, '2024-09-08');
INSERT INTO public.products VALUES (9, 'Hemp Seed Oil', 'Rich in omega fatty acids, nourishes and strengthens hair.', 20.29, '/assets/img9.png', 18, 18.02, '2024-09-09');
INSERT INTO public.products VALUES (10, 'Vitamin E Hair Serum', 'Protects and repairs damaged hair with concentrated vitamin E.', 15.99, '/assets/img10.webp', 28, 11.45, '2024-09-10');
INSERT INTO public.products VALUES (11, 'Peppermint Scalp Treatment', 'Invigorates the scalp with refreshing peppermint oil, promoting a revitalizing and cool sensation for healthier hair.', 17.99, '/assets/img11.jpg', 45, 17.80, '2024-09-11');
INSERT INTO public.products VALUES (12, 'Chamomile Hair Soother', 'Calms and soothes the scalp with chamomile extract, perfect for reducing irritation and enhancing hair softness.', 13.49, '/assets/img12.jpg', 50, 19.74, '2024-09-12');
INSERT INTO public.products VALUES (13, 'Ginseng Hair Tonic', 'Stimulates hair growth and revitalizes hair follicles with natural ginseng root extract for a stronger and healthier mane.', 24.99, '/assets/img13.jpg', 22, 9.03, '2024-09-13');
INSERT INTO public.products VALUES (14, 'Hyaluronic Acid Serum', 'Deeply hydrates and plumps your hair with hyaluronic acid, offering intense moisture and a youthful look.', 19.49, '/assets/img14.jpg', 12, 12.97, '2024-09-14');
INSERT INTO public.products VALUES (15, 'Amla Hair Oil', 'Strengthens hair from root to tip with vitamin C-rich amla oil, promoting shine and preventing premature graying.', 16.29, '/assets/img15.jpg', 30, 14.56, '2024-09-15');
INSERT INTO public.products VALUES (16, 'Black Seed Oil', 'Nourishes and rejuvenates your hair with black seed oil, known for its rich nutrients and restorative properties.', 23.99, '/assets/img16.jpg', 20, 10.60, '2024-08-30');
INSERT INTO public.products VALUES (17, 'Keratin Repair Treatment', 'Restores and fortifies damaged hair with keratin, providing essential repair and maintaining hair health and elasticity.', 18.29, '/assets/img17.jpg', 25, 19.84, '2024-08-29');
INSERT INTO public.products VALUES (18, 'Argan & Rose Oil Blend', 'Combines the benefits of argan and rose oils to deeply condition and add shine, leaving hair silky and smooth.', 20.49, '/assets/img18.jpg', 15, 7.85, '2024-08-28');
INSERT INTO public.products VALUES (19, 'Biotin Hair Supplement', 'Supports overall hair health with biotin and essential nutrients, aiding in stronger and thicker hair growth.', 14.79, '/assets/img19.jpg', 40, 18.55, '2024-08-27');
INSERT INTO public.products VALUES (20, 'Jasmine Hair Elixir', 'Infuses hair with a calming jasmine scent while deeply conditioning, improving texture and adding a touch of luxury.', 21.99, '/assets/img20.jpg', 18, 15.64, '2024-08-26');


--
-- Name: product_reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_reviews_review_id_seq', 6, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 11, true);


--
-- Name: product_reviews product_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_reviews
    ADD CONSTRAINT product_reviews_pkey PRIMARY KEY (review_id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


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
-- PostgreSQL database dump complete
--

