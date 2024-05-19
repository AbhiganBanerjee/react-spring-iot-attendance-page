import { AppBar, Grid, IconButton, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DarkMode, Groups, Home, Info, LightMode, Memory, Science } from "@mui/icons-material";
import DrawerComponent from "./DrawerComponent";
import { Tooltip } from "antd";

//Pass a property which will be used to send the theme boolean value back to the parent component
const NavBarComponent = ({setIsThemeValue})=>{

    //Create a state that will see if the theme button is clicked or not
    const[changeTheme,setChangeTheme] = useState(false);

    //Create a method that will set both the boolean state for parent as well as for child's changeTheme on click
    const handleThemeClick = ()=>{
        //setting the parent boolean value that will be returned back to the parent IndexPage component
        setIsThemeValue(!changeTheme);

        //setting the child's own theme boolean not for parent
        setChangeTheme(!changeTheme);
    }

    useEffect(()=>{
        //On component mount set the linksOptions array properly
        setLinkOptions(options);
    },[])

    //Create a menuBar options array that will come as Links and will have different pages
    let options = [
        {
            path : "home",
            icon : <Home sx={{color:"inherit"}}/>
        },
        {
            path : "indepth",
            icon : <Info sx={{color:"inherit"}}/>
        },
        {
            path : "prototype",
            icon : <Memory sx={{color:"inherit"}}/>
        },
        {
            path : "results",
            icon : <Science sx={{color:"inherit"}}/>
        },
        {
            path : "members",
            icon : <Groups sx={{ccolor:"inherit"}}/>
        }
    ];

    //create the array state again
    const[linkOptions,setLinkOptions] = useState([{}]);

    //create a navigator reference
    let navigate = useNavigate();

    //on tab option click navigate to the id value link as passed as param
    const handleTabOptionClick = (id)=>{
        navigate(id);
    }

    //Create a state for tabValue
    const[tabValue,setTabValue] = useState();
    //Create a method to handle tab value change
    const handleTabValueChange = (e,val)=>{
        setTabValue(val);
    }

    //Define theme so that we can make the drawer active under a certain breakpoint
    const theme = useTheme();

    /*We will also use the useMediaQuery to make the responsive ness of that drawer active under certain screen size
    this returns a boolean which will become true under certain screen size condition
    so when the screen size is down from medium screen size, then only isMatch will become true
    and drawer will be shown then only*/
    const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

    return(
        // Define the AppBar component with its ToolBar to make the Nav
        <AppBar color="transparent" elevation={8}
            //Give a Linear Gradient color for the appbar using sx props
            sx={{
                //blur the navbar's behind portion
                backdropFilter:"blur(12px)",
                //Linear Gradient is always applied on bgimage
                //backgroundImage: 'linear-gradient(90deg, rgba(106,28,169,1) 22%, rgba(163,29,124,1) 46%, rgba(158,33,105,1) 84%, rgba(255,0,31,1) 100%)'
            }}
        >
            {/* Define the toolbar inside the appbar */}
            <Toolbar>
                {/* If the isMatch is true that means smaller screen size
                 we will show the drawer other wise the normal nav */}
                {(isMatch)?
                    <>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s5VyM2WynwIZ7V8jJFhb3VcrmUQVSHE3-tucyfQjoA&s" alt="Logo" style={{ height: 24 }} />&nbsp;<b className="font-monospace fw-bold" style={{color:!changeTheme?"wheat" : "darkblue"}}>IOT ECE</b>
                        
                        {/* Define a tool tip for the theme change button */}
                        <Tooltip  title={changeTheme?"Turn off the light" : "Turn on the light"} color= {changeTheme?"darkblue":"gold"} >
                            <IconButton sx={{color:!changeTheme?"wheat" : "darkblue"}} onClick={handleThemeClick}>
                                {!changeTheme ? <LightMode/> : <DarkMode/>}
                            </IconButton>
                        </Tooltip>

                        {/* show the drawer then and send the changeTheme to drawer also*/}
                        <DrawerComponent isTheme={changeTheme} options={options} /></> : 
                    <>
                        {/* Divide the toolbar in proper grid columns for responsive ness */}
                        <Grid container
                            //place the items in center
                            sx={{
                                placeItems : "center"
                            }}
                        >
                            {/* Make grid items */}
                            {/* xs 2 means for extra small screen it will make 6 items in each row */}
                            {/* This is the AoT logo main icon */}
                            <Grid item xs={2}>
                                {/* Define A Tabs and a tab for the logo option */}
                                <Tabs>
                                    <Tab 
                                        label="IoT ECE Project"
                                        icon={<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s5VyM2WynwIZ7V8jJFhb3VcrmUQVSHE3-tucyfQjoA&s" alt="Logo" style={{ height: 24 }} />}
                                        iconPosition="start"
                                        id={linkOptions[0].path}
                                        sx={{
                                            color:!changeTheme? "wheat" : "darkblue",
                                            fontFamily : "monospace",
                                            fontWeight : "bold",
                                            fontSize : "larger",
                                        }}    
                                        //On this logo click, it will go to home page too
                                        onClick={()=>handleTabOptionClick(linkOptions[0].path)}
                                    />        
                                </Tabs>
                            </Grid>
                            {/* Now  give some spacing with this AoT logo for other options*/}
                            <Grid item xs={4.5}/>
                            

                            {/* Now define the Options grid, that will contain the links */}
                            <Grid item xs={5}>
                                {/* Create all other option tabs */}
                                {/* Makke the tab options active and hovering based on value */}
                                <Tabs 
                                    sx={{
                                        "& .MuiTabs-indicator": {
                                            backgroundColor: changeTheme?"darkblue": "wheat", // Important to override existing styles
                                            background:!changeTheme? "wheat" : "darkblue",
                                            color:!changeTheme? "wheat" : "darkblue"
                                        }
                                    }}
                                    indicatorColor="secondary" textColor={!changeTheme? "white" : "darkblue"} value={tabValue} onChange={handleTabValueChange}>
                                    {/* Iterate through the array of linkOptions */}
                                    {
                                        linkOptions.map((option,index)=>(
                                            // Define tab for each options
                                            <Tab
                                                sx={{
                                                    color:!changeTheme? "wheat" : "darkblue",
                                                    fontFamily:"monospace",
                                                    fontWeight:"bold",
                                                }} 
                                                label={option.path}
                                                icon={option.icon}
                                                iconPosition="start"
                                                //on click navigate to the links
                                                onClick={()=>handleTabOptionClick(option.path)}
                                            />
                                        ))
                                    }
                                </Tabs>
                            </Grid>

                            {/* Now Add the switch to turn light off and on for theme change with a tooltip*/}
                            <Grid item xs={0.5}>
                                <Tooltip  title={changeTheme?"Turn off the light" : "Turn on the light"} color= {changeTheme?"darkblue":"gold"} >
                                    <IconButton sx={{color:!changeTheme?"wheat" : "darkblue"}} onClick={handleThemeClick}>
                                        {!changeTheme ? <LightMode/> : <DarkMode/>}
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </>
                }
                
            </Toolbar>
        </AppBar>
    );
}

export default NavBarComponent;