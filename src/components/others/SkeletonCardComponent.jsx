import { Card, CardHeader, Skeleton } from "@mui/material";

const SkeletonCardComponent = ({style,sx})=>{
    //create a skeleton card here
    return(
        <>
            <Card style={style} sx={sx}>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    }
                    action = {
                        null
                    }
                    title = {
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    }
                    subheader = {
                        <Skeleton animation="wave" height={10} width="40%" />
                    }
                />
                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            </Card>
        </>
    );
}
export default SkeletonCardComponent;