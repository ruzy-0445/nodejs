export const transformKeyToCategory = (category) => {
    switch (category) {
        case "all":
            return "所有工單";
        case "notResolved":
            return "未解決";
        case "resolved":
            return "已解決";
        case "ccdb":
            return "CCDB";
        case "emea":
            return "EMEA";
        case "pa":
            return "PA";
        default:
            return "";
    };
};

export const transformCodeToStatus = (code) => {
    switch (code) {
        case 2:
            return "開啟";
        case 3:
            return "處理中";
        case 4:
            return "已解決";
        case 5:
            return "已關閉";
        case 6:
            return "等待客戶回覆";
        case 7:
            return "待定";
        default:
            return "";
    };
};

export const transformToLocaleDateString = (time) => {
    return new Date(time).toLocaleString();
};

export const transformUserIdToUsername = (userId, users) => {
    return users[userId] === undefined ? "" : users[userId];
};

export const transformSourceToString = (source) => {
    switch (source) {
        case 1:
            return "Email";
        case 2:
            return "Portal";
        case 3:
            return "Phone";
        case 7:
            return "Chat";
        case 8:
            return "Mobihelp";
        case 9:
            return "Feedback Widget";
        case 10:
            return "Outbound Email";
        default:
            return "";
    };
};