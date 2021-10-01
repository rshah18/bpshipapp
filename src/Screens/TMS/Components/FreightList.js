import React, {useContext, useEffect, useState} from "react";
import { FreightContext } from "../../../Management/FreightContext";

import { Card, CardContent, CardHeader } from "@material-ui/core";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function FreightList(){
    const [state, dispatch] = useContext(FreightContext);

    return (
        <div >
            {
                state['freightList'].map((item, ndx)=>{
                    return(
                        <div style = {{margin: 10}}>
                            <Card>
                                <CardHeader title={"Freight Item: " +(ndx+1) + ""}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
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
                                        <div className = "col-auto">
                                            {"Volume: " + item['volume'] + " " + item["volUnit"]}
                                        </div>
                                    </div>


                                </CardContent>
                            </Card>
                        </div>
                        
                    )
                })
            }
        </div>
    )

}