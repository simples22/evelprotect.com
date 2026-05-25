--
-- PostgreSQL database dump
--

\restrict ejSSFkVTAViQHYslHFtSxJEUm5zih9ZZk3ea9R25GFAqQbjqu5NdajwOkS0hwPi

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: AdminSetting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AdminSetting" (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AdminSetting" OWNER TO postgres;

--
-- Name: ContactMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactMessage" (
    id text NOT NULL,
    "fullName" text,
    email text,
    phone text,
    subject text,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    status text DEFAULT 'new'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ContactMessage" OWNER TO postgres;

--
-- Name: ContactRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactRequest" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    country text,
    city text,
    company text,
    service text,
    subject text,
    message text NOT NULL,
    type text DEFAULT 'CONTACT'::text NOT NULL,
    status text DEFAULT 'NEW'::text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "adminNotes" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ContactRequest" OWNER TO postgres;

--
-- Name: JobApplication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JobApplication" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text,
    city text,
    country text,
    address text,
    "linkedinUrl" text,
    "portfolioUrl" text,
    "position" text NOT NULL,
    department text,
    "employmentType" text,
    "workMode" text,
    availability text,
    "salaryExpected" text,
    "resumeUrl" text,
    "coverLetter" text,
    "portfolioFileUrl" text,
    "extraDocumentUrl" text,
    "experienceYears" integer,
    "currentCompany" text,
    "currentRole" text,
    skills text,
    languages text,
    "whyJoin" text,
    "whyGoodCandidate" text,
    "workedInIndustry" text,
    "authorizedWork" boolean,
    "needSponsorship" boolean,
    consent boolean DEFAULT false NOT NULL,
    status text DEFAULT 'NEW'::text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "adminNotes" text,
    "candidateScore" integer,
    tags text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."JobApplication" OWNER TO postgres;

--
-- Name: MarketingAudience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MarketingAudience" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    source text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MarketingAudience" OWNER TO postgres;

--
-- Name: MarketingAudienceMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MarketingAudienceMember" (
    id text NOT NULL,
    "audienceId" text NOT NULL,
    email text NOT NULL,
    "fullName" text,
    phone text,
    source text,
    "sourceId" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MarketingAudienceMember" OWNER TO postgres;

--
-- Name: MarketingCampaign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MarketingCampaign" (
    id text NOT NULL,
    title text NOT NULL,
    subject text NOT NULL,
    "previewText" text,
    "bodyHtml" text NOT NULL,
    "bodyText" text,
    "heroImage" text,
    "ctaLabel" text,
    "ctaUrl" text,
    audience text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    "scheduledAt" timestamp(3) without time zone,
    "sentAt" timestamp(3) without time zone,
    "createdBy" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "builderJson" text
);


ALTER TABLE public."MarketingCampaign" OWNER TO postgres;

--
-- Name: MarketingEmailLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MarketingEmailLog" (
    id text NOT NULL,
    "campaignId" text,
    recipient text NOT NULL,
    "fullName" text,
    subject text NOT NULL,
    "bodyHtml" text NOT NULL,
    status text DEFAULT 'sent'::text NOT NULL,
    source text,
    error text,
    "sentAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "clickedAt" timestamp(3) without time zone,
    "openedAt" timestamp(3) without time zone,
    unsubscribed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MarketingEmailLog" OWNER TO postgres;

--
-- Name: MarketingVideo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MarketingVideo" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    "videoUrl" text NOT NULL,
    thumbnail text,
    "productName" text,
    category text,
    "isPublished" boolean DEFAULT false NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MarketingVideo" OWNER TO postgres;

--
-- Name: NewsArticle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NewsArticle" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    body text,
    "imageUrl" text,
    category text,
    "isPublished" boolean DEFAULT false NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "approachBody" text,
    "approachTitle" text,
    "authorBio" text,
    "authorCompany" text,
    "authorFunction" text,
    "authorImageUrl" text,
    "authorTitle" text,
    "conclusionBody" text,
    "conclusionTitle" text,
    "introTitle" text,
    introduction text,
    "sourceLabel" text,
    "sourceUrl" text
);


ALTER TABLE public."NewsArticle" OWNER TO postgres;

