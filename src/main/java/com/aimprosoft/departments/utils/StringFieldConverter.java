package com.aimprosoft.departments.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created on 11.04.16.
 */

public class StringFieldConverter {

    private static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

    public static Integer convertStringToInteger(String integerInString) {
        Integer convertValue;
        try {
            convertValue = Integer.parseInt(integerInString);
        } catch (NumberFormatException e) {
            return null;
        }
        return convertValue;
    }

    public static Date convertStringToDate(String dateInString) {
        Date date;
        try {
            date = formatter.parse(dateInString);
        } catch (ParseException e) {
            return null;
        }
        return date;
    }
}
