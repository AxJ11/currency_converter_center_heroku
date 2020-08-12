-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2019 年 09 月 11 日 10:31
-- 伺服器版本： 10.1.40-MariaDB
-- PHP 版本： 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `_project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `currency`
--

CREATE TABLE `currency` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `currency_detail`
--

CREATE TABLE `currency_detail` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_ch` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_en` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_ch` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_en` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_name_ch` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_name_en` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `continent_ch` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `continent_en` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `currency_detail`
--
ALTER TABLE `currency_detail`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動增長(AUTO_INCREMENT)
--

--
-- 使用資料表自動增長(AUTO_INCREMENT) `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動增長(AUTO_INCREMENT) `currency_detail`
--
ALTER TABLE `currency_detail`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
