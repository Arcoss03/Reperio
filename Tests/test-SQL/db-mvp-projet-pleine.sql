-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 13, 2023 at 06:18 PM
-- Server version: 5.7.34
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db-mvp-projet`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidat`
--

CREATE TABLE `candidat` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `certification` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidat`
--

INSERT INTO `candidat` (`id`, `name`, `lastname`, `tel`, `certification`, `description`) VALUES
(1, 'Julie\r\n', 'Dupont', '06 12 34 56 78\r\n', 'Master en Marketing\r\n', 'Je suis une jeune professionnelle passionnée par le marketing digital.'),
(2, 'Pierre\r\n', 'Martin', '06 98 76 54 32\r\n', 'Licence en Gestion\r\n', 'Je suis à la recherche d\'un poste en gestion financière.'),
(3, 'Emma', 'Dubois', '07 12 34 56 78', 'Doctorat en Physique', 'Je suis passionnée par la recherche scientifique et les avancées technologiques.'),
(4, 'Antoine\r\n', 'Leroy', '06 54 32 10 98', 'BTS en Informatique', 'Je suis un développeur web autodidacte, passionné par la programmation et les nouvelles technologies.'),
(5, 'Sarah\r\n', 'Moreau', '06 78 90 12 34\r\n', 'Licence en Histoire de l\'Art\r\n', 'Je suis une passionnée d\'art et j\'ai pour projet de travailler dans le milieu culturel.'),
(6, 'Lucas\r\n\r\n', 'Dupuis', '06 43 21 98 76\r\n', 'Bac Pro en Électricité\r\n', 'Je suis un électricien qualifié, passionné par mon métier et toujours à la recherche de nouveaux projets.\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `recruteur`
--

CREATE TABLE `recruteur` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `recruteur`
--

INSERT INTO `recruteur` (`id`, `name`, `description`) VALUES
(1, 'AVT ', 'Entreprise tarpin froduleuse\r\n'),
(2, 'XYZ Corp\r\n', 'Entreprise de conseil en informatique et gestion de projet.'),
(3, 'DEF Industries\r\n', 'Entreprise de fabrication de composants électroniques pour l\'industrie automobile.'),
(4, 'GHI Services\r\n', 'Entreprise de services informatiques spécialisée dans la sécurité des données.'),
(5, 'JKL Design\r\n', 'Agence de design graphique et de communication visuelle.\r\n'),
(6, 'MNO Consulting', 'Cabinet de conseil en stratégie et développement durable.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidat`
--
ALTER TABLE `candidat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recruteur`
--
ALTER TABLE `recruteur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidat`
--
ALTER TABLE `candidat`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `recruteur`
--
ALTER TABLE `recruteur`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
