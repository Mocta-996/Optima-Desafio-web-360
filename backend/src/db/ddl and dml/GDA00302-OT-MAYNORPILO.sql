-- GDA00302-OT - MAYNOR OCTAVIO PILO TUY

-- 1. CREACION DE LA BASE DE DATOS:
CREATE DATABASE GDA00302OT_MAYNORPILO;
USE GDA00302OT_MAYNORPILO;
-- 2. CRACION DE TABLAS, CAMPOS Y RELACIONES

CREATE TABLE estados (
    idestados INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL
);

CREATE TABLE rol (
    idrol INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL
);

CREATE TABLE cliente (
    idCliente INT IDENTITY(1,1) PRIMARY KEY,
    razon_social VARCHAR(245) NOT NULL,
    nombre_comercial VARCHAR(345),
    direccion_entrega VARCHAR(345)
);

-- DROP TABLE cliente;
CREATE TABLE usuario (
    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    rol_idrol INT NOT NULL,
    estados_idestados INT NOT NULL,
    correo_electronico VARCHAR(80) UNIQUE NOT NULL,
    nombre_completo VARCHAR(50) NOT NULL,
    contrasenia VARBINARY(64) NOT NULL,
    telefono VARCHAR(8),
    fecha_nacimiento DATE,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    cliente_idCliente INT NULL,
    FOREIGN KEY (rol_idrol) REFERENCES rol (idrol),
    FOREIGN KEY (estados_idestados) REFERENCES estados (idestados),
    FOREIGN KEY (cliente_idCliente) REFERENCES cliente (idCliente) ON DELETE SET NULL  
);
-- DROP TABLE usuario;

CREATE TABLE categoriaProducto (
    idCategoriaProducto INT IDENTITY(1,1) PRIMARY KEY,
    usuario_idusuario INT NOT NULL,
    estados_idestados INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario (idusuario),
    FOREIGN KEY (estados_idestados) REFERENCES estados (idestados)
);

CREATE TABLE producto (
    idProducto INT IDENTITY(1,1) PRIMARY KEY,
    categoriaProducto_idCategoriaProducto INT NOT NULL,
    usuario_idusuario INT NOT NULL,
    estados_idestados INT NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    marca VARCHAR(45),
    codigo VARCHAR(45),
    stock FLOAT,
    precio FLOAT,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    foto VARCHAR(max),
    FOREIGN KEY (categoriaProducto_idCategoriaProducto) REFERENCES categoriaProducto (idCategoriaProducto),
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario (idUsuario),
    FOREIGN KEY (estados_idestados) REFERENCES estados (idestados)
);

CREATE TABLE orden (
    idOrden INT IDENTITY(1,1) PRIMARY KEY,
    usuario_idusuario INT NOT NULL,
    estados_idestados INT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    nombre_completo VARCHAR(545),
    direccion VARCHAR(545),
    telefono VARCHAR(8),
    correo_electronico VARCHAR(45),
    fecha_entrega DATE,
    total_orden FLOAT,
    FOREIGN KEY (usuario_idusuario) REFERENCES usuario (idusuario),
    FOREIGN KEY (estados_idestados) REFERENCES estados (idestados)
);

CREATE TABLE ordenDetalles (
    idOrdenDetalles INT IDENTITY(1,1) PRIMARY KEY,
    orden_idOrden INT NOT NULL,
    producto_idProducto INT NOT NULL,
    cantidad INT,
    precio FLOAT,
    subtotal FLOAT,
    FOREIGN KEY (orden_idOrden) REFERENCES orden (idOrden),
    FOREIGN KEY (producto_idProducto) REFERENCES producto (idProducto)
);

/*
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';
*/

-- 3. PROCEDIEMIENTOS ALMACENADOS

-- *****************************************
-- ************* TABLA ESTADOS *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA ESTADOS

CREATE PROCEDURE insertar_estados
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        INSERT INTO estados (nombre)
        VALUES (@nombre);
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- eliminar el procedimiento almacenado si existe
DROP PROCEDURE IF EXISTS insertar_estados;

