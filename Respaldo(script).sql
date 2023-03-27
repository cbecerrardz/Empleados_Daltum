USE [master]
GO
/****** Object:  Database [testDB]    Script Date: 27/03/2023 01:19:43 a. m. ******/
CREATE DATABASE [testDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'testDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'testDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [testDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [testDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [testDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [testDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [testDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [testDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [testDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [testDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [testDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [testDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [testDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [testDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [testDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [testDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [testDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [testDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [testDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [testDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [testDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [testDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [testDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [testDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [testDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [testDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [testDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [testDB] SET  MULTI_USER 
GO
ALTER DATABASE [testDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [testDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [testDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [testDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [testDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [testDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [testDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [testDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [testDB]
GO
/****** Object:  Table [dbo].[Empleados]    Script Date: 27/03/2023 01:19:44 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empleados](
	[Nombre] [varchar](50) NOT NULL,
	[Apellido_Paterno] [varchar](30) NOT NULL,
	[Apellido_Materno] [varchar](30) NULL,
	[Edad] [tinyint] NULL,
	[Fecha_Nacimiento] [date] NOT NULL,
	[Genero] [varchar](10) NOT NULL,
	[Estado_Civil] [varchar](50) NOT NULL,
	[RFC] [varchar](13) NULL,
	[Direccion] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Telefono] [varchar](50) NOT NULL,
	[Puesto] [varchar](30) NOT NULL,
	[Fecha_Alta] [datetime] NOT NULL,
	[Fecha_Baja] [datetime] NULL,
	[IdEmpleado] [int] IDENTITY(1,1) NOT NULL,
	[IdGenero] [tinyint] NOT NULL,
	[IdEdoCivil] [int] NOT NULL,
	[Estatus] [char](1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEmpleado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estado_Civil]    Script Date: 27/03/2023 01:19:44 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estado_Civil](
	[Nombre__EdoCivil] [varchar](30) NULL,
	[IdEdoCivil] [int] IDENTITY(1,1) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEdoCivil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genero]    Script Date: 27/03/2023 01:19:44 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genero](
	[IdGenero] [tinyint] IDENTITY(1,1) NOT NULL,
	[Genero] [varchar](12) NULL,
 CONSTRAINT [PK_Genero] PRIMARY KEY CLUSTERED 
(
	[IdGenero] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Empleados]  WITH CHECK ADD  CONSTRAINT [FK_Estado_Civil_IdEdoCivil] FOREIGN KEY([IdEdoCivil])
REFERENCES [dbo].[Estado_Civil] ([IdEdoCivil])
GO
ALTER TABLE [dbo].[Empleados] CHECK CONSTRAINT [FK_Estado_Civil_IdEdoCivil]
GO
ALTER TABLE [dbo].[Empleados]  WITH CHECK ADD  CONSTRAINT [FK_Genero_IdGenero] FOREIGN KEY([IdGenero])
REFERENCES [dbo].[Genero] ([IdGenero])
GO
ALTER TABLE [dbo].[Empleados] CHECK CONSTRAINT [FK_Genero_IdGenero]
GO
USE [master]
GO
ALTER DATABASE [testDB] SET  READ_WRITE 
GO
