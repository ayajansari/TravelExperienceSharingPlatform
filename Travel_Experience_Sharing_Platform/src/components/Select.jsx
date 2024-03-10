import React from 'react';
 
const Select = React.forwardRef(function Select({
    name,
    objKey,
    arr,
    onchange,
    className="",
    ...props
},ref){


    return (
        <select 
            name={name} 
            id={name}
            className={className}
            {...props}
            ref={ref}
            onChange={onchange}
            
        >  
            <option value="" className=' text-black '  >Select {name}</option>
            {arr && arr.map((val,index)=>(
                <option  
                    value={val[objKey]} 
                    key={index}
                    className=' text-black '


                >
                    {val[objKey]}
                </option>
                
            ))}
            
        </select>
    )
})
export default Select;