-- Agregar un estado
EXEC insertar_estados 'Disponible';

-- MODIFICAR INFORMACION EN LA TABLA ESTADOS
CREATE PROCEDURE modificar_estados(
    @idestados INT,
    @nombre VARCHAR(45)
) 
AS
BEGIN
    BEGIN TRY
        UPDATE estados
        SET nombre = @nombre
        WHERE idestados = @idestados;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- Modificar un estado
EXEC modificar_estados 1, 'No Disponible';

-- *****************************************
-- ************* TABLA ROL *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA ROL
CREATE PROCEDURE insertar_rol(
    @nombre VARCHAR(45)
)
AS
BEGIN
    BEGIN TRY
        INSERT INTO rol (nombre)
        VALUES (@nombre);
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- Agregar un rol
EXEC insertar_rol 'Cliente';

-- MODIFICAR INFORMACION EN LA TABLA ROL
CREATE PROCEDURE modificar_rol(
    @idrol INT,
    @nombre VARCHAR(45)
)
AS
BEGIN
    BEGIN TRY
        UPDATE rol
        SET nombre = @nombre
        WHERE idrol = @idrol;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- Modificar un rol
EXEC modificar_rol 1, 'Operador';


-- *****************************************
-- ************* TABLA CLIENTES *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA CLIENTES

CREATE PROCEDURE insertar_cliente(
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(345),
    @direccion_entrega VARCHAR(345),
    @idCliente INT OUT
)
AS
BEGIN
    BEGIN TRY
        INSERT INTO cliente (razon_social, nombre_comercial, direccion_entrega)
        VALUES (@razon_social, @nombre_comercial, @direccion_entrega)
        SET @idCliente = SCOPE_IDENTITY()
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS insertar_cliente;
-- Agregar un cliente
EXEC insertar_cliente 'Maynor Pilo', 'Maynor PiloGT', 'Zona 1';

-- MODIFICAR INFORMACION EN LA TABLA CLIENTES
CREATE PROCEDURE modificar_cliente(
    @idCliente INT,
    @razon_social VARCHAR(245),
    @nombre_comercial VARCHAR(345),
    @direccion_entrega VARCHAR(45)
)
AS
BEGIN
    BEGIN TRY
        UPDATE cliente
        SET razon_social = @razon_social,
            nombre_comercial = @nombre_comercial,
            direccion_entrega = @direccion_entrega
        WHERE idCliente = @idCliente;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
-- DROP PROCEDURE IF EXISTS modificar_cliente;
-- Modificar un cliente
EXEC modificar_cliente 1, 'Maynor Pilo', 'Maynor PiloGT', 'Zona 1';


-- *****************************************
-- ************* TABLA USUARIOS *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA USUARIOS PARA UN USUARIO QUE NO SEA CLIENTE
CREATE PROCEDURE insertar_usuario
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(80),
    @nombre_completo VARCHAR(50),
    @contrasenia VARCHAR(64),
    @telefono VARCHAR(8),
    @fecha_nacimiento DATE
AS
BEGIN
    BEGIN TRY
        DECLARE @contrasenia_hash VARBINARY(64);
        SET @contrasenia_hash = HASHBYTES('SHA2_256', @contrasenia);

        INSERT INTO usuario ( rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento )
        VALUES ( @rol_idrol, @estados_idestados, @correo_electronico, @nombre_completo, @contrasenia_hash, @telefono, @fecha_nacimiento);
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS insertar_usuario;
-- Agregar un usuario
EXEC insertar_usuarios 1, 1, 'maynorpilo@email.com.gt', 'Maynor Pilo Tuy', 'abcDEF123', '12345678', '1996-01-01', 1;


-- MODIFICAR INFORMACION EN LA TABLA USUARIOS PARA UN USUARIO QUE NO SEA CLIENTE
CREATE PROCEDURE modificar_usuario
    @idUsuario INT,
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(80),
    @nombre_completo VARCHAR(50),
    @telefono VARCHAR(8),
    @fecha_nacimiento DATE