--
-- Name: NewsletterSubscriber; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NewsletterSubscriber" (
    id text NOT NULL,
    email text NOT NULL,
    source text,
    "isActive" boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "subscribedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NewsletterSubscriber" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text,
    category text NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "isPublished" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "clickCount" integer DEFAULT 0 NOT NULL,
    "compareAtPrice" double precision,
    currency text DEFAULT 'USD'::text NOT NULL,
    image1 text NOT NULL,
    image2 text,
    image3 text,
    image4 text,
    "ingredientsText" text,
    "isBestSeller" boolean DEFAULT false NOT NULL,
    "packDescription" text,
    "packSize" integer DEFAULT 1 NOT NULL,
    price double precision NOT NULL,
    "pricePerBottle" double precision,
    rating double precision DEFAULT 0 NOT NULL,
    "ratingCount" integer DEFAULT 0 NOT NULL,
    "shortDescription" text,
    "sizeUnit" text,
    "sizeValue" double precision,
    status text DEFAULT 'DRAFT'::text NOT NULL,
    "subCategory" text,
    tags text,
    "viewCount" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductReview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductReview" (
    id text NOT NULL,
    "productId" text NOT NULL,
    rating integer NOT NULL,
    name text,
    message text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProductReview" OWNER TO postgres;

--
-- Name: SustainabilityPost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SustainabilityPost" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    category text,
    excerpt text,
    "heroImage" text,
    "introTitle" text,
    "introImage" text,
    "section4Title" text,
    "section4Text" text,
    "section5Title" text,
    "fixedBgImage" text,
    conclusion text,
    "isPublished" boolean DEFAULT false NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "card1Text" text,
    "card1Title" text,
    "card2Text" text,
    "card2Title" text,
    "card3Text" text,
    "card3Title" text,
    "document1Title" text,
    "document1Url" text,
    "document2Title" text,
    "document2Url" text,
    "document3Title" text,
    "document3Url" text,
    insight1 text,
    insight10 text,
    insight2 text,
    insight3 text,
    insight4 text,
    insight5 text,
    insight6 text,
    insight7 text,
    insight8 text,
    insight9 text,
    "introText" text,
    "section1Text" text,
    "section1Title" text,
    "section2Text" text,
    "section2Title" text,
    "section3Image" text,
    "section3Text" text,
    "section3Title" text,
    "section4Image" text,
    "section5Image" text,
    "section5Text" text,
    source1 text,
    source10 text,
    source2 text,
    source3 text,
    source4 text,
    source5 text,
    source6 text,
    source7 text,
    source8 text,
    source9 text
);


ALTER TABLE public."SustainabilityPost" OWNER TO postgres;

--
-- Name: TeamMember; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TeamMember" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    role text NOT NULL,
    bio text,
    "imageUrl" text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TeamMember" OWNER TO postgres;

