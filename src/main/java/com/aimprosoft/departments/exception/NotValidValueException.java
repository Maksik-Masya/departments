package com.aimprosoft.departments.exception;

import java.util.Map;

/**
 * Created on 10.04.2016.
 */
public class NotValidValueException extends Exception {

    private Map<String, String> errorMap;

    public NotValidValueException(Map<String, String> errorMap) {
        this.errorMap = errorMap;
    }

    public Map<String,String> getErrorMap(){
        return errorMap;
    }
}