AS
BEGIN
    BEGIN TRY
        UPDATE usuario
        SET rol_idrol = @rol_idrol,
            estados_idestados = @estados_idestados,
            correo_electronico = @correo_electronico,
            nombre_completo = @nombre_completo,
            telefono = @telefono,
            fecha_nacimiento = @fecha_nacimiento
        WHERE idUsuario = @idUsuario;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
-- DROP PROCEDURE IF EXISTS modificar_usuario;
-- Modificar un usuario
EXEC modificar_usuarios 1, 1, 1, 'maynorpilo@email.com.gt', 'Maynor Pilo Tuy', 'contrasenia123', '12345678', '1996-01-01', 1;

-- registrar un cliente
CREATE PROCEDURE registrar_usuario_cliente
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(80),
    @nombre_completo VARCHAR(50),
    @contrasenia VARCHAR(64),
    @telefono VARCHAR(8),
    @fecha_nacimiento DATE,
    @customer NVARCHAR(max)
AS
BEGIN 
    DECLARE @idCliente INT;
    DECLARE @contrasenia_hash VARBINARY(64);
    BEGIN TRY
        BEGIN TRANSACTION
            -- insertar el cliente , recorriendo el json( customer ) para obtener los datos y obtener el id del cliente
            INSERT INTO cliente (razon_social, nombre_comercial, direccion_entrega)
            SELECT customer.razon_social, customer.nombre_comercial, customer.direccion_entrega
            FROM OPENJSON(@customer)
            WITH (
                razon_social VARCHAR(245),
                nombre_comercial VARCHAR(345),
                direccion_entrega VARCHAR(345)
            ) AS customer;

            SET @idCliente = SCOPE_IDENTITY();
            
            SET @contrasenia_hash = HASHBYTES('SHA2_256', @contrasenia);
            -- insertar el usuario
            INSERT INTO usuario (rol_idrol, estados_idestados, correo_electronico, nombre_completo, contrasenia, telefono, fecha_nacimiento, cliente_idCliente)
            VALUES (@rol_idrol, @estados_idestados, @correo_electronico, @nombre_completo, @contrasenia_hash, @telefono, @fecha_nacimiento, @idCliente);
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION
        END
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
    
-- DROP PROCEDURE IF EXISTS registrar_usuario_cliente;

-- BUSCAR UN USUARIO POR CORREO ELECTRONICO Y CONTRASENIA
CREATE PROCEDURE autenticar_usuario
    @correo_electronico VARCHAR(80),
    @contrasenia VARCHAR(64)
AS
BEGIN
    DECLARE @contrasenia_hash VARBINARY(64);
    SET @contrasenia_hash = HASHBYTES('SHA2_256', @contrasenia);
    BEGIN TRY
        SELECT u.idUsuario,
			u.rol_idrol,
			u.estados_idestados,
			r.nombre AS rol,
			e.nombre AS estado
		FROM usuario u 
		INNER JOIN rol r ON u.rol_idrol = r.idrol
		INNER JOIN estados e ON u.estados_idestados = e.idestados
		WHERE u.correo_electronico = @correo_electronico AND u.contrasenia = @contrasenia_hash;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS autenticar_usuario;

-- *****************************************
-- ************* TABLA CATEGORIA PRODUCTOS *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA CATEGORIA PRODUCTOS
CREATE PROCEDURE insertar_categoria_producto
    @usuario_idusuario INT,
    @estados_idestados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        INSERT INTO categoriaProducto (usuario_idusuario, estados_idestados, nombre)
        VALUES (@usuario_idusuario, @estados_idestados, @nombre);
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
-- DROP PROCEDURE IF EXISTS insertar_categoria_producto;

-- Agregar una categoria de productos
EXEC insertar_categoria_productos 1, 1, 'Categoria 1';

