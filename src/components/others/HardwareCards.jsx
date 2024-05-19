import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
//import all the MUI Icons
import * as Icons from "@mui/icons-material"; 


//Give the Hardware array as a inputProps, pass the isTheme also
const HardwareCards = ({hardwares,isTheme})=>{

    //Creating a Map of Icon which are required 
    const iconMap = {
        // Add more icon mappings as needed
        Memory: Icons.Memory,
        CellTowerOutlined : Icons.CellTowerOutlined,
        NotificationsActive : Icons.NotificationsActive,
        Cable : Icons.Cable
    };
    
    //Getting the IconComponent Dynamically from the Spring REST API MUI Icon name
    const getIconComponent = (iconName) => {
        const IconComponent = iconMap[iconName];
        if (IconComponent) {
            //If the Icon exists in the map return it as a MUI component 
            return <IconComponent />;
        } else {
            //Return null if icon name is not found
            return null; 
        }
    };

    //Define breakpoints matching boolean and theme to handleMediaQuery
    const theme = useTheme();
    const isScrenSize = useMediaQuery(theme.breakpoints.down('sm'));

    //Create 2 style states for the Cards one for Hover and another for out
    const hoverStyle = {
        width: isScrenSize ? "310px" : "96%",
        backgroundColor: '#FF3CAC',
        backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        maxHeight:"490px",
        border:"3px solid #FFFB7D",
        borderTopRightRadius: '20px', // Set a larger border radius for the top right corner
        borderBottomLeftRadius: '20px', // Set a larger border radius for the bottom left corner
    };
    const outStyle = { 
        width: isScrenSize ? "310px" : "96%",
        backgroundColor: "#85FFBD",
        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        marginTop : isScrenSize ? "20px" : "0px",
        maxHeight:"490px",
        border:"3px solid black",
        borderTopLeftRadius: '20px', // Set a larger border radius for the top right corner
        borderBottomRightRadius: '20px', // Set a larger border radius for the bottom left corner
    };

    //Define an index state to check on which card we are hovering to store that card's index
    const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

    useEffect(()=>{
        setHoveredCardIndex(null);
    },[])

    return(
        <>
            <Grid
                container
                spacing={2}
            >
                {/*Iterate through the Array of JSON and for Each Hardware create a Card  */}
                {
                    hardwares.map((hardware, index) => (
                        <Grid item xs={12} md={6} sm={6} lg={3} xl={6} key={index}
                            sx={{
                                display:"flex", 
                                justifyContent:"center",
                                alignItems:"center",
                            }}
                        >
                            {/*Each Card Represents a Hardware Component */}
                            <Card elevation={8}
                                sx={ 
                                    //If current index is matching with the hover card index then apply the style
                                    index === hoveredCardIndex ? hoverStyle : outStyle // Apply hover style conditionally
                                }
                            >
                                <CardActionArea
                                    onMouseOver={() => {
                                        //On mousehover set the the current index as hoveredindex
                                        setHoveredCardIndex(index)
                                    }}
                                    onMouseOut={() => {
                                        //set the hoverindex as null on mouse out
                                        setHoveredCardIndex(null)
                                    }}
                                    onTouchStart={()=>{
                                        //On touch set the the current index as hoveredindex
                                        setHoveredCardIndex(index)
                                    }}
                                    onTouchCancel={() => {
                                        //set the  as null on touch cancel
                                        setHoveredCardIndex(null)
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            <IconButton size="large" color="inherit"
                                                style={{
                                                    border: (index===hoveredCardIndex)?"3px solid #FFFB7D" : "3px solid #784BA0",
                                                    color: (index===hoveredCardIndex)? "#85FFBD" : "#2B86C5"
                                                }}
                                            >
                                                {/*Dynamically give Icons coming from API*/}
                                                {getIconComponent(hardware.icon)}
                                            </IconButton>
                                        }
                                        title={
                                            <b style={{
                                                fontFamily:"monospace",
                                                fontWeight:"bold",
                                                fontSize: isScrenSize? "15px" : "20px",
                                                color: (index===hoveredCardIndex) ? "white" : "inherit"
                                            }}>
                                                {hardware.name}
                                            </b>
                                        }
                                        subheader = {
                                            <b style={{
                                                color : (index===hoveredCardIndex)?"white" : "black",
                                                fontWeight:"bold",
                                                fontFamily:"monospace"
                                            }}>&#8377;{hardware.price}</b>
                                        }
                                    />
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image={hardware.image}
                                        alt="Hardware_Img"
                                        sx={{
                                            border:(index===hoveredCardIndex)?"3px solid #FFFB7D" : "3px solid black",
                                            borderRadius:"7%",
                                        }}
                                    />
                                    <CardContent>                      
                                        <Typography variant="body2" color="text.secondary"
                                            sx={{
                                                fontFamily:"monospace",
                                                fontSize: isScrenSize?"12px" : "15px",
                                                color: (index===hoveredCardIndex) ? "white" : "inherit"
                                            }}
                                        >
                                            <dl>
                                                <dt style={{fontSize:"17px"}}>Description</dt>
                                                <dd>{hardware.desc}</dd>
                                                <dt>Pins:</dt>
                                                <dd>
                                                    {
                                                        //Print each of the trophy details seperated by comma delimeter
                                                        hardware.pins && hardware.pins && Array.isArray(hardware.pins) && (
                                                            <p className="font-monospace">{hardware.pins.join(", ")}</p>
                                                        )
                                                    }
                                                </dd>
                                            </dl>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                }        
            </Grid>
        </>
    );
}

export default HardwareCards;