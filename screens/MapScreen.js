// src/screens/MapScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { APIKeeper } from '../services/api_keeper';

const MapScreen = () => {
    const [mapApiKey, setMapApiKey] = useState('');
    const apiKeeper = new APIKeeper('https://your-server.com');

    useEffect(() => {
        const fetchApiKey = async () => {
            await apiKeeper.fetch_api_keys();
            setMapApiKey(apiKeeper.get_api_key('maps'));
        };
        fetchApiKey();
    }, []);

    return (
        <View>
            <Text>Map Screen (API Key: {mapApiKey})</Text>
            {/* Map component using mapApiKey */}
        </View>
    );
};