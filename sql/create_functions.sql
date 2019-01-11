CREATE FUNCTION nowePaliwo(VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO paliwo (nazwa) VALUES ($1);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowaMarka(VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO marki (nazwa) VALUES ($1);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowySalon (VARCHAR, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO marki (miasto, ulica) VALUES ($1, $2);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyModel(INTEGER, VARCHAR, INTEGER, NUMERIC(4,2), INTEGER, VARCHAR, INTEGER, INTEGER) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO modele (marka_id, nazwa, moc, masa, paliwo_id, spalanie, rocznik, cena) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowySamochod(INTEGER, INTEGER, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO samochody (model_id, salon_id, vin) VALUES ($1, $2, $3);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyPracownik (VARCHAR, VARCHAR, VARCHAR, NUMERIC(7, 2), INTEGER) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO pracownicy (imie, nazwisko, pozycja, placa, salon_id) VALUES ($1, $2, $3, $4, $5);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyKlient (VARCHAR, VARCHAR, VARCHAR, VARCHAR) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO klienci (imie, nazwisko, miasto, ulica) VALUES ($1, $2, $3, $4);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowaSprzedaz (INTEGER, INTEGER, INTEGER, INTEGER, DATE) RETURNS BOOLEAN AS '
    BEGIN
        INSERT INTO sprzedaze (samochod_id, klient_id, pracownik_id, salon_id, data) VALUES ($1, $2, $3, $4);
        RETURN TRUE;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajPaliwo () RETURNS setof paliwo AS '
    BEGIN
        RETURN QUERY SELECT * FROM paliwo;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajModele() RETURNS setof modele AS '
    BEGIN
        RETURN QUERY SELECT * FROM modele;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajSamochody() RETURNS setof samochody AS '
    BEGIN
        RETURN QUERY SELECT * FROM samochody;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajPracownicy() RETURNS setof pracownicy AS '
    BEGIN
        RETURN QUERY SELECT * FROM pracownicy;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajKlienci() RETURNS setof klienci AS '
    BEGIN
        RETURN QUERY SELECT * FROM klienci;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajSalony() RETURNS setof salony AS '
    BEGIN
        RETURN QUERY SELECT * FROM salony;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION czytajSprzedaze() RETURNS setof sprzedaze AS '
    BEGIN
        RETURN QUERY SELECT * FROM sprzedaze;
    END
' LANGUAGE 'plpgsql';