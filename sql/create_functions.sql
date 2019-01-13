CREATE FUNCTION insertPaliwo(VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO paliwo (nazwa) VALUES ($1);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertMarki(VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO marki (nazwa) VALUES ($1);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertSalony(VARCHAR, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO marki (miasto, ulica) VALUES ($1, $2);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertModele(INTEGER, VARCHAR, INTEGER, NUMERIC(4,2), INTEGER, VARCHAR, INTEGER, INTEGER) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO modele (marki_id, nazwa, moc, masa, paliwo_id, spalanie, rocznik, cena) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertSamochody(INTEGER, INTEGER, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO samochody (modele_id, salony_id, vin) VALUES ($1, $2, $3);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertPracownicy(VARCHAR, VARCHAR, VARCHAR, NUMERIC(7, 2), INTEGER) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salony_id) VALUES ($1, $2, $3, $4, $5);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertKlienci(VARCHAR, VARCHAR, VARCHAR, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ($1, $2, $3, $4);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION insertSprzedaze(INTEGER, INTEGER, INTEGER, INTEGER, DATE) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO sprzedaze (samochody_id, klienci_id, pracownicy_id, salony_id, data) VALUES ($1, $2, $3, $4, $5);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectPaliwo () RETURNS setof paliwo AS '
    BEGIN
        RETURN QUERY SELECT * FROM paliwo;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectModele() RETURNS setof modele AS '
    BEGIN
        RETURN QUERY SELECT * FROM modele;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectSamochody() RETURNS setof samochody AS '
    BEGIN
        RETURN QUERY SELECT * FROM samochody;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectPracownicy() RETURNS setof pracownicy AS '
    BEGIN
        RETURN QUERY SELECT * FROM pracownicy;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectKlienci() RETURNS setof klienci AS '
    BEGIN
        RETURN QUERY SELECT * FROM klienci;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectSalony() RETURNS setof salony AS '
    BEGIN
        RETURN QUERY SELECT * FROM salony;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION selectSprzedaze() RETURNS setof sprzedaze AS '
    BEGIN
        RETURN QUERY SELECT * FROM sprzedaze;
    END
' LANGUAGE 'plpgsql';