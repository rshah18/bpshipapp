import React, {useContext, useEffect, useState} from "react";
import { FreightContext } from "../../../Management/FreightContext";
import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader } from "@material-ui/core";

function FreightItem({item, ndx, removeItem}){



    return (
        <Card>
        <CardHeader title={"Freight Item: " +(ndx+1) + ""}
            action = {
                <Button onClick = {()=>removeItem(item.id)}>Remove</Button>
            }
        />

        <CardContent>
            <div>{"Description: " +item['desc']}</div>
            <div className= "row justify-content-between">
                <div className= "col-auto">
                    {"Class: " + item["freightClass"]}
                </div>
                <div className= "col-auto">
                    {"NMFC code: " + item["nmfcCode"]}
                </div>
            </div>
        
            <div className= "row justify-content-between">
                <div className= "col-auto">
                    {"Handling Unit Name: " + item["handlingUnitName"]}
                </div>
                <div className= "col-auto">
                    {"Handling Unit Qty: " + item["handlingUnitQty"]}
                </div>
                <div className= "col-auto">
                    {"Piece Count: " + item["pieceCount"]}
                </div>
            </div>
            <div className = "row justify-content-between">
                <div className = "col-auto">
                    {"Dimensions: " + item["length"] + " x " + item["width"] + " x " + item['height'] + " " + item['dimUnit']}
                </div>
                <div className = "col-auto">
                    {"Weight: " + item['weight'] + " " + item["wgtUnit"]}
                </div>
            </div>


        </CardContent>
    </Card>
    )
}

export default function FreightList(){
    const [state, dispatch] = useContext(FreightContext);

    const removeItem = itemToRemove =>{
        dispatch({type: 'REMOVE_FREIGHT', payload: itemToRemove});
    } 

   

    return (
        <div style = {{marginTop: 10}}>
            {
                state['freightList'].map((item, ndx)=>{
                    return(
                        <div key={'key_'+ndx} style = {{margin: 10}}>
                            <FreightItem item = {item} ndx = {ndx} removeItem={removeItem} />
                        </div>
                        
                    )
                })
            }
        </div>
    )

}