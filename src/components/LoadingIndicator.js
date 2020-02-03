import React from "react";
import { Spin, Layout } from "antd";

class LoadingIndicator extends React.Component {
    render() {
        return (
            <Layout style={{ height: "100vh", background: "transparent" }} className="flex align-items-center justify-content-center">
                <Spin size={"large"} />
            </Layout>
        );
    };
};

export default LoadingIndicator;