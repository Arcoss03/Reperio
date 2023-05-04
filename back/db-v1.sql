-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 04, 2023 at 07:58 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reperio`
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
  `chemin_pp_entreprise` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fiche_poste`
--

CREATE TABLE `fiche_poste` (
  `id_poste` int(10) NOT NULL,
  `poste_domaine` int(10) DEFAULT NULL,
  `id_entreprise` int(10) NOT NULL,
  `intitule_poste` varchar(255) NOT NULL,
  `description_poste` varchar(255) NOT NULL,
  `chemin_fiche_poste` varchar(255) NOT NULL,
  `ville_poste` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id_candidat` int(10) NOT NULL,
  `id_entreprise` int(10) NOT NULL,
  `id_poste` int(10) NOT NULL,
  `id_match` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `id_candidat` int(10) NOT NULL,
  `id_poste` int(10) NOT NULL,
  `like_candidat` int(1) DEFAULT NULL,
  `like_entreprise` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Indexes for table `fiche_poste`
--
ALTER TABLE `fiche_poste`
  ADD PRIMARY KEY (`id_poste`),
  ADD UNIQUE KEY `poste_domaine` (`poste_domaine`),
  ADD KEY `id_domaine` (`poste_domaine`),
  ADD KEY `id_entreprise` (`id_entreprise`),
  ADD KEY `ville_poste` (`ville_poste`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `fk_match_entreprise` (`id_entreprise`),
  ADD KEY `fk_match_poste` (`id_poste`),
  ADD KEY `id_candidat` (`id_candidat`);

--
-- Indexes for table `relation`
--
ALTER TABLE `relation`
  ADD KEY `id_relation` (`id_candidat`,`id_poste`),
  ADD KEY `fk_relation_entreprise` (`id_poste`);

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
  MODIFY `id_admin` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidat`
--
ALTER TABLE `candidat`
  MODIFY `id_candidat` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `domaine`
--
ALTER TABLE `domaine`
  MODIFY `id_domaine` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id_entreprise` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fiche_poste`
--
ALTER TABLE `fiche_poste`
  MODIFY `id_poste` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id_match` int(10) NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `fiche_poste`
--
ALTER TABLE `fiche_poste`
  ADD CONSTRAINT `fk_poste_domaine` FOREIGN KEY (`poste_domaine`) REFERENCES `domaine` (`id_domaine`),
  ADD CONSTRAINT `fk_poste_entreprise` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id_entreprise`),
  ADD CONSTRAINT `fk_poste_ville` FOREIGN KEY (`ville_poste`) REFERENCES `ville` (`id_ville`);

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `fk_match_candidat` FOREIGN KEY (`id_entreprise`) REFERENCES `candidat` (`id_candidat`),
  ADD CONSTRAINT `fk_match_entreprise` FOREIGN KEY (`id_entreprise`) REFERENCES `entreprise` (`id_entreprise`),
  ADD CONSTRAINT `fk_match_poste` FOREIGN KEY (`id_poste`) REFERENCES `fiche_poste` (`id_poste`);

--
-- Constraints for table `relation`
--
ALTER TABLE `relation`
  ADD CONSTRAINT `fk_relation_candidat` FOREIGN KEY (`id_candidat`) REFERENCES `candidat` (`id_candidat`),
  ADD CONSTRAINT `fk_relation_entreprise` FOREIGN KEY (`id_poste`) REFERENCES `fiche_poste` (`id_poste`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;