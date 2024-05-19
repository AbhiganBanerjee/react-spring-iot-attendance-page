import { Route, Routes } from "react-router-dom";
import NavBarComponent from "../navbar/NavbarComponent";
import { Grid } from "@mui/material";
import HomePage from "./HomePage";
import IndepthPage from "./IndepthPage";
import PrototypePage from "./PrototypePage";
import { useState } from "react";
import MembersPage from "./MembersPage";
import ResultsPage from "./ResultsPage";

const IndexComponent = ()=>{

    //Create a boolean state to handle theme change, which will come from child navbar component
    const[isTheme,setIsTheme] = useState(false);

    //create a method that will retrieve the boolean theme value from the child component
    const handleThemeValue = (value)=>{
        setIsTheme(value);
        //console.log(value);
        console.log(isTheme);
    }

    return(
        <>
            <Grid container>
                <Grid item xs={12} md={12} sm={12}>
                    <header><NavBarComponent setIsThemeValue={handleThemeValue}/></header>
                    <section className="row">
                        <main className="col-12 d-flex justify-content-center align-items-center">
                            <Routes>
                                {/* Pass the theme boolean value to the HomePage component as a props */}
                                <Route path="/" element={<HomePage isTheme={isTheme}/>}/>
                                <Route path="/home" element={<HomePage isTheme={isTheme}/>}/>

                                {/* Pass the theme boolean value to the indepth also */}
                                <Route path="/indepth" element={<IndepthPage isTheme={isTheme}/>}/>
                                <Route path="/prototype" element={<PrototypePage isTheme={isTheme}/>}/>

                                <Route path="/members" element={
                                    <>
                                        <MembersPage isTheme={isTheme}/>
                                    </>
                                }/>
                                <Route path="/results" element={
                                    <>
                                        <ResultsPage isTheme={isTheme}/>
                                    </>
                                }/>
                            </Routes>
                        </main>
                    </section>
                </Grid>
            </Grid>
        </>
    )
}
export default IndexComponent;