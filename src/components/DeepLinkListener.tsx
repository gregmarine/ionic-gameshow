import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Plugins } from '@capacitor/core';
const { App: CapApp } = Plugins;

const DeepLinkListener: React.FC<any> = () => {
    let history = useHistory();
    useEffect(() => {
        CapApp.addListener('appUrlOpen', (data: any) => {
            // Example url: https://mycoolsite.com/pages/page1
            // slug = /pages/page1
            const slug = data.url.split(".com").pop();
            if (slug) {
                history.push(slug);
            }
            // If no match, do nothing - let regular routing 
            // logic take over
        });
    }, [history]);

    return null;
};

export default DeepLinkListener;