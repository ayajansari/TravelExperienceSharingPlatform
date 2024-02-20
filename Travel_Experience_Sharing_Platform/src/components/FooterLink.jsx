import React from 'react';
 
function FooterLink({
    label
}
    
){
 
    return (
     
        <div className="p-1">
            <a href="https://www.google.com" className="hover:text-white text-[#ffffff95]  ">{label}</a>
        </div>
       
    )
}
export default FooterLink;