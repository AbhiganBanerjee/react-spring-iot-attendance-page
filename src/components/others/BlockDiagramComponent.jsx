import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
//import all the icons
import * as Icon from "@mui/icons-material";
import { useState } from "react";

const BlockDiagramComponent = ({diags,isTheme})=>{

    //Create breakpoints and responsive ness properties
    const theme = useTheme();
    const isScreenSize = useMediaQuery(theme.breakpoints.down('sm'));

    //Create the map of icons to dynamically put icons
    const iconMap = {
        //Add the icons as required
        Image : Icon.Image,
        SettingsInputComposite : Icon.SettingsInputComposite
    }
    //Get the iconcomponent, by passing the iconName
    const getIconComponent = (iconName)=>{
        //get the icon from the map based on keyname
        const IconComponent = iconMap[iconName];
        if(IconComponent){
            return <IconComponent/>
        }else{
            return null;
        }
    }

    //create the hoverInde states for apply hovering effects
    const[hoverIndex,setHoverIndex] = useState(null);

    //create 2 style states for card hover and out
    //manage those feature card styles in a seperate state
    const hoverStyle = {
        width: isScreenSize ? "310px" : "96%",
        height:isScreenSize?"auto":"590px",
        backgroundColor: isTheme ? '#FF3CAC' : "#85FFBD",
        backgroundImage: isTheme?"linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        border: '3px solid #FFFB7D',
        color: isTheme?"black":"white",
        //define styles for some border shape
        borderRadius : "20px",
    };
    const outStyle = {
        width: isScreenSize ? "310px" : "96%",
        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
        height:isScreenSize?"auto":"590px",
        //linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)
        backgroundImage: isTheme ?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0',
        color: isTheme?"white":"black",
        //define styles for some border shape
        borderRadius : '20px',
    };

    //Define icon styles on hover and out
    const iconHoverStyle = {
        border : isTheme?"3px solid #784BA0" : "3px solid #FFFB7D",
        color: isTheme?"#2B86C5" : "#85FFBD"
    };
    const iconOutStyle = {
        border : isTheme?"3px solid #FFFB7D" : "3px solid #784BA0",
        color: isTheme?"#85FFBD" : "#2B86C5"
    }

    //Create 2 className states to dynamically provide classname to the feature cards
    //index === hoverIndex?"glow":"card"
    let hoverClassName = isTheme?'darkglowing' : 'glow';
    let outClassName = 'card';

    return(
        <Grid
            container
            spacing={2}
        >

            {/* we will create 2 grids one beside another other so each will have 6 grid size*/}
            {/* Iterate and Create 2 Grid that contains the BlockDiagram and another grid will be for circuit*/}
            {
                diags.map((diag,index)=>
                    <Grid key={index} sm={12} xs={12} md={6} lg={6} item 
                        sx={{
                            display:"flex", 
                            justifyContent:"center",
                            alignItems:"center",
                        }}  
                    >   
                        <Card elevation={9} key={index} sx={(index===hoverIndex)?hoverStyle : outStyle}>
                            <CardActionArea 
                                onMouseOver={()=>{
                                    setHoverIndex(index);
                                }}
                                onMouseOut={()=>{
                                    setHoverIndex(null);
                                }}
                            >
                                <CardHeader 
                                    avatar={
                                        <IconButton size="small"
                                            sx={index===hoverIndex?iconHoverStyle:iconOutStyle}
                                            className = {index===hoverIndex?hoverClassName:outClassName}
                                        >
                                            {getIconComponent(diag.icon)}
                                        </IconButton>
                                    }
                                    title={
                                        <b style={{
                                            fontFamily:"monospace",
                                            fontWeight:"bolder",
                                            fontSize: isScreenSize? "18px" : "25px",
                                            //color: (index===hoverIndex)?"white" : "black"
                                        }}>{diag.name}</b>
                                    }
                                />  
                                <CardContent className="row card-body">
                                    <dl>
                                        <dt style={{
                                            fontFamily:"monospace",
                                            fontSize: isScreenSize ? "17px" : "20px",
                                            //color: (index===hoverIndex)?"white" : "black"
                                        }}>Description:</dt>
                                        <dd>
                                            <Typography gutterBottom variant="h5" component="div" sx={{
                                                fontFamily:"monospace",
                                                fontSize : isScreenSize ? "12px" : "17px",
                                                //color: (index===hoverIndex)?"white" : "black",,
                                                textAlign:"justify"
                                            }}>
                                                {diag.desc}
                                            </Typography>
                                        </dd>
                                    </dl>
                                    <CardActions className="col-1 d-flex justify-content-center flex-column">
                                
                                    </CardActions>
                                    <div className="col-10 d-flex flex-column">
                                        {/* Image goes here */}
                                        <CardMedia 
                                            className = {index===hoverIndex?hoverClassName:outClassName}
                                            component="img"
                                            image={diag.image}
                                            height="auto"
                                            alt="block_diagram_img"
                                            sx={{
                                                border:"4px solid blue"
                                            }}
                                        />
                                    </div>
                                    <CardActions className="col-1 d-flex justify-content-center flex-column">
                                    
                                    </CardActions>        
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>    
                )
            }
        </Grid>
    )
}
export default BlockDiagramComponent;
