package com.IFRSErechim.HorariosAPI.ParsedRecords;

import com.IFRSErechim.HorariosAPI.Exception.ParseError;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ParsedRecords {
    private List<Record> records= new ArrayList<>();

    public ParsedRecords(MultipartFile file) throws ParseError {
        try{
            InputStream inputStream = file.getInputStream();
            CsvParserSettings settings = new CsvParserSettings();
            settings.setHeaderExtractionEnabled(true);
            CsvParser parser = new CsvParser(settings);
            List<Record> parseAllRecords = parser.parseAllRecords(inputStream);

            this.records = records = parseAllRecords;
        }catch (Exception e){
            throw new ParseError(e.getMessage());
        }

    }

    public List<Record> getRecords() {
        return records;
    }
}
