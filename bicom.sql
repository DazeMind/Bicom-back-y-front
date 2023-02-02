-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 02-02-2023 a las 18:24:02
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bicom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Poleras', 'prendas superiores (poleras, polerones)', NULL, '2023-01-31 14:41:18', '2023-01-31 19:07:45'),
(2, 'Pantalones', 'prenda inferior (buso, short, jeans)', NULL, '2023-01-31 14:41:18', NULL),
(6, 'Prueba', 'Description', NULL, '2023-02-01 01:50:27', '2023-02-01 01:50:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_category` int NOT NULL,
  `stock` int NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_category_idx` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `id_category`, `stock`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Polera talla XS', '10990', 2, 20, 'polera de marca', '2023-01-31 14:42:25', '2023-01-31 16:09:23'),
(2, 'Camisa talla XL', '15990', 1, 1, 'Camisa de cuadros', '2023-01-31 14:42:25', NULL),
(6, 'PRuebaaa', '10990', 2, 12, 'prueba', '2023-02-01 02:24:47', '2023-02-01 02:24:47');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Danny', 'danny@danny.cl', '0a1c6944cb66d02ccefac35620ce2e51', '2023-01-31 19:39:00', '2023-01-31 19:39:00'),
(2, 'admin', 'admin@admin.cl', '0a1c6944cb66d02ccefac35620ce2e51', '2023-01-31 19:39:00', '2023-01-31 19:39:00'),
(3, 'Administrador', 'admin@danny.cl', '123', '2023-02-02 01:24:42', '2023-02-02 01:24:42'),
(5, 'PRuebaregister', 'prueba@prueba.cl', '123456789', '2023-02-02 01:42:07', '2023-02-02 01:42:07'),
(16, 'c', 'cd@b.cl', '$2a$10$r.mxS87AbNVSWaNv67eFX.Pj9/2Og44hUv7UOtYPZPYyZZN9BK/4y', '2023-02-02 15:13:20', '2023-02-02 15:13:20'),
(17, 'c', 'cdd@b.cl', '$2a$10$L.fHbMBpid5JU2AoLGVPlOuCZS9UZJlDu0LGONPgPryQvn/WG5jEe', '2023-02-02 15:13:57', '2023-02-02 15:13:57'),
(18, 'Prueba', 'hash@hash.cl', '$2a$10$upmq8in7Ua2RE20hPGcHDeqaZ.VLOoXg4FWGR51.6G5N/X/Z25rMq', '2023-02-02 15:24:34', '2023-02-02 15:24:34');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
