-- phpMyAdmin SQL Dump
-- version 5.2.0-dev+20220223.f7f85bb450
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 16, 2022 at 11:16 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `berix_agency`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

use berix_agency;

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `name`, `description`) VALUES
(1, 'Efes', 'Efes is one of seven world wonders. Legend says that Efes has been raised  by woman warriors - Amasons, and that the greek philosopher Heraclit was born in it. Likewise, Efes praised the goddess Arthemides, protector of woman and mothers. Specifically interesting is the fact that in this city Saint Mary, the mother of jesus, used to live. Remnants of chaotic past, Arthemides temple, amphytheather, and Celsiuses library are just some of the options for your summer adventure. Today they attract millions of tourists and represent the wealthiest archaeological land in Little Asia.'),
(2, 'Pamukkale', 'Pamukkale, also knows as cotton fortress, is a wonder of nature made of certain geological formations that are built to shape little pools. They are layered vertically one above the other looking like ice spears.'),
(3, 'Mili', 'National park Mili is recognisable by its\' vibrant nature. This wonder of nature consits of little bays with turqouise - blue sea and crystal clear sands. Besides the beautiful beach you will have a chance to visit a secret place of the suprem god of greek mythology and find for yourselves the secrets of Zuus.'),
(4, 'Nidri', 'Because of high mountains around Lefkada, subterainian waters are aplenty. Thus, waterfalls in this region are not a rare sight, but Nidri waterfalls are an attraction in and by itself. Nidi is a village next to the sea, distanced only by 10km from Lefkada centre. Close enough but also far away from the city noise. Nidri is a place of true peace, while the lake on the bottom of the waterfall will leave you breathless. In its\' crystal waters you can even go to bathe. Nearby restaurant Basilico is renowned by its\' spectacular fish and giant portions sold at reasonable prices. In nidri it is even possible to find accomodation in idilyc mediteranian sea houses. If you are looking for peace and tranquility, you will hardly find a place better then Nidri.'),
(5, 'Sea Lakes', 'What are sea lakes you must be wondering? Well, they are tens and tens of mini bays around Lefkada which are habitats of many rare birds and other creatures. For nature lovers this is a real treat, having in mind that you can be in close contact with the wilderness.');

-- --------------------------------------------------------

--
-- Table structure for table `activity_images`
--

CREATE TABLE `activity_images` (
  `id` int(11) NOT NULL,
  `src` text NOT NULL,
  `alt` text NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activity_images`
--

INSERT INTO `activity_images` (`id`, `src`, `alt`, `activity_id`) VALUES
(1, 'image_1', 'Efes', 1),
(2, 'image_2', 'Efes', 1),
(3, 'image_3', 'Efes', 1),
(4, 'image_1', 'Mili', 3),
(11, 'image_1', 'Pamukkale', 2),
(12, 'image_1', 'Pamukkale', 2),
(13, 'image_1', 'Pamukkale', 2),
(14, 'image_1', 'Nidri', 4),
(16, 'image_1', 'Sea Lakes', 5),
(17, 'image_2', 'Sea Lakes', 5),
(18, 'image_3', 'Sea Lakes', 5),
(30, 'image_2', 'Nidri', 4);

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `email`, `message`) VALUES
(5, 'admin@admin.com', 'Ovo je neka poruka iz tabele Contact Messages.');

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `destination_information_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `destination_information_id`) VALUES
(1, 'Kusadasi', 6),
(2, 'Lefkada', 7);

-- --------------------------------------------------------

--
-- Table structure for table `destination_activities`
--

CREATE TABLE `destination_activities` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destination_activities`
--

INSERT INTO `destination_activities` (`id`, `destination_id`, `activity_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `destination_hotels`
--

CREATE TABLE `destination_hotels` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destination_hotels`
--

INSERT INTO `destination_hotels` (`id`, `destination_id`, `hotel_id`) VALUES
(5, 1, 1),
(4, 1, 2),
(2, 1, 3),
(1, 1, 4),
(3, 1, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12);

-- --------------------------------------------------------

--
-- Table structure for table `destination_informations`
--

CREATE TABLE `destination_informations` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destination_informations`
--