-- MODIFICAR INFORMACION EN LA TABLA CATEGORIA PRODUCTOS
CREATE PROCEDURE modificar_categoria_producto
    @idCategoriaProducto INT,
    @estados_idestados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    BEGIN TRY
        UPDATE categoriaProducto
        SET estados_idestados = @estados_idestados,
            nombre = @nombre
        WHERE idCategoriaProducto = @idCategoriaProducto;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS modificar_categoria_producto;
-- Modificar una categoria de productos
EXEC modificar_categoria_productos 1, 1, 1, 'Categoria 2';


-- *****************************************
-- ************* TABLA PRODUCTOS *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA PRODUCTOS

CREATE PROCEDURE insertar_producto
    @categoriaProducto_idCategoriaProducto INT,
    @usuario_idusuario INT,
    @estados_idestados INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @precio FLOAT,
    @foto VARCHAR(max)
AS
BEGIN
    BEGIN TRY
        INSERT INTO producto (categoriaProducto_idCategoriaProducto, usuario_idusuario, estados_idestados, nombre, marca, codigo, stock, precio, foto)
        VALUES (@categoriaProducto_idCategoriaProducto, @usuario_idusuario, @estados_idestados, @nombre, @marca, @codigo, @stock, @precio, @foto);
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS insertar_producto;
-- Agregar un producto
EXEC insertar_productos 1, 1, 1, 'Producto 1', 'Marca 1', '123456', 10, 100, 0x;

-- MODIFICAR INFORMACION EN LA TABLA PRODUCTOS
CREATE PROCEDURE modificar_producto
    @idProducto INT,
    @categoriaProducto_idCategoriaProducto INT,
    @estados_idestados INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @precio FLOAT
AS
BEGIN
    BEGIN TRY 
        UPDATE producto
        SET categoriaProducto_idCategoriaProducto = @categoriaProducto_idCategoriaProducto,
            estados_idestados = @estados_idestados,
            nombre = @nombre,
            marca = @marca,
            codigo = @codigo,
            stock = @stock,
            precio = @precio
        WHERE idProducto = @idProducto;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS modificar_producto;
-- Modificar un producto
EXEC modificar_productos 1, 1, 1, 1, 'Producto 2', 'Marca 2', '123456', 10, 100, 0x;

-- MODIFICAR FOTO DE UN PRODUCTO
CREATE PROCEDURE modificar_foto_producto
    @idProducto INT,
    @foto VARCHAR(max)
AS
BEGIN
    BEGIN TRY
        UPDATE producto
        SET foto = @foto
        WHERE idProducto = @idProducto;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- MODIFICAR EL ESTADO DE UN PRODUCTO (INACTIVAR)
CREATE PROCEDURE modificar_estado_producto
    @idProducto INT,
    @estados_idestados INT
AS
BEGIN
    UPDATE Productos
    SET estados_idestados = @estados_idestados
    WHERE idProducto = @idProducto;
END;

-- Inactivar un producto
EXEC modificar_estado_producto 1, 2;


-- *****************************************
-- ************* TABLA ORDEN *************
-- *****************************************

-- INSERTAR  INFORMACION EN LA TABLA ORDEN
CREATE PROCEDURE insertar_orden
    @usuario_idusuario INT,
    @estados_idestados INT,
    @nombre_completo VARCHAR(545),
    @direccion VARCHAR(545),
    @telefono VARCHAR(8),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @json_detalle_orden NVARCHAR(max)