--
-- Data for Name: AdminSetting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AdminSetting" (id, key, value, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ContactMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactMessage" (id, "fullName", email, phone, subject, message, "isRead", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ContactRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactRequest" (id, "fullName", email, phone, country, city, company, service, subject, message, type, status, "isRead", "adminNotes", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: JobApplication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JobApplication" (id, "fullName", email, phone, city, country, address, "linkedinUrl", "portfolioUrl", "position", department, "employmentType", "workMode", availability, "salaryExpected", "resumeUrl", "coverLetter", "portfolioFileUrl", "extraDocumentUrl", "experienceYears", "currentCompany", "currentRole", skills, languages, "whyJoin", "whyGoodCandidate", "workedInIndustry", "authorizedWork", "needSponsorship", consent, status, "isRead", "adminNotes", "candidateScore", tags, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MarketingAudience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MarketingAudience" (id, name, description, source, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MarketingAudienceMember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MarketingAudienceMember" (id, "audienceId", email, "fullName", phone, source, "sourceId", "isActive", "createdAt") FROM stdin;
\.


--
-- Data for Name: MarketingCampaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MarketingCampaign" (id, title, subject, "previewText", "bodyHtml", "bodyText", "heroImage", "ctaLabel", "ctaUrl", audience, status, "scheduledAt", "sentAt", "createdBy", "createdAt", "updatedAt", "builderJson") FROM stdin;
\.


--
-- Data for Name: MarketingEmailLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MarketingEmailLog" (id, "campaignId", recipient, "fullName", subject, "bodyHtml", status, source, error, "sentAt", "clickedAt", "openedAt", unsubscribed) FROM stdin;
\.


--
-- Data for Name: MarketingVideo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MarketingVideo" (id, title, slug, excerpt, "videoUrl", thumbnail, "productName", category, "isPublished", "isFeatured", "createdAt", "updatedAt") FROM stdin;
cmph9xlue0000totewfvjr28q	New Product Partners	new-product-partners	We proud on our team	/uploads/videos/1779475763975-0akfe2wu9ne9-video.mp4.mp4		Directive marketing service	Cosmeticts	t	t	2026-05-22 18:49:38.006	2026-05-22 18:56:40.992
\.


--
-- Data for Name: NewsArticle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NewsArticle" (id, title, slug, excerpt, body, "imageUrl", category, "isPublished", "isFeatured", "publishedAt", "createdAt", "updatedAt", "approachBody", "approachTitle", "authorBio", "authorCompany", "authorFunction", "authorImageUrl", "authorTitle", "conclusionBody", "conclusionTitle", "introTitle", introduction, "sourceLabel", "sourceUrl") FROM stdin;
cmp6mt9is0000cotea798sp71	Evel Protect™ Cosmetics Group Expands Its Long-Term Freshness & Body Care Direction	evel-cosmetics-group-expands-its-long-term-freshness-body-care-direction	Evel Protect Cosmetics Group continues expanding its long-term freshness and body care direction through accessible premium consumer wellness products and scalable beauty operations.	The company’s expansion strategy focuses on freshness cosmetics, skincare positioning, body care systems, and future personal wellness categories designed for modern consumer behavior.\n\nEvel Protect Cosmetics Group is preparing product ecosystems intended to support future launches across deodorants, freshness sprays, skincare essentials, body care products, and complementary beauty categories.\n\nThe objective is not only to develop consumer products, but also to create a recognizable long-term product identity capable of evolving through operational scalability and category diversification.\n\nThe company believes that accessible premium positioning combined with modern branding can support long-term customer trust while maintaining product flexibility for future growth opportunities.\n\nAdditional development efforts are currently focused on packaging direction, product presentation, brand communication, and scalable consumer distribution approaches intended for future international visibility.	/uploads/news/1779474713982-z7gfoq3euqi.png	Freshness	t	t	2026-05-22 18:32:01.719	2026-05-15 08:04:42.485	2026-05-22 18:32:01.723	The company’s current approach focuses on building structured product categories capable of supporting long-term consumer adoption while maintaining operational scalability.\n\nThis includes future work surrounding product presentation, packaging consistency, consumer accessibility, freshness positioning, and modern beauty communication strategies intended to support both online and retail-oriented product ecosystems.\n\nThe company also continues evaluating future operational opportunities related to product distribution, brand visibility, and scalable manufacturing relationships designed to support future category expansion.	Consumer Product Expansion & Operational Approach	The company continues prioritizing long-term product structure, consumer trust, and scalable operational development across future freshness and personal care categories.\n\nEvel Cosmetics Brands Group believes that combining product simplicity, visual identity, and accessible premium direction can support sustainable long-term brand positioning within the modern beauty and personal care industry.	Evel protect	Brand Development & Operations	/uploads/news-authors/1778832221267-4xxy0qcuy3r.jpg	Statement From Evel Protect Cosmetics Group	Evel Protect Group continues developing a modern long-term direction centered around freshness, body care, skincare, and accessible premium beauty experiences.\n\nThe company expects future product categories and operational development initiatives to support broader consumer engagement opportunities while reinforcing long-term brand identity and product positioning objectives.	Long-Term Brand Development	A New Direction For Everyday Consumer Wellness	Evel Cosmetics Group continues building a modern beauty and personal care direction designed around consumer trust, product accessibility, and long-term product identity.\n\nThe company is currently developing future freshness, skincare, and body care categories intended to support everyday routines through premium positioning and practical use.\n\nThis direction reflects the company’s objective to create scalable consumer products capable of serving evolving beauty and wellness expectations across multiple markets.	Internal Company Development Direction	https://evelprotect.com
\.


--
-- Data for Name: NewsletterSubscriber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NewsletterSubscriber" (id, email, source, "isActive", "updatedAt", "isRead", "subscribedAt") FROM stdin;
cmp6uw9f00000bote9a2a70qt	clervens202@gmail.com	public-newsletter-form	t	2026-05-15 11:50:59.245	f	2026-05-15 11:50:59.245
cmp7b1b69000014te6bidp2k8	clervens202@gamil.com	public-newsletter-form	t	2026-05-15 19:22:48.657	f	2026-05-15 19:22:48.657
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, title, slug, description, category, "isFeatured", "isPublished", "createdAt", "updatedAt", "clickCount", "compareAtPrice", currency, image1, image2, image3, image4, "ingredientsText", "isBestSeller", "packDescription", "packSize", price, "pricePerBottle", rating, "ratingCount", "shortDescription", "sizeUnit", "sizeValue", status, "subCategory", tags, "viewCount") FROM stdin;
cmp7l8u2d0000xstepcw33a04	Evel Protect™ MEN ACTIVE™ Sports Deodorant Spray	evel-protect-men-active-sports-deodorant-spray	Evel Protect™ MEN ACTIVE™ SPORTS is a modern deodorant spray created for everyday freshness, active lifestyles, and long-lasting comfort. The product direction focuses on clean presentation, modern masculine care, and premium daily protection designed to support sports, training, work, and everyday movement.\n\nThe formula positioning is designed around freshness performance, modern grooming aesthetics, and elevated body care experiences while maintaining a lightweight feel and easy daily application.\n	Personal Care	t	t	2026-05-16 00:08:35.893	2026-05-22 17:54:17.75	0	\N	USD	/uploads/products/1779468263411-design-sans-titre-7-.png	/uploads/products/1779468203865-chatgpt-image-19-mai-2026-15-51-18.png	/uploads/products/1779468278124-sans-titre-2000-x-3000-px-6-.png		INGREDIENTS / BULLET POINTS\nLong-lasting freshness\nSports-inspired body care\nModern masculine fragrance direction\nLightweight spray application\nEveryday active routine support\nPremium blue packaging direction\nQuick dry feeling\nModern grooming positioning\n	f	This deodorant spray is presented in a modern cylindrical aerosol format designed for everyday convenience, visual consistency, and premium shelf presentation. The packaging direction reflects Evel Protect™ Cosmetics Group’s long-term focus on modern personal care identity and contemporary consumer presentation.\n	1	7.01	7.01	0	0	Modern freshness protection designed for active everyday routines and long-lasting confidence.	ml	75	PUBLISHED	Deodorant Spray		80
\.


--
-- Data for Name: ProductReview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductReview" (id, "productId", rating, name, message, "createdAt") FROM stdin;
\.


--
-- Data for Name: SustainabilityPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SustainabilityPost" (id, title, slug, category, excerpt, "heroImage", "introTitle", "introImage", "section4Title", "section4Text", "section5Title", "fixedBgImage", conclusion, "isPublished", "isFeatured", "createdAt", "updatedAt", "card1Text", "card1Title", "card2Text", "card2Title", "card3Text", "card3Title", "document1Title", "document1Url", "document2Title", "document2Url", "document3Title", "document3Url", insight1, insight10, insight2, insight3, insight4, insight5, insight6, insight7, insight8, insight9, "introText", "section1Text", "section1Title", "section2Text", "section2Title", "section3Image", "section3Text", "section3Title", "section4Image", "section5Image", "section5Text", source1, source10, source2, source3, source4, source5, source6, source7, source8, source9) FROM stdin;
cmpe4bna50000twtewqyzpjky	Evel Protect™ Product Responsibility & Everyday Care	evel-protect-product-responsibility-everyday-care	Product Responsibility	A company resource introducing Evel Protect™ Cosmetics Group’s direction for responsible product development, everyday care, beauty routines, and long-term consumer trust.	/uploads/general/1779319821456-e0rz124yi5k.png				Evel™ Cosmetics Group is developing a long-term beauty and personal care ecosystem focused on trust, quality positioning, and modern consumer needs.\n\nThe company’s product direction includes skincare, body care, deodorants, hair care, cosmetics, fragrance, and hygiene essentials designed for everyday routines.\n\nThis approach supports a simple but premium consumer experience where product presentation, usefulness, and brand consistency remain central.			Evel Protect™ Cosmetics Group is positioning its product direction around modern beauty, practical personal care, and long-term consumer trust.	t	t	2026-05-20 13:49:16.831	2026-05-20 23:30:38.166																																											
\.


--
-- Data for Name: TeamMember; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TeamMember" (id, "fullName", role, bio, "imageUrl", "order", "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: AdminSetting AdminSetting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdminSetting"
    ADD CONSTRAINT "AdminSetting_pkey" PRIMARY KEY (id);


--
-- Name: ContactMessage ContactMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMessage"
    ADD CONSTRAINT "ContactMessage_pkey" PRIMARY KEY (id);


--
-- Name: ContactRequest ContactRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_pkey" PRIMARY KEY (id);


--
-- Name: JobApplication JobApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JobApplication"
    ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY (id);


--
-- Name: MarketingAudienceMember MarketingAudienceMember_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingAudienceMember"
    ADD CONSTRAINT "MarketingAudienceMember_pkey" PRIMARY KEY (id);


--
-- Name: MarketingAudience MarketingAudience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingAudience"
    ADD CONSTRAINT "MarketingAudience_pkey" PRIMARY KEY (id);


--
-- Name: MarketingCampaign MarketingCampaign_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingCampaign"
    ADD CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY (id);


--
-- Name: MarketingEmailLog MarketingEmailLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingEmailLog"
    ADD CONSTRAINT "MarketingEmailLog_pkey" PRIMARY KEY (id);


--
-- Name: MarketingVideo MarketingVideo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingVideo"
    ADD CONSTRAINT "MarketingVideo_pkey" PRIMARY KEY (id);


--
-- Name: NewsArticle NewsArticle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NewsArticle"
    ADD CONSTRAINT "NewsArticle_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSubscriber NewsletterSubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NewsletterSubscriber"
    ADD CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY (id);


--
-- Name: ProductReview ProductReview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductReview"
    ADD CONSTRAINT "ProductReview_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: SustainabilityPost SustainabilityPost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SustainabilityPost"
    ADD CONSTRAINT "SustainabilityPost_pkey" PRIMARY KEY (id);


--
-- Name: TeamMember TeamMember_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY (id);


--
-- Name: AdminSetting_key_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "AdminSetting_key_key" ON public."AdminSetting" USING btree (key);


--
-- Name: MarketingAudienceMember_audienceId_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MarketingAudienceMember_audienceId_email_key" ON public."MarketingAudienceMember" USING btree ("audienceId", email);


--
-- Name: MarketingVideo_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "MarketingVideo_slug_key" ON public."MarketingVideo" USING btree (slug);


--
-- Name: NewsArticle_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "NewsArticle_slug_key" ON public."NewsArticle" USING btree (slug);


--
-- Name: NewsletterSubscriber_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON public."NewsletterSubscriber" USING btree (email);


--
-- Name: NewsletterSubscriber_isActive_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "NewsletterSubscriber_isActive_idx" ON public."NewsletterSubscriber" USING btree ("isActive");


--
-- Name: NewsletterSubscriber_isRead_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "NewsletterSubscriber_isRead_idx" ON public."NewsletterSubscriber" USING btree ("isRead");


--
-- Name: NewsletterSubscriber_subscribedAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "NewsletterSubscriber_subscribedAt_idx" ON public."NewsletterSubscriber" USING btree ("subscribedAt");


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: SustainabilityPost_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SustainabilityPost_slug_key" ON public."SustainabilityPost" USING btree (slug);


--
-- Name: MarketingAudienceMember MarketingAudienceMember_audienceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingAudienceMember"
    ADD CONSTRAINT "MarketingAudienceMember_audienceId_fkey" FOREIGN KEY ("audienceId") REFERENCES public."MarketingAudience"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MarketingEmailLog MarketingEmailLog_campaignId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MarketingEmailLog"
    ADD CONSTRAINT "MarketingEmailLog_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES public."MarketingCampaign"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProductReview ProductReview_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductReview"
    ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ejSSFkVTAViQHYslHFtSxJEUm5zih9ZZk3ea9R25GFAqQbjqu5NdajwOkS0hwPi