INSERT INTO `destination_informations` (`id`, `description`) VALUES
(6, 'Are you planning a perfect summer adventure? Kusadasi 2022 is the ideal option for you!\r\nKusadasi, \"Bird Island\", is the most popular Turkish resort on the Aegean Sea. Until twenty years ago, this was a small fishing village, and today it is a renowned tourist center. With numerous shops, unusual shops, a beautiful marina and a picturesque central square, the charm of Kusadasi is undeniable. For young people, there is the famous Bar street, where cafes and discos work all night and guarantee phenomenal entertainment.\r\nKusadasi Summer is a famous summer resort in Turkey. Kusadasi has been attracting tourists for years with its diverse and rich tourist offer. Compared to other summer resorts, e.g. In Greece, Kusadasi 2022 is a place you will not be able to visit in its entirety for even 10 days of stay. You will not even get tired of using all your free time to visit hundreds of intertwined and exotic streets in Kusadasi.\r\nThe city of Kusadasi is located on the west coast of Turkey and is flooded by the Aegean Sea. It also contributes to the fact that this city of over 80,000 inhabitants is also one of the most visited resorts in the Turkish region. This combination of urban everyday life and kilometers of sandy beaches is ideal for summer vacations for young people, just like you dreamed of!\r\nThe party bus and go2 team will complete your travel time, so the trip to Kusadasi will not be difficult. For those who enjoy traveling, they will have the opportunity to see the landscapes of Serbia, Bulgaria and Turkey. They will be able to complete that enjoyment with morning coffee on the ferry during the crossing of the Dardanelles. With the go2 team in the party bus it is never boring.\r\nThe city of Kusadasi offers you accommodation in hotels of different categories, in the center or on the seashore. Hotels are adapted to all tourists and payment options. Affordable prices are what make you happy upon arrival. Prices in supermarkets and restaurants are for our conditions and more than favorable for young people. Stores supplied with goods that will pleasantly surprise you with their quality. Then the kind sellers will make the purchase not an effort but a fun one. They will delight you with their jokes or anecdotes, and you may also get some souvenirs to remember.\r\nTransport to Kusadasi consists of the famous Turkish dolmus - vans, which will take you for 3-5 lira to one of the nearby beaches or transport you from one end of the city to the other. All you have to do is stop the vehicle wherever you are or wait for your dolmus at one of the marked stops.\r\nKusadasi is a paradise for young people for a reason. The city is characterized by a large number of cafes, restaurants, pubs and bars for young people. You can relax and enjoy them with the famous Turkish tea or coffee, but in the Turkish way. In the center of Kusadasi there is a always lively pedestrian zone, both during the day and in the evening. There are also clubs in the pedestrian zone where our agency organizes its themed parties. Surf the night with foreign and domestic commercial music and the support of our DJs. And when it comes to parties for young people, they start by gathering the company in the accommodation, from where they move to the Harem Club. The club is only ten meters away, and crazy fun is guaranteed.\r\nKusadasi summer resort is the right choice for young people, but also for those who feel that way. Dozens of different beaches nearby contribute to the feeling of being in a different destination every day. This diversity makes your vacation active and your trip unforgettable. Going to the beach with our agency is organized, but in order to fill your day with fun, there are also daily Kusadasi parties. We organize these parties in beach bars on the beach: Jade Beach Club, Miracle Beach Bar, Budha, Tren Beach Bar. Games without borders, Color Party, outdoor parties and even more fun awaits you there with our team.'),
(7, 'Lefkada is the most popular island in the Ionian Sea. It is connected to the mainland by a bridge, so it is the only Greek island, except Evia, which can be reached by car. Known as the \"Greek Caribbean\", Lefkada is a dream destination. Every year, especially during the summer months, thousands of tourists from Greece and abroad visit Lefkada to enjoy its beautiful beaches, spectacular mountains, clear sea and amazing waterfalls. White sand and pebbles glistening in the ionic sun, crystal clear, turquoise water and untouched nature will leave you breathless.\r\nThe main reason why thousands of people visit Lefkada every year are its beautiful beaches, which are among the most beautiful beaches in Greece. Lefkada has over twenty beaches, the most famous being Egremni, Porto Katsiki and Milos.\r\nOn Lefkada, you should also visit Nidri, which is a popular summer resort, but also hilly villages like Karja, which offer a unique view of the island. This village is located at an altitude of 500 meters, and due to the very pleasant climate, it is an ideal place to escape from the summer heat. You will really enjoy the picturesque scenery of traditional stone houses, narrow streets and lovely country taverns and cafes.\r\nVisit Lefkada and you will understand why you will want to come back again and explore this beautiful island.');

