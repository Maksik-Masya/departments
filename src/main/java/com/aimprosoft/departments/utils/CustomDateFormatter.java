package com.aimprosoft.departments.utils;

import org.springframework.format.Formatter;
import org.springframework.format.datetime.DateFormatter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created on 25.04.16.
 */

public class CustomDateFormatter<Integer> implements Formatter{

    DateFormatter
    @Override
    public Object parse(String text, Locale locale)  {
        java.lang.Integer convertValue;
        try {
            convertValue = java.lang.Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return null;
        }
        return convertValue;
    }

    @Override
    public String print(Object object, Locale locale) {
        return null;
    }
}






