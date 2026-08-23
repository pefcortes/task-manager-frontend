import React, { createContext, useContext, useState } from "react";

import "./AlertProvider.scss";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = (id) => {
        setAlerts((currentAlerts) =>
            currentAlerts.filter((alert) => alert.id !== id)
        );
    };

    const showAlert = (message, type = "info") => {
        const id = Date.now() + Math.random();
        const newAlert = { id, message, type };

        setAlerts((currentAlerts) => [...currentAlerts, newAlert]);

        setTimeout(() => removeAlert(id), 3000);

        return newAlert;
    };

    const value = {
        alerts,
        show: showAlert,
        success: (message) => showAlert(message, "success"),
        error: (message) => showAlert(message, "error"),
        info: (message) => showAlert(message, "info"),
        remove: removeAlert,
    };

    return (
        <AlertContext.Provider value={value}>
            {children}
            <div className="alert-container">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        onClick={() => removeAlert(alert.id)}
                        className={`alert-item ${alert.type}`}
                    >
                        {alert.message}
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);

    if (!context) {
        throw new Error("useAlert must be used inside an AlertProvider");
    }

    return context;
};