-- --------------------------------------------------------

--
-- Table structure for table `destination_information_images`
--

CREATE TABLE `destination_information_images` (
  `id` int(11) NOT NULL,
  `src` text NOT NULL,
  `alt` text NOT NULL,
  `destination_informations_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destination_information_images`
--

INSERT INTO `destination_information_images` (`id`, `src`, `alt`, `destination_informations_id`) VALUES
(2, 'image_1', 'Kusadasi', 6),
(3, 'image_2', 'Kusadasi', 6),
(4, 'image_3', 'Kusadasi', 6),
(5, 'image_4', 'Kusadasi', 6),
(7, 'image_2', 'Lefkada', 7),
(9, 'image_1', 'Lefkada', 7),
(13, 'image_3', 'Lefkada', 7);

-- --------------------------------------------------------

--
-- Table structure for table `destination_travel_dates`
--

CREATE TABLE `destination_travel_dates` (
  `id` int(11) NOT NULL,
  `travel_date_id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `destination_travel_dates`
--

INSERT INTO `destination_travel_dates` (`id`, `travel_date_id`, `destination_id`) VALUES
(1, 1, 1),
(8, 1, 2),
(2, 2, 1),
(6, 3, 2),
(7, 4, 2),
(3, 5, 1),
(4, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `footer_links`
--

CREATE TABLE `footer_links` (
  `id` int(11) NOT NULL,
  `src` text NOT NULL,
  `fa_fa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `footer_links`
--

INSERT INTO `footer_links` (`id`, `src`, `fa_fa`) VALUES
(1, 'css\\style.scss', 'fa-brands fa-sass'),
(2, 'js\\main.js', 'fa-brands fa-js'),
(3, 'css\\style.css', 'fa-brands fa-css3'),
(4, 'xml\\sitemap.xml', 'fa-solid fa-sitemap'),
(5, 'docs\\docs.pdf', 'fa-solid fa-file-lines');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price_per_night` float NOT NULL,
  `stars` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `price_per_night`, `stars`) VALUES
(1, 'Yildirim Bora', 10, 2),
(2, 'Scala Nuova', 12, 3),
(3, 'Hotel Cankaya', 11, 3),
(4, 'Akerdem', 14, 3),
(5, 'Palm', 17, 4),
(6, 'Filipos', 10, 2),
(7, 'Studio Apostolis', 10, 2),
(8, 'Borsalino Studios', 11, 2),
(9, 'Vula', 8, 2),
(10, 'Gatsulis', 9, 2),
(11, 'Stelios', 11, 2),
(12, 'Lila House', 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `nav_menu_items`
--

CREATE TABLE `nav_menu_items` (
  `id` int(11) NOT NULL,
  `link_name` text NOT NULL,
  `href` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nav_menu_items`
--

INSERT INTO `nav_menu_items` (`id`, `link_name`, `href`) VALUES
(1, 'Home', 'index.php'),
(2, 'Author', 'index.php?page=author.php'),
(3, 'Login', '#'),
(4, 'Logout', '#'),
(5, 'Contact', '#contact'),
(6, 'Admin', 'index.php?page=admin.php'),
(8, 'Reservations', 'index.php?page=showReservations.php\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `travel_dates_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `destination_id`, `hotel_id`, `travel_dates_id`, `user_id`, `price`) VALUES
(43, 1, 2, 5, 14, 234),
(44, 1, 4, 5, 14, 258),
(45, 1, 4, 1, 14, 258),
(46, 2, 8, 1, 14, 202),
(47, 2, 8, 3, 14, 202),
(48, 2, 11, 3, 14, 202);

-- --------------------------------------------------------

--
-- Table structure for table `travel_dates`
--

CREATE TABLE `travel_dates` (
  `id` int(11) NOT NULL,
  `travel_beginning` date NOT NULL,
  `travel_ending` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `travel_dates`
--

INSERT INTO `travel_dates` (`id`, `travel_beginning`, `travel_ending`) VALUES
(1, '2022-06-02', '2022-06-14'),
(2, '2022-06-09', '2022-06-21'),
(3, '2022-06-16', '2022-06-28'),
(4, '2022-06-23', '2022-07-05'),
(5, '2022-06-30', '2022-07-12'),
(6, '2022-07-07', '2022-07-19'),
(11, '2022-10-13', '2022-10-19');

-- --------------------------------------------------------

--
-- Table structure for table `travel_prices`
--

CREATE TABLE `travel_prices` (
  `id` int(11) NOT NULL,
  `price` float NOT NULL,
  `destination_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `travel_prices`
--

INSERT INTO `travel_prices` (`id`, `price`, `destination_id`) VALUES
(1, 90, 1),
(2, 70, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `phone_number` text NOT NULL,
  `role_id` int(11) NOT NULL,
  `locked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone_number`, `role_id`, `locked`) VALUES
(14, 'admin', 'admin', 'admin@admin.com', '2637a5c30af69a7bad877fdb65fbd78b', '+381552817482917', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `role_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_images`
--
ALTER TABLE `activity_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_information_id` (`destination_information_id`);

--
-- Indexes for table `destination_activities`
--
ALTER TABLE `destination_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- Indexes for table `destination_hotels`
--
ALTER TABLE `destination_hotels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `destination_id_2` (`destination_id`,`hotel_id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `destination_informations`
--
ALTER TABLE `destination_informations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `destination_information_images`
--
ALTER TABLE `destination_information_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_informations_id` (`destination_informations_id`);

--
-- Indexes for table `destination_travel_dates`
--
ALTER TABLE `destination_travel_dates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `travel_date_id_2` (`travel_date_id`,`destination_id`),
  ADD KEY `travel_date_id` (`travel_date_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `footer_links`
--
ALTER TABLE `footer_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nav_menu_items`
--
ALTER TABLE `nav_menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destination_id` (`destination_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `travel_dates_id` (`travel_dates_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `travel_dates`
--
ALTER TABLE `travel_dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel_prices`
--
ALTER TABLE `travel_prices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `destination_id_2` (`destination_id`),
  ADD KEY `destination_id` (`destination_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `activity_images`
--
ALTER TABLE `activity_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `destination_activities`
--
ALTER TABLE `destination_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `destination_hotels`
--
ALTER TABLE `destination_hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `destination_informations`
--
ALTER TABLE `destination_informations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `destination_information_images`
--
ALTER TABLE `destination_information_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `destination_travel_dates`
--
ALTER TABLE `destination_travel_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `footer_links`
--
ALTER TABLE `footer_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `nav_menu_items`
--
ALTER TABLE `nav_menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `travel_dates`
--
ALTER TABLE `travel_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `travel_prices`
--
ALTER TABLE `travel_prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_images`
--
ALTER TABLE `activity_images`
  ADD CONSTRAINT `activity_images_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `destinations`
--
ALTER TABLE `destinations`
  ADD CONSTRAINT `destinations_ibfk_1` FOREIGN KEY (`destination_information_id`) REFERENCES `destination_informations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `destination_activities`
--
ALTER TABLE `destination_activities`
  ADD CONSTRAINT `destination_activities_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `destination_activities_ibfk_2` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `destination_hotels`
--
ALTER TABLE `destination_hotels`
  ADD CONSTRAINT `destination_hotels_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `destination_hotels_ibfk_3` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `destination_information_images`
--
ALTER TABLE `destination_information_images`
  ADD CONSTRAINT `destination_information_images_ibfk_1` FOREIGN KEY (`destination_informations_id`) REFERENCES `destination_informations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `destination_travel_dates`
--
ALTER TABLE `destination_travel_dates`
  ADD CONSTRAINT `destination_travel_dates_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `destination_travel_dates_ibfk_2` FOREIGN KEY (`travel_date_id`) REFERENCES `travel_dates` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`travel_dates_id`) REFERENCES `travel_dates` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_4` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `travel_prices`
--
ALTER TABLE `travel_prices`
  ADD CONSTRAINT `travel_prices_ibfk_1` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
