import { BackwardFilled, ExperimentFilled, ForwardFilled } from "@ant-design/icons";
import { DoubleArrow, PauseCircleFilled, PlayCircleFilled, } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {prototype} from '../../styles/prototype.css';

//Accept the incoming isTheme props from parent component
const ResultsCards = ({results, isTheme})=>{

    //define media query responsive states useTheme and useMediaQuery
    const theme = useTheme();
    const isScrenSize = useMediaQuery(theme.breakpoints.down('sm'));

    //Define a state to hold the array length
    const[len,setLen] = useState(0);

    //Define a state idx to hold the inde number of the array 
    const [idx,setIdx] = useState(0);

    //Define a timer for Slideshow
    const[timer,setTimer] = useState(0);

    //Define a boolean state to see if play button is clicked
    const[isClicked,setIsClicked] = useState(false);

    useEffect(()=>{
        //get the length of the array
        setLen(results.length);
    },[]);
    
    const prevClick = ()=>{
        setIdx((idx-1+len)%len);
    }
    const nextClick = ()=>{
        setIdx((idx+1)%len);
    }

    const playClick = ()=>{
        //toogle the click state
        setIsClicked(!isClicked);

        //Get access to the status para
        const sts = document.getElementById("status");

        if(!isClicked){
            //make the status visible
            sts.style.display = "block";

            //on play click set the interval and perform next click logic 
            setTimer(setInterval(()=>{
                setIdx((prevIdx)=>(prevIdx+1)%len);
            },2000))

            //give a status msg
            sts.innerHTML = `Slideshow has Started.. :)`.fontcolor('green');
        }else{
            //put the status msg
            sts.innerHTML = `Slideshow has Stopped!! :(`.fontcolor('red');

            //Clear the interval and pause the iamge
            clearInterval(timer);

            //Hide the status para again after 1sec of pausing
            setTimeout(()=>{
                sts.style.display = "none";
            },1300)
        }
    }

    return(
        <>
            <Grid
                container
                spacing={2}
                marginTop={isScrenSize? "0px" : "20px"}
            >
                {/* An Small Info card in left side grid */}
                <Grid item xs={12} md={3} sm={12} lg={3} xl={3}>
                    <Card  
                        className="card"
                        sx={{ 
                            minWidth: 275, 
                            marginTop:isScrenSize?"0px" : "175px", 
                            height:"auto",
                            border:"3px solid skyblue",
                            borderRadius:"20px 40px 80px", 
                            backgroundColor:"darkblue", color:"skyblue"
                        }}
                    >
                        <CardHeader
                            action = {
                                <IconButton color="inherit">
                                    {isScrenSize?<DoubleArrow sx={{transform:"rotate(90deg)"}}/>:<DoubleArrow/>}
                                </IconButton>
                            }
                            title = {
                                <b style={{
                                    fontFamily:"monospace", fontWeight:"bold", fontSize:isScrenSize?"18px" : "22px", color:"skyblue"
                                }}>
                                    More Information
                                </b>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: isScrenSize?"12px" : "14px", 
                                fontFamily:"monospace", fontWeight:"bold",color:"skyblue",
                                textAlign:"justify"
                             }} color="text.secondary" gutterBottom>
                               Here, we are showcasing some of the images of our simulation test cases that we have executed to see 
                               if our implemented system is working as expected or not. This test runs have also helped us to defiine
                               our system accuracy and efficiency.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8} sm={12} lg={6} xl={6}
                    sx={{
                        display:"flex", 
                        justifyContent:"center",
                        alignItems:"center",
                    }}
                >
                    {/* This card is to provide a slideshow of images of our prototypes */}
                    <Card
                        elevation={8}
                        sx={{ 
                            width: isScrenSize? "310px": "96%", 
                            marginTop:isScrenSize?"36px" : "0px",
                            backgroundColor: "#85FFBD",
                            backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
                            border:"4px solid darkblue"
                        }}
                    >
                        <CardHeader
                            action={
                                <IconButton size="large" color="inherit" onClick={playClick}>
                                    {isClicked? <PauseCircleFilled/> : <PlayCircleFilled/>}
                                </IconButton>
                            }
                            avatar={
                                <Avatar className="card" sx={{
                                    border:"3px solid black",
                                    backgroundColor:"#FFFB7D"
                                }}>
                                    <IconButton  sx={{color:"black"}}><ExperimentFilled/></IconButton>
                                </Avatar>
                            }
                            title = {
                                <b className="icons" style={{
                                    fontFamily:"monospace",
                                    fontWeight:"bold",
                                    fontSize: isScrenSize? "16px" : "30px"
                                }}>
                                    {results[idx].name}
                                </b>
                            }
                        />
                        <Typography className="mb-1 text-center" sx={{
                            fontFamily:"monospace",
                            fontWeight:"normal",
                            fontSize:isScrenSize ? "14px" : "18px",
                            textAlign:"start"
                        }}>
                            {results[idx].desc}
                        </Typography>
                        <CardContent className="row card-body">
                            <CardActions className="col-1 d-flex justify-content-center flex-column">
                                <Button color="primary" onClick={prevClick} variant="text" size={isScrenSize?"small" : "large"} sx={{fontSize: isScrenSize ? "22px" : "37px"}}><b><BackwardFilled/></b></Button>
                            </CardActions>
                            <div className="col-10 d-flex flex-column">
                                {/* Image goes here */}
                                <CardMedia 
                                    component="img"
                                    image={results[idx].image}
                                    height= {isScrenSize ? "auto" : "390px"}
                                    sx={{
                                        border:"4px solid blue"
                                    }}
                                />
                                    <b id="status" className="text-center" style={{display:"none",
                                        fontFamily:"monospace", fontWeight:"bold", fontSize:isScrenSize?"12px" : "18px"
                                    }}></b>
                                </div>
                            <CardActions className="col-1 d-flex justify-content-center flex-column">
                                <Button sx={{fontSize: isScrenSize ? "22px" : "37px"}} color="primary" onClick={nextClick} variant="text" size={isScrenSize?"small" : "large"} >
                                    <b><ForwardFilled/></b>
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Put another info card on right side */}
                <Grid item xs={12} sm={12} md={3} lg={3}> 
                    <Card className="card" sx={{ minWidth: 275, marginTop:isScrenSize?"36px" : "175px", height:"auto",border:"3px solid skyblue",
                        borderRadius:"40px 80px 20px", borderTopRightRadius:"20px", backgroundColor:"darkblue", color:"skyblue", 
                    }}>
                        <CardHeader
                            action = {
                                <IconButton color="inherit">
                                    {isScrenSize?<DoubleArrow sx={{transform:"rotate(-90deg)"}}/>:<DoubleArrow sx={{transform:"rotate(180deg)"}}/>}
                                </IconButton>
                            }
                            title = {
                                <b style={{
                                    fontFamily:"monospace", fontWeight:"bold", fontSize:isScrenSize?"18px" : "22px", color:"skyblue"
                                }}>
                                    More Information
                                </b>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ fontSize: isScrenSize?"12px" : "14px", 
                                fontFamily:"monospace", fontWeight:"bold",color:"skyblue",
                                textAlign:"justify"
                             }} color="text.secondary" gutterBottom>
                               For more snapshots of our system execution and test-runs that we have performed, feel free to click on the following button.
                            </Typography>
                        </CardContent>
                        <CardActions className="justify-content-center align-items-center d-flex">
                            {/* Navigate to the Page where our PPT is there */}
                            <a href="https://drive.google.com/file/d/1neeGIEhYG_4N3nE8h7bWzOFcEo7L2XpM/view?usp=drive_link">
                                <Button className="card" sx={{
                                    color:"darkblue",
                                    backgroundColor:"skyblue",
                                    fontFamily:"monospace",
                                    fontWeight:"bold"
                                }} variant="contained" size="small">Learn More</Button>
                            </a>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default ResultsCards;