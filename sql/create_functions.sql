CREATE FUNCTION nowySamochod() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.vin <> old.vin) THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyKlient() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM klienci WHERE imie = new.imie AND nazwisko = new.nazwisko AND miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND (new.imie <> old.imie OR old.nazwisko <> new.nazwisko OR old.miasto <> new.miasto OR old.ulica <> new.ulica)) THEN
            SELECT * INTO res FROM klienci WHERE imie = new.imie AND nazwisko = new.nazwisko AND miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowyModel() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM modele WHERE marki_id = new.marki_id AND nazwa = new.nazwa AND moc = new.moc AND masa = new.masa AND paliwo_id = new.paliwo_id AND spalanie = new.spalanie AND rocznik = new.rocznik AND cena = new.cena;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND (old.marki_id <> new.marki_id OR old.nazwa <> new.nazwa OR old.moc <> new.moc OR old.masa <> new.masa OR old.paliwo_id <> new.paliwo_id OR old.spalanie <> new.spalanie OR old.rocznik <> new.rocznik OR old.cena <> new.cena)) THEN
            SELECT * INTO res FROM klienci WHERE marki_id = new.marki_id AND nazwa = new.nazwa AND moc = new.moc AND masa = new.masa AND paliwo_id = new.paliwo_id AND spalanie = new.spalanie AND rocznik = new.rocznik AND cena = new.cena;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowePaliwo() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM paliwo WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM paliwo WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowaMarka() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM marki WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM marki WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE FUNCTION nowySalon() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM salony WHERE miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND (new.miasto <> old.miasto OR old.ulica <> new.ulica)) THEN
            SELECT * INTO res FROM marki WHERE miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RAISE NOTICE ''Wpis już istnieje!'';
                RETURN NULL;
            END IF;
        END IF;
    END
' LANGUAGE 'plpgsql';

CREATE TRIGGER InsertUpdateSamochody BEFORE INSERT OR UPDATE ON samochody FOR EACH ROW EXECUTE PROCEDURE nowySamochod();
CREATE TRIGGER InsertUpdateModele BEFORE INSERT OR UPDATE ON modele FOR EACH ROW EXECUTE PROCEDURE nowyModel();
CREATE TRIGGER InsertUpdateKlienci BEFORE INSERT OR UPDATE ON klienci FOR EACH ROW EXECUTE PROCEDURE nowyKlient();
CREATE TRIGGER InsertUpdatePaliwo BEFORE INSERT OR UPDATE ON paliwo FOR EACH ROW EXECUTE PROCEDURE nowePaliwo();
CREATE TRIGGER InsertUpdateMarki BEFORE INSERT OR UPDATE ON marki FOR EACH ROW EXECUTE PROCEDURE nowaMarka();
CREATE TRIGGER InsertUpdateSalony BEFORE INSERT OR UPDATE ON salony FOR EACH ROW EXECUTE PROCEDURE nowySalon();

CREATE FUNCTION selectKlientByName(VARCHAR, VARCHAR) RETURNS setof klienci AS '
    BEGIN
        RETURN QUERY SELECT * FROM klienci WHERE imie = $1 AND nazwisko = $2;
    END
' language 'plpgsql';

CREATE FUNCTION selectPracownikByName(VARCHAR, VARCHAR) RETURNS setof pracownicy AS '
    BEGIN
        RETURN QUERY SELECT * FROM pracownicy WHERE imie = $1 AND nazwisko = $2;
    END
' language 'plpgsql';

CREATE FUNCTION selectSalonByCity(VARCHAR) RETURNS setof salony AS '
    BEGIN
        RETURN QUERY SELECT * FROM salony WHERE miasto = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectModelBelowPrice(INTEGER) RETURNS setof modele AS '
    BEGIN
        RETURN QUERY SELECT * FROM modele WHERE cena < $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectModelAbovePrice(INTEGER) RETURNS setof modele AS '
    BEGIN
        RETURN QUERY SELECT * FROM modele WHERE cena > $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectPracownikBySalonId(INTEGER) RETURNS setof pracownicy AS '
    BEGIN
        RETURN QUERY SELECT * FROM pracownicy WHERE salony_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectSprzedazBeforeDate(DATE) RETURNS setof sprzedaze AS '
    BEGIN
        RETURN QUERY SELECT * FROM sprzedaze WHERE data < $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectSprzedazAfterDate(DATE) RETURNS setof sprzedaze AS '
    BEGIN
        RETURN QUERY SELECT * FROM sprzedaze WHERE data > $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectPaliwoById(INTEGER) RETURNS setof paliwo AS '
    BEGIN
        RETURN QUERY SELECT * FROM paliwo WHERE paliwo_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectMarkaById(INTEGER) RETURNS setof marki AS '
    BEGIN
        RETURN QUERY SELECT * FROM marki WHERE marki_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectSalonById(INTEGER) RETURNS setof salony AS '
    BEGIN
        RETURN QUERY SELECT * FROM salony WHERE salony_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectModelById(INTEGER) RETURNS setof modele AS '
    BEGIN
        RETURN QUERY SELECT * FROM modele WHERE modele_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectSamochodById(INTEGER) RETURNS setof samochody AS '
    BEGIN
        RETURN QUERY SELECT * FROM samochody WHERE samochody_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectKlientById(INTEGER) RETURNS setof klienci AS '
    BEGIN
        RETURN QUERY SELECT * FROM klienci WHERE klienci_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectPracownikById(INTEGER) RETURNS setof pracownicy AS '
    BEGIN
        RETURN QUERY SELECT * FROM pracownicy WHERE pracownicy_id = $1;
    END
' language 'plpgsql';

CREATE FUNCTION selectSprzedazById(INTEGER) RETURNS setof sprzedaze AS '
    BEGIN
        RETURN QUERY SELECT * FROM sprzedaze WHERE sprzedaze_id = $1;
    END
' language 'plpgsql';