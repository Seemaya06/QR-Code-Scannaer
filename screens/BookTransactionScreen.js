import React from 'react';
import { Text, View, TouchableOpacity, Stylesheet } from 'react-native';
import * as Permission from 'expo-permissions';
import { BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      hasCameraPermission: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermission = async()=>{
    const{status} = await Permissions.askAsync(Permission.CAMERA);

    this.setState({
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
      scanned: false
    });
  }


  handleBarCodeScanned = async({type, data}) =>{
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

      render() {

        const  hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState === "clicked" && hasCameraPermissions){
          return(
            <BarCodescanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}/>
          );
        }

        else if(buttonState === "normal"){
          return(
            <View style={styles.container}>
              <Text style ={styles.displayText}>{
              hasCameraPermission === true ? this.state.scannedData: "Request Camera Permission" }</Text>


            <TouchableOpacity
            onPress={this.getScannerPermissions}
            style={styles.scanButton}>
              <Text style= {styles.buttonText}> Scan QR Code</Text>
            
            </TouchableOpacity>
            </View>
          )
        }     
    }
  }