import { Groups, Home, Info, MenuRounded } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MemoryIcon from '@mui/icons-material/Memory';
import { useNavigate } from "react-router-dom";

const DrawerComponent = ({options, isTheme})=>{
    //Create a state to handle drawer opening
    const[drawerOpen,setDrawerOpen] = useState(false);

    //create a navigator reference
    let navigate = useNavigate();

    const[linkOptions,setLinkOptions] = useState([{}]);
    useEffect(()=>{
        //SEt the options array on the component load into the state
        setLinkOptions(options);
    },[])

    const handleTabOptionClick = (id)=>{
        //on drawer option click close the drawer
        setDrawerOpen(false);

        //navigate to that corresponding page
        navigate(id);
    }

    return(
        <>
            {/* Put an anchor right so that the drawer comes from right side of screen */}
            <Drawer 
                //Define background color also for the drawer
                PaperProps={{
                    sx:{
                       background: isTheme ? 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6% )' : 'linear-gradient( 85.2deg,  rgba(33,3,40,1) 7.5%, rgba(65,5,72,1) 88.7% )',
                    }
                }} 
                anchor="right" open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
                {/* Create List and iterate them from the links array */}
                <List>
                    {
                        linkOptions.map((option,index)=>(
                            <ListItem key={index}>
                                <ListItemButton onClick={()=>handleTabOptionClick(option.path)} divider>
                                    <ListItemIcon sx={{color:isTheme?"darkblue":"wheat"}}>{option.icon}</ListItemIcon>
                                        <ListItemText
                                            sx={{
                                                color: isTheme?"darkblue":"wheat",
                                                fontFamily:"monospace",
                                                fontWeight:"bold",
                                            }}
                                        >
                                            {options[index].path.toUpperCase()}
                                        </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{color:!isTheme?"wheat":"darkblue",marginLeft:"auto"}} onClick={()=>setDrawerOpen(!drawerOpen)}><MenuRounded/></IconButton>
        </>
    );
}
export default DrawerComponent;