AS
BEGIN
    DECLARE @idOrden INT;
    BEGIN TRY
        BEGIN TRANSACTION
            -- INSERTAR LA ORDEN
            INSERT INTO orden (usuario_idusuario, estados_idestados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega)
            VALUES (@usuario_idusuario, @estados_idestados, @nombre_completo, @direccion, @telefono, @correo_electronico, @fecha_entrega);
            SET @idOrden = SCOPE_IDENTITY();

            -- AGRUPAR CANTIDADES DE PRODUCTOS REPETIDOS EN EL JSON
            DECLARE @tablaAgrupada TABLE (
                producto_idProducto INT,
                cantidad INT
            );

            INSERT INTO @tablaAgrupada (producto_idProducto, cantidad)
            SELECT producto_idProducto, SUM(cantidad) AS cantidad
            FROM OPENJSON(@json_detalle_orden)
            WITH (
                producto_idProducto INT,
                cantidad INT
            ) AS od
            GROUP BY producto_idProducto;

            -- VALIDAR SI HAY SUFICIENTE STOCK PARA CADA PRODUCTO
            IF EXISTS (
                SELECT 1
                FROM producto p
                INNER JOIN @tablaAgrupada ta ON p.idProducto = ta.producto_idProducto
                WHERE p.stock < ta.cantidad
            )
            BEGIN
                THROW 50000, 'Stock insuficiente para uno o más productos.', 1;
            END;

            -- INSERTAR DETALLES DE LA ORDEN
            INSERT INTO ordenDetalles (orden_idOrden, producto_idProducto, cantidad, precio, subtotal)
            SELECT @idOrden, od.producto_idProducto, od.cantidad, p.precio, od.cantidad * p.precio
            FROM OPENJSON(@json_detalle_orden)
            WITH (
                producto_idProducto INT,
                cantidad INT
            ) AS od
            INNER JOIN producto p ON od.producto_idProducto = p.idProducto;

            -- ACTUALIZAR EL TOTAL DE LA ORDEN
            UPDATE orden
            SET total_orden = (SELECT SUM(subtotal) FROM ordenDetalles WHERE orden_idOrden = @idOrden)
            WHERE idOrden = @idOrden;

            -- ACTUALIZAR EL STOCK DE LOS PRODUCTOS
            UPDATE p
            SET p.stock = p.stock - ta.cantidad
            FROM producto p
            INNER JOIN @tablaAgrupada ta ON p.idProducto = ta.producto_idProducto;

        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION
        END
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- DROP PROCEDURE IF EXISTS insertar_orden;
-- Agregar una orden
EXEC insertar_orden 1, 1, 'Maynor Pilo Tuy', 'Zona 1', '12345678', 'maynorpilo@email.com.gt', '2025-01-01', 100;

-- MODIFICAR ESTADO DE UNA ORDEN
CREATE PROCEDURE modificar_orden
    @idOrden INT,
    @estados_idestados INT
AS
BEGIN
    BEGIN TRY
        UPDATE orden
        SET estados_idestados = @estados_idestados
        WHERE idOrden = @idOrden;
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000);
        DECLARE @ErrorSeverity INT;
        DECLARE @ErrorState INT;
        SET @ErrorMessage = ERROR_MESSAGE();
        SET @ErrorSeverity = ERROR_SEVERITY();
        SET @ErrorState = ERROR_STATE();
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- Modificar una orden
EXEC modificar_orden 1, 1, 1, 'Maynor Pilo Tuy', 'Zona 1', '12345678', 'maynorpilo@email.com.gt', '2025-01-05', 100;

-- VISTA PARA OBTENER LAS ORDENES
CREATE VIEW vw_ordenes AS
    SELECT 
        o.idOrden,
        o.fecha_creacion,
        o.nombre_completo,
        o.direccion,
        o.telefono,
        o.correo_electronico,
        o.fecha_entrega,
        o.total_orden,
        e.nombre AS estado,
        od.idOrdenDetalles,
        od.cantidad,
        od.precio,
        od.subtotal,
        p.idProducto,
        p.nombre AS nombre_producto,
        p.marca AS marca_producto,
        cp.nombre AS categoria_producto
    FROM 
        orden o
    INNER JOIN 
        estados e ON o.estados_idestados = e.idestados
    INNER JOIN 
        ordenDetalles od ON o.idOrden = od.orden_idOrden
    INNER JOIN 
        producto p ON od.producto_idProducto = p.idProducto
    INNER JOIN 
        categoriaProducto cp ON p.categoriaProducto_idCategoriaProducto = cp.idCategoriaProducto;




