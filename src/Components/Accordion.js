import React, {useContext, createContext} from 'react'; 


// create context..................................................................................
const AccordionContext = createContext(); 

// Accordion props: idName, children 
export const Accordion = props =>{ 
    const idName = props.idName; 
    return (
        <AccordionContext.Provider value={idName}>
            <div>
                <div className="accordion" id={idName}>
                    {props.children}
                </div>
            </div>
        </AccordionContext.Provider>
    )
}

// Accordion Item, props: children , key 
export const AccordionItem = props =>{
    return (
        <div className="accordion-item">
            {props.children}
        </div>
    )
}

// Accordion Item header props: index, children
export const AccordionHeader = props =>{
    const idName = useContext(AccordionContext);
    
    return (
        <h2 className="accordion-header" id={"itemId_box_"+ idName + props.index} >  
        <button  
            className="accordion-button collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target={"#targetid_box_"+ idName + props.index}   // #targetid   {"#targetid_"+ packArry.indexOf(itm)}
            aria-expanded="true" 
            aria-controls={"targetid_box_"+ idName + props.index}      // targetid  {"targetid_"+ packArry.indexOf(itm)}
        >

            <div>
                {/**Accordion Header goes here */}
                {props.children}
            </div>
        </button>
        </h2>
    )
}

// Accordion Item Body props: index, children 
export const AccordionBody = props =>{
    const idName = useContext(AccordionContext);
    return (
        <div 
            id={"targetid_box_"+ idName + props.index}             // target id  {"targetid_"+ packArry.indexOf(itm)}
            className="accordion-collapse collapse" 
            aria-labelledby={"itemId_box_"+ idName + props.index}                // itemId  {"itemId_"+ packArry.indexOf(itm)}
            data-bs-parent={idName}
    >
            <div className="accordion-body">
                {/**Accordian body goes here */}
                {props.children}
            </div>
        </div>
    )
}
