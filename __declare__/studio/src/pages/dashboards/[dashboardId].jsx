import { useParams } from "react-router";

const dashboardHostPort = "http://localhost:5173";

const DashboardPage = () => {
    const { dashboardId } = useParams();

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                src={`${dashboardHostPort}/${dashboardId}`}
                style={{ width: "100%", height: "100%", border: "none" }}
                title={`Dashboard ${dashboardId}`}
            />
        </div>
    );
};

export default DashboardPage;
