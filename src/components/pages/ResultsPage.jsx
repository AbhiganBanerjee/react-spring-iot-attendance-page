import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import SkeletonCardComponent from "../others/SkeletonCardComponent";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";
import ResultsCards from "../others/ResultsCards";
import { ExperimentFilled } from "@ant-design/icons";

//Accept the isTheme coming from the index
const ResultsPage = ({isTheme})=>{

    //Create a media responsive reference to handle different breakpoints
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));


    //Create a State to hold the the results array of JSON coming from Spring REST API
    const[results,setResults] = useState([{}]);

    //Create a boolean loading state to see if the API Response is still coming or not
    const[isLoading,setIsLoading] = useState(false);

    //Give an welcome message 
    const [messageApi, contextHolder] = message.useMessage();
    //call the method on welcome to show message
    const showMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Watch our test-cases..',
            duration: 3,
            className: 'font-monospace fw-bold',
            style:{
                color:"green"
            },
            icon : <ExperimentFilled/>
        });
    };

    // Ref to track if the message has been shown
    const messageShownRef = useRef(false);

    //On the Component Mount load the Results
    useEffect(()=>{
        //make the loading state as true
        setIsLoading(true);

        //make the API Call using AXIOS
        axios.get("https://springreactiotattendance2-x7aiy7ga.b4a.run/getResults")
        .then((res)=>{
            setResults(res.data);
        })
        .catch((err)=>{
            console.error(err);
        })
        .finally(()=>{
            //finally Loading is over so make it false
            setIsLoading(false);
        });

        // Show the message only if it hasn't been shown before
        if (!messageShownRef.current) {
            showMessage();
            // Set the ref to true to indicate that the message has been shown
            messageShownRef.current = true;
        }
    },[]);

    return(
        <>
            {/* Show the welcome message */}
            {contextHolder}

            {/* This is the main background of the Prototype page */}
            <Container maxWidth={isMatch?"xs" : "xl"}
                sx={{
                    // Chaing background on theme condition if theme button clicked then it will toggle theme
                    backgroundImage: isTheme ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )' : 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
                    // backgroundColor:"black",
                    backgroundSize: "contain",
                    minHeight : (isMatch)? "165vmax" : "52vmax",
                }}
            >
                <header className="text-center text-white" style={{marginTop:"75px"}}>
                        <h2 style={{
                            fontFamily:"monospace",
                            fontWeight:"bold",
                            fontSize:isMatch? "25px" : "37px",
                            color : isTheme?"darkblue" : "wheat"
                        }}>
                            {/* If screen size is lesser than sm breapoint then show less heading  */}
                            {isMatch? "Test Runs & Results" : "Experimental Outcomes & Results"}
                        </h2>
                </header>
                    
                {/* If it is still loading for the API show Skeleton Card in the place of the results */}
                {isLoading ? <SkeletonCardComponent sx={{
                    width: isMatch? "310px": "50%", 
                    marginLeft:"300px",
                    backgroundColor: "#85FFBD",
                    backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
                    borderRadius:"20px  50px  40px"
                }}/> : 
                /* Display the ResultsPage Cards component here, pass the results array as property*/
                <ResultsCards results={results} isTheme={isTheme}/>}
            </Container>
        </>
    );
}
export default ResultsPage;