package com.aimprosoft.departments.utils;

import org.springframework.format.Formatter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created on 25.04.16.
 */
public class CustomFormatter<T> implements Formatter {

    private SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public Object parse(String s, Locale locale) throws ParseException {
        T convertValue = null;

        if(convertValue instanceof Integer) {
            try {
                convertValue  = Integer.parseInt(s);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        else if(convertValue instanceof Date) {
            try {
                return formatter.parse(s);
            } catch (ParseException e) {
                return null;
            }
        }
        return  convertValue;
    }

    @Override
    public String print(Object o, Locale locale) {
        return null;
    }
}
