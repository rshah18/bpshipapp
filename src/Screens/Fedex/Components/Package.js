import React, {useEffect, useState, useContext} from "react";
import { ShipmentContext } from "../../../Management/Context";
import { Accordion,AccordionItem, AccordionHeader, AccordionBody } from './Accordion'

export default function Package(){
    // context variables
    const [state, dispatch] = useContext(ShipmentContext); 

    const [length, setLength] = useState(0); 
    const [width, setWidth] = useState(0); 
    const [height, setHeight] = useState(0); 
    const [wgt, setWgt] = useState(0); 
    const [boxList, setBoxList] = useState([]); 


    const clearFn = () =>{
        setLength(0);
        setWidth(0);
        setHeight(0);
        setWgt(0); 
    }

    // delete box 
    const delete_box = (arg) =>{
        console.log("deleting", arg)
        dispatch({type: 'REMOVE_BOX', payload: arg});
        setBoxList(state.boxList); 
    }

    const createPkg = () =>{
        if(
            (length <= 0) ||
            (width <= 0) ||
            (height <= 0) ||
            (wgt <= 0) 
        ){
            window.alert("Weight or Dimension less than or equal to 0"); 
            return; 
        }
        let boxInfo = {
            "length": length,
            "width" : width,
            "height": height,
            "weight": wgt,
            "seqNum": state.boxList.length,
            "id":  Date.now()
        }

        dispatch({type: 'ADD_BOX', payload: boxInfo}); 
        setBoxList(state.boxList); 
        clearFn(); 
    }

    useEffect(()=>{
        setBoxList(state.boxList); 
    }, [])

    return (
        <div className = "shadow" style={{
        }}>
            <div className = "card" >
                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>Package details</div>
                <div className = "card-body">
                    {/* Dimension form */}
                    <div>
                        <form>
                            <div className = "row">
                                {/* Length */}
                                <div className = "col-3">
                                    <label className = "form-label">L(in)</label>
                                    <input 
                                            type="number" 
                                            className="form-control form-control-sm"
                                            value = {length} 
                                            onChange={event => setLength(event.target.value)}
                                    />
                                </div>

                                {/* Length */}
                                <div className = "col-3">
                                    <label className = "form-label">W(in)</label>
                                    <input 
                                            type="number" 
                                            className="form-control form-control-sm"
                                            value = {width} 
                                            onChange={event => setWidth(event.target.value)}
                                    />
                                </div>

                                {/* Length */}
                                <div className = "col-3">
                                    <label className = "form-label">H(in)</label>
                                    <input 
                                            type="number" 
                                            className="form-control form-control-sm"
                                            value = {height} 
                                            onChange={event => setHeight(event.target.value)}
                                    />
                                </div>

                                {/* Weight */}
                                <div className = "col-3">
                                    <label className = "form-label">Wgt(LB)</label>
                                    <input 
                                            type="number" 
                                            className="form-control form-control-sm"
                                            value = {wgt} 
                                            onChange={event => setWgt(event.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className = "row" style = {{marginTop: 10}}>
                            <div className = "col-auto">
                                <button className = "btn btn-secondary btn-sm" onClick = {clearFn}>Clear</button>
                            </div>
                            <div className = "col-auto">
                                <button className = "btn btn-primary btn-sm" onClick={createPkg} >Add PKG</button>
                            </div>
                            
                        </div>

                    </div>

                    {/* Box information */}
                    <div style = {{margin: 10}}>           
                        <Accordion idName="pkgList">
                            {
                                boxList.map((itm)=>{
                                    return(
                                        <AccordionItem key = {itm.id}>
                                            <AccordionHeader index={boxList.indexOf(itm)}>
                                                Box {boxList.indexOf(itm)+1} . [{itm.length} x {itm.width} x {itm.height}]  weight: {itm.weight} lb.
                                            </AccordionHeader>
                                            <AccordionBody index={boxList.indexOf(itm)}>
                                                <button className="btn btn-secondary btn-sm" onClick={()=> delete_box(itm.id)}>delete</button>
                                            </AccordionBody>
                                        </AccordionItem>
                                    )
                                })
                            }
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}