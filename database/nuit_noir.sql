-- Group 8 Project SQL
-- Group Members: Dominic Chavez, James Balden
-- Date: 2/14/2023


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_chavezdo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_address` varchar(50) NOT NULL,
  `customer_email` varchar(50) NOT NULL,
  `customer_level_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`customer_id`, `customer_name`, `customer_address`, `customer_email`, `customer_level_id`) VALUES
(1, 'Wyatt Earp', '326 Allen Street, Tombstone, AZ 85638', 'helliscomingwithme@gmail.com', 1),
(2, 'Virgil Earp', '408 AZ-80, Tombstone, AZ 85638', 'holdonnothin@gmail.com', 2),
(3, 'Morgan Earp', '417 E Allen St, Tombstone, AZ 85638', 'hiya@gmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Customer_Levels`
--

CREATE TABLE `Customer_Levels` (
  `customer_level_id` int(11) NOT NULL,
  `level_name` varchar(50) NOT NULL,
  `level_description` varchar(50) NOT NULL,
  `discount_percent` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customer_Levels`
--

INSERT INTO `Customer_Levels` (`customer_level_id`, `level_name`, `level_description`, `discount_percent`) VALUES
(1, 'Platinum', '20% Discount', '0.20'),
(2, 'Gold', '10% Discount', '0.10'),
(3, 'Silver', '5% Discount', '0.05');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(50) NOT NULL,
  `employee_title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`employee_id`, `employee_name`, `employee_title`) VALUES
(1, 'Dominic Chavez', 'Manager'),
(2, 'James Balden', 'Manager'),
(3, 'Cole Phelps', 'Clerk');

-- --------------------------------------------------------

--
-- Table structure for table `Films`
--

CREATE TABLE `Films` (
  `film_id` int(11) NOT NULL,
  `film_name` varchar(50) NOT NULL,
  `film_price` decimal(19,2) NOT NULL,
  `film_in_stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Films`
--

INSERT INTO `Films` (`film_id`, `film_name`, `film_price`, `film_in_stock`) VALUES
(1, 'The Maltese Falcon', '12.99', 10),
(2, 'The Third Man', '10.99', 20),
(3, 'Brick', '8.99', 30);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `total_price` decimal(19,2) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`order_id`, `order_date`, `total_price`, `employee_id`, `customer_id`) VALUES
(1, '1954-10-09', '12.99', 3, 1),
(2, '1951-02-01', '23.98', 2, 2),
(3, '1953-12-18', '32.97', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Orders_Has_Films`
--

CREATE TABLE `Orders_Has_Films` (
  `order_id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Orders_Has_Films`
--

INSERT INTO `Orders_Has_Films` (`order_id`, `film_id`) VALUES
(1, 2),
(2, 1),
(3, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`,`customer_level_id`),
  ADD UNIQUE KEY `customer_name_UNIQUE` (`customer_name`),
  ADD UNIQUE KEY `customer_email_UNIQUE` (`customer_email`),
  ADD UNIQUE KEY `customer_id_UNIQUE` (`customer_id`),
  ADD KEY `fk_Customers_Customer_Levels1_idx` (`customer_level_id`);

--
-- Indexes for table `Customer_Levels`
--
ALTER TABLE `Customer_Levels`
  ADD PRIMARY KEY (`customer_level_id`),
  ADD UNIQUE KEY `customer_level_id_UNIQUE` (`customer_level_id`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_id_UNIQUE` (`employee_id`);

--
-- Indexes for table `Films`
--
ALTER TABLE `Films`
  ADD PRIMARY KEY (`film_id`),
  ADD UNIQUE KEY `film_id_UNIQUE` (`film_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`,`customer_id`,`employee_id`),
  ADD UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  ADD KEY `fk_Orders_Customers1_idx` (`customer_id`),
  ADD KEY `fk_Orders_Employees1_idx` (`employee_id`);

--
-- Indexes for table `Orders_Has_Films`
--
ALTER TABLE `Orders_Has_Films`
  ADD PRIMARY KEY (`order_id`,`film_id`),
  ADD KEY `fk_Orders_Has_Films_Films1_idx` (`film_id`),
  ADD KEY `fk_Orders_Has_Films_Orders_idx` (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Customer_Levels`
--
ALTER TABLE `Customer_Levels`
  MODIFY `customer_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Films`
--
ALTER TABLE `Films`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Customers`
--
ALTER TABLE `Customers`
  ADD CONSTRAINT `fk_Customers_Customer_Levels1` FOREIGN KEY (`customer_level_id`) REFERENCES `Customer_Levels` (`customer_level_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Orders_Customers1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_Employees1` FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `Orders_Has_Films`
--
ALTER TABLE `Orders_Has_Films`
  ADD CONSTRAINT `fk_Orders_Has_Films1` FOREIGN KEY (`film_id`) REFERENCES `Films` (`film_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Orders_Has_Films_Orders` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
