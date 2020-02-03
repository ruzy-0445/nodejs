import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Typography } from "antd";

const { Text } = Typography;

class WrappedBreadcrumb extends React.Component {
    render() {
        const breadcrumbNameMap = {
            "/dashboard": "儀錶板",
            "/tickets": "工單",
            "/tickets/create": "新建工單"
        };

        const { location, match } = this.props;
        const pathSnippets = location.pathname.split("/").filter(i => i);

        for (let i = 0; i < pathSnippets.length; i++) {
            if (pathSnippets[i] === "detail") {
                pathSnippets.splice(i, 1);
            };
        };

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            return (
                <Breadcrumb.Item key={url} style={{ fontSize: "16px" }}>
                    {
                        (index + 1) === pathSnippets.length
                            ? <Text>{breadcrumbNameMap[url] || match.params.id}</Text>
                            : <Link to={url} style={{ color: "#40a9ff" }}>{breadcrumbNameMap[url]}</Link>
                    }
                </Breadcrumb.Item>
            );
        });

        const breadcrumbItems = [].concat(extraBreadcrumbItems);

        return (
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        );
    };
};

export default WrappedBreadcrumb;