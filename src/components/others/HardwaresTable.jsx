import Paper from '@mui/material/Paper';
import { Grid, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
//import all the icons
import * as Icons from "@mui/icons-material";

// Here also pass the proper input props
const HardwaresTable = ({ hardwares, isTheme }) => {
    // Maintain a hoverIndex to provide styles based on hovering
    const [hoverIndex, setHoverIndex] = useState(null);

    //Create the theme brekpoints
    const theme = useTheme();
    const isScreenSize = useMediaQuery(theme.breakpoints.down('sm'));

    // Create 2 style states for the table one for Hover and another for out
    const hoverStyle = {
        backgroundColor: isTheme ? '#FF3CAC' : "#85FFBD",
        backgroundImage: isTheme ? "linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
        color: isTheme ? "black" : "white",
        height: "auto",
        width: "auto",
        border: isTheme ? '3px solid black' : "3px solid white",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: isScreenSize?10:19
    };
    const outStyle = {
        backgroundColor: isTheme ? "#FF3CAC" : '#85FFBD',
        backgroundImage: isTheme ? "radial-gradient(circle at 85.4% 50.8%, rgb(14, 72, 222) 0%, rgb(3, 22, 65) 74.2%)" : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
        border: isTheme ? '3px solid white' : "3px solid black",
        height: "auto",
        width: "auto",
        color: isTheme ? "white" : "black",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: isScreenSize?10:19
    };

    // Create a tableHeader names array
    const tHeaders = ["name", "price", "type", "preview"];

    // Create a map of Icons
    const iconMap = {
        // Add required Icons
        Memory: Icons.Memory,
        CellTowerOutlined: Icons.CellTowerOutlined,
        NotificationsActive: Icons.NotificationsActive,
        Cable: Icons.Cable
    }

    // Get the IconComponent
    const getIconComponent = (iconName) => {
        // Create an icon comp ref
        const IconComponent = iconMap[iconName];
        if (IconComponent) {
            return <IconComponent className="icons"/>
        } else {
            return null;
        }
    }

    return (
        <Grid container spacing={2}>
            {/* This is the grid that is containing the table */}
            <Grid item xs={12} sm={12} md={10} lg={10} sx={{ margin: 'auto' }}>
                {/* Create the Table component inside the table container */}
                <TableContainer component={Paper} sx={{
                    //border: isTheme ? "5px solid black" : "5px solid yellow",
                    backgroundImage: isTheme ? "linear-gradient(90deg, #08AEEA 0%, #2AF598 100%)" : 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
                }}>
                    <Table sx={{
                        minWidth: { xs: 380, sm: 480, md: 650 },
                        fontFamily: "monospace",
                    }}
                        aria-label="customized table"
                    >
                        <TableHead>
                            <TableRow>
                                {/* Iterate through the table head array */}
                                {tHeaders.map((heading, index) =>
                                    <TableCell key={index} align='center' sx={{
                                        fontSize: { xs: "12px", sm: "20px", md: "25px" },
                                        fontWeight: "bold",
                                        fontFamily: "monospace",
                                        color: isTheme ? "black" : "white",
                                        border: isTheme ? "3px solid white" : "3px solid black",
                                    }}>
                                        {heading.toUpperCase()}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Iterate through the hardwares array coming from API */}
                            {hardwares.map((row, index) => (
                                <TableRow key={index}
                                    onMouseOver={() => {
                                        setHoverIndex(index);
                                    }}
                                    onMouseOut={() => {
                                        setHoverIndex(null);
                                    }}
                                >
                                    <TableCell sx={index === hoverIndex ? hoverStyle : outStyle}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell sx={index === hoverIndex ? hoverStyle : outStyle} align="center">&#8377;{row.price}</TableCell>
                                    <TableCell sx={index === hoverIndex ? hoverStyle : outStyle} align="center" >{getIconComponent(row.icon)}</TableCell>
                                    <TableCell sx={index === hoverIndex ? hoverStyle : outStyle} align="center">
                                        <a href={row.image}>
                                            <div className='text-center' style={{ textDecoration: "none" }}>
                                                <img src={row.image} height={40} style={{ border: (index === hoverIndex) ? "2px solid yellow" : "2px solid black" }} />
                                            </div>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p className='text-center font-monospace fw-bold' style={{
                    display:isScreenSize?"block" :"none",
                    fontSize:"11px",
                    color:isTheme?"black":"white"
                }}>Move the table left to see the preview portion</p>
            </Grid>
        </Grid>
    );
}
export default HardwaresTable;
