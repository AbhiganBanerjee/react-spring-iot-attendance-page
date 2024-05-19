import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
//import all the icons
import * as Icons from '@mui/icons-material';

//import all ant icons
import * as AllIcons from '@ant-design/icons';

//Pass a props softwares array and pass the istheme for theme handling
const SoftwareCards = ({softwares,isTheme})=>{

    //Create theme and breakpoint boolean state to apply responsive effects
    const theme = useTheme();
    //IF screen size is less than 600px then its true
    const isScreenSize = useMediaQuery(theme.breakpoints.down('sm'));

    //Create state to hold the hovered Index to provide hover styles based on index
    const[hoverIndex,setHoverIndex] = useState(null);

    //Create 2 styles for Cards hover and out style
    const hoverStyle = {
        width: isScreenSize ? "310px" : "96%",
        height: isScreenSize?"215px" : "230px",

        backgroundColor: isTheme? '#FF3CAC' : "#85FFBD",
        backgroundImage: isTheme?"linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        
        border: '3px solid #FFFB7D',
        borderRadius : '20px / 80px',
        color: isTheme?"darkblue" : "white"
    };
    const outStyle = {
        width: isScreenSize ? "310px" : "96%",
        height: isScreenSize?"215px" : "230px",
        
        backgroundImage: isTheme ?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0', 

        borderRadius : "13% 7% 7% 1%",
        color: isTheme? "white" : "black"  
    }

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

    //create 2 className for Icons
    let iconhoverClassName = isTheme?'text-primary' : 'text-white';
    let iconOutClassName = 'icons';

    //Creating a Map of Icon which are required 
    const iconMap = {
        // Add more icon mappings as needed
        CodeOutlined : AllIcons.CodeOutlined,
        DatabaseFilled : AllIcons.DatabaseFilled,
        Language : Icons.Language,
        JavaOutlined : AllIcons.JavaOutlined
    };
    
    //Getting the IconComponent Dynamically from the Spring REST API MUI Icon name
    const getIconComponent = (iconName) => {
        //Search the icon component in the map by the iconName coming from Spring REST API
        const IconComponent = iconMap[iconName];
        if (IconComponent) {
            //If the Icon exists in the map return it as a MUI component 
            return <IconComponent />;
        } else {
            //Return null if icon name is not found
            return null; 
        }
    };

    useEffect(()=>{
        setHoverIndex(null);
    },[])

    return(
        <>
            <Grid
                container
                spacing={2}
            >
                {/* For each of software in softwares array create a Grid item in that a card */}
                {
                    softwares.map((software,index)=>
                        //Generate the Grid item and inside it the Card
                        <Grid item xs={12} sm={12} md={6} lg={3} key={index}
                            sx={{
                                alignItems:"center",  
                                justifyContent:"center",
                                display:"flex"
                            }}
                        >
                            <Card className={index === hoverIndex? hoverClassName : outClassName} elevation={index===hoverIndex?20 : 0} sx={index===hoverIndex ? hoverStyle : outStyle}
                                variant={index===hoverIndex?"elevation" : "outlined"} 
                            >
                                <CardActionArea
                                    onMouseOver={()=>{
                                        setHoverIndex(index);
                                    }}
                                    onMouseOut={()=>{
                                        setHoverIndex(null);
                                    }}
                                    onTouchStart={()=>{
                                        setHoverIndex(index);
                                    }}
                                    onTouchCancel={()=>{
                                        setHoverIndex(null);
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar className={index === hoverIndex? hoverClassName : outClassName}
                                                sx={index===hoverIndex?iconHoverStyle : iconOutStyle}
                                                src={software.image}
                                            />
                                        }
                                        action={
                                            <IconButton className = {index===hoverIndex?iconhoverClassName : iconOutClassName}       
                                            >
                                                {/* Get the IconComponent*/}
                                                {getIconComponent(software.icon)}
                                            </IconButton>
                                        }
                                        title = {
                                            <b 
                                                style={{
                                                    fontFamily:"monospace",
                                                    fontWeight:"bold",
                                                    fontSize:"20px",
                                                }}
                                            >
                                                {/* Show the name */}
                                                {software.name}
                                            </b>
                                        }
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="body2" component="div"
                                            sx={{
                                                fontFamily:"monospace",
                                                fontSize: isScreenSize?"12px" : "15px",
                                                textAlign:"justify"
                                            }}
                                        >
                                            <dl>
                                                <b>Type:</b> <span>{software.type}</span><br/>
                                                <dt>Role in Our Project:</dt>
                                                <dd>{software.role}</dd>
                                            </dl>
                                        </Typography>  
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
}
export default SoftwareCards;