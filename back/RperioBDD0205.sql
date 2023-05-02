-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 02, 2023 at 04:04 PM
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
  `id.admin` int(10) NOT NULL,
  `nom.admin` varchar(255) NOT NULL,
  `mdp.admin` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `candidat`
--

CREATE TABLE `candidat` (
  `id.candidat` int(10) NOT NULL,
  `email.candidat` varchar(255) NOT NULL,
  `mdp.candidat` varchar(255) NOT NULL,
  `prenom.candidat` varchar(255) NOT NULL,
  `nom.candidat` varchar(255) NOT NULL,
  `chemin.cv.candidat` varchar(255) NOT NULL,
  `ville.candidat` int(10) DEFAULT NULL,
  `chemin.pp.candidat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `domaine`
--

CREATE TABLE `domaine` (
  `id.domaine` int(10) NOT NULL,
  `nom.domaine` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `entreprise`
--

CREATE TABLE `entreprise` (
  `id.entreprise` int(10) NOT NULL,
  `nom.entreprise` varchar(255) NOT NULL,
  `email.entreprise` varchar(255) NOT NULL,
  `mdp.entreprise` varchar(255) NOT NULL,
  `domaine.entreprise` int(10) NOT NULL,
  `chemin.pp.entreprise` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fiche.poste`
--

CREATE TABLE `fiche.poste` (
  `id.poste` int(10) NOT NULL,
  `id.domaine` int(10) NOT NULL,
  `id.entreprise` int(10) NOT NULL,
  `intitule.poste` varchar(255) NOT NULL,
  `description.poste` varchar(255) NOT NULL,
  `chemin.fiche.poste` varchar(255) NOT NULL,
  `ville.poste` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `match`
--

CREATE TABLE `match` (
  `id.candidat` int(10) NOT NULL,
  `id.entreprise` int(10) NOT NULL,
  `id.poste` int(10) NOT NULL,
  `id.match` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `relation`
--

CREATE TABLE `relation` (
  `id.candidat` int(10) NOT NULL,
  `id.poste` int(10) NOT NULL,
  `like.candidat` int(1) DEFAULT NULL,
  `like.entreprise` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ville`
--

CREATE TABLE `ville` (
  `id.ville` int(10) NOT NULL,
  `nom.ville` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id.admin`);

--
-- Indexes for table `candidat`
--
ALTER TABLE `candidat`
  ADD PRIMARY KEY (`id.candidat`),
  ADD UNIQUE KEY `email.candidat` (`email.candidat`),
  ADD KEY `ville.candidat` (`ville.candidat`);

--
-- Indexes for table `domaine`
--
ALTER TABLE `domaine`
  ADD PRIMARY KEY (`id.domaine`);

--
-- Indexes for table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id.entreprise`),
  ADD UNIQUE KEY `email.entreprise` (`email.entreprise`),
  ADD KEY `domaine.entreprise` (`domaine.entreprise`);

--
-- Indexes for table `fiche.poste`
--
ALTER TABLE `fiche.poste`
  ADD PRIMARY KEY (`id.poste`),
  ADD KEY `id.domaine` (`id.domaine`),
  ADD KEY `id.entreprise` (`id.entreprise`),
  ADD KEY `ville.poste` (`ville.poste`);

--
-- Indexes for table `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id.match`),
  ADD KEY `fk.match.entreprise` (`id.entreprise`),
  ADD KEY `fk.match.poste` (`id.poste`),
  ADD KEY `id.candidat` (`id.candidat`);

--
-- Indexes for table `relation`
--
ALTER TABLE `relation`
  ADD KEY `id.relation` (`id.candidat`,`id.poste`),
  ADD KEY `fk.relation.entreprise` (`id.poste`);

--
-- Indexes for table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`id.ville`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id.admin` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidat`
--
ALTER TABLE `candidat`
  MODIFY `id.candidat` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `domaine`
--
ALTER TABLE `domaine`
  MODIFY `id.domaine` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id.entreprise` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fiche.poste`
--
ALTER TABLE `fiche.poste`
  MODIFY `id.poste` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `id.match` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ville`
--
ALTER TABLE `ville`
  MODIFY `id.ville` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `candidat`
--
ALTER TABLE `candidat`
  ADD CONSTRAINT `fk.candidat.ville` FOREIGN KEY (`ville.candidat`) REFERENCES `ville` (`id.ville`);

--
-- Constraints for table `entreprise`
--
ALTER TABLE `entreprise`
  ADD CONSTRAINT `fk.entreprise.domaine` FOREIGN KEY (`domaine.entreprise`) REFERENCES `domaine` (`id.domaine`);

--
-- Constraints for table `fiche.poste`
--
ALTER TABLE `fiche.poste`
  ADD CONSTRAINT `fk.poste.domaine` FOREIGN KEY (`id.domaine`) REFERENCES `domaine` (`id.domaine`),
  ADD CONSTRAINT `fk.poste.entreprise` FOREIGN KEY (`id.entreprise`) REFERENCES `entreprise` (`id.entreprise`),
  ADD CONSTRAINT `fk.poste.ville` FOREIGN KEY (`ville.poste`) REFERENCES `ville` (`id.ville`);

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `fk.match.candidat` FOREIGN KEY (`id.entreprise`) REFERENCES `candidat` (`id.candidat`),
  ADD CONSTRAINT `fk.match.entreprise` FOREIGN KEY (`id.entreprise`) REFERENCES `entreprise` (`id.entreprise`),
  ADD CONSTRAINT `fk.match.poste` FOREIGN KEY (`id.poste`) REFERENCES `fiche.poste` (`id.poste`);

--
-- Constraints for table `relation`
--
ALTER TABLE `relation`
  ADD CONSTRAINT `fk.relation.candidat` FOREIGN KEY (`id.candidat`) REFERENCES `candidat` (`id.candidat`),
  ADD CONSTRAINT `fk.relation.entreprise` FOREIGN KEY (`id.poste`) REFERENCES `fiche.poste` (`id.poste`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
