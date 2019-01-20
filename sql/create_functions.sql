CREATE FUNCTION nowySamochod() RETURNS TRIGGER AS '
    DECLARE
        res record;
    BEGIN
        IF (TG_OP = ''INSERT'') THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.vin <> old.vin) THEN
            SELECT * INTO res FROM samochody WHERE vin = new.vin;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
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
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND (new.imie <> old.imie OR old.nazwisko <> new.nazwisko OR old.miasto <> new.miasto OR old.ulica <> new.ulica)) THEN
            SELECT * INTO res FROM klienci WHERE imie = new.imie AND nazwisko = new.nazwisko AND miasto = new.miasto AND ulica = new.ulica;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
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
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND (old.marki_id <> new.marki_id OR old.nazwa <> new.nazwa OR old.moc <> new.moc OR old.masa <> new.masa OR old.paliwo_id <> new.paliwo_id OR old.spalanie <> new.spalanie OR old.rocznik <> new.rocznik OR old.cena <> new.cena)) THEN
            SELECT * INTO res FROM klienci WHERE marki_id = new.marki_id AND nazwa = new.nazwa AND moc = new.moc AND masa = new.masa AND paliwo_id = new.paliwo_id AND spalanie = new.spalanie AND rocznik = new.rocznik AND cena = new.cena;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
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
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM paliwo WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
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
                RETURN NULL;
            END IF;
        ELSIF (TG_OP = ''UPDATE'' AND new.nazwa <> old.nazwa) THEN
            SELECT * INTO res FROM marki WHERE nazwa = new.nazwa;
            IF NOT FOUND THEN
                RETURN new;
            ELSE
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

CREATE FUNCTION selectKlientByName(VARCHAR, VARCHAR) RETURNS setof klienci AS '
    BEGIN
        RETURN QUERY SELECT * FROM klienci WHERE imie = $1 AND nazwisko = $2;
    END
' language 'plpgsql';