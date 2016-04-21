package com.aimprosoft.departments.utils;

import com.aimprosoft.departments.exception.NotValidValueException;
import net.sf.oval.ConstraintViolation;
import net.sf.oval.Validator;
import net.sf.oval.context.FieldContext;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created on 11.04.16.
 */

@Service
public class CustomValidator {

    public CustomValidator() {}

    private Validator validator;

    public void setValidator (Validator validator)  {
        this.validator = validator;
    }

    public void validate(Object object) throws NotValidValueException {
        List<ConstraintViolation> violations = validator.validate(object);
        if (violations.size() > 0) {
            Map<String, String> errorMap = new HashMap<>();
            for (ConstraintViolation violation : violations) {
                FieldContext fieldContext = (FieldContext) violation.getContext();
                Field field = fieldContext.getField();
                String fieldName = field.getName();
                errorMap.put(fieldName, violation.getMessage());
            }
            throw new NotValidValueException(errorMap);
        }
    }
}
