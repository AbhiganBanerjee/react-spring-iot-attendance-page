import { Build, DataObject, EditNote } from "@mui/icons-material";
import IndeptPageCards from "../others/IndepthPageCards";
import { Box, Grid, Skeleton, useMediaQuery, useTheme, Container } from "@mui/material";
import HardwareCards from "../others/HardwareCards";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SoftwareCards from "../others/SoftwareCards";
import SkeletonCardComponent from "../others/SkeletonCardComponent";
import HardwaresTable from "../others/HardwaresTable";
import BlockDiagramComponent from "../others/BlockDiagramComponent";
import { FloatButton, message } from 'antd';
import { InfoCircleFilled } from "@ant-design/icons";

// Pass the isTheme props for handling theme changes
const IndepthPage = ({isTheme})=>{
    //Get the breakpoints for extrasmall screen size and apply media responsive effects
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    /*Get the Hardwares JSON Array and store it in the 
    following state on component mount from Spring REST API*/
    const[hardwares,setHardwares] = useState([{}]);

    //Create a State to Hold the Softwares Array of JSON coming from Spring REST API
    const[softwares,setSoftwares] = useState([{}]);

    //Create a state to hold the BlockDiagram coming from Spring REST API
    const[diags,setDiag] = useState([{}]);

    //This state will be true if it is taking time or Waiting to get Response from the Spring REST API
    const[isLoading,setIsLoading] = useState(false);
    
    //Give an welcome message 
    const [messageApi, contextHolder] = message.useMessage();
    //call the method on welcome to show message
    const showMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'About our project..',
            duration: 3,
            className: 'font-monospace fw-bold',
            style:{
                color:"green"
            },
            icon : <InfoCircleFilled />
        });
    };

    // Ref to track if the message has been shown
    const messageShownRef = useRef(false);

    useEffect(() => {
        //Waiting for the REST API starts so isLoading is set to true
        setIsLoading(true);

        //Promise.all is here used to fetch both the hardware and software from backend apis
        Promise.all([
            //fetch hardwares from API using axios
            axios("https://springreactiotattendance2-x7aiy7ga.b4a.run/getHardwares"),

            //Fetch Softwares also from API using axios
            axios("https://springreactiotattendance2-x7aiy7ga.b4a.run/getSoftwares"),

            //Fetch the Blockdiagram also
            axios("https://springreactiotattendance2-x7aiy7ga.b4a.run/getDiag"),
        ])
        .then(([hardwaresRes, softwaresRes, diagRes]) => {
            //set the data for hardwares array
            setHardwares(hardwaresRes.data);

            //set the data for softwares array
            setSoftwares(softwaresRes.data);

            //set the data for blockdiagram
            setDiag(diagRes.data);
        })
        .catch((err) => console.log(err))

        //finally the waiting is over so isLoading becomes false
        .finally(() => {
            //API Response came waiting time is over, so set loading to false
            setIsLoading(false);
        });

        // Show the message only if it hasn't been shown before
        if (!messageShownRef.current) {
            showMessage();
            // Set the ref to true to indicate that the message has been shown
            messageShownRef.current = true;
        }
    }, []);
    
    //create skeleton style for hardware cards
    const hardwareSkeletonStyle = {
        maxWidth: 345, m: 2, 
        backgroundColor: "#85FFBD",
        height:"440px",
        backgroundImage: "linear-gradient( 90.5deg,  rgba(152,45,255,1) 0.7%, rgba(90,241,255,1) 51.5%, rgba(65,239,164,1) 100.6% )", 
        border: '3px solid #784BA0',
        borderTopLeftRadius: '20px', // Set a larger border radius for the top right corner
        borderBottomRightRadius: '20px', // Set a larger border radius for the bottom left corner
    }

    //create skeleton stylefor software cards
    const softwareSkeletonStyle = {
        width: isMatch ? "310px" : "96%",
        backgroundColor: "#85FFBD",
        backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0',
        borderTopLeftRadius: '20px', // Set a larger border radius for the top right corner
        borderBottomRightRadius: '20px', // Set a larger border radius for the bottom left corner
    }

    return(
        <>
            {contextHolder}
            {/* This is the main background for the Indepth page */}
            <Container maxWidth={isMatch ? "xs" : "xl"}
                sx={{
                    backgroundImage: isTheme ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )' : 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
                    minHeight : (isMatch)? "430vmax" : "102vmax",    /*Viewport max height it will expand automatically if required*/
                }}
            >
                <header className="text-center text-dark" style={{marginTop:"75px"}}>
                    <h2 style={{
                        fontFamily:"monospace",
                        fontWeight:"bold",
                        fontSize:isMatch? "25px" : "37px",
                        color:isTheme?"darkblue":"wheat"
                    }}>
                        {/* Dynamically change texts also on media screen */}
                        {isMatch?"About Our Project" : "More Insights About Our Project Design"}
                    </h2>
                </header>

                {/* Normal Overview Cards of Indepth page, and there also pass the isTheme props */}
                <IndeptPageCards isTheme={isTheme}/>

                {/* Header for Hardware Cards */}
                <header className="text-center" style={{marginTop:"55px"}}>
                    <h2 style={{
                        fontFamily:"monospace",
                        fontWeight:"bold",
                        fontSize:isMatch? "20px" : "30px",
                        color:isTheme?"darkblue":"wheat"
                    }}>
                        <Build
                            className="icons"
                            fontSize="20px"
                            sx={{color:isTheme?"darkblue":"wheat"}}
                        /> Hardware Specifications
                    </h2>
                </header>
                {/* Now Load the Hardware Components Cards Here Which will have Data from backend Spring API */}
                {
                    //If its fetching from API then show skeleton cards 
                    isLoading?
                    <>
                        <Grid container spacing={2} marginTop="20px">
                            {Array.from(Array(1)).map((_, index) => (
                                //for 4 hardwares show 4 skeletons while watiting for API Response
                                <Grid xs={12} sm={12} md={10} lg={10} key={index}>
                                    <SkeletonCardComponent 
                                        sx={ softwareSkeletonStyle}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                    : 
                    /* Pass the hardwares array props the hardware cards component */
                    // If screen size is small then cards will be displayed other wise Table will be displayed
                    // (isMatch? <HardwareCards hardwares={hardwares} isTheme={isTheme}/> : <HardwaresTable hardwares={hardwares} isTheme={isTheme}/>)
                    <HardwaresTable hardwares={hardwares} isTheme={isTheme}/>
                }
                    
                {/* Header for Software Specification Cards */}
                <header className="text-center" style={{marginTop:"55px"}}>
                    <h2 style={{
                        fontFamily:"monospace",
                        fontWeight:"bold",
                        color:isTheme?"darkblue":"wheat",
                        fontSize:isMatch? "20px" : "30px"
                    }}>
                        <DataObject
                            className="icons"
                            fontSize="20px"
                            sx={{color:isTheme?"darkblue":"wheat"}}
                        /> Software Specifications
                    </h2>
                </header>
                {/* Software Card Component goes here, it will Fetch from Spring REST API all softwares and show */}
                {/* If it is loading and taking long time then we are showing skeletop cards */}
                {
                    //If its fetching from API then show skeleton cards
                    isLoading?
                    <>
                        <Grid container spacing={2} marginTop="20px">
                            {Array.from(Array(4)).map((_, index) => (
                                //for 4 softwares show 4 skeletons while watiting for API Response
                                <Grid xs={12} sm={12} md={4} lg={3} key={index}>
                                    <SkeletonCardComponent
                                        sx={softwareSkeletonStyle}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                    : 
                    // Otherwise show the Software cards by passing the software array props, and pass the isTheme also
                    <SoftwareCards softwares={softwares} isTheme={isTheme}/>
                }


                {/* Provide another header for the Block Diagram component */}
                <header className="text-center" style={{marginTop:"45px"}}>
                    <h2 style={{
                        fontFamily:"monospace",
                        fontWeight:"bold",
                        color:isTheme?"darkblue":"wheat",
                        fontSize:isMatch? "20px" : "30px"
                    }}>
                        <EditNote
                            className="icons"
                            fontSize="20px"
                            sx={{color:isTheme?"darkblue":"wheat"}}
                        /> {isMatch?"Block Diagram & Circuit" : "System Architecture & Circuit Connections" }
                    </h2>
                </header>
                {/* Add the BlockDiagramComponent here which will show the project Block Diagram */}
                {/* if loading is going on then display skeleton card */}
                {isLoading? <><SkeletonCardComponent sx={{
                    width: isMatch ? "310px" : "96%", 
                    backgroundColor: "#85FFBD",
                    backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
                    borderRadius : "13% 7% 7% 1%"
                }} /></> 
                    : 
                    /* Pass the blockDiag array for the Block Diagram component, also pass isTheme */
                    <BlockDiagramComponent diags={diags} isTheme={isTheme}/>
                }
                <FloatButton.BackTop  className="text-bg-warning text-success"/>
            </Container>
        </>
    );
}
export default IndepthPage;


