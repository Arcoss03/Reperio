-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 08, 2023 at 09:25 PM
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
-- Database: `db-reperio-v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(10) NOT NULL,
  `nom_admin` varchar(255) NOT NULL,
  `mdp_admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `nom_admin`, `mdp_admin`) VALUES
(1, 'admin', '$2a$10$fZ7RFp3XaYACD17LPfSDeO/Cg8y3SZD0TWCeyTCVEDGX4TU/C4l0q');

-- --------------------------------------------------------

--
-- Table structure for table `candidat`
--

CREATE TABLE `candidat` (
  `id_candidat` int(10) NOT NULL,
  `email_candidat` varchar(255) NOT NULL,
  `mdp_candidat` varchar(255) NOT NULL,
  `prenom_candidat` varchar(255) NOT NULL,
  `nom_candidat` varchar(255) NOT NULL,
  `chemin_cv_candidat` varchar(255) NOT NULL,
  `ville_candidat` int(10) DEFAULT NULL,
  `chemin_pp_candidat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidat`
--

INSERT INTO `candidat` (`id_candidat`, `email_candidat`, `mdp_candidat`, `prenom_candidat`, `nom_candidat`, `chemin_cv_candidat`, `ville_candidat`, `chemin_pp_candidat`) VALUES
(1, 'frin.arthur@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'arthur', 'FRIN', 'arthur_FRIN_1683239131749.jpg', NULL, NULL),
(2, 'michel.truc@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'michel', 'truc', 'michel_truc_1683377510024.png', NULL, NULL),
(3, 'paul.menard@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Paul', 'Menard', 'Paul_Menard_1683480237883.png', NULL, NULL),
(4, 'alcide.perrein@sobek.fr', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Alcide', 'Perrein', 'Alcide_Perrein_1683548818424.png', NULL, NULL),
(5, 'alexis.brt@free.fr', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Alexis', 'Breton', 'Alexis_Breton_1683551109414.png', NULL, NULL),
(6, 'nicolas.charpi@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Nicolas', 'Charpignon', 'Nicolas_Charpignon_1683567176263.jpg', NULL, NULL),
(7, 'jean.mich@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Jean', 'Mich', 'Jean_Mich_1683568003159.png', NULL, NULL),
(8, 'jean@eude.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', 'Jean', 'Eude', 'Jean_Eude_1683579863249.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `domaine`
--

CREATE TABLE `domaine` (
  `id_domaine` int(10) NOT NULL,
  `nom_domaine` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entreprise`
--

CREATE TABLE `entreprise` (
  `id_entreprise` int(10) NOT NULL,
  `nom_entreprise` varchar(255) NOT NULL,
  `email_entreprise` varchar(255) NOT NULL,
  `mdp_entreprise` varchar(255) NOT NULL,
  `domaine_entreprise` int(10) DEFAULT NULL,
  `chemin_fiche_poste` varchar(255) NOT NULL,
  `chemin_pp_entreprise` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `entreprise`
--

INSERT INTO `entreprise` (`id_entreprise`, `nom_entreprise`, `email_entreprise`, `mdp_entreprise`, `domaine_entreprise`, `chemin_fiche_poste`, `chemin_pp_entreprise`) VALUES
(6, 'avt', 'avt@gmail.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'avt_1683241153431.jpg', NULL),
(7, 'machin', 'machin@test.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'machin_1683241341895.png', NULL),
(8, 'Extia', 'contact@extia.fr', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'Extia_1683241815537.jpg', NULL),
(9, 'microsoft', 'contact@mircrosoft.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'microsoft_1683382899793.jpg', NULL),
(10, 'entreprise', 'entreprise@enterprise.fr', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'entreprise_1683551284220.jpg', NULL),
(11, 'superEntreprise', 'super@entreprise.com', '$2a$10$fZ7RFp3XaYACD17LPfSDeOsvOHrvcrXeoVt2mR4QeZ1cXIfNWNEda', NULL, 'superEntreprise_1683566770434.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id_match` int(11) NOT NULL,
  `id_candidat` int(11) NOT NULL,
  `id_entreprise` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `match`
--

INSERT INTO `match` (`id_match`, `id_candidat`, `id_entreprise`) VALUES
(1, 1, 9),
(3, 1, 6),
(4, 6, 11);

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `id_candidat` int(11) NOT NULL,
  `id_entreprise` int(11) NOT NULL,
  `like_candidat` int(11) DEFAULT NULL,
  `like_entreprise` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `relation`
--

INSERT INTO `relation` (`id_candidat`, `id_entreprise`, `like_candidat`, `like_entreprise`) VALUES
(1, 6, 1, 1),
(1, 7, 1, NULL),
(1, 8, 1, NULL),
(1, 9, 1, 1),
(1, 10, NULL, 0),
(1, 11, 0, NULL),
(2, 6, 1, NULL),
(2, 7, 0, NULL),
(2, 8, 0, NULL),
(2, 9, 0, 1),
(2, 10, NULL, 0),
(2, 11, NULL, 1),
(3, 6, 1, NULL),
(3, 7, 1, NULL),
(3, 8, 1, NULL),
(3, 9, 1, NULL),
(3, 10, NULL, 1),
(3, 11, NULL, 1),
(4, 6, 0, NULL),
(4, 7, 1, NULL),
(4, 8, 1, NULL),
(4, 9, 0, NULL),
(4, 10, NULL, 1),
(4, 11, NULL, 1),
(5, 6, 1, NULL),
(5, 7, 0, NULL),
(5, 8, 1, NULL),
(5, 9, 1, NULL),
(5, 10, NULL, 0),
(5, 11, NULL, 1),
(6, 6, 1, NULL),
(6, 7, 1, NULL),
(6, 8, 1, NULL),
(6, 9, 1, NULL),
(6, 10, 1, NULL),
(6, 11, 1, 1),
(7, 11, NULL, 1),
(8, 6, 1, NULL),
(8, 7, 1, NULL),
(8, 8, 0, NULL),
(8, 9, 0, NULL),
(8, 10, 1, NULL),
(8, 11, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ville`
--

CREATE TABLE `ville` (
  `id_ville` int(10) NOT NULL,
  `nom_ville` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `candidat`
--
ALTER TABLE `candidat`
  ADD PRIMARY KEY (`id_candidat`),
  ADD UNIQUE KEY `email_candidat` (`email_candidat`),
  ADD KEY `ville_candidat` (`ville_candidat`);

--
-- Indexes for table `domaine`
--
ALTER TABLE `domaine`
  ADD PRIMARY KEY (`id_domaine`);

--
-- Indexes for table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id_entreprise`),
  ADD UNIQUE KEY `email_entreprise` (`email_entreprise`),
  ADD KEY `domaine_entreprise` (`domaine_entreprise`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `id_candidat` (`id_candidat`),
  ADD KEY `id_entreprise` (`id_entreprise`);

--
-- Indexes for table `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`id_candidat`,`id_entreprise`),
  ADD KEY `id_entreprise` (`id_entreprise`);

--
-- Indexes for table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`id_ville`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidat`
--
ALTER TABLE `candidat`
  MODIFY `id_candidat` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `domaine`
--
ALTER TABLE `domaine`
  MODIFY `id_domaine` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id_entreprise` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ville`
--
ALTER TABLE `ville`
  MODIFY `id_ville` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidat`
--
ALTER TABLE `candidat`
  ADD CONSTRAINT `fk_candidat_ville` FOREIGN KEY (`ville_candidat`) REFERENCES `ville` (`id_ville`);

--
-- Constraints for table `entreprise`
--
ALTER TABLE `entreprise`
  ADD CONSTRAINT `fk_entreprise_domaine` FOREIGN KEY (`domaine_entreprise`) REFERENCES `domaine` (`id_domaine`);

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `match_ibfk_1` FOREIGN KEY (`id_candidat`) REFERENCES `candidat` (`id_candidat`),
  ADD CONSTRAINT `match_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id_entreprise`);

--
-- Constraints for table `relation`
--
ALTER TABLE `relation`
  ADD CONSTRAINT `relation_ibfk_1` FOREIGN KEY (`id_candidat`) REFERENCES `candidat` (`id_candidat`),
  ADD CONSTRAINT `relation_ibfk_2` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id_entreprise`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
