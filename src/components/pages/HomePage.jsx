import { Container, useMediaQuery, useTheme } from "@mui/material";
import HomeCardComponents from "../others/HomeCardComponents";
import { FloatButton, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { HomeFilled } from "@ant-design/icons";

// IndexPage sending the isTheme property based on the themechange it will change the background of home page
const HomePage = ({isTheme})=>{

    //Define theme so that we can make the drawer active under a certain breakpoint
    const theme = useTheme();

    /*We will also use the useMediaQuery to make the responsive ness of that drawer active under certain screen size
    this returns a boolean which will become true under certain screen size condition
    so when the screen size is down from medium screen size, then only isMatch will become true
    and drawer will be shown then only*/
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

    //Give an welcome message 
    const [messageApi, contextHolder] = message.useMessage();
    //call the method on welcome to show message
    const showMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Welcome to Home..',
            duration: 3,
            className: 'font-monospace fw-bold',
            style:{
                color:"green"
            },
            icon : <HomeFilled/>
        });
    };

    // Ref to track if the message has been shown
    const messageShownRef = useRef(false);

    //on component mount call the showmessage method to show the message
    useEffect(()=>{
        // Show the message only if it hasn't been shown before
        if (!messageShownRef.current) {
            showMessage();
            // Set the ref to true to indicate that the message has been shown
            messageShownRef.current = true;
        }
    },[])

    return(
        <>
            {/* Show the welcome message */}
            {contextHolder}

            {/* Create the main container that holds the main home background */}
            <Container maxWidth={isMatch? "xs" : "xl"}
                sx={{
                    // Chaing background on theme condition if theme button clicked then it will toggle theme
                    backgroundImage: isTheme ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )' : 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
                    //backgroundImage: 'url(https://i.postimg.cc/MTQ1gGpb/Slidesdocs-technology-line-electronic-circuit-board-bcf6396155.jpg)',
                    //backgroundSize: "contain",
                    minHeight : (isMatch)? "378vmax" : "72vmax",    /*Viewport max height it will expand automatically if required*/
                }}
            >
                    <header className="text-center" style={{marginTop:"75px"}}>
                        <h2  style={{
                            color: isTheme ? "darkblue" : "wheat",
                            fontFamily:"monospace",
                            fontWeight:"bold",
                            fontSize:isMatch? "24px" : "37px"
                        }}>
                            {/* If screen size is lesser than sm breapoint then show less heading  */}
                            {isMatch? "IoT Attendance System" : "IoT Based Attendance Management System"}
                        </h2>
                    </header>
                    {/* Forwared this isTheme props to the next level child also */}
                    <HomeCardComponents isTheme={isTheme}/>

                    {/* Add a float button of ant design to go back on top */}
                    <FloatButton.BackTop visibilityHeight={20} className="text-bg-warning text-success"/>
            </Container>
        </>
    );
}
export default HomePage;
