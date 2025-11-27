import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';


export default function ProfileScreen(){
return (
<View style={{flex:1}}>
<Header title="Profile" />
<Text style={{padding:16}}>User profile placeholder</Text>
</View>
);
}