import { RadioButtonChecked } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {prototype} from '../../styles/prototype.css';
// Import all MUI icons
import * as Icons from "@mui/icons-material"; 
import SkeletonCardComponent from "./SkeletonCardComponent";

//Accept the incoming theme props from the Home Parent component
const HomeCardComponents = ({isTheme})=>{

    //For handling different screen sizes and applying media queries
    const theme = useTheme();
    const isScrenSize = useMediaQuery(theme.breakpoints.down("sm"));

    //Creating a Map of Icon which are required 
    const iconMap = {
        // Add more icon mappings as needed
        CurrencyRupeeOutlined: Icons.CurrencyRupeeOutlined,
        NetworkCheck : Icons.NetworkCheck,
        EnergySavingsLeaf : Icons.EnergySavingsLeaf,
        CloudDone : Icons.CloudDone
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

    //Managing a State to store the current hoverIndex and based on that changestyle
    const[hoverIndex,setHoverIndex] = useState(null);

    //Load all the features from the Spring REST API and store it in the following state
    const[features,setFeatures] = useState([{}]);

    //manage those feature card styles in a seperate state
    const featureHoverStyle = {
        //Based on screen size define the height and width
        width: isScrenSize ? "310px" : "96%",
        height : !isScrenSize?"255px" : "235px",

        //Based on the theme select the card background
        backgroundColor: isTheme ? '#FF3CAC' : "#85FFBD",
        backgroundImage: isTheme?"linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        border: '3px solid #FFFB7D',

        //define styles for some border shape
        borderRadius : "13% 7% 7% 1%",
        color: isTheme?"darkblue" : "white" 
    };
    const featureOutStyle = {
        //Based on screen size define the height and width
        width: isScrenSize ? "310px" : "96%",
        height : !isScrenSize?"255px" : "235px",

        //Based on the theme select the card background
        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
        
        //linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)
        backgroundImage: isTheme ?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0',

        //define styles for some border shape
        borderRadius : '20px / 80px',
        color: isTheme? "white" : "black" 
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


    //create a state to check if still its waiting for API Response or not
    const[isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        //On component mount set the hoverIndex as null
        setHoverIndex(null);

        //loading so make it true
        setIsLoading(true);

        //load all features
        axios.get("https://spring-iot-attendance-api.onrender.com/getFeatures")
        .then((res)=>{
            setFeatures(res.data);
        }).catch((err)=>console.log(err))
        .finally(()=>{
            //API Response came so set loading to false
            setIsLoading(false);
        })
    },[])

    return (
      <>
        <Grid
          container
          spacing={isScrenSize? 1 : 2}
          marginTop={"20px"}
        >
            {/* Main 2 big cards */}
            <Grid item xs={12} md={12} sm={12} lg={6} xl={6}
                sx={{
                    display:"flex", 
                    justifyContent:"center",
                    alignItems:"center",
                }}
            >
                {/* This card is to give an introduction about our Project */}
                <Card 
                    className="card"
                    elevation={8}
                    sx={{
                        width: isScrenSize? "310px": "96%", 
                        height: isScrenSize? "500px" : "auto",
                        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
                        backgroundImage: isTheme?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
                        borderRadius:"20px  50px  40px",
                        color: isTheme? "rgba(176,229,208,1)" : "black"
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar className="card"
                                style={{border:"3px solid rgba(158,33,105,1)"}}
                                src="https://img.freepik.com/premium-vector/blue-target-black-arrow-logo-design-business-business-goal-logo-icon-element-web-mobile-print_137439-135.jpg"/>
                        }

                        title={
                            <b style={{
                                fontFamily:"monospace",
                                fontWeight:"bolder",
                                fontSize:isScrenSize ? "17px" : "22px"
                            }}>Project Objective</b>
                        }
                    />
                    <CardActionArea>
                        
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" 
                            sx={{
                                fontFamily:"monospace",
                                fontWeight:"bold",
                                fontSize: isScrenSize ? "13px" : "larger",
                            }}
                        >
                            <RadioButtonChecked/>&nbsp;Efficient Attendance Monitoring
                        </Typography>
                        <Typography variant="body2" sx={{
                            fontFamily:"monospace",
                            fontWeight:"normal",
                            textAlign:"justify"
                        }}>
                            Since the olden days, the method of recording attendance is always been manual. Even though 
                            this develops student-teacher relationship and binds them together, it is more time consuming 
                            and much more prone to human errors. 
                        </Typography><br/>
                        <Typography variant="inherit" sx={{
                            fontFamily:"monospace",
                            fontWeight:"normal",
                            fontSize:isScrenSize ? "12px" : "large",
                            textAlign:"justify"
                        }}>
                            In order to make this process error free and reduce this wastage of time, it is necessary to 
                            implement Attendance Management System thus making it more efficient and effective. That is the target
                            of our Project to implement an Efficient and yet simple Attendance Monitoring system using IoT technologies.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            
            <Grid item xs={12} md={6} sm={6} lg={6} xl={6}
                sx={{ 
                    marginTop: isScrenSize? "120px" : "200px", 
                    display:"flex", 
                    justifyContent:"center",
                    alignItems:"center",
                    height:"170px"
                }}
            >
                <Card
                    className="card"
                    elevation={8}
                    sx={{ 
                        width: isScrenSize? "310px": "96%", 
                        backgroundColor: "#85FFBD",
                        height: "auto",
                        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
                        backgroundImage: isTheme?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
                        borderRadius:"20px  50px  40px",
                        color: isTheme? "rgba(176,229,208,1)" : "black"
                    }}
                >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="auto"
                            image="https://i.postimg.cc/PxDj4GnY/IMG20231113161957.jpg"
                            alt="Practical_CKT"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div"
                            sx={{
                                fontFamily:"monospace",
                                fontWeight:"bold",
                                fontSize:isScrenSize ? "15px" : "larger"
                            }}
                        >
                            <RadioButtonChecked/>&nbsp;Practical Circuit Design
                        </Typography>
                        <Typography variant="body2"
                            sx={{
                                fontFamily:"monospace",
                                fontWeight:"normal",
                                textAlign:"justify"
                            }}
                        >
                            This is the Practical Circuit Designed by us to implement IoT Based Attendance management system.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            {/* This header is to give an Features heading */}
            <Grid item xs={12} md={12} sm={12} lg={12} xl={12}
                sx={{
                    marginTop : isScrenSize ? "85px" : "180px",  
                    marginLeft:"20px"
                }}
            >
                <header className="text-center" style={{marginTop:isScrenSize ? "60px" : "12px"}}>
                    <h2 style={{
                        fontFamily:"monospace",
                        color : isTheme? "darkblue" : "wheat",
                        fontWeight:"bold",
                        fontSize:isScrenSize? "20px" : "30px"
                    }}>
                        <Icons.RocketLaunch className="icons"
                            fontSize="20px"
                            sx={{color:isTheme?"darkblue":"wheat"}}
                        /> {isScrenSize ? "Key Features" : "Key Features of our Project"}
                    </h2>
                </header>
            </Grid>

            {/* If the API response is still loading and taking time then display 4 skeletons in the place of features */}
            {
                isLoading ?
                <>
                    <Grid container spacing={2} marginTop="20px">
                        {Array.from(Array(4)).map((_, index) => (
                            //for 4 features show 4 skeletons while watiting for API Response
                            <Grid xs={12} sm={12} md={4} lg={3} key={index}>
                                <SkeletonCardComponent
                                    sx={isTheme? featureHoverStyle : featureOutStyle}
                                />
                                </Grid>
                        ))}
                    </Grid>
                </> : 
                /* If loading is over then iterate through Features array and show 4 features as cards */
                features.map((feature,index)=>
                    // For each feature create child item grid and inside it create Cards
                    <Grid
                        key={feature._id}
                        item
                        xs={12}
                        md={3}
                        sm={6}
                        sx={{ 
                            marginTop:"20px",
                            display:"flex", 
                            justifyContent:"center",
                            alignItems:"center",
                        }}
                    >
                        <Card className={index === hoverIndex? hoverClassName : outClassName}
                            variant={index===hoverIndex?"elevation" : "outlined"} 
                            elevation={index===hoverIndex?20 : 0}
                            //If hoverIndex is matching current Index so apply style for that hovered card only
                            sx={index===hoverIndex?featureHoverStyle:featureOutStyle}
                        >
                            <CardActionArea 
                                //Methods to handle hovering effect on mouse hover and on screen touch
                                onMouseOut={()=>{
                                    setHoverIndex(null);
                                }}
                                onMouseOver={()=>{
                                    setHoverIndex(index);
                                }}
                                onTouchStart={()=>{
                                    setHoverIndex(index);
                                }}
                                onTouchCancel={()=>{
                                    setHoverIndex(null);
                                }}
                            >
                                <CardHeader
                                    avatar = {
                                        <IconButton className={index === hoverIndex? hoverClassName : outClassName}
                                            sx={index===hoverIndex?iconHoverStyle : iconOutStyle}
                                        >
                                            {/* Getting the MUI IconComponent here dynamicall coming from REST API*/}
                                            {getIconComponent(feature.icon)}
                                        </IconButton>
                                    }
                                    title = {
                                        <b style={{
                                            fontFamily:"monospace",
                                            fontWeight:"bold",
                                            fontSize:"20px",
                                            // color: (index===hoverIndex) ? "white" : "inherit"
                                        }}>
                                            {feature.title}
                                        </b>
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="body2" component="div"
                                        sx={{
                                            fontFamily:"monospace",
                                            fontSize: isScrenSize?"12px" : "15px",
                                            // color: (index===hoverIndex) ? "white" : "inherit",
                                            textAlign:"justify"
                                        }}
                                    >
                                        {/* Dangerous is used to conver those <b> tag coming from 
                                        Spring REST API to convert as HTML element or nodes
                                        remember dangerous makes page vunrelable to XSS */}
                                        {feature.content } 
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
export default HomeCardComponents;
