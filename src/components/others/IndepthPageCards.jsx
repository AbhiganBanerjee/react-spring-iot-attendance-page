import { Build, Code, DataObject, Language, Memory, RadioButtonChecked, Sensors, SettingsSuggest } from "@mui/icons-material";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import {prototype} from '../../styles/prototype.css';

// Add the isTheme property
const IndeptPageCards = ({isTheme}) => {

    const theme = useTheme();
    const isScrenSize = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Grid
                container
                spacing={2}
                marginTop={"20px"}
            >
                {/* Main 2 big cards Identifying Hardware and Software Portion */}
                <Grid item xs={12} md={6} sm={12} lg={6} xl={6}
                    sx={{
                        display:"flex", 
                        justifyContent:"center",
                        alignItems:"center",
                    }}
                >
                    {/* This card is for Hardware Overview */}
                    <Card 
                        className="card"
                        elevation={8}
                        sx={{
                            width: isScrenSize? "310px": "96%", 
                            backgroundColor: '#FA8BFF',
                            backgroundImage: "linear-gradient(309deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
                            borderRadius : "13% 7% 7% 1%"
                        }}
                    >
                        <CardHeader
                            action={
                                <IconButton className="card"
                                    sx={{
                                        color:"inherit",
                                        border:"3px solid #F4D03F",
                                        backgroundColor:"#16A085"
                                    }}
                                >
                                    <SettingsSuggest/>
                                </IconButton>
                            }

                            title={
                                <b className="neonText-LightPink fs-4">Hardware Overview</b>
                            }
                        />
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" 
                                    sx={{
                                        fontFamily:"monospace",
                                        fontWeight:"bold",
                                        fontSize: isScrenSize ? "16px" : "larger"
                                    }}
                                >
                                    <Memory/>&nbsp;Main Controller Unit(MCU)
                                </Typography>
                                <Typography variant="body2" color="inherit" sx={{
                                    fontFamily:"monospace",
                                    fontSize: isScrenSize ? "12px" : "large",
                                    textAlign:"justify"
                                }}>
                                    We have used the <b>NodeMCU ESP8266</b> as Our main <b>Micro Controller Unit</b>, which comes
                                    up with its <b>built-in Wi-Fi Module</b>, so there is no need to attach and stack external
                                    Wi-Fi Module and bear the burden.
                                </Typography><br/>
                                <Typography gutterBottom variant="h5" component="div" 
                                    sx={{
                                        fontFamily:"monospace",
                                        fontWeight:"bold",
                                        fontSize: isScrenSize ? "16px" : "larger"
                                    }}
                                >
                                    <Sensors/>&nbsp;Serial Peripheral Interface
                                </Typography>
                                <Typography variant="body2" color="inherit" sx={{
                                    fontFamily:"monospace",
                                    fontSize: isScrenSize ? "12px" : "large",
                                    textAlign:"justify"
                                }}>
                                    <b>Radio Frequency Identifier</b> or <b>RFID</b> reader and cards are being used in this
                                    project, to scan each card based on the <b>Readio Frequency</b> technology.
                                </Typography><br/>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} sm={12} lg={6} xl={6}
                    sx={{
                        display:"flex", 
                        justifyContent:"center",
                        alignItems:"center",
                        marginTop : isScrenSize?"28px" : "0px"
                    }}
                >
                    {/* This card is for Software Overview */}
                    <Card 
                        className="card"
                        elevation={8}
                        sx={{
                            width: isScrenSize? "310px": "96%", 
                            backgroundColor: '#FA8BFF',
                            backgroundImage: "linear-gradient(309deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
                            borderRadius : "13% 7% 7% 1%"
                        }}
                    >
                        <CardHeader
                            action={
                                <IconButton className="card"
                                    sx={{
                                        color:"inherit",
                                        border:"3px solid #F4D03F",
                                        backgroundColor:"#16A085"
                                    }}
                                >
                                    <DataObject/>
                                </IconButton>
                            }

                            title={
                                <b className="neonText-LightPink fs-4">Software Overview</b>
                            }
                        />
                        <CardActionArea>
                            
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" 
                                    sx={{
                                        fontFamily:"monospace",
                                        fontWeight:"bold",
                                        fontSize: isScrenSize ? "16px" : "larger"
                                    }}
                                >
                                    <Code/>&nbsp;IDEs Used
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    fontFamily:"monospace",
                                    fontSize: isScrenSize ? "12px" : "large",
                                    color:"inherit",
                                    textAlign:"justify"
                                }}>
                                    We have used the open-source <b>Arduino IDE</b> to write the <b>C++ program</b> to integrate with the
                                    <b>NodeMCU</b> board and scan & read the <b>RFID Card</b> Data. 
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    fontFamily:"monospace",
                                    fontSize: isScrenSize ? "12px" : "large",
                                    color:"inherit",
                                    textAlign:"justify"
                                }}>
                                    We have also used the famous <b>Eclipse IDE</b> to write the <b>JEE Servlet</b> program
                                    which is used here to communicate with the local database <b>Oracle</b> and fetch the stored
                                    <b>Card ID</b> details as response.
                                </Typography><br/>
                                <Typography gutterBottom variant="h5" component="div" 
                                    sx={{
                                        fontFamily:"monospace",
                                        fontWeight:"bold",
                                        fontSize: isScrenSize ? "16px" : "larger"
                                    }}
                                >
                                    <Language/>&nbsp;Server Used
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{
                                    fontFamily:"monospace",
                                    fontSize: isScrenSize ? "12px" : "large",
                                    color:"inherit"
                                }}>
                                    We have used <b>Apache TomCat</b> server to Host Our <b>Web-Application</b>. 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};
export default IndeptPageCards;
