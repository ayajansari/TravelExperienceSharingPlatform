import React from 'react';
 
const Select = React.forwardRef(function Select({
    label,
    arr,
    className="",
    ...props
},ref){

    // console.log(arr)
    return (
        <select 
            name={label} 
            id={label}
            className={className}
            {...props}
            ref={ref}
            
        >  
            <option value=""  >Select {label}</option>
            {arr.map((val,index)=>(
                <option value={val} key={index}>{val}</option>
                
            ))}
            
        </select>
    )
})
export default Select;