import React from 'react';
 
const InputField=React.forwardRef(function InputField({
    type,
    placeholder,
    ...props
},ref){
 
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className={`px-2 py-2 m-2 border  hover:border-[#1080e9]  focus:outline-none focus:border-1 focus:border-[#1080e9] rounded-sm `} 
            {...props} 
            ref={ref}
        />
    )
})
export default InputField;