import { Person } from "@mui/icons-material";
import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Container, Grid, IconButton, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
//import all MUI Icons
import * as Icons from "@mui/icons-material";
import SkeletonCardComponent from "../others/SkeletonCardComponent";
import { FloatButton, message } from "antd";

//Accept the isTheme props coming from Index component
const MembersPage = ({isTheme})=>{

    //Create a theme and breakpoint for very small screen devices
    const theme = useTheme();
    const isScreenSize = useMediaQuery(theme.breakpoints.down('sm'));

    //create a state to tract the loading
    const[isLoading,setIsLoading] = useState(false);

    //create a state to hold the single mentor object
    const[mentor,setMentor] = useState({});

    //Create a state for members JSON array
    const[members,setMembers] = useState([{}]);

    //manage mentor card styles in a seperate state
    const mentorHoverStyle = {
        maxWidth: 445,
        //Based on screen size define the height and width
        width: isScreenSize ? "310px" : "96%",
        //height : !isScreenSize?"255px" : "235px",

        //Based on the theme select the card background
        backgroundColor: isTheme ? '#FF3CAC' : "#85FFBD",
        backgroundImage: isTheme?"linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        border: '3px solid #FFFB7D',

        //define styles for some border shape
        // borderRadius : "13% 7% 7% 1%",
        color: isTheme?"darkblue" : "white" 
    };
    const mentorOutStyle = {
        maxWidth: 445,
        //Based on screen size define the height and width
        width: isScreenSize ? "310px" : "96%",
        //height : !isScreenSize?"255px" : "235
        //Based on the theme select the card background
        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
        
        //linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)
        backgroundImage: isTheme ?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0',
        //define styles for some border shape
        // borderRadius : '20px / 80px',
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

    //create 2 className for Icons
    let iconhoverClassName = isTheme?'text-primary' : 'text-white';
    let iconOutClassName = 'icons';

    //Create 2 className states to dynamically provide classname to the feature cards
    //index === hoverIndex?"glow":"card"
    let hoverClassName = isTheme?'darkglowing' : 'glow';
    let outClassName = 'card';

    let hoverColor = 
        isTheme?"darkblue":"white"
    ;
    let outColor = 
        isTheme?"white":"black"
    ;

    //manage those member card styles in a seperate state
    const featureHoverStyle = {
        //Based on screen size define the height and width
        width: isScreenSize ? "310px" : "96%",
        height : isScreenSize?"auto" : "auto",

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
        width: isScreenSize ? "310px" : "96%",
        height : isScreenSize?"auto" : "auto",

        //Based on the theme select the card background
        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
        
        //linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)
        backgroundImage: isTheme ?"radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",  
        border: '3px solid #784BA0',

        //define styles for some border shape
        borderRadius : "13% 7% 7% 1%",
        color: isTheme? "white" : "black" 
    };

    //create a state to check the hovering of the mentor card
    const[isHover,setIsHover] = useState(false);

    //Managing a State to store the current hoverIndex and based on that changestyle
    const[hoverIndex,setHoverIndex] = useState(null);

    //Create an IconMap
    const iconMap = {
        // Add more icon mappings as needed
        Person2 : Icons.Person2,
        Person : Icons.Person,
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

    // Maintain a state to track the expanded card index
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Handle expand click
    const handleExpandClick = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    //Give an welcome message 
    const [messageApi, contextHolder] = message.useMessage();
    //call the method on welcome to show message
    const showMessage = () => {
        messageApi.open({
            type: 'success',
            content: ' Guide & Members..',
            duration: 3,
            className: 'font-monospace fw-bold',
            style:{
                color:"green"
            },
            icon : <Icons.Groups2 />
        });
    };

    // Ref to track if the message has been shown
    const messageShownRef = useRef(false);

    //on component load get the mentor and members from the Spring REST API
    useEffect(()=>{
        //Waiting for the REST API starts so isLoading is set to true
        setIsLoading(true);

        //use Promise.all to fetch from multiple API
        Promise.all([
            //fetch mentor
            axios("https://spring-iot-attendance-api.onrender.com/getMentor?id=6648d9a8d99a4618cbd002d7"),

            //Fetch members also from API using axios
            axios("https://spring-iot-attendance-api.onrender.com/getMembers"),
        ])
        .then(([mentorRes, membersRes]) => {
            //set the data for mentor object
            setMentor(mentorRes.data);

            //set the data for members array
            setMembers(membersRes.data);
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
    },[])

    return(
        <>
            {/* Show the notification message of antd */}
            {contextHolder}

            {/* This is the main background holding the background image */}
            <Container maxWidth={isScreenSize?"xs":"xl"}
                sx={{
                    // Chaing background on theme condition if theme button clicked then it will toggle theme
                    backgroundImage: isTheme ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )' : 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
                    minHeight : (isScreenSize)? "378vmax" : "90vmax",    /*Viewport max height it will expand automatically if required*/
                }}
            >
                {/* Give a header for the members page */}
                <header className="text-center" style={{marginTop:"75px"}}>
                    <h2  style={{
                        color: isTheme ? "darkblue" : "wheat",
                        fontFamily:"monospace",
                        fontWeight:"bold",
                        fontSize:isScreenSize? "23px" : "37px"
                    }}>
                        {/* If screen size is lesser than sm breapoint then show less heading  */}
                        {isScreenSize? "Group Mentor & Members" : "Project Guide & Group Member Details"}
                    </h2>
                </header>

                {/* Create another seperate main grid for the members cards */}
                <Grid container spacing={2}>

                    {/* Now Iterate through the members array from API and create card for each member */}
                    {
                        members.map((member,index)=>
                            <Grid item xs={12} sm={12} lg={3} md={3} key={index}
                                sx={{
                                    justifyContent:"center",
                                    alignItems:"center",
                                    display:"flex",
                                    marginTop:isScreenSize?"20px":"10px"
                                }}
                            >
                                {/* If API is still loading show 4 skeleton cards in the place of member cards */}
                                {isLoading?<>
                                        <SkeletonCardComponent
                                            sx={featureOutStyle}
                                        /></>:
                                    <>
                                        <Card className={isHover?hoverClassName:outClassName} sx={index===hoverIndex?featureHoverStyle:featureOutStyle} key={index}>
                                            <CardActionArea 
                                                onMouseOver={()=>{
                                                    setHoverIndex(index);
                                                }}
                                                onMouseOut={()=>{
                                                    setHoverIndex(null);
                                                }}
                                            >
                                                <CardHeader 
                                                    action={
                                                        <IconButton className={index === hoverIndex? iconhoverClassName : iconOutClassName}
                                                        >
                                                            {getIconComponent(member.icon)}
                                                        </IconButton>
                                                    }
                                                    avatar={
                                                        <Avatar sx={isHover?iconHoverStyle:iconOutStyle} className={isHover?hoverClassName:outClassName}
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s5VyM2WynwIZ7V8jJFhb3VcrmUQVSHE3-tucyfQjoA&s"
                                                        />
                                                    }
                                                    title={
                                                        <b style={{
                                                            fontFamily:"monospace",
                                                            fontWeight:"bold",
                                                            fontSize: isScreenSize?"":"18px"
                                                        }}> 
                                                            {member.name}
                                                        </b>
                                                    }
                                                    subheader={
                                                        <b style={{
                                                            fontFamily:"monospace",
                                                            fontSize: isScreenSize?"":"15px",
                                                            color: (index===hoverIndex)? hoverColor : outColor
                                                        }}>
                                                            {member.role}
                                                        </b>
                                                    }    
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height={isScreenSize?"275":"290"}
                                                    image={member.image}
                                                    alt={member.name}
                                                />
                                       
                                                {/* Provide the contribution part only when it is expanded */}
                                                <CardActions disableSpacing>
                                                    <IconButton >
                                                        {/* Give an Anchor tag to visit linkedIn */}
                                                        <a className={index === hoverIndex? iconhoverClassName : iconOutClassName} href={member.linkedIn}>
                                                            <Icons.LinkedIn/>
                                                        </a>
                                                    </IconButton>
                                                    <IconButton >
                                                        {/* Add the mailto attribute to send the mail directly in hered */}
                                                        <a className={index === hoverIndex? iconhoverClassName : iconOutClassName} 
                                                            href ={member.mail}
                                                        >
                                                            <Icons.Email />
                                                        </a>    
                                                    </IconButton>
                                                    <IconButton sx={{marginLeft:"auto"}}
                                                        onClick={() => handleExpandClick(index)}
                                                        aria-expanded={expandedIndex === index}
                                                        aria-label="show more"
                                                    >
                                                        <Icons.ExpandMore className={index === hoverIndex ? iconhoverClassName : iconOutClassName} />
                                                    </IconButton>
                                                </CardActions>
                                                <Collapse in={expandedIndex == index} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="body2" component="div"
                                                            sx={{
                                                                fontFamily:"monospace",
                                                                fontSize: isScreenSize?"12px" : "15px",
                                                                textAlign:"justify"
                                                            }}
                                                        >
                                                            <dl>
                                                                <dt>Contribution(not limited to):</dt>
                                                                <dd>{member.desc}</dd>
                                                            </dl>
                                                        </Typography>  
                                                    </CardContent>
                                                </Collapse>
                                            </CardActionArea>
                                        </Card>
                                    </>
                                }
                            </Grid>
                        )
                    }
                </Grid>

                {/* Create the main Grid for the Mentor card*/}
                <Grid container spacing={2} sx={{marginTop:isScreenSize?"20px":"50px"}}>

                    {/* Give space in left and right so that the Mentor card is alligned in middle */}
                    <Grid item lg={2} md={2}/>

                    {/* Now create a big seperate grid for the Project Guid Card only */}
                    <Grid item xs={12} sm={12} lg={8} md={8}
                        sx={{
                            justifyContent:"center",
                            alignItems:"center",
                            display:"flex"
                        }}
                    >
                        {/* IF the API is still loading show one skeleton card in the place of the mentor card */}
                        {
                            isLoading?<SkeletonCardComponent sx={mentorHoverStyle}/>
                            :
                            <>
                                <Card className={isHover?hoverClassName:outClassName} sx={isHover?mentorHoverStyle:mentorOutStyle}>
                                    <CardActionArea 
                                        onMouseOver={
                                            ()=>{
                                                setIsHover(true);
                                            }
                                        }
                                        onMouseOut={
                                            ()=>{
                                                setIsHover(false);
                                            }
                                        }
                                    >
                                        <CardHeader 
                                            action={
                                                <Person className={isHover? iconhoverClassName : iconOutClassName}/>
                                            }
                                            avatar={
                                                <Avatar sx={isHover?iconHoverStyle:iconOutStyle} className={isHover?hoverClassName:outClassName}
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s5VyM2WynwIZ7V8jJFhb3VcrmUQVSHE3-tucyfQjoA&s"
                                                />
                                            }
                                            title={
                                                <b style={{
                                                    fontFamily:"monospace",
                                                    fontWeight:"bold",
                                                    fontSize: isScreenSize?"":"25px"
                                                }}> 
                                                    {mentor.name}
                                                </b>
                                            }
                                            subheader={
                                                <b style={{
                                                    fontFamily:"monospace",
                                                    fontWeight:"bold",
                                                    fontSize: isScreenSize?"":"19px",
                                                    color: isHover? hoverColor : outColor
                                                }}>
                                                    {mentor.role}
                                                </b>
                                            }
                                        />   
                                        <CardMedia
                                            component="img"
                                            height = "auto"
                                            image={mentor.image}
                                            title="Group_Mentor"
                                            alt="Group_Mentor"
                                        />         
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div"
                                                sx={{
                                                    fontFamily:"monospace",
                                                    fontWeight:"bold",
                                                    color:"inherit"
                                                }}
                                            >
                                                Contribution:
                                            </Typography>
                                            <Typography variant="body2" color="inherit"
                                                sx={{
                                                    fontFamily:"monospace",
                                                    textAlign:"justify"
                                                }}
                                            >
                                                {mentor.desc}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </>
                        }
                    </Grid>
                    
                    {/* Give space in left and right so that the Mentor card is alligned in middle */}
                    <Grid item lg={2} md={2}/>
                </Grid>

                {/* Add a Float Button to Go on Top */}
                <FloatButton.BackTop visibilityHeight={120} className="text-bg-warning text-success"/>
            </Container>
        </>
    );
}
export default MembersPage;

