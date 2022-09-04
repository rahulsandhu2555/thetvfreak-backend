CREATE TABLE `options` (
  `option_id` bigint(20) UNSIGNED NOT NULL,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `options` (`option_id`, `option_name`, `option_value`, `autoload`) VALUES
(1, 'siteurl', 'https://www.thetvfreak.com', 'yes'),
(2, 'home', 'https://www.thetvfreak.com', 'yes'),
(3, 'blogname', 'The TV Freak', 'yes'),
(4, 'blogdescription', 'Never Miss a TV Update', 'yes'),
(5, 'users_can_register', '0', 'yes'),
(6, 'admin_email', 'info@thetvfreak.com', 'yes'),
(7, 'start_of_week', '1', 'yes'),
(8, 'use_balanceTags', '0', 'yes'),
(9, 'use_smilies', '1', 'yes'),
(10, 'require_name_email', '1', 'yes');

ALTER TABLE `options`
  ADD PRIMARY KEY (`option_id`),
  ADD UNIQUE KEY `option_name` (`option_name`),
  ADD KEY `autoload` (`autoload`);

  ALTER TABLE `options`
    MODIFY `option_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
  COMMIT;

-- --------------------
CREATE TABLE `users` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`ID`, `user_login`, `user_pass`, `user_nicename`, `user_email`, `user_url`, `user_registered`, `user_activation_key`, `user_status`, `display_name`) VALUES
(1, 'admin', '$P$Bn72A/4sw1zow7RF9AgoFu2fDcv7bB.', 'admin', 'infothetvfreak@gmail.com', '', '2019-10-13 18:35:44', '', 0, 'The TV Freak');

ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_login_key` (`user_login`),
  ADD KEY `user_nicename` (`user_nicename`),
  ADD KEY `user_email` (`user_email`);


ALTER TABLE `users`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

-- ------------------------------------------------------------------

CREATE TABLE `usermeta` (
  `umeta_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `usermeta` (`umeta_id`, `user_id`, `meta_key`, `meta_value`) VALUES
(1, 1, 'nickname', 'admin'),
(2, 1, 'first_name', 'The TV Freak'),
(3, 1, 'last_name', ''),
(4, 1, 'description', ''),
(5, 1, 'rich_editing', 'true');


ALTER TABLE `usermeta`
  ADD PRIMARY KEY (`umeta_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meta_key` (`meta_key`(191));

ALTER TABLE `usermeta`
  MODIFY `umeta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;
-- --------------------------------------

CREATE TABLE `posts` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `post_author` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `post_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `to_ping` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pinged` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `post_content_filtered` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_parent` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `guid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES
(1, 1, '2021-03-10 09:47:26', '2021-03-10 04:17:26', '<h1>this is cool</h1>', 'Top 10 Highest Paid Hollywood Actresses of 2020 | English Actresses', '', 'inherit', 'closed', 'closed', '', '5531-autosave-v1', '', '', '2021-03-10 09:47:26', '2021-03-10 04:17:26', '', 5531, 'https://www.thetvfreak.com/5531-autosave-v1/', 0, 'revision', '', 0);

ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `post_name` (`post_name`),
  ADD KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  ADD KEY `post_parent` (`post_parent`),
  ADD KEY `post_author` (`post_author`);

  ALTER TABLE `posts`
    MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
  COMMIT;

--   ------------------------------------------------------

CREATE TABLE `postmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `postmeta` (`meta_id`, `post_id`, `meta_key`, `meta_value`) VALUES
(1, 1, '_wp_page_template', 'elementor_header_footer');

ALTER TABLE `postmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `meta_key` (`meta_key`(191));

ALTER TABLE `postmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

-- ------------------------------------------

CREATE TABLE `comments` (
  `comment_ID` bigint(20) UNSIGNED NOT NULL,
  `comment_post_ID` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `comment_author` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_author_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
  `comment_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'comment',
  `comment_parent` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `user_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comments` (`comment_ID`, `comment_post_ID`, `comment_author`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_date_gmt`, `comment_content`, `comment_karma`, `comment_approved`, `comment_agent`, `comment_type`, `comment_parent`, `user_id`) VALUES
(1, 1, 'Hairstyles', 'ColbyParenti32620@hotmail.com', 'https://www.ifashionstyles.com/beauty/hairstyles', '185.232.22.174', '2020-11-01 21:57:45', '2020-11-01 16:27:45', 'I抎 must check with you here. Which is not one thing I usually do! I get pleasure from studying a post that can make individuals think. Also, thanks for permitting me to comment!', 0, 'spam', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', 'comment', 0, 0),
(2, 1, 'rahul sandhu', 'sandhu.rahul25@gmail.com', '', '42.108.188.40', '2019-10-28 00:41:27', '2019-10-27 19:11:27', 'We always think that the bollywood don\'t do good movies but now the time is changing. there are lots of bollywood movies in my favourite list. i am sure this will be a great series.', 0, '1', 'Mozilla/5.0 (Linux; Android 7.1.2; Redmi 5A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.111 Mobile Safari/537.36', 'comment', 0, 0);

-- ALTER TABLE `comments`
--   ADD PRIMARY KEY (`comment_ID`),
--   ADD KEY `comment_post_ID` (`comment_post_ID`),
--   ADD KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
--   ADD KEY `comment_date_gmt` (`comment_date_gmt`),
--   ADD KEY `comment_parent` (`comment_parent`),
--   ADD KEY `comment_author_email` (`comment_author_email`);
--
-- ALTER TABLE `comments`
--   MODIFY `comment_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
-- COMMIT;

-- ---------------------------------------

CREATE TABLE `commentmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `comment_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `commentmeta` (`meta_id`, `comment_id`, `meta_key`, `meta_value`) VALUES
(1, 1, 'akismet_history', 'a:3:{s:4:\"time\";d:1594557364.1106760501861572265625;s:5:\"event\";s:15:\"status-approved\";s:4:\"user\";s:3:\"seo\";}'),
(2, 2, 'akismet_history', 'a:3:{s:4:\"time\";d:1611922332.8302059173583984375;s:5:\"event\";s:11:\"status-spam\";s:4:\"user\";s:5:\"admin\";}');


ALTER TABLE `commentmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `comment_id` (`comment_id`),
  ADD KEY `meta_key` (`meta_key`);

--   ALTER TABLE `commentmeta`
--     MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
--   COMMIT;

-- -------------------------------------
CREATE TABLE `termmeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `termmeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `term_id` (`term_id`),
  ADD KEY `meta_key` (`meta_key`(191));

ALTER TABLE `termmeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

-- ----------

CREATE TABLE `terms` (
  `term_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `slug` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `terms` (`term_id`, `name`, `slug`, `term_group`) VALUES
(1, 'Uncategorized', 'uncategorized', 0),
(1450, 'new film updates', 'new-film-updates', 0),
(5, 'Trending', 'trending', 0),
(34, 'Jennifer Aniston Instagram', 'jennifer-aniston-instagram', 0),
(32, 'Jennifer', 'jennifer', 0),
(33, 'Jennifer Aniston', 'jennifer-aniston', 0),
(1449, 'Main', 'main', 0),
(12, 'Movies', 'movies', 0),
(1816, 'Fatima Sana Shaikh movies', 'fatima-sana-shaikh-movies', 0),
(14, 'Top Menu', 'top-menu', 0),
(1455, 'Shweta Tripathi Tv shows', 'shweta-tripathi-tv-shows', 0),
(15, 'Upcoming', 'upcoming', 0),
(16, 'Series', 'series', 0),
(17, 'New Trailers', 'new-trailers', 0),
(1453, 'Shweta Tripathi Biography', 'shweta-tripathi-biography', 0),
(22, 'Reviews', 'reviews', 0),
(1454, 'Shweta Tripathi Age', 'shweta-tripathi-age', 0),
(1452, 'movie trailers', 'movie-trailers', 0),
(1451, 'for latest movie updates', 'for-latest-movie-updates', 0),
(35, 'Instagram', 'instagram', 0);

ALTER TABLE `terms`
  ADD PRIMARY KEY (`term_id`),
  ADD KEY `slug` (`slug`(191)),
  ADD KEY `name` (`name`(191));

ALTER TABLE `terms`
  MODIFY `term_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3166;
COMMIT;

-----------------

CREATE TABLE `term_relationships` (
  `object_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `term_order` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `term_relationships` (`object_id`, `term_taxonomy_id`, `term_order`) VALUES
(122, 32, 0),
(122, 45, 0),
(122, 42, 0),
(5811, 2793, 0),
(937, 1459, 0),
(122, 34, 0),
(1485, 1636, 0),
(640, 579, 0),
(1485, 1635, 0),
(4958, 1449, 0);


ALTER TABLE `term_relationships`
  ADD PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  ADD KEY `term_taxonomy_id` (`term_taxonomy_id`);
COMMIT;

-- -------------------------------

CREATE TABLE `term_taxonomy` (
  `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL,
  `term_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `count` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `term_taxonomy` (`term_taxonomy_id`, `term_id`, `taxonomy`, `description`, `parent`, `count`) VALUES
(1, 1, 'category', '', 0, 2),
(1488, 1488, 'post_tag', '', 0, 1),
(5, 5, 'category', 'What\'s hot, its right here.', 0, 65),
(1449, 1449, 'category', 'the tv freak', 0, 212),
(12, 12, 'category', 'The TV freak is one of the leading website, providing information about the movies.\r\nWe collect the genuine information from the trusted sources. Above all, we display the short and valuable version.\r\n\r\nIf you are interested in Bollywood, you will find everything here. Everything about the Bollywood movies, series and celebrities. If you are a fan of Hollywood content, you will explore most of the content here.\r\n\r\nIn conclusion, everything about the bollywood and hollywood movies is available from the best source.', 0, 92),
(1481, 1481, 'post_tag', '', 0, 1),
(32, 32, 'post_tag', '', 0, 1),
(33, 33, 'post_tag', '', 0, 0),
(34, 34, 'post_tag', '', 0, 2),
(35, 35, 'post_tag', '', 0, 0);

ALTER TABLE `term_taxonomy`
  ADD PRIMARY KEY (`term_taxonomy_id`),
  ADD UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  ADD KEY `taxonomy` (`taxonomy`);

ALTER TABLE `term_taxonomy`
  MODIFY `term_taxonomy_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3166;
COMMIT;


-- -----------------