
import React, { useState } from 'react';
import { View, CheckBox, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const HeatMapViews = ({ heatMapGenerator }) => {
    const [show3D, setShow3D] = useState(true);
    const [show2D, setShow2D] = useState(true);
    const [showRoutes, setShowRoutes] = useState(true);

    const figures = heatMapGenerator.get_combination_view(show3D, show2D, showRoutes);
    const htmlContent = figures.map(fig => fig.to_html()).join('');

    return (
        <View>
            <View>
                <CheckBox value={show3D} onValueChange={setShow3D} />
                <Text>3D View</Text>
            </View>
            <View>
                <CheckBox value={show2D} onValueChange={setShow2D} />
                <Text>2D View</Text>
            </View>
            <View>
                <CheckBox value={showRoutes} onValueChange={setShowRoutes} />
                <Text>Common Routes</Text>
            </View>
            <WebView
                source={{ html: htmlContent }}
                style={{ width: '100%', height: 500 }}
            />
        </View>
    );
};

export default HeatMapViews;