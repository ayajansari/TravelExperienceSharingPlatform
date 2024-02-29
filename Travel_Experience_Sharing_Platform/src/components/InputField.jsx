import React from 'react';
 
const InputField=React.forwardRef(function InputField({
    className,
    type,
    placeholder,
    ...props
},ref){
 
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            
            className={className} 
            {...props} 
            ref={ref}
        />
    )
})
export default InputField;