import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, {useState, useContext, useEffect} from "react";
import { FreightContext } from "../../../Management/FreightContext";

export default function FreightLine(){

    const [state, dispatch] = useContext(FreightContext);

    const [desc, setDesc] =         useState(''); 
    const [fclass, setFClass] =     useState(''); 
    const [nmfc, setNmfc] =         useState(''); 

    const [huname, setHUName]  =    useState('');
    const [hunitCnt, setHUCnt] =    useState(0);
    const [pcnt, setPCnt]         = useState(0); 

    const [length, setLength] =     useState(0);
    const [width, setWidth] =       useState(0);
    const [height, setHeight] =     useState(0);
    const [wgt, setWgt] =           useState(0);
    const [vol, setVol] =           useState(0);
    
    const [dimUnit, setDimUnit] =   useState('Ft');
    const [wunit, setWUnit]     =   useState('Lb'); 
    const [vUnit, setVUnit]     =   useState('CuFt')

    const [isHazMat, setisHazMat] = useState(false);
    const [nonStackable, setnonStackable] = useState(false);

    const [dialonMsg, setDialogMsg] = useState(''); 
    const [dialogOpen, setDialogOpen] = useState(false); 

    const addFreight = (e) =>{
        e.preventDefault(); 
       

        if(desc.length === 0){
            setDialogMsg('Please Enter Description!');
            setDialogOpen(true);
        } else if(fclass.length === 0){
            setDialogMsg('Please Enter Freight Class!');
            setDialogOpen(true);
        } else if(nmfc.length === 0){
            setDialogMsg('Please Enter NMFC Code!');
            setDialogOpen(true);
        } else if(huname.length === 0){
            setDialogMsg('Please Enter handling Unit Name!');
            setDialogOpen(true);
        } else if(hunitCnt <= 0){
            setDialogMsg('Please Enter handling Unit count!');
            setDialogOpen(true);
        } else if(pcnt <= 0){
            setDialogMsg('Please Enter piece count!');
            setDialogOpen(true);
        } else if(length <= 0){
            setDialogMsg('Please Enter Length value!');
            setDialogOpen(true);
        } else if(width <= 0){
            setDialogMsg('Please Enter width value!');
            setDialogOpen(true);
        } else if(height <= 0){
            setDialogMsg('Please Enter height value!');
            setDialogOpen(true);
        } else if(wgt <= 0){
            setDialogMsg('Please Enter weight value!');
            setDialogOpen(true);
        } else {
            console.log(desc, fclass, nmfc, huname, hunitCnt, pcnt, length, width, height, wgt, dimUnit, wunit)
            dispatch({type: 'ADD_ORIGIN', payload:{
                
                desc: desc,
                freightClass: fclass,
                nmfcCode: nmfc,
                
                handlingUnitName: huname,
                handlingUnitQty: hunitCnt,
                pieceCount: pcnt,

                weight: wgt,
                length: length,
                width: width,
                height: height,



            }}); 
        }
        
    }

    return (
        <div style = {{margin: 10}} className = "shadow">
            <div>

                <Dialog open={dialogOpen} onClose ={()=>setDialogOpen(false)}>
                    <DialogTitle>Freight Shipment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{dialonMsg}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setDialogOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>



                <div className = "card-header" style={{background:'#3d0099',  color: 'white'}}>Freight Info</div>
                <div className = "card-body">
                    <div>
                        <form>

                            <div className = "row">
                                <div className = "col-5">
                                    {/*Description */}
     
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Description</span>
                                        <input type="text" className="form-control" value = {desc}
                                                    onChange={event => setDesc(event.target.value)} />
                                    </div>
                                    {/*Description */}
                                </div>

                                <div className = "col-3">
                                    {/*Class */}
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Class</span>
                                        <input type="text" className="form-control" 
                                                    value = {fclass}
                                                    onChange={event => setFClass(event.target.value)}
                                        />
                                    </div>
                                    {/*Class */}
                                </div>

                                <div className = "col-4">
                                    {/*nmfc */}
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">NMFC</span>
                                        <input type="text" className="form-control" 
                                                    value = {nmfc}
                                                    onChange={event => setNmfc(event.target.value)}
                                        />
                                    </div>
                                    {/*nmfc */}
                                </div>

                            </div>

                            {/*handling unit */}
                            <div className = "row">

                                <div className ="col-5">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Handling Unit Name</span>
                                        <input type="text" className="form-control" value = {huname} onChange ={val=>setHUName(val.target.value)} />
                                    </div>
                                </div>

                                <div className ="col-4">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Handling Unit Count</span>
                                        <input type="number" className="form-control" value = {hunitCnt} onChange = {val=>setHUCnt(val.target.value)}  />
                                    </div>
                                </div>

                                <div className ="col-3">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Piece Count</span>
                                        <input type="number" className="form-control" value = {pcnt} onChange = {val=>setPCnt(val.target.value)} />
                                    </div>
                                </div>



                            </div>


                            {/*Dimensions */}
                            <label>Dimensions</label>
                            <div className = "row">
                                
                                <div className = "col-3">
                                        {/*length */}
                                    <div className="input-group input-group-sm mb-3">
                                            <span className="input-group-text">Length</span>
                                            <input type="number" className="form-control"                                                         
                                                        value = {length}
                                                        onChange={event => setLength(event.target.value)}
                                                        />
                                    </div>
                                        {/*length */}
                                </div>

                                <div className = "col-3">
                                        {/*width */}
                  
                                        <div className="input-group input-group-sm mb-3">
                                            <span className="input-group-text">Width</span>
                                            <input type="number" className="form-control"                                                         
                                                       value = {width}
                                                       onChange={event => setWidth(event.target.value)}
                                                        />
                                        </div>
                                        {/*width */}
                                </div>

                                <div className = "col-3">
                                        {/* height */}
                                        <div className="input-group input-group-sm mb-3">
                                            <span className="input-group-text">Height</span>
                                            <input type="number" className="form-control"                                                         
                                                        value = {height}
                                                        onChange={event => setHeight(event.target.value)}
                                                        />
                                        </div>

                                        {/* height */}
                                </div>

                                <div className = "col-3">
                                    {/* height */}
                                    <div className = "input-group input-group-sm mb-3">
                                        <span className="input-group-text">Unit</span>
                                        <select class="form-select" value = {dimUnit} onChange = {val=>setDimUnit(val.target.value)}>
                                            <option defaultValue value="Ft">Ft</option>
                                            <option value="M">M</option>
                                            <option value="In">In</option>
                                            <option value="Cm">Cm</option>
                                            <option value="Yd">Yd</option>
                                        </select>
                                    </div>
                                    {/* height */}
                                </div>



                            </div>

                            {/** weight and volume */}
                            <div className= "row">
                                <div className = "col-3">
                                    {/*weight */}
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Weight</span>
                                        <input type="number" className="form-control"                                                         
                                                    value = {wgt}
                                                    onChange={event => setWgt(event.target.value)}
                                                    />
                                    </div>
                                    {/* weight*/}
                                </div>

                                <div className = "col-3">
                                    {/* height */}
                                    <select class="form-select-sm" value ={wunit} onChange= {val=>setWUnit(val.target.value)}>
                                        <option defaultValue value="Lb">Lb</option>
                                        <option value="Kg">Kg</option>
                                        <option value="Ton">Ton</option>
                                        <option value="Tonne">Tonne</option>
                                        <option value="Cwt">Cwt</option>
                                    </select>
                                    {/* height */}
                                </div>

                                <div className = "col-3">
                                    {/*weight */}
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Volume</span>
                                        <input type="number" className="form-control"                                                         
                                                    value = {vUnit}
                                                    onChange={event => setVUnit(event.target.value)}
                                                    />
                                    </div>
                                    {/* weight*/}
                                </div>

                                <div className = "col-3">
                                    {/* height */}
                                    <select class="form-select-sm" value ={vol} onChange= {val=>setVol(val.target.value)}>
                                        <option defaultValue value="CuFt">CuFt</option>
                                        <option value="M3">M3</option>
                                        <option value="CuIn">CuIn</option>
                                        <option value="Cc">Cc</option>
                                        <option value="CuYd">CuYd</option>
                                    </select>
                                    {/* height */}
                                </div>



                            </div>

                            {/* checkboxes */}
                            <div className = "row">
                                <div className = "col-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" />
                                        <label class="form-check-label">
                                            nonStackable 
                                        </label>
                                    </div>
                                </div>
                                
                                <div className = "col-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" />
                                        <label class="form-check-label">
                                            isHazmat 
                                        </label>
                                    </div>
                                </div>


                                <div className = "col-3" style = {{alignSelf: 'flex-end'}}>
                                    <button className = "btn btn-primary btn-sm" onClick = {e => addFreight(e)} >Add Freight</button>
                                </div>

                            </div>

                        </form>
                    </div>



                </div>

            </div>
        </div>
    )
}