-- ************************************************
-- ************* TABLA ORDEN DETALLES *************
-- ************************************************

-- INSERTAR  INFORMACION EN LA TABLA ORDEN DETALLES
CREATE PROCEDURE insertar_orden_detalles
    @orden_idOrden INT,
    @Productos_idProducto INT,
    @cantidad INT
AS
BEGIN

    DECLARE @precio FLOAT;
    DECLARE @subtotal FLOAT;

    SELECT @precio = precio
    FROM Productos
    WHERE idProducto = @Productos_idProducto;

    IF @precio IS NULL
    BEGIN
        PRINT 'El producto no existe o el precio no está disponible.';
        RETURN;
    END

    SET @subtotal = @cantidad * @precio;

    INSERT INTO ordenDetalles (orden_idOrden, Productos_idProducto, cantidad, precio, subtotal)
    VALUES (@orden_idOrden, @Productos_idProducto, @cantidad, @precio, @subtotal);
END;

-- Agregar un detalle de orden
EXEC insertar_orden_detalles 1, 1, 2;

-- MODIFICAR INFORMACION EN LA TABLA ORDEN DETALLES
CREATE PROCEDURE modificar_orden_detalles
    @idOrdenDetalles INT,
    @orden_idOrden INT,
    @Productos_idProducto INT,
    @cantidad INT
AS
BEGIN
    
        DECLARE @precio FLOAT;
        DECLARE @subtotal FLOAT;

        SELECT @precio = precio
        FROM Productos
        WHERE idProducto = @Productos_idProducto;

        IF @precio IS NULL
        BEGIN
            PRINT 'El producto no existe o el precio no está disponible.';
            RETURN;
        END

        SET @subtotal = @cantidad * @precio;

    UPDATE ordenDetalles
    SET orden_idOrden = @orden_idOrden,
        Productos_idProducto = @Productos_idProducto,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE idOrdenDetalles = @idOrdenDetalles;
END;

-- Modificar un detalle de orden
EXEC modificar_orden_detalles 1, 1, 1, 3;

-- 4. REALIZACION DE CONSULTAS

-- CONSULTA 1: Total de Productos activos que tenga en stock mayor a 0 
CREATE VIEW vw_total_productos_activos AS
    SELECT COUNT(*) AS 'Total de Productos' 
    FROM Productos
    WHERE estados_idestados = 1 AND stock > 0;

SELECT * FROM vw_total_productos_activos;

-- CONSULTA 2: Total de Quetzales en ordenes ingresadas en el mes de Agosto 2024

CREATE VIEW vw_total_quetzales_ordenes_por_mes AS
    SELECT SUM(total_orden) AS 'Total de Quetzales'
    FROM orden
    WHERE fecha_creacion BETWEEN '2024-08-01' AND '2024-08-31';

SELECT * FROM vw_total_quetzales_ordenes_por_mes;

-- CONSULTA 3: Top 10 de clientes con Mayor consumo de ordenes de todo el histórico

CREATE VIEW vw_top_10_clientes AS
    SELECT TOP 10 u.nombre_completo AS 'Cliente', SUM(o.total_orden) AS 'Total de Ordenes'
    FROM orden o
    INNER JOIN usuarios u ON o.usuarios_idusuarios = u.idusuarios
    GROUP BY u.nombre_completo
    ORDER BY SUM(o.total_orden) DESC;

SELECT * FROM vw_top_10_clientes;

-- CONSULTA 4: Top 10 de productos más vendidos en orden ascendente

CREATE VIEW vw_top_10_productos AS
    SELECT TOP 10 p.nombre AS 'Producto', SUM(od.cantidad) AS 'Total de Ventas'
    FROM ordenDetalles od
    INNER JOIN Productos p ON od.Productos_idProducto = p.idProducto
    GROUP BY p.nombre
    ORDER BY SUM(od.cantidad) ASC;

SELECT * FROM vw_top_10_productos;